import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // TODO: fetch product and use real title/description
  return {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    alternates: { canonical: `/products/${slug}` },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  // TODO: const product = await storefrontFetch(GET_PRODUCT_BY_HANDLE, { handle: slug })

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '4rem 5rem' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '3rem' }}>
        <span className="type-label" style={{ color: '#777' }}>
          <Link href="/products" style={{ color: '#777', textDecoration: 'none' }}>Shop</Link>
          {' / '}
          <span style={{ color: '#1b1b1b' }}>{slug}</span>
        </span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
        {/* Image gallery */}
        <div>
          <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#e8e8e8', marginBottom: '1rem', overflow: 'hidden' }}>
            <Image src="/mocks/apparel-1.png" alt="Product" fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {['/mocks/apparel-1.png', '/mocks/apparel-2.png', '/mocks/apparel-3.png', '/mocks/apparel-4.png'].map((src, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#f3f3f3', cursor: 'pointer', overflow: 'hidden' }}>
                <Image src={src} alt={`View ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div style={{ paddingTop: '1rem' }}>
          <p className="type-label" style={{ color: '#777', marginBottom: '0.75rem' }}>JON / SS25</p>

          <h1 className="type-headline" style={{ marginBottom: '1rem' }}>
            Product Name
          </h1>

          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '2.5rem',
            }}
          >
            Rp 599.000
          </p>

          {/* Size selector */}
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <span className="type-label">Size</span>
              <button
                className="type-label"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: '1px solid #777',
                  padding: 0,
                  color: '#474747',
                }}
              >
                Size Guide
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  style={{
                    width: '52px',
                    height: '52px',
                    border: '1px solid #c6c6c6',
                    borderRadius: 0,
                    background: 'transparent',
                    fontFamily: 'inherit',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = '#000'
                    el.style.color = '#e2e2e2'
                    el.style.borderColor = '#000'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.color = '#1b1b1b'
                    el.style.borderColor = '#c6c6c6'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            Add to Cart
          </button>

          <p style={{ fontSize: '0.875rem', color: '#474747', lineHeight: 1.7 }}>
            Free shipping on orders over Rp 500.000. Easy 14-day returns.
          </p>

          {/* Description */}
          <div style={{ marginTop: '3rem', borderTop: '1px solid #e8e8e8', paddingTop: '2rem' }}>
            <p className="type-label" style={{ marginBottom: '1rem' }}>Description</p>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#474747' }}>
              {/* TODO: product.description */}
              Premium sport apparel engineered for performance and precision.
              Built with technical fabrics that move with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
