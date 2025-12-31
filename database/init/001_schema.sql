-- All users -- only for the sake of quicker lookups
CREATE TABLE users (
  account_id CHAR(42) NOT NULL PRIMARY KEY -- Blockchain account
  -- NOTE: I don't know if we will need it, but we can optimize later
  -- user_type TEXT CHECK (user_type IN ('customer', 'issuer'))
);

-- Retailers, who can issue coupons
CREATE TABLE issuers (
  account_id CHAR(42) NOT NULL REFERENCES users(account_id),
  issuer_name VARCHAR(127) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  country VARCHAR(127) NOT NULL,
  city VARCHAR(63) NOT NULL,
  address VARCHAR(127) NOT NULL,
  postal_code VARCHAR(31) NOT NULL,
  description TEXT,
  PRIMARY KEY (account_id)
);

-- Coupons
CREATE TABLE coupon_types (
  token_id NUMERIC(78, 0) NOT NULL PRIMARY KEY, -- ID (uint256) on blockchain
  coupon_name VARCHAR(63) NOT NULL,
  -- If this is confusing (must try first to come to such conclusion), may use NULL
  valid_from TIMESTAMP NOT NULL DEFAULT 'epoch',
  valid_to TIMESTAMP NOT NULL DEFAULT 'infinity',
  -- IMPORTANT: This is POSSIBLE, but it should NOT be done!
  -- HOWEVER, first modify blockchain, then this table.
  amount NUMERIC(78, 0) NOT NULL,
  issuer_id CHAR(42) NOT NULL REFERENCES issuers(account_id),
  description VARCHAR(255)
);

-- Where can coupons be redeemed (many to many relationship)
CREATE TABLE redemption_places (
  token_id NUMERIC(78, 0) REFERENCES coupon_types(token_id),
  retailer_id CHAR(42) REFERENCES issuers(account_id),
  PRIMARY KEY (token_id, retailer_id)
);

-- Alternative to ENUM for coupon status types
CREATE TABLE status_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(15) NOT NULL
);

-- NOTE: If you have better naming ideas, please, add them
INSERT INTO status_types (type) VALUES
  ('active'),  -- On blockchain (even if expired?)
  ('pending'), -- Processed by blockchain
  ('used');    -- Burned

-- Instances of coupons (important for transactions)
CREATE TABLE coupons (
  coupon_id BIGSERIAL PRIMARY KEY,
  type_id NUMERIC(78, 0) NOT NULL REFERENCES coupon_types(token_id),
  status INTEGER NOT NULL REFERENCES status_types(id),
  owner_id CHAR(42) NOT NULL REFERENCES users(account_id),
  -- Where it was redeemed
  retailer_id CHAR(42) REFERENCES issuers(account_id),
  redeemed_at TIMESTAMP
);