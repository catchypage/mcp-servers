import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      supabaseUserId?: string
      created_at?: string | null
    }
  }

  interface User {
    supabaseUserId?: string
    created_at?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    supabaseUserId?: string
    created_at?: string | null
    lastRefresh?: number
  }
} 