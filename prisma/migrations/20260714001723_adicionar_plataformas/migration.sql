/*
  Warnings:

  - You are about to drop the column `platform` on the `Game` table. All the data in the column will be lost.
  - Added the required column `platformId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "platform",
ADD COLUMN     "platformId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Platform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "Platform"("name");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
