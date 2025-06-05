// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {CBKToken} from "../src/CBKToken.sol";

/**
 * @title CBKTokenTest
 * @dev Comprehensive test suite for CBKToken contract
 */
contract CBKTokenTest is Test {
    CBKToken public token;

    // Test addresses
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);
    address public user3 = address(0x4);

    // Constants
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;
    uint256 public constant INITIAL_BALANCE = 1000 * 10 ** 18;

    // Events to test
    event Transfer(address indexed from, address indexed to, uint256 value);
    event TokensMinted(address indexed to, uint256 amount);

    function setUp() public {
        // Deploy contract with owner address
        vm.prank(owner);
        token = new CBKToken(owner);

        console.log("=== Setup completed ===");
        console.log("Token deployed at:", address(token));
        console.log("Owner:", owner);
        console.log("Total Supply:", token.totalSupply());
    }

    // ========== DEPLOYMENT TESTS ==========

    function test_Deployment() public view {
        // Check basic information
        assertEq(token.name(), "CBK Token");
        assertEq(token.symbol(), "CBK");
        assertEq(token.decimals(), 18);
        assertEq(token.totalSupply(), MAX_SUPPLY);
        assertEq(token.MAX_SUPPLY(), MAX_SUPPLY);
        assertEq(token.owner(), owner);

        // Check owner has entire initial supply
        assertEq(token.balanceOf(owner), MAX_SUPPLY);
    }

    function test_GetTokenInfo() public view {
        (
            string memory name,
            string memory symbol,
            uint8 decimals,
            uint256 totalSupply,
            uint256 maxSupply
        ) = token.getTokenInfo();

        assertEq(name, "CBK Token");
        assertEq(symbol, "CBK");
        assertEq(decimals, 18);
        assertEq(totalSupply, MAX_SUPPLY);
        assertEq(maxSupply, MAX_SUPPLY);
    }

    // ========== TRANSFER TESTS ==========

    function test_Transfer() public {
        uint256 transferAmount = 1000 * 10 ** 18;

        vm.prank(owner);
        bool success = token.transfer(user1, transferAmount);

        assertTrue(success);
        assertEq(token.balanceOf(user1), transferAmount);
        assertEq(token.balanceOf(owner), MAX_SUPPLY - transferAmount);
    }

    function test_TransferFrom() public {
        uint256 transferAmount = 1000 * 10 ** 18;
        uint256 allowanceAmount = 2000 * 10 ** 18;

        // Owner approve for user1
        vm.prank(owner);
        token.approve(user1, allowanceAmount);

        // user1 transfer from owner to user2
        vm.prank(user1);
        bool success = token.transferFrom(owner, user2, transferAmount);

        assertTrue(success);
        assertEq(token.balanceOf(user2), transferAmount);
        assertEq(token.balanceOf(owner), MAX_SUPPLY - transferAmount);
        assertEq(
            token.allowance(owner, user1),
            allowanceAmount - transferAmount
        );
    }

    function test_TransferFailsWithInsufficientBalance() public {
        uint256 transferAmount = MAX_SUPPLY + 1;

        vm.prank(owner);
        vm.expectRevert();
        token.transfer(user1, transferAmount);
    }

    function test_TransferFailsToZeroAddress() public {
        uint256 transferAmount = 1000 * 10 ** 18;

        vm.prank(owner);
        vm.expectRevert();
        token.transfer(address(0), transferAmount);
    }

    // ========== APPROVAL TESTS ==========

    function test_Approve() public {
        uint256 approvalAmount = 1000 * 10 ** 18;

        vm.prank(owner);
        bool success = token.approve(user1, approvalAmount);

        assertTrue(success);
        assertEq(token.allowance(owner, user1), approvalAmount);
    }

    function test_ApproveOverride() public {
        uint256 initialAmount = 1000 * 10 ** 18;
        uint256 newAmount = 1500 * 10 ** 18;

        vm.startPrank(owner);
        token.approve(user1, initialAmount);
        assertEq(token.allowance(owner, user1), initialAmount);

        // Override approval with new amount
        bool success = token.approve(user1, newAmount);
        vm.stopPrank();

        assertTrue(success);
        assertEq(token.allowance(owner, user1), newAmount);
    }

    // ========== MINT TESTS ==========

    function test_MintFailsMaxSupplyReached() public {
        // Already minted MAX_SUPPLY in constructor
        uint256 mintAmount = 1 * 10 ** 18;

        vm.prank(owner);
        vm.expectRevert("CBKToken: exceeds maximum supply");
        token.mint(user1, mintAmount);
    }

    function test_MintFailsNotOwner() public {
        uint256 mintAmount = 1000 * 10 ** 18;

        vm.prank(user1);
        vm.expectRevert();
        token.mint(user2, mintAmount);
    }

    function test_MintFailsZeroAddress() public {
        uint256 mintAmount = 1000 * 10 ** 18;

        vm.prank(owner);
        vm.expectRevert("CBKToken: mint to zero address");
        token.mint(address(0), mintAmount);
    }

    function test_MintFailsZeroAmount() public {
        vm.prank(owner);
        vm.expectRevert("CBKToken: mint amount must be greater than 0");
        token.mint(user1, 0);
    }

    // Test mint when supply is available (simulate by burning first)
    function test_MintSuccessAfterBurn() public {
        uint256 burnAmount = 1000 * 10 ** 18;
        uint256 mintAmount = 500 * 10 ** 18;

        // Burn part of supply
        vm.prank(owner);
        token.burn(burnAmount);

        uint256 totalSupplyAfterBurn = token.totalSupply();

        // Mint back part of supply
        vm.prank(owner);
        vm.expectEmit(true, false, false, true);
        emit TokensMinted(user1, mintAmount);
        token.mint(user1, mintAmount);

        assertEq(token.balanceOf(user1), mintAmount);
        assertEq(token.totalSupply(), totalSupplyAfterBurn + mintAmount);
    }

    // ========== BURN TESTS ==========

    function test_Burn() public {
        uint256 burnAmount = 1000 * 10 ** 18;
        uint256 initialSupply = token.totalSupply();
        uint256 initialBalance = token.balanceOf(owner);

        vm.prank(owner);
        token.burn(burnAmount);

        assertEq(token.totalSupply(), initialSupply - burnAmount);
        assertEq(token.balanceOf(owner), initialBalance - burnAmount);
    }

    function test_BurnFrom() public {
        uint256 burnAmount = 1000 * 10 ** 18;
        uint256 allowanceAmount = 2000 * 10 ** 18;
        uint256 initialSupply = token.totalSupply();

        // Transfer some tokens to user1 first
        vm.prank(owner);
        token.transfer(user1, burnAmount);

        // user1 approve user2 to burn their tokens
        vm.prank(user1);
        token.approve(user2, allowanceAmount);

        // user2 burns user1's tokens
        vm.prank(user2);
        token.burnFrom(user1, burnAmount);

        assertEq(token.totalSupply(), initialSupply - burnAmount);
        assertEq(token.balanceOf(user1), 0);
        assertEq(token.allowance(user1, user2), allowanceAmount - burnAmount);
    }

    function test_BurnFailsInsufficientBalance() public {
        uint256 burnAmount = MAX_SUPPLY + 1;

        vm.prank(owner);
        vm.expectRevert();
        token.burn(burnAmount);
    }

    // ========== BATCH TRANSFER TESTS ==========

    function test_BatchTransfer() public {
        address[] memory recipients = new address[](3);
        recipients[0] = user1;
        recipients[1] = user2;
        recipients[2] = user3;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 1000 * 10 ** 18;
        amounts[1] = 2000 * 10 ** 18;
        amounts[2] = 3000 * 10 ** 18;

        uint256 totalTransfer = amounts[0] + amounts[1] + amounts[2];
        uint256 initialBalance = token.balanceOf(owner);

        vm.prank(owner);
        token.batchTransfer(recipients, amounts);

        assertEq(token.balanceOf(user1), amounts[0]);
        assertEq(token.balanceOf(user2), amounts[1]);
        assertEq(token.balanceOf(user3), amounts[2]);
        assertEq(token.balanceOf(owner), initialBalance - totalTransfer);
    }

    function test_BatchTransferFailsArrayLengthMismatch() public {
        address[] memory recipients = new address[](2);
        recipients[0] = user1;
        recipients[1] = user2;

        uint256[] memory amounts = new uint256[](3);
        amounts[0] = 1000 * 10 ** 18;
        amounts[1] = 2000 * 10 ** 18;
        amounts[2] = 3000 * 10 ** 18;

        vm.prank(owner);
        vm.expectRevert("CBKToken: arrays length mismatch");
        token.batchTransfer(recipients, amounts);
    }

    function test_BatchTransferFailsEmptyArrays() public {
        address[] memory recipients = new address[](0);
        uint256[] memory amounts = new uint256[](0);

        vm.prank(owner);
        vm.expectRevert("CBKToken: empty arrays");
        token.batchTransfer(recipients, amounts);
    }

    function test_BatchTransferFailsZeroAddress() public {
        address[] memory recipients = new address[](2);
        recipients[0] = user1;
        recipients[1] = address(0); // Zero address

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1000 * 10 ** 18;
        amounts[1] = 2000 * 10 ** 18;

        vm.prank(owner);
        vm.expectRevert("CBKToken: transfer to zero address");
        token.batchTransfer(recipients, amounts);
    }

    function test_BatchTransferFailsZeroAmount() public {
        address[] memory recipients = new address[](2);
        recipients[0] = user1;
        recipients[1] = user2;

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1000 * 10 ** 18;
        amounts[1] = 0; // Zero amount

        vm.prank(owner);
        vm.expectRevert("CBKToken: transfer amount must be greater than 0");
        token.batchTransfer(recipients, amounts);
    }

    // ========== OWNERSHIP TESTS ==========

    function test_TransferOwnership() public {
        vm.prank(owner);
        token.transferOwnership(user1);

        assertEq(token.owner(), user1);
    }

    function test_TransferOwnershipFailsNotOwner() public {
        vm.prank(user1);
        vm.expectRevert();
        token.transferOwnership(user2);
    }

    // ========== FUZZ TESTS ==========

    function testFuzz_Transfer(uint256 amount) public {
        // Bound amount to valid range
        amount = bound(amount, 0, MAX_SUPPLY);

        if (amount > 0) {
            vm.prank(owner);
            bool success = token.transfer(user1, amount);
            assertTrue(success);
            assertEq(token.balanceOf(user1), amount);
        }
    }

    function testFuzz_Approve(uint256 amount) public {
        // Test with any amount (no upper bound for approval)
        vm.prank(owner);
        bool success = token.approve(user1, amount);
        assertTrue(success);
        assertEq(token.allowance(owner, user1), amount);
    }

    // ========== PERMIT TESTS (EIP-2612) ==========

    function test_Permit() public {
        uint256 ownerPrivateKey = 0x123;
        address tokenOwner = vm.addr(ownerPrivateKey);
        uint256 spenderAmount = 1000 * 10 ** 18;

        // Deploy new token with different owner for permit test
        vm.prank(tokenOwner);
        CBKToken permitToken = new CBKToken(tokenOwner);

        uint256 deadline = block.timestamp + 1 hours;
        uint256 nonce = permitToken.nonces(tokenOwner);

        // Create permit signature
        bytes32 structHash = keccak256(
            abi.encode(
                keccak256(
                    "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"
                ),
                tokenOwner,
                user1,
                spenderAmount,
                nonce,
                deadline
            )
        );

        bytes32 hash = keccak256(
            abi.encodePacked(
                "\x19\x01",
                permitToken.DOMAIN_SEPARATOR(),
                structHash
            )
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerPrivateKey, hash);

        // Execute permit
        permitToken.permit(tokenOwner, user1, spenderAmount, deadline, v, r, s);

        assertEq(permitToken.allowance(tokenOwner, user1), spenderAmount);
        assertEq(permitToken.nonces(tokenOwner), nonce + 1);
    }

    // ========== HELPER FUNCTIONS FOR TESTING ==========

    function _setupUsersWithTokens() internal {
        uint256 userBalance = 10000 * 10 ** 18;

        vm.startPrank(owner);
        token.transfer(user1, userBalance);
        token.transfer(user2, userBalance);
        token.transfer(user3, userBalance);
        vm.stopPrank();
    }

    // Test helper function
    function test_HelperSetupUsersWithTokens() public {
        _setupUsersWithTokens();

        uint256 expectedBalance = 10000 * 10 ** 18;
        assertEq(token.balanceOf(user1), expectedBalance);
        assertEq(token.balanceOf(user2), expectedBalance);
        assertEq(token.balanceOf(user3), expectedBalance);
    }
}
