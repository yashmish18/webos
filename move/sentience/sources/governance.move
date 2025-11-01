module sentience::governance {
    use std::signer;
    use std::string::String;
    use aptos_framework::event;
    use aptos_framework::account;
    use sentience::sentience_core;

    /// Event handles for the module
    struct GovernanceEventHandles has key {
        proposal_events: event::EventHandle<ProposalCreatedEvent>,
        vote_events: event::EventHandle<VoteCastEvent>,
    }

    /// Error codes
    const E_INSUFFICIENT_SENTIENCE: u64 = 1;
    const E_ALREADY_VOTED: u64 = 2;
    const E_PROPOSAL_EXPIRED: u64 = 3;
    const E_INVALID_VOTE: u64 = 4;

    /// Vote options
    const VOTE_YES: u8 = 1;
    const VOTE_NO: u8 = 2;
    const VOTE_ABSTAIN: u8 = 3;

    /// Minimum sentience score to create proposals
    const MIN_SENTIENCE_TO_PROPOSE: u64 = 100;

    /// Governance registry
    struct GovernanceData has key {
        proposals: u64,
        min_sentience_to_propose: u64,
        min_sentience_to_vote: u64,
    }

    #[event]
    struct ProposalCreatedEvent has drop, store {
        proposal_id: u64,
        creator: address,
        title: String,
    }

    #[event]
    struct VoteCastEvent has drop, store {
        proposal_id: String,
        voter: address,
        vote: u8,
    }

    /// Initialize governance
    fun init_module(account: &signer) {
        move_to(account, GovernanceData {
            proposals: 0,
            min_sentience_to_propose: MIN_SENTIENCE_TO_PROPOSE,
            min_sentience_to_vote: 10,
        });

        move_to(account, GovernanceEventHandles {
            proposal_events: account::new_event_handle(account),
            vote_events: account::new_event_handle(account),
        });
    }

    public entry fun create_proposal(
        account: &signer,
        title: String,
    ) acquires GovernanceData, GovernanceEventHandles {
        let addr = signer::address_of(account);
        let sentience_score = sentience_core::get_contract_sentience(addr);
        let gov_data = borrow_global_mut<GovernanceData>(@sentience);
        
        assert!(sentience_score >= gov_data.min_sentience_to_propose, E_INSUFFICIENT_SENTIENCE);
        
        let proposal_id = gov_data.proposals;
        gov_data.proposals = gov_data.proposals + 1;

        let handles = borrow_global_mut<GovernanceEventHandles>(@sentience);
        event::emit_event(&mut handles.proposal_events, ProposalCreatedEvent {
            proposal_id,
            creator: addr,
            title,
        });
    }

    public entry fun cast_vote(
        account: &signer,
        proposal_id: String,
        vote: u8,
    ) acquires GovernanceData, GovernanceEventHandles {
        let addr = signer::address_of(account);
        assert!(vote == VOTE_YES || vote == VOTE_NO || vote == VOTE_ABSTAIN, E_INVALID_VOTE);
        let sentience_score = sentience_core::get_contract_sentience(addr);
        
        let gov_data = borrow_global<GovernanceData>(@sentience);
        assert!(sentience_score >= gov_data.min_sentience_to_vote, E_INSUFFICIENT_SENTIENCE);
        
        let event_handle = borrow_global_mut<GovernanceEventHandles>(@sentience);
        
        event::emit_event(&mut event_handle.vote_events, VoteCastEvent {
            proposal_id,
            voter: addr,
            vote,
        });
    }

    /// Check if contract can vote (based on sentience score)
    public fun can_vote(sentience_score: u64, min_sentience: u64): bool {
        sentience_score >= min_sentience
    }

    /// Calculate voting power from sentience score
    public fun calculate_voting_power(sentience_score: u64): u64 {
        sentience_score // 1:1 ratio for now
    }

    /// Get governance data
    public fun get_governance_data(): (u64, u64, u64) acquires GovernanceData {
        let gov_data = borrow_global<GovernanceData>(@sentience);
        (
            gov_data.proposals,
            gov_data.min_sentience_to_propose,
            gov_data.min_sentience_to_vote,
        )
    }
}