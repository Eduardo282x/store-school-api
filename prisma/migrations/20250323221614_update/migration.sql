/*
  Warnings:

  - The values [Tarjeta] on the enum `MethodPay` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `amount` on the `Sales` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MethodPay_new" AS ENUM ('Efectivo', 'Divisa', 'Punto', 'Transferencia');
ALTER TABLE "Sales" ALTER COLUMN "methodPay" TYPE "MethodPay_new" USING ("methodPay"::text::"MethodPay_new");
ALTER TYPE "MethodPay" RENAME TO "MethodPay_old";
ALTER TYPE "MethodPay_new" RENAME TO "MethodPay";
DROP TYPE "MethodPay_old";
COMMIT;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "amount";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
