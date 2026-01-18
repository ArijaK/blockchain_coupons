export interface AddIssuerRow {
  account_id: string;
  issuer_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postal_code: string;
  description: string;
}

export interface AddCouponRow {
  token_id: string;
  coupon_name: string;
  valid_from: string;
  valid_to: string;
  amount: string;
  issuer_id: string;
  description:string;
}

export interface UpdateRedeemRow {
  coupon_id: string,
  type_id: string,
  owner_id: string,
  retailer_id: string
}


