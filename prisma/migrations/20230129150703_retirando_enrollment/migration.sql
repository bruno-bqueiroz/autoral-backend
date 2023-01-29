/*
  Warnings:

  - You are about to drop the column `enrollmentId` on the `Veiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Veiculo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_enrollmentId_fkey";

-- DropIndex
DROP INDEX "Veiculo_enrollmentId_key";

-- AlterTable
ALTER TABLE "Veiculo" DROP COLUMN "enrollmentId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Veiculo_userId_key" ON "Veiculo"("userId");

-- AddForeignKey
ALTER TABLE "Veiculo" ADD CONSTRAINT "Veiculo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
