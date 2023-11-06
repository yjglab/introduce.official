/*
  Warnings:

  - You are about to alter the column `connectionId` on the `Social` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to drop the `FindingPostSectionImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FindingPostSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectPostSectionImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectPostSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectPostSource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FindingPostSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectPostSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FindingPostSectionImage" DROP CONSTRAINT "FindingPostSectionImage_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPostSectionImage" DROP CONSTRAINT "ProjectPostSectionImage_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPostSource" DROP CONSTRAINT "ProjectPostSource_postId_fkey";

-- DropForeignKey
ALTER TABLE "_FindingPostSkills" DROP CONSTRAINT "_FindingPostSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_FindingPostSkills" DROP CONSTRAINT "_FindingPostSkills_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectPostSkills" DROP CONSTRAINT "_ProjectPostSkills_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectPostSkills" DROP CONSTRAINT "_ProjectPostSkills_B_fkey";

-- AlterTable
ALTER TABLE "FindingPost" ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "FindingPostSection" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "ProjectPost" ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "ProjectPostSection" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Social" ALTER COLUMN "connectionId" SET DATA TYPE VARCHAR(300);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(300);

-- DropTable
DROP TABLE "FindingPostSectionImage";

-- DropTable
DROP TABLE "FindingPostSkill";

-- DropTable
DROP TABLE "ProjectPostSectionImage";

-- DropTable
DROP TABLE "ProjectPostSkill";

-- DropTable
DROP TABLE "ProjectPostSource";

-- DropTable
DROP TABLE "_FindingPostSkills";

-- DropTable
DROP TABLE "_ProjectPostSkills";

-- CreateTable
CREATE TABLE "ProjectSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ProjectSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSource_postId_key" ON "ProjectSource"("postId");

-- AddForeignKey
ALTER TABLE "ProjectSource" ADD CONSTRAINT "ProjectSource_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ProjectPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
