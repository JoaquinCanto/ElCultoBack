/*
  Warnings:

  - You are about to drop the column `idMesa` on the `Persona` table. All the data in the column will be lost.
  - Added the required column `publica` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Persona" DROP CONSTRAINT "Persona_idMesa_fkey";

-- AlterTable
ALTER TABLE "Mesa" ADD COLUMN     "codigo" TEXT,
ADD COLUMN     "publica" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "idMesa";

-- CreateTable
CREATE TABLE "Inscripto" (
    "idInscripto" SERIAL NOT NULL,
    "idjugador" INTEGER NOT NULL,
    "idMesa" INTEGER NOT NULL,
    "inscriptoAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscripto_pkey" PRIMARY KEY ("idInscripto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inscripto_idMesa_idjugador_key" ON "Inscripto"("idMesa", "idjugador");

-- AddForeignKey
ALTER TABLE "Inscripto" ADD CONSTRAINT "Inscripto_idjugador_fkey" FOREIGN KEY ("idjugador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripto" ADD CONSTRAINT "Inscripto_idMesa_fkey" FOREIGN KEY ("idMesa") REFERENCES "Mesa"("idMesa") ON DELETE RESTRICT ON UPDATE CASCADE;
