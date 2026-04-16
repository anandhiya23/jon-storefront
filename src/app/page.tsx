import Link from 'next/link'
import type { Metadata } from 'next'
import CategoryGrid from '@/components/product/CategoryGrid'
import ProductCard from '@/components/product/ProductCard'
import EmailSubscribeModal from '@/components/EmailSubscribeModal'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS } from '@/lib/shopify/queries'
import type { Product } from '@/types'

const HERO_VIDEO_ID = 'Bcpu-jqAL6w'

export const metadata: Metadata = {
  title: 'JON — Just One Nation',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const data = await storefrontFetch<{ products: { nodes: Product[] } }>(
    GET_PRODUCTS,
    { first: 4, sortKey: 'CREATED_AT', reverse: true },
  )
  const products = data.products.nodes

  return (
    <>
      <EmailSubscribeModal />

      {/* Hero */}
      <section className="relative h-[calc(100vh-64px)] bg-black flex flex-col items-start justify-end overflow-hidden px-20 py-20 max-md:px-10 max-sm:px-6 max-sm:py-12">
        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1`}
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-screen h-[56.25vw] min-h-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-none opacity-65"
            title="JON Campaign"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-[1] max-w-[800px]">
          <p className="type-label text-outline mb-6">
            SS25 Collection — Just One Nation
          </p>
          <h1
            className="type-display text-white mb-10 text-[clamp(3rem,8vw,6rem)]"
          >
            Built for those<br />who move with intent.
          </h1>
          <div className="flex gap-4 flex-wrap">
            <Link href="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link
              href="/products?collection=new"
              className="btn-secondary border-on-primary text-on-primary"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="py-24 px-20 bg-surface max-md:px-10 max-sm:px-6">
        <p className="type-label text-outline mb-12">
          Shop by Category
        </p>
        <CategoryGrid />
      </section>

      {/* Products */}
      <section className="py-24 px-20 bg-surface-low max-md:px-10 max-sm:px-6">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="type-headline">Products</h2>
          <Link
            href="/products"
            className="type-label text-on-surface no-underline border-b-2 border-black pb-[2px]"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="py-32 px-20 bg-black flex justify-between items-center gap-16 max-md:flex-col max-md:px-10 max-sm:px-6">
        <h2
          className="type-display text-white max-w-[600px] m-0 text-[clamp(2.5rem,5vw,4.5rem)]"
        >
          One nation.<br />One standard.
        </h2>
        <Link
          href="/products"
          className="btn-primary flex-shrink-0 min-w-[200px] text-center"
        >
          Explore All
        </Link>
      </section>

      {/* Trust bar */}
      <section className="py-16 px-20 bg-surface grid grid-cols-3 gap-8 text-center max-md:grid-cols-1 max-md:text-left max-md:px-10 max-sm:px-6">
        {[
          { label: 'Free Shipping', detail: 'On orders over Rp 500.000' },
          { label: 'Easy Returns', detail: '14-day hassle-free returns' },
          { label: 'Local Support', detail: 'WhatsApp & email support' },
        ].map((item) => (
          <div key={item.label}>
            <p className="type-label mb-2">
              {item.label}
            </p>
            <p className="text-on-surface-variant text-sm m-0">
              {item.detail}
            </p>
          </div>
        ))}
      </section>
    </>
  )
}
