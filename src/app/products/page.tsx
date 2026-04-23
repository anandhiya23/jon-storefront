import type { Metadata } from 'next'
import ProductCard from '@/components/product/ProductCard'
import SortSelect from '@/components/product/SortSelect'
import LoadMoreProducts from '@/components/product/LoadMoreProducts'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS, GET_COLLECTION_PRODUCTS } from '@/lib/shopify/queries'
import type { Product } from '@/types'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse the full JON sport apparel collection.',
  alternates: { canonical: '/products' },
}

const SORT_OPTIONS = [
  { value: 'CREATED-desc', label: 'Newest' },
  { value: 'PRICE-asc', label: 'Price: Low to High' },
  { value: 'PRICE-desc', label: 'Price: High to Low' },
  { value: 'TITLE-asc', label: 'Name A–Z' },
]

// collectionByHandle uses ProductCollectionSortKeys (CREATED not CREATED_AT)
const COLLECTION_SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
  'CREATED-desc': { sortKey: 'CREATED', reverse: true },
  'PRICE-asc':    { sortKey: 'PRICE', reverse: false },
  'PRICE-desc':   { sortKey: 'PRICE', reverse: true },
  'TITLE-asc':    { sortKey: 'TITLE', reverse: false },
}

// GET_PRODUCTS uses ProductSortKeys (CREATED_AT not CREATED)
const PRODUCT_SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
  'CREATED-desc': { sortKey: 'CREATED_AT', reverse: true },
  'PRICE-asc':    { sortKey: 'PRICE', reverse: false },
  'PRICE-desc':   { sortKey: 'PRICE', reverse: true },
  'TITLE-asc':    { sortKey: 'TITLE', reverse: false },
}

interface Props {
  searchParams: Promise<{ sort?: string; collection?: string; q?: string }>
}

interface CollectionResponse {
  collectionByHandle: {
    title: string
    products: {
      nodes: Product[]
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
    }
  } | null
}

interface ProductsResponse {
  products: {
    nodes: Product[]
    pageInfo: { hasNextPage: boolean; endCursor: string | null }
  }
}

export default async function ProductListingPage({ searchParams }: Props) {
  const params = await searchParams
  const { sort = 'CREATED-desc', collection, q } = params

  let products: Product[] = []
  let hasNextPage = false
  let endCursor: string | null = null
  let collectionTitle: string | null = null

  if (collection) {
    // Use collectionByHandle — exact Shopify collection handle
    const { sortKey, reverse } = COLLECTION_SORT_MAP[sort] ?? COLLECTION_SORT_MAP['CREATED-desc']
    const data = await storefrontFetch<CollectionResponse>(GET_COLLECTION_PRODUCTS, {
      handle: collection,
      first: 24,
      sortKey,
      reverse,
    })
    const col = data.collectionByHandle
    products = col?.products.nodes ?? []
    hasNextPage = col?.products.pageInfo.hasNextPage ?? false
    endCursor = col?.products.pageInfo.endCursor ?? null
    collectionTitle = col?.title ?? collection
  } else {
    // General product listing with optional search query
    const { sortKey, reverse } = PRODUCT_SORT_MAP[sort] ?? PRODUCT_SORT_MAP['CREATED-desc']
    const data = await storefrontFetch<ProductsResponse>(GET_PRODUCTS, {
      first: 24,
      sortKey,
      reverse,
      query: q || undefined,
    })
    products = data.products.nodes
    hasNextPage = data.products.pageInfo.hasNextPage
    endCursor = data.products.pageInfo.endCursor
  }

  const heading = q ? `"${q}"` : collectionTitle ?? 'Shop'
  const label = q ? 'SEARCH' : collection ? (collectionTitle ?? collection).toUpperCase() : 'ALL PRODUCTS'

  return (
    <div className="max-w-[1440px] mx-auto py-16 px-20 max-md:px-10 max-sm:px-6">
      {/* Header */}
      <div className="flex justify-between items-baseline mb-12 border-b border-surface-high pb-8">
        <div>
          <p className="type-label text-outline mb-2">{label}</p>
          <h1 className="type-headline m-0">{heading}</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="type-label text-outline">Sort</span>
          <SortSelect value={sort} options={SORT_OPTIONS} />
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <p className="text-on-surface-variant py-24 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-4 gap-x-6 gap-y-8 max-md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Load more */}
      <LoadMoreProducts
        initialCursor={endCursor}
        initialHasNextPage={hasNextPage}
        collection={collection}
        sort={sort}
        query={q}
      />
    </div>
  )
}
