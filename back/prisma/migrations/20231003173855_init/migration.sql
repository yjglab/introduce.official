-- CreateEnum
CREATE TYPE "UserClass" AS ENUM ('normal', 'pro');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "class" "UserClass" NOT NULL DEFAULT 'normal',
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPost" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "grades" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPostSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProjectPostSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPostSource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ProjectPostSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindingPost" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FindingPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindingPostSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FindingPostSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "connectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPostSection" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ProjectPostSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindingPostSection" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "FindingPostSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectPostSectionImage" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "ProjectPostSectionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindingPostSectionImage" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "FindingPostSectionImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectPostSkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserLikedProjectPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserMarkedProjectPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FindingPostSkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserLikedFindingPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserMarkedFindingPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectPostSource_postId_key" ON "ProjectPostSource"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_key" ON "Social"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectPostSkills_AB_unique" ON "_ProjectPostSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectPostSkills_B_index" ON "_ProjectPostSkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedProjectPosts_AB_unique" ON "_UserLikedProjectPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedProjectPosts_B_index" ON "_UserLikedProjectPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserMarkedProjectPosts_AB_unique" ON "_UserMarkedProjectPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserMarkedProjectPosts_B_index" ON "_UserMarkedProjectPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FindingPostSkills_AB_unique" ON "_FindingPostSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_FindingPostSkills_B_index" ON "_FindingPostSkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedFindingPosts_AB_unique" ON "_UserLikedFindingPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedFindingPosts_B_index" ON "_UserLikedFindingPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserMarkedFindingPosts_AB_unique" ON "_UserMarkedFindingPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserMarkedFindingPosts_B_index" ON "_UserMarkedFindingPosts"("B");

-- AddForeignKey
ALTER TABLE "ProjectPost" ADD CONSTRAINT "ProjectPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPostSource" ADD CONSTRAINT "ProjectPostSource_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ProjectPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindingPost" ADD CONSTRAINT "FindingPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPostSection" ADD CONSTRAINT "ProjectPostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ProjectPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindingPostSection" ADD CONSTRAINT "FindingPostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "FindingPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectPostSectionImage" ADD CONSTRAINT "ProjectPostSectionImage_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ProjectPostSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindingPostSectionImage" ADD CONSTRAINT "FindingPostSectionImage_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "FindingPostSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectPostSkills" ADD CONSTRAINT "_ProjectPostSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectPostSkills" ADD CONSTRAINT "_ProjectPostSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectPostSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedProjectPosts" ADD CONSTRAINT "_UserLikedProjectPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedProjectPosts" ADD CONSTRAINT "_UserLikedProjectPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMarkedProjectPosts" ADD CONSTRAINT "_UserMarkedProjectPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMarkedProjectPosts" ADD CONSTRAINT "_UserMarkedProjectPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FindingPostSkills" ADD CONSTRAINT "_FindingPostSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "FindingPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FindingPostSkills" ADD CONSTRAINT "_FindingPostSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "FindingPostSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedFindingPosts" ADD CONSTRAINT "_UserLikedFindingPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "FindingPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedFindingPosts" ADD CONSTRAINT "_UserLikedFindingPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMarkedFindingPosts" ADD CONSTRAINT "_UserMarkedFindingPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "FindingPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMarkedFindingPosts" ADD CONSTRAINT "_UserMarkedFindingPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
