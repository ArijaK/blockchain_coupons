import type { FastifyReply, FastifyRequest } from "fastify";
import { blockchainService } from "./blockchain.services.js";

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
    const { from, coupon_id } = req.body as {
      from: string;
      coupon_id: string
    };

    const tx = await blockchainService.redeemCoupon(from, BigInt(coupon_id));
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
  },

  async backendTransfer(req: FastifyRequest, reply: FastifyReply) {
    const { from, to, id, amount } = req.body as {
      from: string;
      to: string;
      id: string;
      amount: bigint;
    };

    const tx = await blockchainService.transferBackend(from, to, BigInt(id), amount);
    return reply.send({ txHash: tx?.hash });
  }
}