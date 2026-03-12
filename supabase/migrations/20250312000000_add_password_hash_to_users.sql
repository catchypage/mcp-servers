-- Add password_hash column for email/password authentication
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Indexes for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON public.users(email);

-- Required for credentials users: NextAuth creates users directly in public.users (no auth.users entry)
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;
