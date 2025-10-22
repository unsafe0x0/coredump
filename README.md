# CoreDump

<div align="center">

## Push Limits, Break Barriers and Dominate

A comprehensive coding tracking platform that helps developers monitor their progress, maintain daily streaks, compete on leaderboards, and enhance their programming skills through gamification.

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-fff?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth-333333?style=for-the-badge&logo=nextauth.js)](https://next-auth.js.org/)

[Live Demo](https://CoreDump.vercel.app) • [Documentation](https://CoreDump.vercel.app/how-to-use) • [VS Code Extension](https://github.com/unsafe0x0/CoreDump-Extension)

</div>

## Features

### Core Features

- **Daily Streak Tracking** - Build consistent coding habits with streak monitoring
- **Global Leaderboards** - Compete with developers (24h & 7-day rankings)
- **Multi-Language Support** - Track programming languages with detailed analytics
- **Real-time Progress** - Live coding time tracking and productivity insights
- **Developer Profiles** - Comprehensive profiles with coding statistics and achievements
- **Readme Card** - Showcase your coding stats on GitHub with dynamic readme cards

### Analytics & Insights

- **Time Distribution** - Visual breakdown of coding time across languages
- **Language Badges** - Beautiful badges showing your language proficiency
- **Weekly/Daily** - Detailed coding activity summaries

## Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: TanStack Query
- **Authentication**: NextAuth.js
- **Icons**: React Icons

### Backend

- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API Routes
- **Authentication**: JWT + NextAuth (Google)

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- VS Code (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/unsafe0x0/CoreDump.git
   cd CoreDump
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/CoreDump"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth (Google)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Install VS Code Extension**
   - Download from [GitHub](https://github.com/unsafe0x0/CoreDump-Extension)
   - Or search "CoreDump" in VS Code marketplace

## Project Structure

```
client/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── leaderboard/       # Leaderboard pages
│   └── profile/           # User profile pages
├── components/            # React components
│   ├── common/            # Common UI components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── leaderboard/       # Leaderboard components
│   ├── profile/           # Profile components
│   └── landing/           # Landing page components
├── prisma/                # Database schema & client
├── utils/                 # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**Made by UnsafeZero, for developers**

[Website](https://CoreDump.vercel.app) • [GitHub](https://github.com/unsafe0x0) • [Twitter](https://twitter.com/unsafezero) • [Discord](https://discord.gg/unsafezero)

</div>
