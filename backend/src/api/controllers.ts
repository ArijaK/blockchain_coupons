// Handle call services

import type { FastifyReply, FastifyRequest } from "fastify";
import { couponsService } from "./database.services.js";
import { blockchainService } from "./blockchain.services.js";

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

export const blockchainController = {
  async mintCoupon(req: FastifyRequest, reply: FastifyReply) {
    const { to, amount } = req.body as {
      to: string;
      amount: bigint;
    };

    const tx = await blockchainService.mintCoupons(to, amount);
    return reply.send({ txHash: tx?.hash });
  },

  async redeemCoupon(req: FastifyRequest, reply: FastifyReply) {
    const { coupon_id } = req.body as { coupon_id: string };

    const tx = await blockchainService.redeemCoupon(BigInt(coupon_id));
    return reply.send({ txHash: tx?.hash });
  },

  async transferCoupon(req: FastifyRequest, reply: FastifyReply) {
    const { from, to, id, amount } = req.body as {
      from: string;
      to: string;
      id: string;
      amount: bigint;
    };

    const tx = await blockchainService.transferCoupons(from, to, BigInt(id), amount);
    return reply.send({ txHash: tx?.hash });
  },

  async addIssuer(req: FastifyRequest, reply: FastifyReply) {
    const { account } = req.body as { account: string };

    const tx = await blockchainService.addIssuer(account);
    return reply.send({ txHash: tx?.hash });
  }

}