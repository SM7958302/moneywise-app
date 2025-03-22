# MoneyWise - Financial Literacy for Youth

A modern web application built with Next.js that helps young people learn about financial management through interactive games and AI-powered guidance.

## Features

- 🔒 Secure Authentication
- 📚 Interactive Learning Modules
- 🎮 Financial Games
- 💰 Financial Tools & Calculators
- 📊 Progress Tracking
- 📱 Responsive Design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- PostgreSQL

## Deployment on Vercel

1. Fork this repository to your GitHub account.

2. Create a Vercel account at [vercel.com](https://vercel.com) if you haven't already.

3. Create a new PostgreSQL database (you can use Vercel Postgres, Supabase, or any other provider).

4. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

5. Login to Vercel:
   ```bash
   vercel login
   ```

6. Deploy the project:
   ```bash
   vercel
   ```

7. Set up the following environment variables in your Vercel project settings:
   - `DATABASE_URL`: Your PostgreSQL database URL
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: A secure random string (generate using `openssl rand -base64 32`)

8. After setting up the environment variables, redeploy:
   ```bash
   vercel --prod
   ```

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/moneywise-app.git
   cd moneywise-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## License

MIT License

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

