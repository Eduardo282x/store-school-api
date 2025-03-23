-- CreateEnum
CREATE TYPE "MethodPay" AS ENUM ('Efectivo', 'Tarjeta', 'Punto');

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrito" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Carrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "methodPay" "MethodPay" NOT NULL,
    "amount" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetSales" (
    "id" SERIAL NOT NULL,
    "salesId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "DetSales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetCredit" (
    "id" SERIAL NOT NULL,
    "creditId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "DetCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "pending" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "datePay" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrito" ADD CONSTRAINT "Carrito_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetSales" ADD CONSTRAINT "DetSales_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetSales" ADD CONSTRAINT "DetSales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetCredit" ADD CONSTRAINT "DetCredit_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetCredit" ADD CONSTRAINT "DetCredit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
