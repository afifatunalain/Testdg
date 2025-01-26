// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PumpfunToken is ERC20, Ownable, Pausable, ReentrancyGuard {
    uint256 private constant INITIAL_SUPPLY = 1000000 * (10 ** 18); // 1 million tokens
    uint256 public maxTransactionAmount;
    mapping(address => bool) public blacklisted;
    
    constructor() ERC20("Pumpfun Token", "PUMP") {
        _mint(msg.sender, INITIAL_SUPPLY);
        maxTransactionAmount = INITIAL_SUPPLY;
    }

    // Core functions
    function transfer(address recipient, uint256 amount) 
        public 
        override 
        whenNotPaused 
        nonReentrant 
        returns (bool) 
    {
        require(!blacklisted[msg.sender], "Sender is blacklisted");
        require(!blacklisted[recipient], "Recipient is blacklisted");
        require(amount <= maxTransactionAmount, "Amount exceeds transaction limit");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount)
        public
        override
        whenNotPaused
        nonReentrant
        returns (bool)
    {
        require(!blacklisted[sender], "Sender is blacklisted");
        require(!blacklisted[recipient], "Recipient is blacklisted");
        require(amount <= maxTransactionAmount, "Amount exceeds transaction limit");
        return super.transferFrom(sender, recipient, amount);
    }

    // Owner functions
    function setMaxTransactionAmount(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        maxTransactionAmount = amount;
    }

    function blacklistAddress(address account, bool value) external onlyOwner {
        blacklisted[account] = value;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Emergency functions
    function e
