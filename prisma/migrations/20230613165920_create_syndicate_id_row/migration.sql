/*
  Warnings:

  - A unique constraint covering the columns `[syndicateId]` on the table `Building` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `syndicateId` to the `Building` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "syndicateId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Building_syndicateId_key" ON "Building"("syndicateId");
