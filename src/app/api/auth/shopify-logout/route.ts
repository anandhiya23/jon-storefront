import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

// Redirects to Shopify's end_session endpoint with id_token_hint,
// which invalidates the Shopify SSO session before returning to /auth/login.
// Must be a browser redirect (not fetch) — Shopify requires Accept: text/html.
export async function GET() {
  const session = await getServerSession(authOptions)

  const shopId = process.env.SHOPIFY_SHOP_ID!
  const postLogoutUri = encodeURIComponent(`${process.env.NEXTAUTH_URL}/auth/login`)
  const logoutBase = `https://shopify.com/authentication/${shopId}/logout`

  const shopifyLogoutUrl = session?.idToken
    ? `${logoutBase}?id_token_hint=${session.idToken}&post_logout_redirect_uri=${postLogoutUri}`
    : `${logoutBase}?post_logout_redirect_uri=${postLogoutUri}`

  redirect(shopifyLogoutUrl)
}
