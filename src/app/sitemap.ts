import type { MetadataRoute } from 'next'
import { storefrontFetch } from '@/lib/shopify/client'
import { GET_PRODUCTS, GET_BLOG_ARTICLES } from '@/lib/shopify/queries'
import type { Product, BlogArticle } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jonperformance.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1 },
    { url: `${BASE_URL}/products`, priority: 0.9 },
    { url: `${BASE_URL}/blog`, priority: 0.8 },
    { url: `${BASE_URL}/support`, priority: 0.6 },
    { url: `${BASE_URL}/track`, priority: 0.5 },
    { url: `${BASE_URL}/privacy`, priority: 0.3 },
    { url: `${BASE_URL}/terms`, priority: 0.3 },
  ]

  const [productsData, articlesData] = await Promise.allSettled([
    storefrontFetch<{ products: { nodes: Pick<Product, 'handle'>[] } }>(
      GET_PRODUCTS,
      { first: 250 },
    ),
    storefrontFetch<{ blog: { articles: { nodes: Pick<BlogArticle, 'handle' | 'publishedAt'>[] } } | null }>(
      GET_BLOG_ARTICLES,
      { handle: 'news', first: 250 },
    ),
  ])

  const productRoutes: MetadataRoute.Sitemap =
    productsData.status === 'fulfilled'
      ? productsData.value.products.nodes.map((p) => ({
          url: `${BASE_URL}/products/${p.handle}`,
          priority: 0.8,
        }))
      : []

  const articleRoutes: MetadataRoute.Sitemap =
    articlesData.status === 'fulfilled' && articlesData.value.blog
      ? articlesData.value.blog.articles.nodes.map((a) => ({
          url: `${BASE_URL}/blog/${a.handle}`,
          lastModified: new Date(a.publishedAt),
          priority: 0.7,
        }))
      : []

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}
