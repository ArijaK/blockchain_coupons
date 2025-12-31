// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Coupons} from "./Coupons.sol";
import {Test} from "forge-std/Test.sol";

contract CouponsTest is Test {
  Coupons coupon;
  address owner;
  address issuer;
  address other;

  function setUp() public {
    owner = address(1);
    issuer = address(2);
    other = address(3);
    
    vm.prank(owner); // Who does it
    coupon = new Coupons();
  }

  function test_IssuerRights() public {
    vm.prank(owner);
    coupon.addIssuer(issuer);

    // Only owner can grant issuer rights
    vm.prank(issuer);
    vm.expectRevert();
    coupon.addIssuer(other);
  }

  function test_MintingRights() public {
    vm.prank(owner);
    coupon.addIssuer(issuer);
    
    vm.prank(issuer);
    coupon.mint(issuer, 10);

    // Only issuer can mint coupons
    vm.prank(other);
    vm.expectRevert();
    coupon.mint(other, 10);
  }

  function test_Minting() public {
    // Owner is an issuer too!
    vm.prank(owner);
    coupon.mint(owner, 10);
    
    vm.assertEq(1, coupon.couponIDCounter());
  }

  function test_Transactions() public {
    // Owner is an issuer too!
    vm.prank(owner);
    coupon.mint(owner, 10);

    // Check balance
    vm.assertEq(10, coupon.balanceOf(owner, 1));
    vm.assertEq(0, coupon.balanceOf(other, 1));

    // Transfer 5 coupons from owner to other
    vm.prank(owner);
    coupon.safeTransferFrom(owner, other, 1, 5, "");

    vm.assertEq(5, coupon.balanceOf(owner, 1));
    vm.assertEq(5, coupon.balanceOf(other, 1));
  }
}
