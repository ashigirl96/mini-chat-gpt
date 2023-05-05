/*
  Warnings:

  - You are about to drop the column `answer` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `response` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "answer",
ADD COLUMN     "response" TEXT NOT NULL;
