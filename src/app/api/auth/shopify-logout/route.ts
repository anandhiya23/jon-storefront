import { redirect } from 'next/navigation'

// Receives id_token as query param (captured client-side before next-auth session is cleared)
// Redirects to Shopify's end_session endpoint to invalidate the Shopify SSO session.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const idToken = searchParams.get('id_token') ?? ''

  const shopId = process.env.SHOPIFY_SHOP_ID!
  const postLogoutUri = encodeURIComponent(`${process.env.NEXTAUTH_URL}/auth/login`)
  const logoutBase = `https://shopify.com/authentication/${shopId}/logout`

  const shopifyLogoutUrl = idToken
    ? `${logoutBase}?id_token_hint=${idToken}&post_logout_redirect_uri=${postLogoutUri}`
    : `${logoutBase}?post_logout_redirect_uri=${postLogoutUri}`

  redirect(shopifyLogoutUrl)
}
