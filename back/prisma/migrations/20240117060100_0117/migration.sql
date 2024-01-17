/*
  Warnings:

  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('male', 'female', 'agender');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "UserGender" NOT NULL;
