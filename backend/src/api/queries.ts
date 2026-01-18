import { db } from "../services/database.js";
import type { AddCouponRow, AddIssuerRow } from "./database.interfaces.js";

/// Data updates from frontend calls
export const interQueries = {
  async addIssuer(data: AddIssuerRow) {
    await db.query(
      `INSERT INTO issuers (account_id, issuer_name, email, phone, country, city, address, postal_code, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [data.account_id.toUpperCase(), data.issuer_name, data.email, data.phone,
      data.country, data.city, data.address, data.postal_code, data.description]
    );
  },

  async updateCouponType(data: AddCouponRow) {
    await db.query(
      `UPDATE coupon_types 
      SET 
        coupon_name = $1,
        valid_from = $2,
        valid_to = $3,
        description = $4
      WHERE token_id = $5;`,
      [data.coupon_name, data.valid_from, data.valid_to, data.description, data.token_id]
    );
  },

  async addRetailer(coupon_type: string, retailers: string[]) {
    await Promise.all(
      retailers.map(retailer_id =>
        db.query(
          `INSERT INTO redemption_places (token_id, retailer_id)
            VALUES ($1, $2)`,
          [coupon_type, retailer_id.toUpperCase()]
        )
      )
    )
  }
}


/// Wait for indexer to update data
// NOTE: In the future should implement LISTEN/NOTIFY or other type logic
export async function waitForCouponMint(issuer: string, amount: bigint) {
  for (; ;) {
    const row = await db.query(
      `SELECT *
      FROM coupon_types
      WHERE issuer_id = $1
        AND amount = $2
      ORDER BY token_id DESC
      LIMIT 1;`,
      [issuer.toUpperCase(), amount]
    );

    if (row.rows.length > 0) {
      return row.rows[0];
    }

    await new Promise(r => setTimeout(r, 500)); // wait for 0.5 seconds
  }
}

