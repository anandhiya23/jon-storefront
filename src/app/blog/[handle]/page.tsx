import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_ARTICLE_BY_HANDLE } from '@/lib/shopify/queries'
import type { BlogArticle } from '@/types'

const BLOG_HANDLE = 'news'

type Props = { params: Promise<{ handle: string }> }

const fetchArticle = cache(async (handle: string): Promise<BlogArticle | null> => {
  const data = await storefrontFetch<{ blog: { articleByHandle: BlogArticle | null } | null }>(
    GET_ARTICLE_BY_HANDLE,
    { blogHandle: BLOG_HANDLE, articleHandle: handle },
  )
  return data.blog?.articleByHandle ?? null
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const article = await fetchArticle(handle)
  if (!article) return {}
  return {
    title: `${article.title} — JON`,
    description: article.excerpt ?? undefined,
    alternates: { canonical: `/blog/${handle}` },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { handle } = await params
  const article = await fetchArticle(handle)
  if (!article) notFound()

  return (
    <main className="py-24 px-20 bg-surface min-h-screen max-md:px-10 max-sm:px-6">
      <Link href="/blog" className="type-label text-outline no-underline hover:text-on-surface mb-12 inline-block">
        ← Journal
      </Link>

      <div className="max-w-[720px] mx-auto">
        <p className="type-label text-outline mb-4">
          {new Date(article.publishedAt).toLocaleDateString('en-ID', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
          {' · '}
          {article.author.name}
        </p>

        <h1 className="type-display mb-8">{article.title}</h1>

        {article.image && (
          <div className="aspect-[16/9] overflow-hidden mb-12 bg-surface-low">
            <img
              src={article.image.url}
              alt={article.image.altText ?? article.title}
              width={article.image.width}
              height={article.image.height}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </div>
    </main>
  )
}
