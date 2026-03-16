import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

/**
 * Edge-compatible auth config for middleware.
 * No bcrypt, supabase, or posthog - these run only in Node.js routes.
 */
export default {
  providers: [
    Google({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub

        if (token.supabaseUserId) {
          session.user.supabaseUserId = token.supabaseUserId
        }

        if (token.lastRefresh) {
          ;(session as { lastRefresh?: number }).lastRefresh =
            token.lastRefresh as number
        }
      }
      return session
    },
  },
} satisfies NextAuthConfig
