module hello::my_module {
    use std::signer;

    /// Event handle for storing the say_hello events
    struct HelloEvent has drop, store {
        sender: address
    }

    /// Say hello and emit an event with the sender's address
    public entry fun say_hello(account: &signer) {
        let sender = signer::address_of(account);
        std::debug::print(&sender);
    }

    #[test]
    fun test_say_hello() {
        // Create a signer for testing
        let account = aptos_framework::account::create_account_for_test(@0x1);
        say_hello(&account);
    }
}