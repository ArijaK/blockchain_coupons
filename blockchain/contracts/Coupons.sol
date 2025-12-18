// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// msg.sender for Ownable makes the deployer the owner
contract Coupon1155 is ERC1155, Ownable(msg.sender) {
    // Voucher type (maximum 2^256 types possible)
    // NOTE: Let's hope we wont have more than (1x10^77) coupon types created
    uint256 public couponIDCounter;

    // issuer and redeemer lists - for faster look up
    mapping(address => bool) public isAllowedRedeemer;
    mapping(address => bool) public isIssuer;

    // Track redemption for each unit of each coupon (unique id inside of each couponID)
    mapping(uint256 => mapping(uint256 => bool)) public unitRedeemed;

    // Tracks all unitIDs for a couponID
    mapping(uint256 => uint256[]) public couponUnitIDs;

    // Next unitID to assign for each couponID
    mapping(uint256 => uint256) public nextUnitID;

    // In "https://" we can write where metadata come from (URI)
    constructor() ERC1155("") {
        // Contract deployer is automatically an issuer
        isIssuer[msg.sender] = true;
    }

    // Grant issuer rights (only owner can assign)
    function addIssuer(address account) external onlyOwner {
        isIssuer[account] = true;
    }

    // Create redeemers list
    function addRedeemers(address[] memory redeemers) public {
        for (uint256 i = 0; i < redeemers.length; i++) {
            isAllowedRedeemer[redeemers[i]] = true;
        }
    }

    // Issuers can create (mint) new coupons
    // TODO: Add expiry date (uint256 expiryTimestamp)
    // require(expiryTimestamp > block.timestamp, "Expiry must be in future");
    // couponExpiry[couponId] = expiryTimestamp;
    // Lookup table: mapping(uint256 => uint256) public couponExpiry;
    // Redemption: require(block.timestamp <= couponExpiry[couponId], "Coupon expired");
    function mint(address to, uint256 amount) external {
        require(
            isIssuer[msg.sender],
            "Not authorized to create (mint) coupons"
        );

        uint256 couponID = ++couponIDCounter;
        // In "" metadata can be added (see constructor)
        _mint(to, couponID, amount, "");
        // Assign unitIDs
        uint256 startUnitID = nextUnitID[couponID] + 1;
        for (uint256 i = 0; i < amount; i++) {
            uint256 unitID = startUnitID + i;
            couponUnitIDs[couponID].push(unitID);
            unitRedeemed[couponID][unitID] = false; // initially unredeemed
        }
        nextUnitID[couponID] = startUnitID + amount - 1;
    }

    function getUnitIDs(
        uint256 couponID
    ) public view returns (uint256[] memory) {
        return couponUnitIDs[couponID];
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
    function redeem(uint256 couponID, uint256 unitID) external {
        // NOTE: Removes from circulation, does not destroy ID
        // If there were 100 such coupons and 1 was burned,
        // only 99 will remain in circulation (1 will be unusable anymore)
        // If there was 1 such coupon and 1 was burned,
        // no more will remain, but the ID will still exist

        // only authorized redeemers can redeem
        require(
            isAllowedRedeemer[msg.sender],
            "Not authorized to redeem coupon."
        );
        require(!unitRedeemed[couponID][unitID], "Unit already redeemed");
        require(balanceOf(msg.sender, couponID) > 0, "No tokens to redeem");

        _burn(msg.sender, couponID, 1);
        unitRedeemed[couponID][unitID] = true;
    }
}
