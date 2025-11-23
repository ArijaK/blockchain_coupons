// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// msg.sender for Ownable makes the deployer the owner
contract Coupon1155 is ERC1155, Ownable(msg.sender) {
    // Voucher type (maximum 2^256 types possible)
    // NOTE: Let's hope we wont have more than (1x10^77) coupon types created
    uint256 public couponIDCounter;

    // Lookup table to check who is issuer
    mapping(address => bool) public isIssuer;

    // In "https://" we can write where metadata come from (URI)
    constructor() ERC1155("") {
        // Contract deployer is automatically an issuer
        isIssuer[msg.sender] = true;
    }

    // Grant issuer rights (only owner can assign)
    function addIssuer(address account) external onlyOwner {
        isIssuer[account] = true;
    }
    
    // Issuers can create (mint) new coupons
    // TODO: Add expiry date (uint256 expiryTimestamp)
    // require(expiryTimestamp > block.timestamp, "Expiry must be in future");
    // couponExpiry[couponId] = expiryTimestamp;
    // Lookup table: mapping(uint256 => uint256) public couponExpiry;
    // Redemption: require(block.timestamp <= couponExpiry[couponId], "Coupon expired");
    function mint(address to, uint256 amount) external {
        require(isIssuer[msg.sender], "Not authorized to create (mint) coupons");

        uint256 couponID = ++couponIDCounter;
        // In "" metadata can be added (see constructor)
        _mint(to, couponID, amount, "");
    }

    // Everyone can distribute coupons (without QR code option)
    // NOTE: If you want to restrict distribution
    // function distribute(
    //     address from, address to, 
    //     uint256 couponID, uint256 amount
    // ) external {
    //     require(isIssuer[msg.sender], "Not authorized to distribute");
    //     safeTransferFrom(from, to, couponID, amount, "");
    // }

    // NOTE: We can add burning when expiry date is reached

    // Redemption (burning)
    function redeem(uint256 couponID, uint256 amount) external {
        // NOTE: Removes from circulation, does not destroy ID
        // If there were 100 such coupons and 1 was burned,
        // only 99 will remain in circulation (1 will be unusable anymore)
        // If there was 1 such coupon and 1 was burned,
        // no more will remain, but the ID will still exist
        _burn(msg.sender, couponID, amount);
        // TODO: Add redemption logic here
        // (simple burning is just a placeholder for start)
    }
}