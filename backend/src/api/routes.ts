// Endpoint definition

import type { FastifyInstance } from "fastify";
import { couponsController } from "./database/database.controllers.js";
import { blockchainController } from "./blockchain/blockchain.controllers.js";

export async function couponsRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", couponsController.getCoupon);
  fastify.get("/user/:address", couponsController.getCouponsByOwner);
  fastify.get("/user/created/:address", couponsController.getCouponsByIssuer);
}

export async function blockchainRoutes(fastify: FastifyInstance) {
  fastify.post("/mint", blockchainController.mintCoupon);
  fastify.post("/redeem", blockchainController.redeemCoupon);
  fastify.post("/user-transfer", blockchainController.transferCoupon);
  fastify.post("/issuer-add", blockchainController.addIssuer);
  fastify.post("/transfer", blockchainController.backendTransfer);
}