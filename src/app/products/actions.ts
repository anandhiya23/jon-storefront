'use server'

import { storefrontFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS, GET_COLLECTION_PRODUCTS } from '@/lib/shopify/queries'
import type { Product } from '@/types'

const COLLECTION_SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
  'CREATED-desc': { sortKey: 'CREATED', reverse: true },
  'PRICE-asc':    { sortKey: 'PRICE', reverse: false },
  'PRICE-desc':   { sortKey: 'PRICE', reverse: true },
  'TITLE-asc':    { sortKey: 'TITLE', reverse: false },
}

const PRODUCT_SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
  'CREATED-desc': { sortKey: 'CREATED_AT', reverse: true },
  'PRICE-asc':    { sortKey: 'PRICE', reverse: false },
  'PRICE-desc':   { sortKey: 'PRICE', reverse: true },
  'TITLE-asc':    { sortKey: 'TITLE', reverse: false },
}

export interface LoadMoreResult {
  products: Product[]
  endCursor: string | null
  hasNextPage: boolean
}

export async function loadMoreProducts(params: {
  after: string
  collection?: string
  sort: string
  query?: string
}): Promise<LoadMoreResult> {
  const { after, collection, sort, query } = params

  if (collection) {
    const { sortKey, reverse } = COLLECTION_SORT_MAP[sort] ?? COLLECTION_SORT_MAP['CREATED-desc']
    const data = await storefrontFetch<{
      collectionByHandle: {
        products: {
          nodes: Product[]
          pageInfo: { hasNextPage: boolean; endCursor: string | null }
        }
      } | null
    }>(GET_COLLECTION_PRODUCTS, { handle: collection, first: 24, after, sortKey, reverse })
    const col = data.collectionByHandle
    return {
      products: col?.products.nodes ?? [],
      endCursor: col?.products.pageInfo.endCursor ?? null,
      hasNextPage: col?.products.pageInfo.hasNextPage ?? false,
    }
  }

  const { sortKey, reverse } = PRODUCT_SORT_MAP[sort] ?? PRODUCT_SORT_MAP['CREATED-desc']
  const data = await storefrontFetch<{
    products: {
      nodes: Product[]
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
    }
  }>(GET_PRODUCTS, { first: 24, after, sortKey, reverse, query: query || undefined })
  return {
    products: data.products.nodes,
    endCursor: data.products.pageInfo.endCursor,
    hasNextPage: data.products.pageInfo.hasNextPage,
  }
}
