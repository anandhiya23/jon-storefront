// Shopify Customer Account API — uses shop domain endpoint, raw token (no Bearer prefix)
const CUSTOMER_API = `https://${process.env.SHOPIFY_STORE_DOMAIN}/customer/api/2024-10/graphql`

interface GraphQLResponse<T> {
  data?: T
  errors?: { message: string }[]
}

export async function customerAccountFetch<T>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(CUSTOMER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken, // no "Bearer" prefix per Shopify docs
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  const json: GraphQLResponse<T> = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data as T
}

// ─── Queries ────────────────────────────────────────────────────────────────

export const GET_CUSTOMER_PROFILE = `
  query GetCustomerProfile {
    customer {
      id
      firstName
      lastName
      displayName
      emailAddress { emailAddress }
      phoneNumber { phoneNumber }
      defaultAddress {
        id firstName lastName address1 address2 city province country zip phoneNumber
      }
      addresses(first: 10) {
        nodes {
          id firstName lastName address1 address2 city province country zip phoneNumber
        }
      }
    }
  }
`

export const GET_CUSTOMER_ORDERS = `
  query GetCustomerOrders {
    customer {
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          number
          processedAt
          financialStatus
          fulfillmentStatus
          totalPrice { amount currencyCode }
          lineItems(first: 2) {
            nodes { title quantity }
          }
        }
      }
    }
  }
`

export const GET_CUSTOMER_ORDER = `
  query GetCustomerOrder($id: ID!) {
    order(id: $id) {
      id
      number
      processedAt
      financialStatus
      fulfillmentStatus
      totalPrice { amount currencyCode }
      subtotalPrice { amount currencyCode }
      totalShippingPrice { amount currencyCode }
      lineItems(first: 20) {
        nodes {
          title
          quantity
          variantTitle
          price { amount currencyCode }
          image { url altText }
        }
      }
      shippingAddress {
        firstName lastName address1 address2 city province country zip
      }
    }
  }
`

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CACustomer {
  id: string
  firstName: string | null
  lastName: string | null
  displayName: string
  emailAddress: { emailAddress: string } | null
  phoneNumber: { phoneNumber: string } | null
  defaultAddress: CAAddress | null
  addresses: { nodes: CAAddress[] }
}

export interface CAAddress {
  id: string
  firstName: string | null
  lastName: string | null
  address1: string | null
  address2: string | null
  city: string | null
  province: string | null
  country: string | null
  zip: string | null
  phoneNumber: string | null
}

export interface CAOrder {
  id: string
  number: number
  processedAt: string
  financialStatus: string | null
  fulfillmentStatus: string
  totalPrice: { amount: string; currencyCode: string }
  subtotalPrice?: { amount: string; currencyCode: string }
  totalShippingPrice?: { amount: string; currencyCode: string }
  lineItems: { nodes: CALineItem[] }
  shippingAddress: Omit<CAAddress, 'id' | 'phoneNumber'> | null
}

export interface CALineItem {
  title: string
  quantity: number
  variantTitle: string | null
  price: { amount: string; currencyCode: string } | null
  image: { url: string; altText: string | null } | null
}

// Encode/decode order GID for URL params
export function orderGidToParam(gid: string): string {
  return gid.split('/').pop()!
}
export function paramToOrderGid(param: string): string {
  return `gid://shopify/Order/${param}`
}
