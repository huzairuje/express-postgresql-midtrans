CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE INDEX idx_customers_deleted_at ON customers(deleted_at);

CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price FLOAT NOT NULL CHECK(price >= 0),
    quantity INT NOT NULL DEFAULT 0 CHECK(quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP,
    CONSTRAINT products_name_unique UNIQUE(name)
);
CREATE INDEX idx_products_deleted_at ON products(deleted_at);

CREATE TABLE payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    customer_id uuid NULL,
    product_id uuid NULL,
    currency varchar(191) NULL,
    status varchar(191) NULL,
    amount int8 NULL,
    "type" varchar(191) NULL,
    third_party varchar(191) NULL,
    reference_id varchar NULL,
    actions json NULL,
    channel_code varchar NULL,
    final_amount int8 NULL,
    created_by varchar(191) NULL,
    updated_by varchar(191) NULL,
    expired_date timestamp(0) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE INDEX idx_payments_deleted_at ON payments(deleted_at);

CREATE TABLE payment_gateway_transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    customer_id uuid NULL,
    product_id uuid NULL,
    "type" varchar(191) NULL,
    third_party varchar(191) NULL,
    bound_type varchar(191) NULL,
    body_json json NULL,
    expired_date date NULL,
    created_by varchar(191) NULL,
    updated_by varchar(191) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
CREATE INDEX idx_payment_gateway_transactions_deleted_at ON payment_gateway_transactions(deleted_at);