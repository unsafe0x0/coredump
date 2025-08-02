-- CreateTable
CREATE TABLE "public"."User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "languageName" TEXT NOT NULL,
    "shortLanguageName" TEXT DEFAULT 'NULL',
    "totalDuration" DOUBLE PRECISION NOT NULL,
    "last24HoursDuration" DOUBLE PRECISION NOT NULL,
    "last7DaysDuration" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_gitUsername_key" ON "public"."User"("gitUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterUsername_key" ON "public"."User"("twitterUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_privateKey_key" ON "public"."User"("privateKey");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "public"."Activity"("userId");

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
