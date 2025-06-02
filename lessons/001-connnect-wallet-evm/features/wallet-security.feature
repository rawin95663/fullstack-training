Feature: Wallet Security và Privacy

    As a web3 user
    I want to ensure my wallet connection is secure
    So that my funds and personal information are protected

    Background:
        Given I am on the lesson 1 page
        And Reown AppKit is initialized with security features enabled

    # Permission Management Scenarios
    Scenario: Kiểm tra quyền truy cập tài khoản
        Given I am connecting MetaMask for the first time
        When I approve the connection request
        Then I should only grant read permission for my address
        And the dApp should not have permission to initiate transactions
        And I should see "Read-only access granted" message

    Scenario: Grant transaction permissions
        Given I am connected with read-only access
        When I attempt to sign a transaction
        Then I should see permission request for transaction signing
        When I approve transaction permissions
        Then I should see "Transaction permissions granted"
        And future transactions should not require permission approval

    Scenario: Revoke wallet permissions
        Given I have granted full permissions to the dApp
        When I go to MetaMask connected sites
        And I revoke permissions for this dApp
        And I return to the dApp
        Then I should see "Wallet disconnected" message
        And I should need to reconnect and re-grant permissions

    # Signature Security Scenarios
    Scenario: Sign secure message với EIP-712
        Given I am connected with MetaMask
        When the dApp requests to sign a structured message
        Then I should see properly formatted message in MetaMask
        And I should see "This is a safe message to sign" indicator
        And the domain should match the current dApp domain

    Scenario: Detect malicious signature request
        Given I am connected with MetaMask
        When a malicious dApp requests dangerous signature
        Then MetaMask should show security warning
        And I should see "This signature may be unsafe" warning
        And I should be able to reject the signature safely

    # Privacy Scenarios
    Scenario: Wallet address privacy protection
        Given I am using a privacy-focused wallet
        When I connect to the dApp
        Then my real wallet address should not be exposed unnecessarily
        And I should see option to use disposable address
        And transaction history should remain private

    Scenario: Disconnect clears session data
        Given I am connected with MetaMask
        And I have performed several transactions
        When I disconnect my wallet
        Then all session data should be cleared
        And no transaction history should remain in browser
        And I should start fresh on reconnection

    # Phishing Protection Scenarios
    Scenario: Detect domain spoofing
        Given I am on a legitimate dApp domain
        When I try to connect from a suspicious similar domain
        Then I should see phishing warning
        And the connection should be blocked
        And I should see "Potential phishing site detected" message

    Scenario: Verify dApp authenticity
        Given I am connecting to a verified dApp
        When the connection modal appears
        Then I should see verified badge for the dApp
        And I should see security score information
        And I should see "This dApp is verified" indicator

    # Hardware Wallet Security
    Scenario: Ledger transaction verification
        Given I am connected with Ledger
        When I initiate a transaction
        Then transaction details should appear on Ledger screen
        And I must physically confirm on Ledger device
        And transaction should only proceed after hardware confirmation

    Scenario: Ledger auto-lock protection
        Given I am connected with Ledger
        When Ledger device auto-locks after inactivity
        And I try to sign a transaction
        Then I should see "Please unlock your Ledger" message
        And transaction should be paused until unlock

    # Multi-signature Wallet Security
    Scenario: Safe wallet transaction approval
        Given I am connected with Safe wallet
        When I initiate a transaction requiring 2/3 signatures
        Then I should see "1 of 3 signatures collected"
        And transaction should be pending approval
        And other owners should be notified

    Scenario: Safe wallet owner verification
        Given I am connecting to Safe wallet
        When I claim to be an owner
        Then I must prove ownership through connected wallet
        And my address must be verified against Safe owners list
        And connection should fail if not a valid owner

    # Session Security
    Scenario: Secure session token management
        Given I am connected with any wallet
        When session is established
        Then session tokens should be encrypted
        And tokens should have expiration time
        And tokens should be refreshed automatically

    Scenario: Detect session hijacking
        Given I have an active wallet session
        When suspicious activity is detected from different IP
        Then I should receive security alert
        And session should be automatically terminated
        And I should need to reconnect with additional verification

    # Recovery Scenarios
    Scenario: Wallet recovery after device loss
        Given I lose access to my connected device
        When I try to access dApp from new device
        Then I should be able to recover using seed phrase
        And I should re-establish connection securely
        And previous session should be invalidated

    Scenario: Emergency disconnect
        Given I suspect my wallet is compromised
        When I use emergency disconnect feature
        Then all active sessions should be terminated immediately
        And all permissions should be revoked
        And I should receive confirmation of emergency action

    # Compliance và Audit
    Scenario: Transaction audit trail
        Given I am connected with MetaMask
        When I perform multiple transactions
        Then each transaction should be logged with timestamp
        And I should be able to export transaction history
        And audit trail should be cryptographically verifiable

    Scenario: Compliance với privacy regulations
        Given I am in EU region
        When I connect my wallet
        Then I should see GDPR compliance notice
        And I should be able to control data sharing preferences
        And I should have right to data deletion