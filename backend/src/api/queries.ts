// Database queries
import { db } from "../services/database.js";

// Coupon instances and types
export const couponsQueries = {
  async findByID(id: bigint) {
    return db.query(
      "SELECT * FROM coupons WHERE coupon_id = $1",
      [id]
    ).then(r => r.rows[0]);
  },
  
  async findByOwner(address: string) {
    const r = await db.query(
      "SELECT * FROM coupons WHERE owner_id = $1",
      [address]
    );
    return r.rows;
  },

  async findByIssuer(address: string) {
    const r = await db.query(
      "SELECT * FROM coupon_types WHERE issuer_id = $1",
      [address]
    );
    return r.rows;
  }
}