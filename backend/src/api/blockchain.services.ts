// Functionality that calls blockchain

import { coupons } from "../services/blockchain.js";

export const blockchainService = {
  async mintCoupons(to: string, amount: bigint) {
    const tx = await coupons.mint(to, amount);
    return tx.wait(); // Confirmation
  },

  /// TODO: Must update with redemption logic
  async redeemCoupon(from: string, coupon_id: bigint) {
    const tx = await coupons.redeem(from, coupon_id);
    return tx.wait();
  },

  async transferCoupons(from: string, to: string, id: bigint, amount: bigint) {
    const tx = await coupons.safeTransferFrom(from, to, id, amount, "0x");
    return tx.wait();
  },

  async addIssuer(account: string) {
    const tx = await coupons.addIssuer(account);
    return tx.wait();
  },

  async transferBackend(from: string, to: string, id: bigint, amount: bigint) {
    const tx = await coupons.backendTransfer(from, to, id, amount);
    return tx.wait();
  },
  /// TODO: Just realised we cannot simply burn things without redeeming them.
};