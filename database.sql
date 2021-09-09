
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "accountBalance" FLOAT DEFAULT 25000.00,
    "availableBalance" FLOAT DEFAULT 25000.00,
    "isFirstTime" BOOLEAN DEFAULT 1 -- Defaults to true
);

CREATE TABLE "purchasedStocks" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT REFERENCES "users" ON DELETE CASCADE,
    "stockSymbol" VARCHAR(10) NOT NULL,
    "quantity" INT NOT NULL,
    "isBoughtOrSold" BOOLEAN,
    "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "price" FLOAT
);

CREATE TABLE "watchlistedStocks" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT REFERENCES "users" ON DELETE CASCADE,
    "stockSymbol" VARCHAR(10) NOT NULL
);

SELECT * FROM "purchasedStocks"
WHERE userId=1;