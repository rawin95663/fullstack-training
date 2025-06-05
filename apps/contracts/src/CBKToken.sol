// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/**
 * @title CBKToken
 * @dev ERC20 Token with features:
 * - Fixed supply: 1,000,000 CBK
 * - Burnable tokens
 * - Pausable transactions
 * - Only owner can mint additional tokens
 * - Supports EIP-2612 permit
 */
contract CBKToken is ERC20, Ownable, ERC20Permit, ERC20Burnable {
    // Maximum supply: 1 million tokens (18 decimals)
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;

    // Event emitted when tokens are minted
    event TokensMinted(address indexed to, uint256 amount);

    /**
     * @dev Constructor
     * @param initialOwner Address that will become owner of the contract
     */
    constructor(
        address initialOwner
    ) ERC20("CBK Token", "CBK") Ownable(initialOwner) ERC20Permit("CBK Token") {
        // Mint entire supply to owner
        _mint(initialOwner, MAX_SUPPLY);
        emit TokensMinted(initialOwner, MAX_SUPPLY);
    }

    /**
     * @dev Mint additional tokens (only owner)
     * @param to Address to receive tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "CBKToken: mint to zero address");
        require(amount > 0, "CBKToken: mint amount must be greater than 0");
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "CBKToken: exceeds maximum supply"
        );

        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Get token information
     * @return _name Token name
     * @return _symbol Token symbol
     * @return _decimals Number of decimals
     * @return _totalSupply Current total supply
     * @return _maxSupply Maximum total supply
     */
    function getTokenInfo()
        public
        view
        returns (
            string memory _name,
            string memory _symbol,
            uint8 _decimals,
            uint256 _totalSupply,
            uint256 _maxSupply
        )
    {
        return (name(), symbol(), decimals(), totalSupply(), MAX_SUPPLY);
    }

    /**
     * @dev Transfer large amount of tokens to multiple addresses (batch transfer)
     * @param recipients List of recipient addresses
     * @param amounts List of corresponding token amounts
     */
    function batchTransfer(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external {
        require(
            recipients.length == amounts.length,
            "CBKToken: arrays length mismatch"
        );
        require(recipients.length > 0, "CBKToken: empty arrays");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(
                recipients[i] != address(0),
                "CBKToken: transfer to zero address"
            );
            require(
                amounts[i] > 0,
                "CBKToken: transfer amount must be greater than 0"
            );
            _transfer(msg.sender, recipients[i], amounts[i]);
        }
    }
}
