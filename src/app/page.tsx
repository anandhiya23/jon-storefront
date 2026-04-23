import Link from 'next/link'
import type { Metadata } from 'next'
import CategoryGrid from '@/components/product/CategoryGrid'
import ProductCard from '@/components/product/ProductCard'
import EmailSubscribeModal from '@/components/EmailSubscribeModal'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS, GET_BLOG_ARTICLES } from '@/lib/shopify/queries'
import type { Product, BlogArticle } from '@/types'


export const metadata: Metadata = {
  title: 'JON — Just One Nation',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [productData, blogData] = await Promise.all([
    storefrontFetch<{ products: { nodes: Product[] } }>(
      GET_PRODUCTS,
      { first: 4, sortKey: 'CREATED_AT', reverse: true },
    ),
    storefrontFetch<{ blog: { articles: { nodes: BlogArticle[] } } | null }>(
      GET_BLOG_ARTICLES,
      { handle: 'news', first: 3 },
    ),
  ])
  const products = productData.products.nodes
  const articles = blogData.blog?.articles.nodes ?? []

  return (
    <>
      <EmailSubscribeModal />

      {/* Hero */}
      <section className="relative h-[calc(100vh-64px)] bg-black flex flex-col items-start justify-end overflow-hidden px-20 py-20 max-md:px-10 max-sm:px-6 max-sm:py-12">
        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            src="https://0fbb86-09.myshopify.com/cdn/shop/videos/c/vp/080305df92164f1e958de5f36ccb1e29/080305df92164f1e958de5f36ccb1e29.HD-1080p-7.2Mbps-64107924.mp4?v=0"
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 w-screen h-[56.25vw] min-h-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 object-cover opacity-65"
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

      {/* Blog */}
      {articles.length > 0 && (
        <section className="py-24 px-20 bg-surface max-md:px-10 max-sm:px-6">
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="type-headline">Journal</h2>
            <Link
              href="/blog"
              className="type-label text-on-surface no-underline border-b-2 border-black pb-[2px]"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.handle}`}
                className="group no-underline"
              >
                {article.image && (
                  <div className="aspect-[4/3] overflow-hidden mb-5 bg-surface-low">
                    <img
                      src={article.image.url}
                      alt={article.image.altText ?? article.title}
                      width={article.image.width}
                      height={article.image.height}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <p className="type-label text-outline mb-2">
                  {new Date(article.publishedAt).toLocaleDateString('en-ID', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
                <h3 className="type-title text-on-surface mb-3 group-hover:underline">{article.title}</h3>
                {article.excerpt && (
                  <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 m-0">{article.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

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
