import { db } from "../services/database.js";
import type { AddIssuerRow } from "./database.interfaces.js";

/// Data updates from frontend calls
export const interQueries = {
  async addIssuer(data: AddIssuerRow) {
    await db.query(
      `INSERT INTO issuers (account_id, issuer_name, email, phone, country, city, address, postal_code, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      [data.account_id, data.issuer_name, data.email, data.phone, 
        data.country, data.city, data.address, data.postal_code, data.description]
    );
  }
}