import { db } from "../../services/database.js";

// Coupon instances and types
export const couponsQueries = {
  async findByID(id: bigint) {
    const result = await db.query(
      "SELECT * FROM coupons WHERE coupon_id = $1;",
      [id]
    );
    return result.rows[0];
  },

  async findByIDDetailed(id: bigint) {
    const result = await db.query(
      `SELECT ci.*, ct.valid_from, ct.valid_to
        FROM coupons ci
        JOIN coupon_types ct ON ci.type_id = ct.token_id
        WHERE ci.coupon_id = $1;`,
      [id]
    );
    return result.rows[0];
  },
  
  async findByOwner(address: string) {
    const r = await db.query(
      "SELECT * FROM coupons WHERE owner_id = $1;",
      [address.toUpperCase()]
    );
    return r.rows;
  },

  async findByIssuer(address: string) {
    const r = await db.query(
      "SELECT * FROM coupon_types WHERE issuer_id = $1;",
      [address.toUpperCase()]
    );
    return r.rows;
  }
}