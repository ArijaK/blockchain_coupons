import type { FastifyReply, FastifyRequest } from "fastify";
import { couponsService } from "./database.services.js";

export const couponsController = {
  async getCoupon(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const coupon = await couponsService.getCouponByID(BigInt(id));
    return reply.send(coupon);
  },

  async getCouponsByOwner(req: FastifyRequest, reply: FastifyReply) {
    const { address } = req.params as { address: string };
    const coupons = await couponsService.getCouponsByOwner(address);
    return reply.send(coupons);
  },

  async getCouponsByIssuer(req: FastifyRequest, reply: FastifyReply) {
    const { address } = req.params as { address: string };
    const coupons = await couponsService.getCouponsByIssuer(address);
    return reply.send(coupons);
  }
}