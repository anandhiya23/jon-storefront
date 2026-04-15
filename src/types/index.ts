export interface Product {
  id: string
  handle: string
  title: string
  description: string
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  images: { nodes: { url: string; altText: string | null }[] }
  variants: { nodes: ProductVariant[] }
  tags: string[]
  collections: { nodes: { title: string; handle: string }[] }
}

export interface ProductVariant {
  id: string
  title: string
  price: { amount: string; currencyCode: string }
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
}

export interface CartItem {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string; currencyCode: string }
    product: {
      title: string
      handle: string
      images: { nodes: { url: string; altText: string | null }[] }
    }
  }
}

export interface Cart {
  id: string
  lines: { nodes: CartItem[] }
  cost: {
    subtotalAmount: { amount: string; currencyCode: string }
    totalAmount: { amount: string; currencyCode: string }
    totalTaxAmount: { amount: string; currencyCode: string } | null
  }
  checkoutUrl: string
}

export interface Order {
  id: string
  orderNumber: number
  processedAt: string
  fulfillmentStatus: string
  financialStatus: string
  currentTotalPrice: { amount: string; currencyCode: string }
  lineItems: {
    nodes: {
      title: string
      quantity: number
      variant: { price: { amount: string; currencyCode: string }; image: { url: string } | null } | null
    }[]
  }
  shippingAddress: ShippingAddress | null
}

export interface ShippingAddress {
  firstName: string | null
  lastName: string | null
  address1: string | null
  address2: string | null
  city: string | null
  province: string | null
  country: string | null
  zip: string | null
  phone: string | null
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  defaultAddress: ShippingAddress | null
  addresses: { nodes: ShippingAddress[] }
  orders: { nodes: Order[] }
}
