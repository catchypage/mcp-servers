-- ============================================
-- Empty-base: Complete auth & users migration
-- NextAuth (Google + email/password) + Stripe + OAuth GPT
--
-- Run: Supabase Dashboard > SQL Editor > paste and run
-- Or: supabase db push (if using Supabase CLI)
-- ============================================

-- Enums
CREATE TYPE public.consent_status AS ENUM ('not_specified', 'consented', 'declined');
CREATE TYPE public.pricing_type AS ENUM ('one_time', 'recurring');
CREATE TYPE public.pricing_plan_interval AS ENUM ('day', 'week', 'month', 'year');
CREATE TYPE public.subscription_status AS ENUM (
  'trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired',
  'past_due', 'unpaid', 'paused'
);

-- ============================================
-- USERS
-- NextAuth: Google OAuth + Credentials (email/password)
-- No FK to auth.users - users created directly in public.users
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  full_name text,
  avatar_url text,
  billing_address jsonb,
  payment_method jsonb,
  consent_status public.consent_status NOT NULL DEFAULT 'not_specified',
  user_request text,
  gpt_id text,
  auth_id text,
  password_hash text,
  ip_address text,
  geo_location text,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON public.users(auth_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS: service role (supabaseAdmin) bypasses. For anon: no direct access.
-- App uses getServerSession + supabaseAdmin for user operations.
CREATE POLICY "Users are managed server-side" ON public.users
  FOR ALL USING (false) WITH CHECK (false);

-- ============================================
-- CUSTOMERS (Stripe)
-- ============================================
CREATE TABLE IF NOT EXISTS public.customers (
  id uuid NOT NULL PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_customer_id text
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PRODUCTS (Stripe)
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);

-- ============================================
-- PRICES (Stripe)
-- ============================================
CREATE TABLE IF NOT EXISTS public.prices (
  id text PRIMARY KEY,
  product_id text REFERENCES public.products(id),
  active boolean,
  currency text CHECK (char_length(currency) = 3),
  description text,
  unit_amount bigint,
  type public.pricing_type,
  interval public.pricing_plan_interval,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);

ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read prices" ON public.prices FOR SELECT USING (true);

-- ============================================
-- SUBSCRIPTIONS (Stripe)
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status public.subscription_status,
  metadata jsonb,
  price_id text REFERENCES public.prices(id),
  quantity integer,
  cancel_at_period_end boolean,
  created timestamptz DEFAULT now(),
  current_period_start timestamptz DEFAULT now(),
  current_period_end timestamptz DEFAULT now(),
  ended_at timestamptz,
  cancel_at timestamptz,
  canceled_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ONE_TIME_TOKEN_GPT (OAuth for ChatGPT/GPT plugins)
-- ============================================
CREATE TABLE IF NOT EXISTS public.one_time_token_gpt (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  token_type text DEFAULT 'bearer',
  access_token text,
  refresh_token text,
  expires_in integer,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_one_time_token_gpt_code ON public.one_time_token_gpt(code);

ALTER TABLE public.one_time_token_gpt ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Grant usage
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.customers TO service_role;
GRANT ALL ON public.products TO service_role;
GRANT ALL ON public.prices TO service_role;
GRANT ALL ON public.subscriptions TO service_role;
GRANT ALL ON public.one_time_token_gpt TO service_role;
