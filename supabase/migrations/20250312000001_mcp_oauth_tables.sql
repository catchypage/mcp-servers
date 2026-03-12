-- MCP OAuth tables for ChatGPT connector authentication
-- PKCE flow: authorize -> login -> callback -> token exchange

CREATE TABLE IF NOT EXISTS public.mcp_oauth_states (
  id text NOT NULL PRIMARY KEY,
  client_id text NOT NULL,
  redirect_uri text NOT NULL,
  scope text,
  state text NOT NULL,
  code_challenge text NOT NULL,
  code_challenge_method text NOT NULL DEFAULT 'S256',
  resource text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mcp_oauth_states_expires ON public.mcp_oauth_states(expires_at);

CREATE TABLE IF NOT EXISTS public.mcp_oauth_codes (
  code text NOT NULL PRIMARY KEY,
  client_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  redirect_uri text NOT NULL,
  scope text,
  code_challenge text NOT NULL,
  code_challenge_method text NOT NULL DEFAULT 'S256',
  resource text,
  state text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mcp_oauth_codes_expires ON public.mcp_oauth_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_mcp_oauth_codes_user ON public.mcp_oauth_codes(user_id);
