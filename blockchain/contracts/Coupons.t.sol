// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Coupon1155} from "./Coupons.sol";
import {Test} from "forge-std/Test.sol";

contract Coupon1155Test is Test {
  Coupon1155 coupon;
  address owner;
  address issuer;
  address other;

  function setUp() public {
    owner = address(1);
    issuer = address(2);
    other = address(3);
    
    vm.prank(owner); // Who does it
    coupon = new Coupon1155();
  }

  function test_IssuerRights() public {
    vm.prank(owner);
    coupon.addIssuer(issuer);

    // Only owner can grant issuer rights
    vm.prank(issuer);
    vm.expectRevert();
    coupon.addIssuer(other);
  }

  function test_Minting() public {
    vm.prank(owner);
    coupon.addIssuer(issuer);
    
    vm.prank(issuer);
    coupon.mint(issuer, 10);

    // Only issuer can mint coupons
    vm.prank(other);
    vm.expectRevert();
    coupon.mint(other, 10);
  }

  function test_Transactions() public {
    // Owner is an issuer too!
    vm.prank(owner);
    coupon.mint(owner, 10);

    // Check balance
    emit log_uint(coupon.balanceOf(owner, 1));
    emit log_uint(coupon.balanceOf(other, 1));

    // Transfer 5 coupons from owner to other
    vm.prank(owner);
    coupon.safeTransferFrom(owner, other, 1, 5, "");

    emit log_uint(coupon.balanceOf(owner, 1));
    emit log_uint(coupon.balanceOf(other, 1));
  }
}
