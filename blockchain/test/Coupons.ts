import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Coupons", function () {
  it("Simple sanity-check that a contract can be deployed", async function () {
    const coupon = await ethers.deployContract("Coupons");

    expect(await coupon.couponIDCounter()).to.equal(0);
    
  });

});
