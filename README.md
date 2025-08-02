# BashForge

<div align="center">

## Push Limits, Break Barriers and Dominate

A comprehensive coding tracking platform that helps developers monitor their progress, maintain daily streaks, compete on leaderboards, and enhance their programming skills through gamification.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Live Demo](https://bashforge.vercel.app) • [📖 Documentation](https://bashforge.vercel.app/how-to-use) • [🔌 VS Code Extension](https://github.com/unsafe0x0/BashForge-Extension)

</div>

## ✨ Features

### 🔥 Core Features

- **Daily Streak Tracking** - Build consistent coding habits with streak monitoring
- **Global Leaderboards** - Compete with developers worldwide (24h & 7-day rankings)
- **Multi-Language Support** - Track 25+ programming languages with detailed analytics
- **Real-time Progress** - Live coding time tracking and productivity insights
- **Developer Profiles** - Comprehensive profiles with coding statistics and achievements

### 📊 Analytics & Insights

- **Time Distribution** - Visual breakdown of coding time across languages
- **Progress Visualization** - Interactive charts and progress bars
- **Language Badges** - Beautiful badges showing your language proficiency
- **Weekly/Daily Reports** - Detailed coding activity summaries

### 🏆 Gamification

- **Achievement System** - Earn badges for milestones and accomplishments
- **Competitive Rankings** - Climb the global developer leaderboard
- **Streak Rewards** - Special recognition for consistent coding habits
- **Language Mastery** - Track and showcase expertise in different technologies

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS 4.0
- **State Management**: TanStack Query 5.84.0
- **Authentication**: NextAuth.js 4.24.11
- **Icons**: React Icons 5.5.0

### Backend

- **Database**: PostgreSQL with Prisma ORM 6.13.0
- **API**: Next.js API Routes
- **Caching**: LRU Cache 11.1.0
- **Authentication**: JWT + OAuth (Google)

### Development

- **Build Tool**: Turbopack (Next.js)
- **Type Safety**: TypeScript with strict mode
- **Code Quality**: ESLint
- **Database Management**: Prisma Studio

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- VS Code (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/unsafe0x0/BashForge.git
   cd BashForge/client
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
   DATABASE_URL="postgresql://username:password@localhost:5432/bashforge"

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
   - Download from [GitHub](https://github.com/unsafe0x0/BashForge-Extension)
   - Or search "BashForge" in VS Code marketplace

## 📁 Project Structure

```
client/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── leaderboard/       # Leaderboard pages
│   └── profile/           # User profile pages
├── components/            # React components
│   ├── ui/                # Reusable UI components
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

## 🎯 Key Components

### Leaderboard System

- **Real-time Rankings**: Live updates of developer standings
- **Time-based Filtering**: Switch between 24-hour and 7-day views
- **Language Analytics**: See top languages for each developer
- **Streak Tracking**: Monitor coding consistency

### Developer Profiles

- **Personal Statistics**: Total time, streak, languages count
- **Language Distribution**: Visual breakdown of coding time
- **Progress Tracking**: Historical data and trends
- **Social Integration**: GitHub and Twitter links

### Analytics Dashboard

- **Time Tracking**: Detailed coding session analytics
- **Language Insights**: Usage patterns across technologies
- **Progress Visualization**: Charts and progress indicators
- **Goal Setting**: Personal targets and achievements

## 🔧 API Endpoints

```typescript
GET  /api/leaderboard      # Get leaderboard data
POST /api/profile          # Get user profile data
POST /api/update           # Update coding activity
GET  /api/dashboard        # Get dashboard analytics
POST /api/auth/register    # User registration
GET  /api/activity         # Get user activity data
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">

**Made with ❤️ by UnsafeZero, for developers**

[Website](https://bashforge.vercel.app) • [GitHub](https://github.com/unsafe0x0) • [Twitter](https://twitter.com/unsafezero) • [Discord](https://discord.gg/unsafezero)

</div>
