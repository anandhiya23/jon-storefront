import type { NextAuthOptions } from 'next-auth'

const SHOP_ID = process.env.SHOPIFY_SHOP_ID!
const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID!

const AUTH_BASE = `https://shopify.com/authentication/${SHOP_ID}/oauth`
// No "Bearer" prefix — Shopify Customer Account API uses raw token
const CUSTOMER_API = `https://${SHOP_DOMAIN}/customer/api/2024-10/graphql`

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'shopify',
      name: 'Shopify',
      type: 'oauth',
      clientId: CLIENT_ID,
      clientSecret: '', // public client — no secret, PKCE handles auth
      authorization: {
        url: `${AUTH_BASE}/authorize`,
        params: {
          scope: 'openid email customer-account-api:full',
        },
      },
      token: `${AUTH_BASE}/token`,
      userinfo: {
        async request({ tokens }) {
          const res = await fetch(CUSTOMER_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Shopify Customer Account API: raw token, no "Bearer" prefix
              Authorization: tokens.access_token!,
            },
            body: JSON.stringify({
              query: `{
                customer {
                  id
                  displayName
                  emailAddress { emailAddress }
                }
              }`,
            }),
          })
          const json = await res.json()
          const c = json.data?.customer
          return {
            id: c?.id ?? '',
            name: c?.displayName ?? null,
            email: c?.emailAddress?.emailAddress ?? null,
          }
        },
      },
      profile(profile) {
        return { id: profile.id, name: profile.name, email: profile.email }
      },
      checks: ['pkce', 'state'],
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          idToken: account.id_token,
          expiresAt: account.expires_at ?? Math.floor(Date.now() / 1000) + 3600,
        }
      }
      // Still valid (30s buffer)
      if (Date.now() < ((token.expiresAt as number) * 1000) - 30_000) {
        return token
      }
      // Refresh
      try {
        const res = await fetch(`${AUTH_BASE}/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: CLIENT_ID,
            refresh_token: token.refreshToken as string,
            // no client_secret — public client uses PKCE only
          }),
        })
        if (!res.ok) throw new Error(`Refresh failed: ${res.status}`)
        const refreshed = await res.json()
        return {
          ...token,
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token ?? token.refreshToken,
          expiresAt: Math.floor(Date.now() / 1000) + (refreshed.expires_in ?? 3600),
          error: undefined,
        }
      } catch {
        return { ...token, error: 'RefreshAccessTokenError' as const }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.idToken = token.idToken as string | undefined
      session.error = token.error as string | undefined
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}
