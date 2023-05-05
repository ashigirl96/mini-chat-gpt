/*
  Warnings:

  - You are about to drop the column `ChatTimelineId` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `timelineId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_ChatTimelineId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "ChatTimelineId",
ADD COLUMN     "timelineId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_timelineId_fkey" FOREIGN KEY ("timelineId") REFERENCES "ChatTimeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
