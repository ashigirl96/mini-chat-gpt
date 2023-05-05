/*
  Warnings:

  - Added the required column `title` to the `ChatTimeline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatTimeline" ADD COLUMN     "title" TEXT NOT NULL;
