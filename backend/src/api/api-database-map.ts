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

export function couponInputToRow(data: AddCouponsInput, token_id: string): AddCouponRow {
  return {
    token_id: token_id,
    coupon_name: data.name,
    valid_from: data.valid_from,
    valid_to: data.valid_to,
    amount: data.amount,
    issuer_id: data.issuer,
    description: data.description
  };
}