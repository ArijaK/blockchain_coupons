// Functionality that calls both blockchain and database

import { issuerInputToRow } from "./api-database-map.js";
import { blockchainService } from "./blockchain/blockchain.services.js";
import { couponsService } from "./database/database.services.js";
import type { AddIssuerInput } from "./interfaces.js";
import { interQueries } from "./queries.js";

export const interServices = {

  async addIssuer(data: AddIssuerInput) {
    const tx = await blockchainService.addIssuer(data.account);

    // If transaction was successful
    if (tx != null) {
      const row = issuerInputToRow(data);
      await interQueries.addIssuer(row);
    }

    return tx;
  }

  
}
