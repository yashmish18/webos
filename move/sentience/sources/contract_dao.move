module sentience::contract_dao {
    use std::signer;
    use std::string::String;
    use aptos_framework::event;
    use aptos_framework::account;
    use sentience::sentience_core;

    /// Error codes
    const E_INSUFFICIENT_SENTIENCE: u64 = 1;

    /// Minimum sentience to form a DAO
    const MIN_SENTIENCE_FOR_DAO: u64 = 1000;

    /// Event handles for the module
    struct DAOEventHandles has key {
        create_events: event::EventHandle<DAOCreatedEvent>,
        join_events: event::EventHandle<DAOJoinedEvent>,
    }

    #[event]
    struct DAOCreatedEvent has drop, store {
        dao_id: String,
        creator: address,
        sentience_score: u64,
    }

    #[event]
    struct DAOJoinedEvent has drop, store {
        dao_id: String,
        member: address,
        sentience_score: u64,
    }

    fun init_module(account: &signer) {
        move_to(account, DAOEventHandles {
            create_events: account::new_event_handle(account),
            join_events: account::new_event_handle(account),
        });
    }

    /// Create a DAO from high-sentience contracts
    public entry fun create_dao(
        account: &signer,
        dao_id: String,
    ) acquires DAOEventHandles {
        let addr = signer::address_of(account);
        let sentience_score = sentience_core::get_contract_sentience(addr);
        assert!(sentience_score >= MIN_SENTIENCE_FOR_DAO, E_INSUFFICIENT_SENTIENCE);

        let handles = borrow_global_mut<DAOEventHandles>(@sentience);
        event::emit_event(&mut handles.create_events, DAOCreatedEvent {
            dao_id,
            creator: addr,
            sentience_score,
        });
    }

    public entry fun join_dao(
        account: &signer,
        dao_id: String,
    ) acquires DAOEventHandles {
        let addr = signer::address_of(account);
        let sentience_score = sentience_core::get_contract_sentience(addr);

        let handles = borrow_global_mut<DAOEventHandles>(@sentience);
        event::emit_event(&mut handles.join_events, DAOJoinedEvent {
            dao_id,
            member: addr,
            sentience_score,
        });
    }

    /// Check if contract has sufficient sentience to create DAO
    public fun can_create_dao(sentience_score: u64): bool {
        sentience_score >= MIN_SENTIENCE_FOR_DAO
    }

    /// Get minimum sentience required for DAO
    public fun get_min_sentience(): u64 {
        MIN_SENTIENCE_FOR_DAO
    }
}