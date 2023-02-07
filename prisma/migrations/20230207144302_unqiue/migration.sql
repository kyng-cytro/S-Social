/*
  Warnings:

  - A unique constraint covering the columns `[claimCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_claimCode_key" ON "User"("claimCode");
