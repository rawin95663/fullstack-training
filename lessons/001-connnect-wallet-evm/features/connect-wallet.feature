Feature: Connect Wallet with Reown AppKit

    As a web3 user
    I want to connect my wallet using Reown AppKit
    So that I can interact with dApps on the Ethereum network

    Background:
        Given I am on the lesson 1 page
        And Reown AppKit is initialized with the Ethereum network
        And the connect wallet button is visible

    Scenario: User connects wallet
        When the user clicks the connect wallet button
        And the user follows the instructions to connect the wallet using MetaMask, Safe Wallet, or WalletConnect
        Then the wallet is connected
        And the user can see the balance of the connected wallet