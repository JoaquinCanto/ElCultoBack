/*
  Warnings:

  - You are about to drop the `Inscripto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inscripto" DROP CONSTRAINT "Inscripto_idMesa_fkey";

-- DropForeignKey
ALTER TABLE "Inscripto" DROP CONSTRAINT "Inscripto_idjugador_fkey";

-- DropTable
DROP TABLE "Inscripto";

-- CreateTable
CREATE TABLE "Inscripcion" (
    "idInscripto" SERIAL NOT NULL,
    "idjugador" INTEGER NOT NULL,
    "idMesa" INTEGER NOT NULL,
    "inscriptoAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asistencia" BOOLEAN,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("idInscripto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_idMesa_idjugador_key" ON "Inscripcion"("idMesa", "idjugador");

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_idjugador_fkey" FOREIGN KEY ("idjugador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_idMesa_fkey" FOREIGN KEY ("idMesa") REFERENCES "Mesa"("idMesa") ON DELETE RESTRICT ON UPDATE CASCADE;
