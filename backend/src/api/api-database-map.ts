import type { AddCouponRow, AddIssuerRow } from "./database.interfaces.js";
import type { AddCouponsInput, AddIssuerInput } from "./interfaces.js";


export function issuerInputToRow(data: AddIssuerInput): AddIssuerRow {
  return {
    account_id: data.account,
    issuer_name: data.name,
    email: data.email,
    phone: data.phone,
    country: data.country,
    city: data.city,
    address: data.address,
    postal_code: data.postal_code,
    description: data.description
  };
}

// function CouponInputToRow(data: AddCouponsInput): AddCouponRow {
//   return {
//     token_id: 
//     coupon_name: string;
//     valid_from: string;
//     valid_to: string;
//     amount: string;
//     issuer_id: string;
//     description:string;
//   };
// }