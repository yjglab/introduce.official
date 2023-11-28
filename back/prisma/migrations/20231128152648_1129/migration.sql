-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountStatus" SET DEFAULT 'pending',
ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "providerId" DROP NOT NULL;
