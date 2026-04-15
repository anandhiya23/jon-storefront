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
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '4rem 5rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '3rem',
          borderBottom: '1px solid #e8e8e8',
          paddingBottom: '2rem',
        }}
      >
        <div>
          <p className="type-label" style={{ color: '#777', marginBottom: '0.5rem' }}>
            {collection ? collection.toUpperCase() : 'ALL PRODUCTS'}
          </p>
          <h1 className="type-headline" style={{ margin: 0 }}>
            {q ? `"${q}"` : collection ?? 'Shop'}
          </h1>
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="type-label" style={{ color: '#777' }}>Sort</span>
          <select
            defaultValue={sort}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #777',
              borderRadius: 0,
              padding: '0.25rem 0',
              fontFamily: 'inherit',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem 1.5rem',
        }}
      >
        {/* Placeholder cards — replace with <ProductCard product={p} /> when data is wired */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                backgroundColor: '#e8e8e8',
                marginBottom: '1rem',
                overflow: 'hidden',
              }}
            >
              <Image
                src={`/mocks/apparel-${(i % 4) + 1}.png`}
                alt="Product"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className="type-label" style={{ color: '#777', marginBottom: '0.4rem' }}>Category</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 500, margin: '0 0 0.4rem' }}>
              Product Name
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Rp 599.000</p>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <button className="btn-secondary" style={{ minWidth: '200px' }}>
          Load More
        </button>
      </div>
    </div>
  )
}
