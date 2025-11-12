-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateEnum
CREATE TYPE "Month" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gitUsername" TEXT NOT NULL,
    "twitterUsername" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "password" TEXT,
    "privateKey" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "streak" INTEGER DEFAULT 0,
    "achievements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "streakUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "googleId" TEXT,
    "totalPoints" INTEGER DEFAULT 0,
    "maxStreak" INTEGER DEFAULT 0,
    "website" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "languageName" TEXT NOT NULL,
    "shortLanguageName" TEXT NOT NULL DEFAULT 'NULL',
    "totalDuration" DOUBLE PRECISION DEFAULT 0,
    "last24HoursDuration" DOUBLE PRECISION DEFAULT 0,
    "last7DaysDuration" DOUBLE PRECISION DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last30DaysDuration" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "DailyActivity" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekDay" "WeekDay" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DailyActivity_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "MonthlyActivity" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "month" "Month" NOT NULL,
    "year" INTEGER NOT NULL,
    "totalDuration" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MonthlyActivity_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_gitUsername_key" ON "User"("gitUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterUsername_key" ON "User"("twitterUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_privateKey_key" ON "User"("privateKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "User_privateKey_idx" ON "User"("privateKey");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_userId_languageName_key" ON "Activity"("userId", "languageName");

-- CreateIndex
CREATE INDEX "DailyActivity_userId_weekDay_idx" ON "DailyActivity"("userId", "weekDay");

-- CreateIndex
CREATE INDEX "DailyActivity_userId_date_idx" ON "DailyActivity"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyActivity_userId_date_key" ON "DailyActivity"("userId", "date");

-- CreateIndex
CREATE INDEX "MonthlyActivity_userId_year_month_idx" ON "MonthlyActivity"("userId", "year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyActivity_userId_month_year_key" ON "MonthlyActivity"("userId", "month", "year");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyActivity" ADD CONSTRAINT "DailyActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyActivity" ADD CONSTRAINT "MonthlyActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

