/*
  Warnings:

  - Added the required column `status` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatResponseStatus" AS ENUM ('Success', 'Failure');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "status" "ChatResponseStatus" NOT NULL,
ALTER COLUMN "response" DROP NOT NULL;
