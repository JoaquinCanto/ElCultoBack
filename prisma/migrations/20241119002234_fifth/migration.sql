/*
  Warnings:

  - The primary key for the `Inscripcion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idInscripto` on the `Inscripcion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inscripcion" DROP CONSTRAINT "Inscripcion_pkey",
DROP COLUMN "idInscripto",
ADD COLUMN     "idInscripcion" SERIAL NOT NULL,
ADD CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("idInscripcion");
