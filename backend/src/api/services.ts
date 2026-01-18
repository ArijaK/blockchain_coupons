// Functionality that calls both blockchain and database

import { couponInputToRow, issuerInputToRow } from "./api-database-map.js";
import { blockchainService } from "./blockchain/blockchain.services.js";
import { couponsService } from "./database/database.services.js";
import type { AddCouponsInput, AddIssuerInput } from "./interfaces.js";
import { interQueries, waitForCouponMint } from "./queries.js";

export const interServices = {

  async addIssuer(data: AddIssuerInput) {
    const tx = await blockchainService.addIssuer(data.account);

    // If transaction was successful
    if (tx != null) {
      const row = issuerInputToRow(data);
      await interQueries.addIssuer(row);
    }

    return tx;
  },

  async addCoupons(data: AddCouponsInput) {
    const tx = await blockchainService.mintCoupons(data.issuer, BigInt(data.amount));

    if (tx != null) {
      // Wait for indexer to insert the DB row
      const mintedRow = await waitForCouponMint(data.issuer, BigInt(data.amount));
      
      const tokenID = mintedRow.token_id;

      // Update metadata
      const row = couponInputToRow(data, tokenID);
      await interQueries.updateCouponType(row);
      await interQueries.addRetailer(tokenID, data.retailers);
    }
    
    return tx;
  }

  
}
