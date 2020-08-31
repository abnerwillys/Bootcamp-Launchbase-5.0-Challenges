CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "image" text,
  "name" text,
  "age" int,
  "cnh_number" int UNIQUE,
  "cpf_number" int UNIQUE,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "address_id" int UNIQUE,
  "image" text,
  "name" text,
  "phone" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "country" text,
  "state" text,
  "city" text,
  "street" text,
  "cep" int,
  "complement" text
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "model_id" int,
  "name" text,
  "series" text,
  "color" text,
  "car_plate" text,
  "price" int,
  "year" int,
  "status" int DEFAULT 1,
  "last_maintenance" timestamp,
  "next_maintenance" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "type" text,
  "brand" text,
  "fuel_type" text,
  "seats" int
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "agencies_id" int,
  "customers_id" int,
  "kilometers" int,
  "pickup_location" text,
  "pickup_date" timestamp,
  "devolution_location" text,
  "devolution_date" timestamp,
  "discount" int DEFAULT 0,
  "total_price" int,
  "number_drivers" int DEFAULT 1
);

CREATE TABLE "cars_orders" (
  "id" SERIAL PRIMARY KEY,
  "car_id" int,
  "order_id" int,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "addresses" ADD FOREIGN KEY ("id") REFERENCES "agencies" ("address_id");

ALTER TABLE "cars" ADD FOREIGN KEY ("model_id") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agencies_id") REFERENCES "agencies" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customers_id") REFERENCES "customers" ("id");

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");

ALTER TABLE "cars_orders" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");
