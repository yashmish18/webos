module aptos_os::apps {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::event;
    use aptos_framework::timestamp;

    /// Error codes
    const E_APP_NOT_FOUND: u64 = 1;
    const E_NOT_INSTALLED: u64 = 2;
    const E_ALREADY_INSTALLED: u64 = 3;

    /// App metadata - represents a decentralized program/app
    struct AppMetadata has store {
        app_id: String,
        name: String,
        description: String,
        version: String,
        contract_address: address,
        created_at: u64,
    }

    /// Installed apps registry
    struct InstalledApps has key {
        apps: vector<AppMetadata>,
    }

    /// Process state - tracks active app executions
    struct ProcessState has store {
        process_id: String,
        app_id: String,
        owner: address,
        status: u8, // 0: running, 1: completed, 2: failed
        gas_used: u64,
        started_at: u64,
        ended_at: u64,
    }

    /// Active processes registry
    struct ActiveProcesses has key {
        processes: vector<ProcessState>,
    }

    #[event]
    struct AppInstalledEvent has drop, store {
        user: address,
        app_id: String,
        name: String,
        contract_address: address,
    }

    #[event]
    struct AppLaunchedEvent has drop, store {
        user: address,
        app_id: String,
        process_id: String,
    }

    struct ProcessCompletedEvent has drop, store {
        user: address,
        process_id: String,
        app_id: String,
        gas_used: u64,
        status: u8,
    }

    /// Initialize apps registry
    public fun initialize_apps_registry(account: &signer) {
        let account_addr = signer::address_of(account);
        if (!exists<InstalledApps>(account_addr)) {
            move_to(account, InstalledApps {
                apps: vector::empty<AppMetadata>(),
            });
            move_to(account, ActiveProcesses {
                processes: vector::empty<ProcessState>(),
            });
        };
    }

    /// Install an app
    public entry fun install_app(
        account: &signer,
        app_id: String,
        name: String,
        description: String,
        version: String,
        contract_address: address,
    ) acquires InstalledApps {
        let account_addr = signer::address_of(account);
        
        if (!exists<InstalledApps>(account_addr)) {
            initialize_apps_registry(account);
        };

        let apps = borrow_global_mut<InstalledApps>(account_addr);
        
        // Check if already installed
        let len = vector::length(&apps.apps);
        let i = 0;
        while (i < len) {
            let app_ref = vector::borrow(&apps.apps, i);
            if (app_ref.app_id == app_id) {
                abort E_ALREADY_INSTALLED
            };
            i = i + 1;
        };

        vector::push_back(&mut apps.apps, AppMetadata {
            app_id: copy app_id,
            name: copy name,
            description: copy description,
            version: copy version,
            contract_address,
            created_at: timestamp::now_seconds(),
        });

        event::emit(AppInstalledEvent {
            user: account_addr,
            app_id: copy app_id,
            name: copy name,
            contract_address,
        });
    }

    /// Launch an app (create a process)
    public entry fun launch_app(
        account: &signer,
        app_id: String,
        process_id: String,
    ) acquires InstalledApps, ActiveProcesses {
        let account_addr = signer::address_of(account);
        
        assert!(exists<InstalledApps>(account_addr), E_NOT_INSTALLED);
        let apps = borrow_global<InstalledApps>(account_addr);
        
        // Verify app is installed
        let len = vector::length(&apps.apps);
        let i = 0;
        let found = false;
        while (i < len) {
            let app_ref = vector::borrow(&apps.apps, i);
            if (app_ref.app_id == app_id) {
                found = true;
                break
            };
            i = i + 1;
        };
        assert!(found, E_APP_NOT_FOUND);

        let processes = borrow_global_mut<ActiveProcesses>(account_addr);
        vector::push_back(&mut processes.processes, ProcessState {
            process_id: copy process_id,
            app_id: copy app_id,
            owner: account_addr,
            status: 0, // running
            gas_used: 0,
            started_at: timestamp::now_seconds(),
            ended_at: 0,
        });

        event::emit(AppLaunchedEvent {
            user: account_addr,
            app_id: copy app_id,
            process_id: copy process_id,
        });
    }

    /// Get installed apps count
    public fun get_installed_apps_count(addr: address): u64 acquires InstalledApps {
        if (!exists<InstalledApps>(addr)) {
            return 0
        };
        vector::length(&borrow_global<InstalledApps>(addr).apps)
    }

    /// Get active processes count
    public fun get_active_processes_count(addr: address): u64 acquires ActiveProcesses {
        if (!exists<ActiveProcesses>(addr)) {
            return 0
        };
        vector::length(&borrow_global<ActiveProcesses>(addr).processes)
    }
}

