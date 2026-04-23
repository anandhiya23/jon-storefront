import Link from 'next/link'
import type { Metadata } from 'next'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_BLOG_ARTICLES } from '@/lib/shopify/queries'
import type { BlogArticle } from '@/types'

export const metadata: Metadata = {
  title: 'Journal — JON',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  const data = await storefrontFetch<{ blog: { articles: { nodes: BlogArticle[] } } | null }>(
    GET_BLOG_ARTICLES,
    { handle: 'news', first: 20 },
  )
  const articles = data.blog?.articles.nodes ?? []

  return (
    <main className="py-24 px-20 bg-surface min-h-screen max-md:px-10 max-sm:px-6">
      <h1 className="type-display mb-16">Journal</h1>

      {articles.length === 0 ? (
        <p className="text-on-surface-variant">No articles yet.</p>
      ) : (
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
              <h2 className="type-title text-on-surface mb-3 group-hover:underline">{article.title}</h2>
              {article.excerpt && (
                <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 m-0">{article.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
