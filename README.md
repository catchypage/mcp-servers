# Empty-base


A modern web application template built with Next.js, featuring integrated payment processing, database management, and authentication.

## Features

- **Authentication**: NextAuth.js integration for secure user authentication
- **Database**: Supabase for data storage and management
- **Payments**: Stripe integration for payment processing
- **Modern UI**: Built with Tailwind CSS and React components
- **TypeScript**: Full TypeScript support for better development experience

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Supabase
- **Payments**: Stripe
- **Deployment**: Vercel-ready

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

## Database Migrations

Run migrations in Supabase SQL Editor (Dashboard > SQL Editor) in order:

1. **`supabase/migrations/20250301000000_init_auth_and_users.sql`** — Full schema: users, customers, products, prices, subscriptions, one_time_token_gpt (NextAuth + Stripe + OAuth GPT)
2. **`supabase/migrations/20250312000000_add_password_hash_to_users.sql`** — Only if you have an existing DB without password_hash (adds column + indices; safe no-op on fresh install)

For a **fresh database**, run only migration #1.

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable React components
- `/utils` - Utility functions and configurations
- `/types` - TypeScript type definitions
- `/supabase` - Database migrations and configuration

## License

MIT License
