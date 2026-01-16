// Handle call services
/// NOTE: Why JS --> to get rid of those annoying "any" type warnings before bedtime
/// May change to TypeScript later

import { couponsService } from "./database.services.js";

export const couponsController = {
  async getCoupon(req, reply) {
    const coupon = await couponsService.getCouponByID(req.params.id);
    return reply.send(coupon);
  },

  async getCouponsByOwner(req, reply) {
    const coupons = await couponsService.getCouponsByOwner(req.params.address);
    return reply.send(coupons);
  }
}
