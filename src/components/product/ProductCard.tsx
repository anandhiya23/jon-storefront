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
      className="block no-underline text-inherit"
    >
      <article className="bg-white overflow-hidden cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-surface-low overflow-hidden group">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
            />
          ) : (
            <div className="w-full h-full bg-surface-high" />
          )}
        </div>

        {/* Info */}
        <div className="px-4 pt-5 pb-4">
          <p className="type-label text-outline mb-[0.4rem]">
            {product.collections.nodes[0]?.title ?? 'JON'}
          </p>
          <h3 className="text-[0.9375rem] font-medium m-0 mb-2 leading-[1.3]">
            {product.title}
          </h3>
          <p className="text-[0.9375rem] font-semibold m-0">
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>
      </article>
    </Link>
  )
}
