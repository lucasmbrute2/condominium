/*
  Warnings:

  - You are about to drop the column `syndicateId` on the `Building` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Building_syndicateId_key";

-- AlterTable
ALTER TABLE "Building" DROP COLUMN "syndicateId";
