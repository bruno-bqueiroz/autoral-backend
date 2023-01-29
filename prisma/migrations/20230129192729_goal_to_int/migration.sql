/*
  Warnings:

  - Changed the type of `meta` on the `Goal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `entrada` on the `Goal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "meta",
ADD COLUMN     "meta" INTEGER NOT NULL,
DROP COLUMN "entrada",
ADD COLUMN     "entrada" INTEGER NOT NULL;
