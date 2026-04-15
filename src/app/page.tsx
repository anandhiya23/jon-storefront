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
      <section
        style={{
          height: 'calc(100vh - 64px)',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background video */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1`}
            allow="autoplay; encrypted-media"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',   /* 16:9 — grows with viewport width */
              minHeight: '100%',
              minWidth: '177.78vh', /* 16:9 — fills when viewport is tall */
              transform: 'translate(-50%, -50%)',
              border: 'none',
              opacity: 0.65,
            }}
            title="JON Campaign"
          />
        </div>
        {/* Dark overlay for text legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <p className="type-label" style={{ color: '#777', marginBottom: '1.5rem' }}>
            SS25 Collection — Just One Nation
          </p>
          <h1
            className="type-display"
            style={{
              color: '#fff',
              marginBottom: '2.5rem',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
            }}
          >
            Built for those<br />who move with intent.
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
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
      <section style={{ padding: '6rem 5rem', backgroundColor: '#f9f9f9' }}>
        <p className="type-label" style={{ color: '#777', marginBottom: '3rem' }}>
          Shop by Category
        </p>
        <CategoryGrid />
      </section>

      {/* Featured / New Arrivals */}
      <section style={{ padding: '6rem 5rem', backgroundColor: '#f3f3f3' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '3rem',
          }}
        >
          <h2 className="type-headline">New Arrivals</h2>
          <Link
            href="/products?collection=new"
            className="type-label"
            style={{
              color: '#1b1b1b',
              textDecoration: 'none',
              borderBottom: '2px solid #000',
              paddingBottom: '2px',
            }}
          >
            View All
          </Link>
        </div>
        {/* Placeholder grid — wire to storefrontFetch(GET_PRODUCTS) when Shopify is connected */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {(['/mocks/apparel-1.png', '/mocks/apparel-2.png', '/mocks/apparel-3.png', '/mocks/apparel-4.png']).map((src, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: '#e8e8e8' }}>
              <Image src={src} alt="New Arrival" fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section
        style={{
          padding: '8rem 5rem',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4rem',
        }}
      >
        <h2
          className="type-display"
          style={{
            color: '#fff',
            maxWidth: '600px',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            margin: 0,
          }}
        >
          One nation.<br />One standard.
        </h2>
        <Link
          href="/products"
          className="btn-primary"
          style={{ flexShrink: 0, minWidth: '200px', textAlign: 'center' }}
        >
          Explore All
        </Link>
      </section>

      {/* Trust bar */}
      <section
        style={{
          padding: '4rem 5rem',
          backgroundColor: '#f9f9f9',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          textAlign: 'center',
        }}
      >
        {[
          { label: 'Free Shipping', detail: 'On orders over Rp 500.000' },
          { label: 'Easy Returns', detail: '14-day hassle-free returns' },
          { label: 'Local Support', detail: 'WhatsApp & email support' },
        ].map((item) => (
          <div key={item.label}>
            <p className="type-label" style={{ marginBottom: '0.5rem' }}>
              {item.label}
            </p>
            <p style={{ color: '#474747', fontSize: '0.875rem', margin: 0 }}>
              {item.detail}
            </p>
          </div>
        ))}
      </section>
    </>
  )
}
