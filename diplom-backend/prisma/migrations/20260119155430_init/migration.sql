/*
  Warnings:

  - The values [RESPONSIBLE_PERSON] on the enum `Position` will be removed. If these variants are still used in the database, this will fail.
  - The values [RESPONSIBLE_PERSON,COMMISSION] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Position_new" AS ENUM ('NONE', 'EMPLOYEE', 'RES_PERSON');
ALTER TABLE "Users" ALTER COLUMN "position" DROP DEFAULT;
ALTER TABLE "Users" ALTER COLUMN "position" TYPE "Position_new" USING ("position"::text::"Position_new");
ALTER TYPE "Position" RENAME TO "Position_old";
ALTER TYPE "Position_new" RENAME TO "Position";
DROP TYPE "Position_old";
ALTER TABLE "Users" ALTER COLUMN "position" SET DEFAULT 'NONE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "Users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;
