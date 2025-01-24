-- DropForeignKey
ALTER TABLE "Mesa" DROP CONSTRAINT "Mesa_idJugadores_fkey";

-- AlterTable
ALTER TABLE "Mesa" ALTER COLUMN "idJugadores" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idJugadores_fkey" FOREIGN KEY ("idJugadores") REFERENCES "Inscripcion"("idInscripcion") ON DELETE SET NULL ON UPDATE CASCADE;
