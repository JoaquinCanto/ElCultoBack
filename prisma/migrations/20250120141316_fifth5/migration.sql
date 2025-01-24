/*
  Warnings:

  - You are about to drop the column `Email` on the `Persona` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Persona_Email_key";

-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "Email",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");
