'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  altText: string | null
}

interface Props {
  images: GalleryImage[]
  productTitle: string
}

export default function ProductGallery({ images, productTitle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  return (
    <div>
      <div className="relative aspect-[3/4] bg-surface-high mb-4 overflow-hidden">
        {active && (
          <Image
            key={active.url}
            src={active.url}
            alt={active.altText ?? productTitle}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square bg-surface-low cursor-pointer overflow-hidden border p-0 transition-colors ${
                i === activeIndex ? 'border-black' : 'border-transparent hover:border-outline-variant'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${productTitle} view ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
