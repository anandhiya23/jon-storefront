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
    <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.label}
          href={`/products?collection=${cat.label.toLowerCase()}`}
          className="no-underline"
        >
          <div
            className="relative aspect-[3/4] bg-surface-high flex items-end p-6 transition-transform duration-200 ease-out overflow-hidden hover:-translate-y-1"
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <h2
              className="type-headline relative z-10 text-white text-[1.25rem] m-0"
            >
              {cat.label}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
