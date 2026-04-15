'use client'

import Link from 'next/link'
import Image from 'next/image'

const CATEGORIES = [
  { label: 'Tops', image: '/mocks/apparel-1.png' },
  { label: 'Bottoms', image: '/mocks/apparel-2.png' },
  { label: 'Outerwear', image: '/mocks/apparel-3.png' },
  { label: 'Accessories', image: '/mocks/apparel-4.png' },
]

export default function CategoryGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}
    >
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.label}
          href={`/products?collection=${cat.label.toLowerCase()}`}
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              backgroundColor: '#e8e8e8',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1.5rem',
              transition: 'transform 0.2s ease',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')
            }
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              style={{ objectFit: 'cover', opacity: 0.6 }}
            />
            <h2
              className="type-headline"
              style={{ position: 'relative', zIndex: 1, color: '#fff', fontSize: '1.25rem', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              {cat.label}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
