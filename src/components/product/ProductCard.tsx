import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const image = product.images.nodes[0]
  const price = product.priceRange.minVariantPrice

  return (
    <Link
      href={`/products/${product.handle}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <article
        style={{
          backgroundColor: '#fff',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        }}
      >
        {/* Image */}
        <div style={{ aspectRatio: '3/4', position: 'relative', backgroundColor: '#f3f3f3', overflow: 'hidden' }}>
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8' }} />
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem 0 1rem' }}>
          <p className="type-label" style={{ color: '#777', marginBottom: '0.4rem' }}>
            {product.collections.nodes[0]?.title ?? 'JON'}
          </p>
          <h3
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              margin: '0 0 0.5rem',
              lineHeight: 1.3,
            }}
          >
            {product.title}
          </h3>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
      </article>
    </Link>
  )
}
