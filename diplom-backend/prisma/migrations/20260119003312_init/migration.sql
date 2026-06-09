-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'RESPONSIBLE_PERSON', 'COMMISSION', 'ADMIN');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('NONE', 'EMPLOYEE', 'RESPONSIBLE_PERSON');

-- CreateTable
CREATE TABLE "Users" (
    "id_users" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "position" "Position" NOT NULL DEFAULT 'NONE',
    "firstName" TEXT,
    "lastName" TEXT,
    "patronymic" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_users")
);

-- CreateTable
CREATE TABLE "Stores" (
    "id_store" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id_store")
);

-- CreateTable
CREATE TABLE "User_Stores" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "User_Stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id_equipment" SERIAL NOT NULL,
    "inventory_number" INTEGER,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "store_id" INTEGER NOT NULL,
    "status" TEXT DEFAULT 'Используется',

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id_equipment")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id_inventory" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "inventory_date" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id_inventory")
);

-- CreateTable
CREATE TABLE "Inventory_Items" (
    "id" SERIAL NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,
    "status_fact" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Inventory_Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "User_Stores" ADD CONSTRAINT "User_Stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id_users") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Stores" ADD CONSTRAINT "User_Stores_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id_store") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id_store") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id_store") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("id_users") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory_Items" ADD CONSTRAINT "Inventory_Items_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id_inventory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory_Items" ADD CONSTRAINT "Inventory_Items_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equipment"("id_equipment") ON DELETE RESTRICT ON UPDATE CASCADE;
