# NextAuth v4 → v5 Migration Plan

Migration guide based on this project's structure. Use when upgrading another app to NextAuth v5.

## 1. Install

```bash
npm install next-auth@beta
```

Current version in this project: `^5.0.0-beta.30`

---

## 2. File Structure

| v4 | v5 |
|----|-----|
| `pages/api/auth/[...nextauth].ts` (all config) | `auth.ts` (root) + `auth.config.ts` (Edge-compatible) |
| Pass `authOptions` everywhere | Import `auth`, `signIn`, `signOut`, `handlers` from `@/auth` |

---

## 3. Create auth.config.ts (Edge-compatible)

**Purpose:** Config for middleware. No bcrypt, Supabase, or other Node-only libs.

```ts
// auth.config.ts
import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

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
      }
      return session
    },
  },
} satisfies NextAuthConfig
```

---

## 4. Create auth.ts (root)

**Purpose:** Full config with providers, callbacks, adapters. Imports from `auth.config`.

```ts
// auth.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import authConfig from '@/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({ /* ... */ }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) { /* ... */ },
    async jwt({ token, user, account }) { /* ... */ },
    async session({ session, token }) { /* ... */ },
  },
})
```

---

## 5. Route Handler (App Router)

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth'

export const { GET, POST } = handlers
```

---

## 6. Middleware

**v4:**
```ts
import { withAuth } from 'next-auth/middleware'
export default withAuth({ ... })
```

**v5:**
```ts
// middleware.ts
import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const session = req.auth  // not req.nextauth.token
  // ...
  return NextResponse.next()
})

export const config = { matcher: [...] }
```

---

## 7. Replace Session Calls

| v4 | v5 |
|----|-----|
| `getServerSession(authOptions)` | `auth()` |
| `getServerSession(req, res, authOptions)` | `auth(req, res)` |
| `getToken(req)` | `auth(req, res)` → session |
| `withAuth(middleware)` | `auth(middleware)` |
| `useSession()` | `useSession()` (unchanged) |

**Example:**
```ts
// Before
import { getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'
const session = await getServerSession(authOptions)

// After
import { auth } from '@/auth'
const session = await auth()
```

---

## 8. Client Components (unchanged)

```ts
import { useSession, signIn, signOut } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
```

---

## 9. TypeScript

Extend types in `types/next-auth.d.ts`:

```ts
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      // ...
      supabaseUserId?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    supabaseUserId?: string
    // ...
  }
}
```

---

## 10. Environment Variables

- `AUTH_SECRET` or `NEXTAUTH_SECRET` — both work
- `NEXTAUTH_URL` / `AUTH_URL` — auto-detected in most cases
- Cookie prefix: `next-auth` → `authjs` (automatic)

---

## 11. Checklist

- [ ] Install `next-auth@beta`
- [ ] Create `auth.config.ts` (Edge-safe config)
- [ ] Create `auth.ts` (full config, spread authConfig)
- [ ] Update `app/api/auth/[...nextauth]/route.ts` → export handlers only
- [ ] Update `middleware.ts` → use `NextAuth(authConfig)` + `auth()` wrapper
- [ ] Replace `getServerSession` → `auth()`
- [ ] Replace `getToken` → `auth()`
- [ ] Update `types/next-auth.d.ts` if needed
- [ ] Remove `authOptions` exports and imports
- [ ] Test: login, logout, protected routes, middleware

---

## References

- [Official migration guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Edge compatibility](https://authjs.dev/guides/edge-compatibility)
