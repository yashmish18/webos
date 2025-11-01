module aptos_os::file_nft {
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::event;
    use aptos_framework::timestamp;

    /// Error codes
    const E_NOT_OWNER: u64 = 1;
    const E_FILE_NOT_FOUND: u64 = 2;
    const E_INVALID_VERSION: u64 = 3;
    const E_INVALID_HASH: u64 = 4;

    /// File NFT resource - represents an immutable file on-chain
    struct FileNFT has key {
        owner: address,
        file_id: String,
        name: String,
        file_type: String,
        current_version: u64,
        created_at: u64,
        content_hash: vector<u8>, // IPFS/Arweave hash
        storage_provider: String, // "ipfs", "arweave", "filecoin"
    }

    /// File version history
    struct FileVersion has store {
        version: u64,
        content_hash: vector<u8>,
        timestamp: u64,
        commit_message: String,
    }

    /// Version history storage
    struct VersionHistory has key {
        file_id: String,
        versions: vector<FileVersion>,
    }

    #[event]
    struct FileNFTCreatedEvent has drop, store {
        owner: address,
        file_id: String,
        name: String,
        file_type: String,
        initial_hash: vector<u8>,
    }

    #[event]
    struct FileVersionCommittedEvent has drop, store {
        owner: address,
        file_id: String,
        new_version: u64,
        content_hash: vector<u8>,
        commit_message: String,
    }

    /// Create a new File NFT
    public entry fun create_file_nft(
        account: &signer,
        file_id: String,
        name: String,
        file_type: String,
        content_hash: vector<u8>,
        storage_provider: String,
    ) {
        let account_addr = signer::address_of(account);
        let current_time = timestamp::now_seconds();

        // Note: Drive must be initialized separately before creating files
        // Users should call drive::initialize_drive() first

        let file_nft = FileNFT {
            owner: account_addr,
            file_id: copy file_id,
            name: copy name,
            file_type: copy file_type,
            current_version: 1,
            created_at: current_time,
            content_hash: copy content_hash,
            storage_provider: copy storage_provider,
        };

        move_to(account, file_nft);

        // Initialize version history
        move_to(account, VersionHistory {
            file_id: copy file_id,
            versions: vector::singleton(FileVersion {
                version: 1,
                content_hash: copy content_hash,
                timestamp: current_time,
                commit_message: string::utf8(b"Initial commit"),
            }),
        });

        event::emit(FileNFTCreatedEvent {
            owner: account_addr,
            file_id: copy file_id,
            name: copy name,
            file_type: copy file_type,
            initial_hash: copy content_hash,
        });
    }

    /// Commit a new version of the file
    public entry fun commit_file_version(
        account: &signer,
        file_id: String,
        new_content_hash: vector<u8>,
        commit_message: String,
    ) acquires FileNFT, VersionHistory {
        let account_addr = signer::address_of(account);
        assert!(exists<FileNFT>(account_addr), E_FILE_NOT_FOUND);
        
        let file = borrow_global_mut<FileNFT>(account_addr);
        assert!(file.owner == account_addr, E_NOT_OWNER);
        assert!(file.file_id == file_id, E_FILE_NOT_FOUND);

        file.current_version = file.current_version + 1;
        file.content_hash = copy new_content_hash;

        let history = borrow_global_mut<VersionHistory>(account_addr);
        vector::push_back(&mut history.versions, FileVersion {
            version: file.current_version,
            content_hash: copy new_content_hash,
            timestamp: timestamp::now_seconds(),
            commit_message: copy commit_message,
        });

        event::emit(FileVersionCommittedEvent {
            owner: account_addr,
            file_id,
            new_version: file.current_version,
            content_hash: copy new_content_hash,
            commit_message: copy commit_message,
        });
    }

    /// Get file metadata (returns a copy of key fields)
    public fun get_file_owner(addr: address): address acquires FileNFT {
        borrow_global<FileNFT>(addr).owner
    }

    /// Get file name
    public fun get_file_name(addr: address): String acquires FileNFT {
        *&borrow_global<FileNFT>(addr).name
    }
}

