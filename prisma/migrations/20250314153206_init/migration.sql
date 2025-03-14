-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventType" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "invoiceId" TEXT,
    "items" JSONB,
    "amount" INTEGER
);

-- CreateTable
CREATE TABLE "SaleAmendment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "taxRate" REAL NOT NULL
);
