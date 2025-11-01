module aptos_os::acl {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::event;

    /// Error codes
    const E_NOT_OWNER: u64 = 1;
    const E_PERMISSION_DENIED: u64 = 2;
    const E_INVALID_PERMISSION: u64 = 3;
    const E_ACL_NOT_FOUND: u64 = 4;

    /// Permission flags
    const PERMISSION_READ: u8 = 1;
    const PERMISSION_WRITE: u8 = 2;
    const PERMISSION_EXECUTE: u8 = 4;
    const PERMISSION_DELETE: u8 = 8;

    /// Access Control List entry
    struct ACLEntry has store, drop {
        user: address,
        permissions: u8, // Bitmask of permissions
    }

    /// ACL resource - stores permissions for files
    struct AccessControlList has key {
        file_id: String,
        owner: address,
        entries: vector<ACLEntry>,
    }

    #[event]
    struct PermissionGrantedEvent has drop, store {
        file_id: String,
        owner: address,
        granted_to: address,
        permissions: u8,
    }

    #[event]
    struct PermissionRevokedEvent has drop, store {
        file_id: String,
        owner: address,
        revoked_from: address,
    }

    /// Initialize ACL for a file
    public fun initialize_acl(
        account: &signer,
        file_id: String,
    ): AccessControlList {
        let account_addr = signer::address_of(account);
        
        AccessControlList {
            file_id,
            owner: account_addr,
            entries: vector::empty<ACLEntry>(),
        }
    }

    /// Grant permissions to a user
    public entry fun grant_permission(
        account: &signer,
        file_id: String,
        grantee: address,
        permissions: u8,
    ) acquires AccessControlList {
        let account_addr = signer::address_of(account);
        assert!(exists<AccessControlList>(account_addr), E_ACL_NOT_FOUND);
        
        let acl = borrow_global_mut<AccessControlList>(account_addr);
        assert!(acl.owner == account_addr, E_NOT_OWNER);
        assert!(acl.file_id == file_id, E_ACL_NOT_FOUND);

        // Check if entry already exists
        let len = vector::length(&acl.entries);
        let i = 0;
        let found = false;
        while (i < len) {
            let entry_ref = vector::borrow(&acl.entries, i);
            if (entry_ref.user == grantee) {
                let entry = vector::borrow_mut(&mut acl.entries, i);
                entry.permissions = entry.permissions | permissions;
                found = true;
                break
            };
            i = i + 1;
        };

        if (!found) {
            vector::push_back(&mut acl.entries, ACLEntry {
                user: grantee,
                permissions,
            });
        };

        event::emit(PermissionGrantedEvent {
            file_id,
            owner: account_addr,
            granted_to: grantee,
            permissions,
        });
    }

    /// Revoke permissions from a user
    public entry fun revoke_permission(
        account: &signer,
        file_id: String,
        revokee: address,
        permissions: u8,
    ) acquires AccessControlList {
        let account_addr = signer::address_of(account);
        assert!(exists<AccessControlList>(account_addr), E_ACL_NOT_FOUND);
        
        let acl = borrow_global_mut<AccessControlList>(account_addr);
        assert!(acl.owner == account_addr, E_NOT_OWNER);
        assert!(acl.file_id == file_id, E_ACL_NOT_FOUND);

        let len = vector::length(&acl.entries);
        let i = 0;
        while (i < len) {
            let entry = vector::borrow(&acl.entries, i);
            if (entry.user == revokee) {
                let entry_mut = vector::borrow_mut(&mut acl.entries, i);
                // Clear the specified permission bits
                entry_mut.permissions = entry_mut.permissions - (entry_mut.permissions & permissions);
                if (entry_mut.permissions == 0) {
                    vector::remove(&mut acl.entries, i);
                };
                break
            };
            i = i + 1;
        };

        event::emit(PermissionRevokedEvent {
            file_id,
            owner: account_addr,
            revoked_from: revokee,
        });
    }

    /// Check if user has permission
    public fun has_permission(
        file_owner: address,
        user: address,
        file_id: String,
        permission: u8,
    ): bool acquires AccessControlList {
        // Owner has all permissions
        if (file_owner == user) {
            return true
        };

        if (!exists<AccessControlList>(file_owner)) {
            return false
        };

        let acl = borrow_global<AccessControlList>(file_owner);
        if (acl.file_id != file_id) {
            return false
        };

        let len = vector::length(&acl.entries);
        let i = 0;
        while (i < len) {
            let entry = vector::borrow(&acl.entries, i);
            if (entry.user == user) {
                return (entry.permissions & permission) != 0
            };
            i = i + 1;
        };

        false
    }

    /// Get ACL entry count
    public fun get_acl_entry_count(file_owner: address, file_id: String): u64 acquires AccessControlList {
        if (!exists<AccessControlList>(file_owner)) {
            return 0
        };

        let acl = borrow_global<AccessControlList>(file_owner);
        if (acl.file_id != file_id) {
            return 0
        };

        vector::length(&acl.entries)
    }
}

