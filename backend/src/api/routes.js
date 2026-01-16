// Endpoint definition
/// NOTE: Why JS? The same reason as controller.js

import { couponsController } from "./controllers";

export default async function couponsRoutes(fastify) {
  fastify.get("/coupons/:id", couponsController.getCoupon);
  fastify.get("/coupons/user/:address", couponsController.getCouponsByOwner);
}

export default async function blockchainRoutes(fastify) {
  /// TODO!!!
  fastify.post("/blockchain/mint", todo);
  fastify.post("/blockchain/return", todo);
  fastify.post("/blockchain/destroy", todo);
}
