-- CreateEnum
CREATE TYPE "TipoPersona" AS ENUM ('Administrador', 'Narrador', 'Jugador');

-- CreateTable
CREATE TABLE "Persona" (
    "idPersona" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apodo" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "Email" TEXT NOT NULL,
    "tipo" "TipoPersona" NOT NULL,
    "idMesa" INTEGER,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("idPersona")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "idAdministrador" INTEGER NOT NULL,
    "acceso" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idAdministrador")
);

-- CreateTable
CREATE TABLE "Narrador" (
    "idNarrador" INTEGER NOT NULL,
    "acceso" TEXT NOT NULL,

    CONSTRAINT "Narrador_pkey" PRIMARY KEY ("idNarrador")
);

-- CreateTable
CREATE TABLE "Jugador" (
    "idJugador" INTEGER NOT NULL,
    "acceso" TEXT NOT NULL,

    CONSTRAINT "Jugador_pkey" PRIMARY KEY ("idJugador")
);

-- CreateTable
CREATE TABLE "Juego" (
    "idJuego" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Juego_pkey" PRIMARY KEY ("idJuego")
);

-- CreateTable
CREATE TABLE "Lugar" (
    "idLugar" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Lugar_pkey" PRIMARY KEY ("idLugar")
);

-- CreateTable
CREATE TABLE "Mesa" (
    "idMesa" SERIAL NOT NULL,
    "idNarrador" INTEGER NOT NULL,
    "idJuego" INTEGER NOT NULL,
    "idLugar" INTEGER NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL,
    "notas" TEXT NOT NULL,
    "cupoMin" INTEGER NOT NULL,
    "cupoMax" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("idMesa")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_Email_key" ON "Persona"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Juego_nombre_key" ON "Juego"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Lugar_nombre_key" ON "Lugar"("nombre");

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_idMesa_fkey" FOREIGN KEY ("idMesa") REFERENCES "Mesa"("idMesa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Narrador" ADD CONSTRAINT "Narrador_idNarrador_fkey" FOREIGN KEY ("idNarrador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jugador" ADD CONSTRAINT "Jugador_idJugador_fkey" FOREIGN KEY ("idJugador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idNarrador_fkey" FOREIGN KEY ("idNarrador") REFERENCES "Narrador"("idNarrador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idJuego_fkey" FOREIGN KEY ("idJuego") REFERENCES "Juego"("idJuego") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idLugar_fkey" FOREIGN KEY ("idLugar") REFERENCES "Lugar"("idLugar") ON DELETE RESTRICT ON UPDATE CASCADE;
