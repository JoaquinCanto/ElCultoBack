/*
  Warnings:

  - You are about to drop the column `borrado` on the `Persona` table. All the data in the column will be lost.
  - Added the required column `baja` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "borrado",
ADD COLUMN     "baja" BOOLEAN NOT NULL,
ADD COLUMN     "fechaAlta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaBaja" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Sugerencia" (
    "idSugerencia" SERIAL NOT NULL,
    "idJugador" INTEGER NOT NULL,
    "idJuego" INTEGER NOT NULL,
    "fechaSugerencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sugerencia_pkey" PRIMARY KEY ("idSugerencia")
);

-- AddForeignKey
ALTER TABLE "Sugerencia" ADD CONSTRAINT "Sugerencia_idJugador_fkey" FOREIGN KEY ("idJugador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sugerencia" ADD CONSTRAINT "Sugerencia_idJuego_fkey" FOREIGN KEY ("idJuego") REFERENCES "Juego"("idJuego") ON DELETE RESTRICT ON UPDATE CASCADE;
