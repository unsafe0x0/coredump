/*
  Warnings:

  - Made the column `shortLanguageName` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Activity" ALTER COLUMN "shortLanguageName" SET NOT NULL,
ALTER COLUMN "totalDuration" DROP NOT NULL,
ALTER COLUMN "last24HoursDuration" DROP NOT NULL,
ALTER COLUMN "last7DaysDuration" DROP NOT NULL;
