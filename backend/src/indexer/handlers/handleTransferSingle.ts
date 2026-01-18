import { db } from "../../services/database.js";
import { type TransferSingleEvent } from "../types.js";
import { ZeroAddress } from "ethers";

export async function handleTransferSingle(event: TransferSingleEvent) {
  const { operator, from, to, id, value } = event;

  const amount = Number(value);
  // Mint - coupon status: "active"
  if (from === ZeroAddress) {
    await db.query(
      `INSERT INTO coupon_types (token_id, amount, issuer_id)
        VALUES ($1, $2, $3);`,
      [id, value, to.toUpperCase()]
    );
    for (let i = 0; i < amount; i++) {
      await db.query(
        `INSERT INTO coupons (type_id, status, owner_id)
         VALUES ($1, $2, $3);`,
        [id, 1, to.toUpperCase()]
      );
    }
    return;
  }

  // Burn
  /// TODO: Where do I update retailer_id? (maybe just dump it for now?)
  if (to === ZeroAddress) {
    await db.query(
      `UPDATE coupons
        SET status = 3
        WHERE ctid IN (
          SELECT ctid
          FROM coupons
          WHERE owner_id = $1
            AND type_id = $2
            AND status = 1
          ORDER BY coupon_id
          LIMIT $3
        );`,
      [from.toUpperCase(), id, amount]
    );
    return;
  }

  // Transfer
  await db.query(
    `UPDATE coupons
      SET owner_id = $1
      WHERE ctid IN (
        SELECT ctid
        FROM coupons
        WHERE owner_id = $2
          AND type_id = $3
          AND status = 1
        ORDER BY coupon_id
        LIMIT $4
      );`,
    [to.toUpperCase(), from.toUpperCase(), id, amount]
  );
}
