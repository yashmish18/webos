module aptos_os::drive {
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::event;

    /// Error codes
    const E_NOT_OWNER: u64 = 1;
    const E_FILE_NOT_FOUND: u64 = 2;
    const E_DIRECTORY_NOT_FOUND: u64 = 3;
    const E_INVALID_PATH: u64 = 4;
    const E_ALREADY_EXISTS: u64 = 5;

    /// Drive resource - represents a user's personal on-chain filesystem
    struct Drive has key {
        owner: address,
        root_directory: String,
        file_count: u64,
        directories: vector<String>,
    }

    /// Directory metadata stored on-chain
    struct DirectoryMetadata has store {
        path: String,
        parent: String,
        created_at: u64,
        files: vector<String>, // File NFT addresses
        subdirectories: vector<String>,
    }

    /// File reference stored in Drive
    struct FileReference has store {
        file_nft_address: address,
        name: String,
        path: String,
        file_type: String,
        size: u64,
        created_at: u64,
        last_modified: u64,
    }

   
    #[event]
    struct DriveCreatedEvent has drop, store {
        owner: address,
        drive_address: address,
    }

    #[event]
    struct FileCreatedEvent has drop, store {
        owner: address,
        file_nft_address: address,
        path: String,
        file_type: String,
    }

    #[event]
    struct FileUpdatedEvent has drop, store {
        owner: address,
        file_nft_address: address,
        new_version: u64,
        content_hash: vector<u8>,
    }

    /// Initialize Drive for a user (entry function)
    public entry fun initialize_drive(account: &signer) {
        initialize_drive_internal(account);
    }

    /// Initialize Drive for a user (internal function callable from other modules)
    public fun initialize_drive_internal(account: &signer) {
        let account_addr = signer::address_of(account);
        
        // Move account to object if needed
        if (!exists<Drive>(account_addr)) {
            move_to(account, Drive {
                owner: account_addr,
                root_directory: string::utf8(b"/"),
                file_count: 0,
                directories: vector::empty<String>(),
            });

            event::emit(DriveCreatedEvent {
                owner: account_addr,
                drive_address: account_addr,
            });
        };
    }

    /// Get Drive file count
    public fun get_drive_file_count(addr: address): u64 acquires Drive {
        borrow_global<Drive>(addr).file_count
    }

    /// Check if Drive exists
    public fun drive_exists(addr: address): bool {
        exists<Drive>(addr)
    }

    /// Add file reference to Drive
    public fun add_file(
        account: &signer,
        file_nft_address: address,
        _file_name: String,
        file_path: String,
        file_type: String,
        _size: u64,
        _content_hash: vector<u8>,
    ) acquires Drive {
        let account_addr = signer::address_of(account);
        assert!(drive_exists(account_addr), E_NOT_OWNER);
        
        let drive = borrow_global_mut<Drive>(account_addr);
        drive.file_count = drive.file_count + 1;

        event::emit(FileCreatedEvent {
            owner: account_addr,
            file_nft_address,
            path: file_path,
            file_type,
        });
    }

    /// Get file count
    public fun get_file_count(addr: address): u64 acquires Drive {
        borrow_global<Drive>(addr).file_count
    }

    #[test_only]
    public fun create_test_drive(account: &signer) {
        initialize_drive(account);
    }
}

