/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_enrollmentId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "state" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Address";
