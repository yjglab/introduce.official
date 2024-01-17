/*
  Warnings:

  - You are about to drop the column `postId` on the `ProjectSource` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FindingPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FindingPostSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectPostSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikedFindingPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikedProjectPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserMarkedFindingPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserMarkedProjectPosts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `ProjectSource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `ProjectSource` table without a default value. This is not possible if the table is not empty.
  - Made the column `provider` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'pro', 'expoert', 'manager', 'admin');

-- AlterEnum
ALTER TYPE "Provider" ADD VALUE 'kakao';

-- DropForeignKey
ALTER TABLE "FindingPost" DROP CONSTRAINT "FindingPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "FindingPostSection" DROP CONSTRAINT "FindingPostSection_postId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPost" DROP CONSTRAINT "ProjectPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPostSection" DROP CONSTRAINT "ProjectPostSection_postId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSource" DROP CONSTRAINT "ProjectSource_postId_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedFindingPosts" DROP CONSTRAINT "_UserLikedFindingPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedFindingPosts" DROP CONSTRAINT "_UserLikedFindingPosts_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedProjectPosts" DROP CONSTRAINT "_UserLikedProjectPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedProjectPosts" DROP CONSTRAINT "_UserLikedProjectPosts_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserMarkedFindingPosts" DROP CONSTRAINT "_UserMarkedFindingPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserMarkedFindingPosts" DROP CONSTRAINT "_UserMarkedFindingPosts_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserMarkedProjectPosts" DROP CONSTRAINT "_UserMarkedProjectPosts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserMarkedProjectPosts" DROP CONSTRAINT "_UserMarkedProjectPosts_B_fkey";

-- DropIndex
DROP INDEX "ProjectSource_postId_key";

-- AlterTable
ALTER TABLE "ProjectSource" DROP COLUMN "postId",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ALTER COLUMN "provider" SET NOT NULL;

-- DropTable
DROP TABLE "FindingPost";

-- DropTable
DROP TABLE "FindingPostSection";

-- DropTable
DROP TABLE "ProjectPost";

-- DropTable
DROP TABLE "ProjectPostSection";

-- DropTable
DROP TABLE "_UserLikedFindingPosts";

-- DropTable
DROP TABLE "_UserLikedProjectPosts";

-- DropTable
DROP TABLE "_UserMarkedFindingPosts";

-- DropTable
DROP TABLE "_UserMarkedProjectPosts";

-- DropEnum
DROP TYPE "UserClass";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "UserProject" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "grades" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" "Role" NOT NULL DEFAULT 'user',
    "expiry" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserLikedProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserMarkedProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_key" ON "UserRole"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedProjects_AB_unique" ON "_UserLikedProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedProjects_B_index" ON "_UserLikedProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserMarkedProjects_AB_unique" ON "_UserMarkedProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_UserMarkedProjects_B_index" ON "_UserMarkedProjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSource_projectId_key" ON "ProjectSource"("projectId");

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "UserProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSource" ADD CONSTRAINT "ProjectSource_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "UserProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedProjects" ADD CONSTRAINT "_UserLikedProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedProjects" ADD CONSTRAINT "_UserLikedProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMarkedProjects" ADD CONSTRAINT "_UserMarkedProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMarkedProjects" ADD CONSTRAINT "_UserMarkedProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
