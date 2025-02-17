-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentBookAuthor" TEXT,
ADD COLUMN     "currentBookCover" TEXT,
ADD COLUMN     "currentBookProgress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentBookTitle" TEXT,
ADD COLUMN     "topBook1Author" TEXT,
ADD COLUMN     "topBook1Cover" TEXT,
ADD COLUMN     "topBook1Title" TEXT,
ADD COLUMN     "topBook2Author" TEXT,
ADD COLUMN     "topBook2Cover" TEXT,
ADD COLUMN     "topBook2Title" TEXT,
ADD COLUMN     "topBook3Author" TEXT,
ADD COLUMN     "topBook3Cover" TEXT,
ADD COLUMN     "topBook3Title" TEXT;
