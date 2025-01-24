-- CreateEnum
CREATE TYPE "TipoPersona" AS ENUM ('Administrador', 'Narrador', 'Jugador');

-- CreateEnum
CREATE TYPE "EstadoMesa" AS ENUM ('Abierta', 'Cerrada', 'EnCurso', 'Finalizada', 'Cancelada');

-- CreateTable
CREATE TABLE "Persona" (
    "idPersona" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apodo" TEXT NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "Email" TEXT NOT NULL,
    "tipo" "TipoPersona" NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "banHasta" TIMESTAMP(3),

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("idPersona")
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
CREATE TABLE "Inscripcion" (
    "idInscripcion" SERIAL NOT NULL,
    "idjugador" INTEGER NOT NULL,
    "idMesa" INTEGER NOT NULL,
    "inscriptoAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asistencia" BOOLEAN,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("idInscripcion")
);

-- CreateTable
CREATE TABLE "Mesa" (
    "idMesa" SERIAL NOT NULL,
    "idPersona" INTEGER NOT NULL,
    "idJuego" INTEGER NOT NULL,
    "idLugar" INTEGER NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL,
    "notas" TEXT NOT NULL,
    "cupoMin" INTEGER NOT NULL,
    "cupoMax" INTEGER NOT NULL,
    "idJugadores" INTEGER NOT NULL,
    "estado" "EstadoMesa" NOT NULL,
    "publica" BOOLEAN NOT NULL,
    "codigo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("idMesa")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_Email_key" ON "Persona"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Juego_nombre_key" ON "Juego"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Lugar_nombre_key" ON "Lugar"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Inscripcion_idMesa_idjugador_key" ON "Inscripcion"("idMesa", "idjugador");

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_idjugador_fkey" FOREIGN KEY ("idjugador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idPersona_fkey" FOREIGN KEY ("idPersona") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idJuego_fkey" FOREIGN KEY ("idJuego") REFERENCES "Juego"("idJuego") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idLugar_fkey" FOREIGN KEY ("idLugar") REFERENCES "Lugar"("idLugar") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idJugadores_fkey" FOREIGN KEY ("idJugadores") REFERENCES "Inscripcion"("idInscripcion") ON DELETE RESTRICT ON UPDATE CASCADE;
