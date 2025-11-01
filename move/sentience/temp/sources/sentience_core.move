module sentience::sentience_core {
    use std::signer;
    use aptos_framework::event;
    use aptos_framework::account;
    use aptos_framework::timestamp;

    /// Event handles for the module
    struct SentienceEventHandles has key {
        register_events: event::EventHandle<ContractRegisteredEvent>,
        xp_events: event::EventHandle<XPGainedEvent>,
        score_events: event::EventHandle<SentienceScoreUpdatedEvent>,
    }

    /// Error codes
    const E_CONTRACT_NOT_REGISTERED: u64 = 1;

    /// Sentience metadata for a smart contract
    struct SentienceData has key {
        contract_address: address,
        sentience_score: u64,
        experience_points: u64,
        created_at: u64,
    }

    /// XP multipliers for different activities
    const XP_TRANSACTION: u64 = 10;

    #[event]
    struct ContractRegisteredEvent has drop, store {
        contract_address: address,
        creator: address,
    }

    #[event]
    struct XPGainedEvent has drop, store {
        contract_address: address,
        xp_gained: u64,
        new_total: u64,
    }

    #[event]
    struct SentienceScoreUpdatedEvent has drop, store {
        contract_address: address,
        old_score: u64,
        new_score: u64,
    }

    fun init_module(account: &signer) {
        move_to(account, SentienceEventHandles {
            register_events: account::new_event_handle(account),
            xp_events: account::new_event_handle(account),
            score_events: account::new_event_handle(account),
        });
    }

    /// Register a contract in the Sentience Protocol
    public entry fun register_contract(account: &signer) {
        let addr = signer::address_of(account);
        let current_time = timestamp::now_seconds();
        let data = SentienceData {
            contract_address: addr,
            sentience_score: 0,
            experience_points: 0,
            created_at: current_time,
        };
        move_to(account, data);

        let handles = borrow_global_mut<SentienceEventHandles>(@sentience);
        event::emit_event(&mut handles.register_events, ContractRegisteredEvent {
            contract_address: addr,
            creator: addr,
        });
    }

    /// Award XP and update sentience score
    public entry fun add_xp(
        account: &signer,
        amount: u64
    ) acquires SentienceData, SentienceEventHandles {
        let addr = signer::address_of(account);
        assert!(exists<SentienceData>(addr), E_CONTRACT_NOT_REGISTERED);
        
        let data = borrow_global_mut<SentienceData>(addr);
        data.experience_points = data.experience_points + amount;
        
        // Update sentience score (simplified formula)
        let old_score = data.sentience_score;
        data.sentience_score = data.experience_points / 100;

        let handles = borrow_global_mut<SentienceEventHandles>(addr);
        
        // Emit XP gain event
        event::emit_event(&mut handles.xp_events, XPGainedEvent {
            contract_address: addr,
            xp_gained: amount,
            new_total: data.experience_points,
        });

        // Emit score update event if changed
        if (old_score != data.sentience_score) {
            event::emit_event(&mut handles.score_events, SentienceScoreUpdatedEvent {
                contract_address: addr,
                old_score,
                new_score: data.sentience_score,
            });
        }
    }

    /// Get a contract's sentience score
    public fun get_contract_sentience(addr: address): u64 acquires SentienceData {
        assert!(exists<SentienceData>(addr), E_CONTRACT_NOT_REGISTERED);
        borrow_global<SentienceData>(addr).sentience_score
    }
}