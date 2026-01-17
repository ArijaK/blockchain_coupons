import { db } from "../../services/database.js";
import { type TransferSingleEvent } from "../types.js";
import { ZeroAddress } from "ethers";

export async function handleTransferSingle(event: TransferSingleEvent) {
  const { operator, from, to, id, value } = event;

  const amount = Number(value);
  // Mint - coupon status: "active"
  if (from === ZeroAddress) {
    // TODO: Handle additional data (name) somewhere???
    await db.query(
      `INSERT INTO coupon_types (token_id, coupon_name, amount, issuer_id)
        VALUES ($1, 'TODO NAME', $2, $3);`,
      [id.toString(), 1, to]
    );
    for (let i = 0; i < amount; i++) {
      await db.query(
        `INSERT INTO coupons (type_id, status, owner_id)
         VALUES ($1, $2, $3)`,
        [id.toString(), 1, to]
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
       WHERE owner_id = $1 AND type_id = $2 AND status = 1
       LIMIT $3;`,
      [from, id.toString(), amount]
    );
    return;
  }

  // Transfer
  await db.query(
    `UPDATE coupons
     SET owner = $1
     WHERE owner = $2 AND token_id = $3 AND status = 1
     LIMIT $4;`,
    [to, from, id.toString(), amount]
  );
}
