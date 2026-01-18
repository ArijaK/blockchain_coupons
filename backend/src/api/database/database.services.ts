// Functionality that calls database

import { couponsQueries } from "./database.queries.js";

export const couponsService = {
  getCouponByID(id: bigint) {
    return couponsQueries.findByID(id);
  },

  getCouponByIDDetailed(id: bigint) {
    return couponsQueries.findByIDDetailed(id);
  },

  getCouponsByOwner(address: string) {
    return couponsQueries.findByOwner(address);
  },

  getCouponsByIssuer(address: string) {
    return couponsQueries.findByIssuer(address);
  }
};
