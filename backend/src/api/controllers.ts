// Handle call services

import type { FastifyReply, FastifyRequest } from "fastify";
import type { AddIssuerInput } from "./interfaces.js";
import { interServices } from "./services.js";

export const interController = {

  async addIssuer(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as AddIssuerInput;

    const tx = await interServices.addIssuer(data);
    return reply.send({ txHash: tx?.hash });
  }
}