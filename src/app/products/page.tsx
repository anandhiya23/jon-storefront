import type { Metadata } from 'next'
import ProductCard from '@/components/product/ProductCard'
import SortSelect from '@/components/product/SortSelect'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS } from '@/lib/shopify/queries'
import type { Product } from '@/types'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse the full JON sport apparel collection.',
  alternates: { canonical: '/products' },
}

const SORT_OPTIONS = [
  { value: 'CREATED_AT-desc', label: 'Newest' },
  { value: 'PRICE-asc', label: 'Price: Low to High' },
  { value: 'PRICE-desc', label: 'Price: High to Low' },
  { value: 'TITLE-asc', label: 'Name A–Z' },
]

const SORT_KEY_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
  'CREATED_AT-desc': { sortKey: 'CREATED_AT', reverse: true },
  'PRICE-asc': { sortKey: 'PRICE', reverse: false },
  'PRICE-desc': { sortKey: 'PRICE', reverse: true },
  'TITLE-asc': { sortKey: 'TITLE', reverse: false },
}

interface Props {
  searchParams: Promise<{ sort?: string; collection?: string; q?: string }>
}

interface ProductsResponse {
  products: {
    nodes: Product[]
    pageInfo: { hasNextPage: boolean; endCursor: string | null }
  }
}

export default async function ProductListingPage({ searchParams }: Props) {
  const params = await searchParams
  const { sort = 'CREATED_AT-desc', collection, q } = params
  const { sortKey, reverse } = SORT_KEY_MAP[sort] ?? SORT_KEY_MAP['CREATED_AT-desc']

  const queryParts: string[] = []
  if (collection) queryParts.push(`tag:${collection}`)
  if (q) queryParts.push(q)
  const queryString = queryParts.join(' ') || undefined

  const data = await storefrontFetch<ProductsResponse>(GET_PRODUCTS, {
    first: 24,
    sortKey,
    reverse,
    query: queryString,
  })

  const products = data.products.nodes

  return (
    <div className="max-w-[1440px] mx-auto py-16 px-20 max-md:px-10 max-sm:px-6">
      {/* Header */}
      <div className="flex justify-between items-baseline mb-12 border-b border-surface-high pb-8">
        <div>
          <p className="type-label text-outline mb-2">
            {collection ? collection.toUpperCase() : 'ALL PRODUCTS'}
          </p>
          <h1 className="type-headline m-0">
            {q ? `"${q}"` : collection ?? 'Shop'}
          </h1>
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
      {data.products.pageInfo.hasNextPage && (
        <div className="text-center mt-16">
          <button className="btn-secondary min-w-[200px]">
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
