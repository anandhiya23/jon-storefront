import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import CategoryGrid from '@/components/product/CategoryGrid'
import EmailSubscribeModal from '@/components/EmailSubscribeModal'

const HERO_VIDEO_ID = 'Bcpu-jqAL6w'

export const metadata: Metadata = {
  title: 'JON — Just One Nation',
  alternates: { canonical: '/' },
}

export default function HomePage() {
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
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100%',
              minWidth: '177.78vh',
              transform: 'translate(-50%, -50%)',
              border: 'none',
              opacity: 0.65,
            }}
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
            className="type-display text-white mb-10"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            Built for those<br />who move with intent.
          </h1>
          <div className="flex gap-4 flex-wrap">
            <Link href="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link
              href="/products?collection=new"
              className="btn-secondary"
              style={{ borderColor: '#e2e2e2', color: '#e2e2e2' }}
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

      {/* Featured / New Arrivals */}
      <section className="py-24 px-20 bg-surface-low max-md:px-10 max-sm:px-6">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="type-headline">New Arrivals</h2>
          <Link
            href="/products?collection=new"
            className="type-label text-on-surface no-underline border-b-2 border-black pb-[2px]"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2">
          {(['/mocks/apparel-1.png', '/mocks/apparel-2.png', '/mocks/apparel-3.png', '/mocks/apparel-4.png']).map((src, i) => (
            <div key={i} className="relative aspect-[3/4] bg-surface-high">
              <Image src={src} alt="New Arrival" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="py-32 px-20 bg-black flex justify-between items-center gap-16 max-md:flex-col max-md:px-10 max-sm:px-6">
        <h2
          className="type-display text-white max-w-[600px] m-0"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
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
