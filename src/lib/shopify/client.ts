const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`
const ADMIN_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`

interface GraphQLResponse<T> {
  data?: T
  errors?: { message: string }[]
}

export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  const json: GraphQLResponse<T> = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors[0].message)
  }

  return json.data as T
}

export async function adminFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json: GraphQLResponse<T> = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors[0].message)
  }

  return json.data as T
}
