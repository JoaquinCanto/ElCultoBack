/*
  Warnings:

  - You are about to drop the column `borrado` on the `Inscripcion` table. All the data in the column will be lost.
  - Added the required column `baja` to the `Inscripcion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inscripcion" DROP COLUMN "borrado",
ADD COLUMN     "baja" BOOLEAN NOT NULL;
