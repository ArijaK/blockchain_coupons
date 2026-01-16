// Functionality that calls blockchain

import { coupons } from "../services/blockchain.js";

export const blockchainService = {
  mintCoupons(to: string, amount: bigint) {
    return coupons.mint(to, amount);
  },

  /// TODO: Must update with redemption logic
  redeemCoupon(coupon_id: bigint) {
    return coupons.redeem(coupon_id);
  }

  /// TODO: More logic?
};