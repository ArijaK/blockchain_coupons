CREATE TABLE "issuers" (
    "account_id" character(42) PRIMARY KEY,
    "name" character varying(200) NOT NULL,
    "description" text,
    "email" character varying(255) NOT NULL,
    "phone" character varying(20),
    "street" character varying(255) NOT NULL,
    "city" character varying(100) NOT NULL,
    "postal_code" character varying(20) NOT NULL,
    "country" character varying(100) NOT NULL,
    "address" character varying(255) NOT NULL
)