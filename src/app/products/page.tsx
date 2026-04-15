import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

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

interface Props {
  searchParams: Promise<{ sort?: string; collection?: string; q?: string }>
}

export default async function ProductListingPage({ searchParams }: Props) {
  const params = await searchParams
  const { sort = 'CREATED_AT-desc', collection, q } = params

  // TODO: Wire to storefrontFetch(GET_PRODUCTS, { first: 24, sortKey, reverse, query })
  // For now rendering the shell with static placeholder grid

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

        {/* Sort */}
        <div className="flex items-center gap-4">
          <span className="type-label text-outline">Sort</span>
          <select
            defaultValue={sort}
            className="bg-transparent border-none border-b border-outline rounded-none py-1 font-[inherit] text-[0.75rem] tracking-[0.05em] cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-x-6 gap-y-8 max-md:grid-cols-2">
        {/* Placeholder cards — replace with <ProductCard product={p} /> when data is wired */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>
            <div className="relative aspect-[3/4] bg-surface-high mb-4 overflow-hidden">
              <Image
                src={`/mocks/apparel-${(i % 4) + 1}.png`}
                alt="Product"
                fill
                className="object-cover"
              />
            </div>
            <p className="type-label text-outline mb-[0.4rem]">Category</p>
            <p className="text-[0.9375rem] font-medium m-0 mb-[0.4rem]">
              Product Name
            </p>
            <p className="text-[0.9375rem] font-semibold">Rp 599.000</p>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="text-center mt-16">
        <button className="btn-secondary min-w-[200px]">
          Load More
        </button>
      </div>
    </div>
  )
}
