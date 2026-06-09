/*
  Warnings:

  - A unique constraint covering the columns `[user_id,store_id]` on the table `User_Stores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MANAGER';

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory_Items" DROP CONSTRAINT "Inventory_Items_equipment_id_fkey";

-- DropForeignKey
ALTER TABLE "Inventory_Items" DROP CONSTRAINT "Inventory_Items_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Stores" DROP CONSTRAINT "User_Stores_store_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Stores" DROP CONSTRAINT "User_Stores_user_id_fkey";

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "count" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "EquipmentMovement" (
    "id" SERIAL NOT NULL,
    "equipment_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,
    "operation_type" TEXT NOT NULL,
    "comment" TEXT,
    "created_by" INTEGER NOT NULL,
    "inventory_item_id" INTEGER,

    CONSTRAINT "EquipmentMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EquipmentMovement_equipment_id_date_idx" ON "EquipmentMovement"("equipment_id", "date");

-- CreateIndex
CREATE INDEX "EquipmentMovement_store_id_date_idx" ON "EquipmentMovement"("store_id", "date");

-- CreateIndex
CREATE INDEX "EquipmentMovement_created_by_idx" ON "EquipmentMovement"("created_by");

-- CreateIndex
CREATE INDEX "EquipmentMovement_inventory_item_id_idx" ON "EquipmentMovement"("inventory_item_id");

-- CreateIndex
CREATE INDEX "Equipment_store_id_idx" ON "Equipment"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Stores_user_id_store_id_key" ON "User_Stores"("user_id", "store_id");

-- AddForeignKey
ALTER TABLE "User_Stores" ADD CONSTRAINT "User_Stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id_users") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Stores" ADD CONSTRAINT "User_Stores_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id_store") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id_store") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id_store") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory_Items" ADD CONSTRAINT "Inventory_Items_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id_inventory") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory_Items" ADD CONSTRAINT "Inventory_Items_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equipment"("id_equipment") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentMovement" ADD CONSTRAINT "EquipmentMovement_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equipment"("id_equipment") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentMovement" ADD CONSTRAINT "EquipmentMovement_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id_store") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentMovement" ADD CONSTRAINT "EquipmentMovement_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("id_users") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentMovement" ADD CONSTRAINT "EquipmentMovement_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "Inventory_Items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
