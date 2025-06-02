Feature: Wallet Performance và User Experience

    As a web3 user
    I want wallet connection to be fast and responsive
    So that I have a smooth dApp interaction experience

    Background:
        Given I am on the lesson 1 page
        And network connectivity is stable
        And Reown AppKit is properly configured

    # Connection Speed Scenarios
    Scenario: Fast wallet connection
        Given I click on connect wallet button
        When I select MetaMask extension
        Then the connection should complete within 3 seconds
        And wallet info should load immediately
        And I should see loading indicators during connection

    Scenario: Slow network connection handling
        Given I have slow internet connection (2G speed)
        When I try to connect MetaMask mobile via QR
        Then I should see "Slow connection detected" message
        And QR code should remain valid for extended time
        And I should see connection progress indicator

    Scenario: Connection retry mechanism
        Given wallet connection fails due to network timeout
        When I see "Connection failed" message
        Then I should see "Retry" button
        When I click "Retry"
        Then connection should attempt again automatically
        And I should see retry attempt counter

    # Loading Performance Scenarios
    Scenario: Modal loading optimization
        When I click connect wallet button
        Then Reown AppKit modal should appear within 500ms
        And wallet icons should load progressively
        And modal should be fully interactive within 1 second

    Scenario: Wallet detection speed
        Given I have MetaMask extension installed
        When AppKit modal opens
        Then MetaMask should be detected immediately
        And "Detected" badge should appear within 1 second
        And wallet should be prioritized in the list

    Scenario: Background wallet scanning
        Given AppKit modal is open
        When scanning for available wallets
        Then wallet detection should happen in background
        And UI should remain responsive during scanning
        And newly detected wallets should appear dynamically

    # Memory Management Scenarios
    Scenario: Efficient memory usage
        Given I connect and disconnect wallet multiple times
        When I check browser memory usage
        Then memory should not continuously increase
        And previous connections should be garbage collected
        And no memory leaks should occur

    Scenario: Modal cleanup on close
        Given Reown AppKit modal is open
        When I close the modal without connecting
        Then all modal resources should be cleaned up
        And event listeners should be removed
        And background processes should stop

    # User Experience Scenarios
    Scenario: Responsive design trên mobile
        Given I am using mobile device
        When I open connect wallet modal
        Then modal should fit screen properly
        And buttons should be easily tappable
        And scrolling should be smooth

    Scenario: Keyboard navigation support
        Given I prefer keyboard navigation
        When connect wallet modal opens
        Then I should be able to navigate with Tab key
        And I should be able to select wallets with Enter
        And I should be able to close with Escape key

    Scenario: Screen reader accessibility
        Given I am using screen reader
        When I interact with wallet connection
        Then all elements should have proper ARIA labels
        And connection status should be announced
        And error messages should be accessible

    # Caching và Persistence Scenarios
    Scenario: Wallet preference caching
        Given I previously connected with MetaMask
        When I visit the dApp again
        Then MetaMask should be suggested first
        And my previous choice should be remembered
        And connection should be faster due to caching

    Scenario: Connection state persistence
        Given I am connected with MetaMask
        When I refresh the page
        Then connection should restore within 2 seconds
        And I should not see loading state for long
        And wallet data should be cached locally

    Scenario: Offline connection handling
        Given I lose internet connection
        When I try to connect wallet
        Then I should see "No internet connection" message
        And cached wallet data should still be available
        And connection should resume when back online

    # Error Recovery Performance
    Scenario: Quick error recovery
        Given wallet connection encounters error
        When error occurs
        Then error message should appear within 1 second
        And recovery options should be immediately available
        And I should not wait long for retry capability

    Scenario: Graceful degradation
        Given some wallet features are unavailable
        When I connect my wallet
        Then basic functionality should still work
        And I should see clear indication of limitations
        And alternative options should be provided

    # Concurrent Connection Handling
    Scenario: Multiple simultaneous connection attempts
        Given I rapidly click different wallet options
        When multiple connections are attempted
        Then only the latest should be processed
        And previous attempts should be cancelled gracefully
        And UI should not freeze or become unresponsive

    Scenario: Connection queue management
        Given I attempt multiple wallet operations quickly
        When operations queue up
        Then they should be processed in order
        And each should complete before next starts
        And I should see progress for each operation

    # Network Performance Scenarios
    Scenario: Optimized RPC calls
        Given I am connected to Ethereum mainnet
        When wallet queries blockchain data
        Then RPC calls should be batched when possible
        And results should be cached appropriately
        And unnecessary calls should be avoided

    Scenario: Connection pooling
        Given multiple users connect simultaneously
        When AppKit manages connections
        Then connection pools should be efficiently used
        And resource usage should be optimized
        And performance should not degrade with load

    # Analytics và Monitoring
    Scenario: Connection performance tracking
        Given wallet connection completes
        When measuring performance metrics
        Then connection time should be logged
        And success rate should be tracked
        And performance data should be available for analysis

    Scenario: Error rate monitoring
        Given wallet connections fail occasionally
        When errors occur
        Then error rates should be monitored
        And common failure patterns should be identified
        And alerts should trigger for high error rates

    # Battery Optimization (Mobile)
    Scenario: Mobile battery efficiency
        Given I am using mobile device
        When wallet is connected
        Then background processes should be minimal
        And polling should be optimized
        And battery drain should be minimized

    Scenario: Background sync optimization
        Given app goes to background on mobile
        When wallet needs to sync data
        Then sync should be deferred until app is active
        And critical updates should use push notifications
        And unnecessary background activity should stop