-- ============================================
-- Lang Coach user profiles
-- Stores placement test results, preferences,
-- and future streak/practice data.
-- ============================================

CREATE TABLE IF NOT EXISTS public.langcoach_profiles (
  user_id        uuid NOT NULL PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  placement_level text,                          -- CEFR level: A1, A2, B1, B2, C1
  placement_score integer,                       -- weighted score from last test
  placement_pct   integer,                       -- percentage correct
  placement_date  timestamptz,                   -- when test was last taken
  ui_locale       text NOT NULL DEFAULT 'en',    -- interface language
  theme           text NOT NULL DEFAULT 'dark',  -- 'dark' or 'light'
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.langcoach_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Langcoach profiles managed server-side"
  ON public.langcoach_profiles FOR ALL
  USING (false) WITH CHECK (false);

GRANT ALL ON public.langcoach_profiles TO service_role;
