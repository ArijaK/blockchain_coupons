// Functionality that calls database

import { couponsQueries } from "./database.queries.js";

export const couponsService = {
  getCouponByID(id: bigint) {
    return couponsQueries.findByID(id);
  },

  getCouponsByOwner(address: string) {
    return couponsQueries.findByOwner(address);
  },

  getCouponsByIssuer(address: string) {
    return couponsQueries.findByIssuer(address);
  }
};
