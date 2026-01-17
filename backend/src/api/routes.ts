// Endpoint definition

import type { FastifyInstance } from "fastify";
import { couponsController } from "./controllers.js";

export default async function couponsRoutes(fastify: FastifyInstance) {
  fastify.get("/:id", couponsController.getCoupon);
  fastify.get("/user/:address", couponsController.getCouponsByOwner);
}

// export default async function blockchainRoutes(fastify) {
//   /// TODO!!!
//   fastify.post("/blockchain/mint", todo);
//   fastify.post("/blockchain/return", todo);
//   fastify.post("/blockchain/destroy", todo);
// }