/*
  Warnings:

  - You are about to drop the column `idPersona` on the `Mesa` table. All the data in the column will be lost.
  - Added the required column `idNarrador` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mesa" DROP CONSTRAINT "Mesa_idPersona_fkey";

-- AlterTable
ALTER TABLE "Mesa" DROP COLUMN "idPersona",
ADD COLUMN     "idNarrador" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idNarrador_fkey" FOREIGN KEY ("idNarrador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;
