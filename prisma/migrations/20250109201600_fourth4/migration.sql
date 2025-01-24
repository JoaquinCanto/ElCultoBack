/*
  Warnings:

  - You are about to drop the column `idJugadores` on the `Mesa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mesa" DROP CONSTRAINT "Mesa_idJugadores_fkey";

-- AlterTable
ALTER TABLE "Mesa" DROP COLUMN "idJugadores";

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_idMesa_fkey" FOREIGN KEY ("idMesa") REFERENCES "Mesa"("idMesa") ON DELETE RESTRICT ON UPDATE CASCADE;
