// Database queries
import { db } from "../services/database.js";

// Coupon instances
export const couponsQueries = {
  findByID(id: bigint) {
    return db.query(
      "SELECT * FROM coupons WHERE coupon_id = $1",
      [id]
    ).then(r => r.rows[0]);
  },
  
  findByOwner(address: string) {
    return db.query(
      "SELECT * FROM coupons WHERE owner_id = $1",
      [address]
    ).then(r => r.rows);
  }
}
