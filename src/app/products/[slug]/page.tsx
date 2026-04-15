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
    <div className="max-w-[1440px] mx-auto py-16 px-20 max-md:px-10 max-sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-12">
        <span className="type-label text-outline">
          <Link href="/products" className="text-outline no-underline">Shop</Link>
          {' / '}
          <span className="text-on-surface">{slug}</span>
        </span>
      </nav>

      <div className="grid grid-cols-2 gap-24 max-md:grid-cols-1">
        {/* Image gallery */}
        <div>
          <div className="relative aspect-[3/4] bg-surface-high mb-4 overflow-hidden">
            <Image src="/mocks/apparel-1.png" alt="Product" fill className="object-cover" priority />
          </div>
          <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
            {['/mocks/apparel-1.png', '/mocks/apparel-2.png', '/mocks/apparel-3.png', '/mocks/apparel-4.png'].map((src, i) => (
              <div key={i} className="relative aspect-square bg-surface-low cursor-pointer overflow-hidden">
                <Image src={src} alt={`View ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="pt-4">
          <p className="type-label text-outline mb-3">JON / SS25</p>

          <h1 className="type-headline mb-4">
            Product Name
          </h1>

          <p className="text-2xl font-bold mb-10">
            Rp 599.000
          </p>

          {/* Size selector */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <span className="type-label">Size</span>
              <button
                className="type-label bg-transparent border-none border-b border-outline cursor-pointer p-0 text-on-surface-variant"
              >
                Size Guide
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className="w-[52px] h-[52px] border border-outline-variant rounded-none bg-transparent font-[inherit] text-[0.75rem] font-semibold tracking-[0.05em] cursor-pointer transition-all duration-150"
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
          <button className="btn-primary w-full mb-4">
            Add to Cart
          </button>

          <p className="text-sm text-on-surface-variant leading-[1.7]">
            Free shipping on orders over Rp 500.000. Easy 14-day returns.
          </p>

          {/* Description */}
          <div className="mt-12 border-t border-surface-high pt-8">
            <p className="type-label mb-4">Description</p>
            <p className="text-[0.9375rem] leading-[1.8] text-on-surface-variant">
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
