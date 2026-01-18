// Handle call services

import type { FastifyReply, FastifyRequest } from "fastify";
import type { AddCouponsInput, AddIssuerInput } from "./interfaces.js";
import { interServices } from "./services.js";

export const interController = {

  async addIssuer(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as AddIssuerInput;

    const tx = await interServices.addIssuer(data);
    return reply.send({ txHash: tx?.hash });
  },

  async createCoupons(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as AddCouponsInput;

    const tx = await interServices.addCoupons(data);
    return reply.send({ txHash: tx?.hash });
  }
}