// Endpoint definition

import type { FastifyInstance } from "fastify";
import { couponsController } from "./database/database.controllers.js";
import { blockchainController } from "./blockchain/blockchain.controllers.js";
import { interController } from "./controllers.js";

export async function couponsRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", couponsController.getCoupon);
  fastify.get("/user/:address", couponsController.getCouponsByOwner);
  fastify.get("/user/created/:address", couponsController.getCouponsByIssuer);
}

// TODO: maybe later delete some of these
export async function blockchainRoutes(fastify: FastifyInstance) {
  fastify.post("/mint", blockchainController.mintCoupon);
  fastify.post("/redeem", blockchainController.redeemCoupon);
  fastify.post("/user-transfer", blockchainController.transferCoupon);
  fastify.post("/issuer-add", blockchainController.addIssuer);
  fastify.post("/transfer", blockchainController.backendTransfer);
}

export async function intraRoutes(fastify: FastifyInstance) {
  fastify.post("/issuer-add", interController.addIssuer);
}