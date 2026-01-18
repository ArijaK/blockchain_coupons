// For mixed services (interServices)

export interface AddIssuerInput {
  account: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postal_code: string;
  description: string;
}

export interface AddCouponsInput {
  name: string;
  valid_from: string;
  valid_to: string;
  amount: string;
  issuer: string;
  description: string;
  retailers: string[];
}

export interface RedeeemCouponsInput {
  coupon: string,
  owner: string,
  retailer: string
}
