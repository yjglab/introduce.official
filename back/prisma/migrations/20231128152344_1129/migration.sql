/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenExpiration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Social` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountStatus` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'facebook', 'local');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('pending', 'verified', 'banned');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'premium';
ALTER TYPE "UserRole" ADD VALUE 'moderator';

-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_userId_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "refreshToken",
DROP COLUMN "refreshTokenExpiration",
ADD COLUMN     "accountStatus" "AccountStatus" NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL,
ADD COLUMN     "provider" "Provider" NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Social";

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
