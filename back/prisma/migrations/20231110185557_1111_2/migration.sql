-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Seoul'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "refreshTokenExpiration" SET DEFAULT timezone('Asia/Seoul'::text, now()),
ALTER COLUMN "refreshTokenExpiration" SET DATA TYPE TIMESTAMP(6);
