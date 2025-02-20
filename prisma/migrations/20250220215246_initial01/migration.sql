-- CreateEnum
CREATE TYPE "TipoPersona" AS ENUM ('Administrador', 'Narrador', 'Jugador');

-- CreateEnum
CREATE TYPE "EstadoPersona" AS ENUM ('Habilitada', 'Desabilitada', 'DeBaja');

-- CreateEnum
CREATE TYPE "EstadoMesa" AS ENUM ('Abierta', 'Cerrada', 'EnCurso', 'Finalizada', 'Cancelada');

-- CreateTable
CREATE TABLE "Persona" (
    "idPersona" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apodo" TEXT NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "email" TEXT NOT NULL,
    "tipo" "TipoPersona" NOT NULL,
    "estado" "EstadoPersona" NOT NULL,
    "quiereNarrar" BOOLEAN NOT NULL,
    "fechaAlta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desabilitadoHasta" TIMESTAMP(3),
    "fechaBaja" TIMESTAMP(3),

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("idPersona")
);

-- CreateTable
CREATE TABLE "Juego" (
    "idJuego" SERIAL NOT NULL,
    "agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fechaBaja" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Juego_pkey" PRIMARY KEY ("idJuego")
);

-- CreateTable
CREATE TABLE "Lugar" (
    "idLugar" SERIAL NOT NULL,
    "agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "fechaBaja" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lugar_pkey" PRIMARY KEY ("idLugar")
);

-- CreateTable
CREATE TABLE "Sugerencia" (
    "idSugerencia" SERIAL NOT NULL,
    "idPersona" INTEGER NOT NULL,
    "idJuego" INTEGER NOT NULL,
    "fechaSugerencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vieja" BOOLEAN NOT NULL,

    CONSTRAINT "Sugerencia_pkey" PRIMARY KEY ("idSugerencia")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "idInscripcion" SERIAL NOT NULL,
    "idJugador" INTEGER NOT NULL,
    "idMesa" INTEGER NOT NULL,
    "fechaInscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asistencia" BOOLEAN,
    "baja" BOOLEAN NOT NULL,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("idInscripcion")
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
    "estado" "EstadoMesa" NOT NULL,
    "publica" BOOLEAN NOT NULL,
    "codigo" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("idMesa")
);

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Juego_nombre_key" ON "Juego"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Lugar_nombre_key" ON "Lugar"("nombre");

-- AddForeignKey
ALTER TABLE "Sugerencia" ADD CONSTRAINT "Sugerencia_idPersona_fkey" FOREIGN KEY ("idPersona") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sugerencia" ADD CONSTRAINT "Sugerencia_idJuego_fkey" FOREIGN KEY ("idJuego") REFERENCES "Juego"("idJuego") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_idJugador_fkey" FOREIGN KEY ("idJugador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_idMesa_fkey" FOREIGN KEY ("idMesa") REFERENCES "Mesa"("idMesa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idNarrador_fkey" FOREIGN KEY ("idNarrador") REFERENCES "Persona"("idPersona") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idJuego_fkey" FOREIGN KEY ("idJuego") REFERENCES "Juego"("idJuego") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_idLugar_fkey" FOREIGN KEY ("idLugar") REFERENCES "Lugar"("idLugar") ON DELETE RESTRICT ON UPDATE CASCADE;
