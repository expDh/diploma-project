/*
  Warnings:

  - Added the required column `count_system` to the `Inventory_Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'В работе';

-- AlterTable
ALTER TABLE "Inventory_Items" ADD COLUMN     "count_fact" INTEGER,
ADD COLUMN     "count_system" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Inventory_Items_inventory_id_idx" ON "Inventory_Items"("inventory_id");
