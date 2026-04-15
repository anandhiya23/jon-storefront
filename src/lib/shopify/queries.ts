export const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 6) {
      nodes { url altText }
    }
    variants(first: 20) {
      nodes {
        id
        title
        availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
    collections(first: 3) {
      nodes { title handle }
    }
  }
`

export const GET_PRODUCTS = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
      nodes { ...ProductFields }
      pageInfo { hasNextPage endCursor }
    }
  }
`

export const GET_PRODUCT_BY_HANDLE = `
  ${PRODUCT_FRAGMENT}
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) { ...ProductFields }
  }
`

export const CREATE_CART = `
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 50) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product {
                  title
                  handle
                  images(first: 1) { nodes { url altText } }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
          totalTaxAmount { amount currencyCode }
        }
      }
    }
  }
`

export const ADD_TO_CART = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 50) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product {
                  title
                  handle
                  images(first: 1) { nodes { url altText } }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
          totalTaxAmount { amount currencyCode }
        }
      }
    }
  }
`

export const REMOVE_FROM_CART = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
    }
  }
`

export const CUSTOMER_LOGIN = `
  mutation CustomerLogin($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`

export const GET_CUSTOMER = `
  query GetCustomer($token: String!) {
    customer(customerAccessToken: $token) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        firstName lastName address1 address2 city province country zip phone
      }
      addresses(first: 10) {
        nodes { firstName lastName address1 address2 city province country zip phone }
      }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          orderNumber
          processedAt
          fulfillmentStatus
          financialStatus
          currentTotalPrice { amount currencyCode }
          lineItems(first: 10) {
            nodes {
              title
              quantity
              variant {
                price { amount currencyCode }
                image { url }
              }
            }
          }
          shippingAddress {
            firstName lastName address1 address2 city province country zip
          }
        }
      }
    }
  }
`
