import { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/product/ProductGallery'
import AddToCartForm from '@/components/product/AddToCartForm'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify/queries'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

const fetchProduct = cache(async (handle: string): Promise<Product | null> => {
  const data = await storefrontFetch<{ productByHandle: Product | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle },
  )
  return data.productByHandle
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProduct(slug)
  if (!product) return { title: 'Not Found' }
  return {
    title: product.title,
    description: product.description?.slice(0, 160),
    alternates: { canonical: `/products/${slug}` },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await fetchProduct(slug)
  if (!product) notFound()

  const images = product.images.nodes
  const price = product.priceRange.minVariantPrice
  const collection = product.collections.nodes[0]?.title ?? 'JON'

  return (
    <div className="max-w-[1440px] mx-auto py-16 px-20 max-md:px-10 max-sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-12">
        <span className="type-label text-outline">
          <Link href="/products" className="text-outline no-underline">Shop</Link>
          {' / '}
          <span className="text-on-surface">{product.title}</span>
        </span>
      </nav>

      <div className="grid grid-cols-2 gap-24 max-md:grid-cols-1">
        {/* Image gallery */}
        <ProductGallery images={images} productTitle={product.title} />

        {/* Product info */}
        <div className="pt-4">
          <p className="type-label text-outline mb-3">{collection}</p>

          <h1 className="type-headline mb-4">
            {product.title}
          </h1>

          <p className="text-2xl font-bold mb-10">
            {formatPrice(price.amount, price.currencyCode)}
          </p>

          <AddToCartForm variants={product.variants.nodes} />

          <p className="text-sm text-on-surface-variant leading-[1.7]">
            Free shipping on orders over Rp 500.000. Easy 14-day returns.
          </p>

          {/* Description */}
          {product.description && (
            <div className="mt-12 border-t border-surface-high pt-8">
              <p className="type-label mb-4">Description</p>
              <p className="text-[0.9375rem] leading-[1.8] text-on-surface-variant whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
