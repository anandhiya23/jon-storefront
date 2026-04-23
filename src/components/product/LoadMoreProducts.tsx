'use client'

import { useState, useTransition } from 'react'
import ProductCard from './ProductCard'
import { loadMoreProducts } from '@/app/products/actions'
import type { Product } from '@/types'

interface Props {
  initialCursor: string | null
  initialHasNextPage: boolean
  collection?: string
  sort: string
  query?: string
}

export default function LoadMoreProducts({
  initialCursor,
  initialHasNextPage,
  collection,
  sort,
  query,
}: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [cursor, setCursor] = useState(initialCursor)
  const [hasMore, setHasMore] = useState(initialHasNextPage)
  const [isPending, startTransition] = useTransition()

  if (!hasMore && products.length === 0) return null

  const handleLoadMore = () => {
    if (!cursor) return
    startTransition(async () => {
      const result = await loadMoreProducts({ after: cursor, collection, sort, query })
      setProducts((prev) => [...prev, ...result.products])
      setCursor(result.endCursor)
      setHasMore(result.hasNextPage)
    })
  }

  return (
    <>
      {products.length > 0 && (
        <div className="grid grid-cols-4 gap-x-6 gap-y-8 max-md:grid-cols-2 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {hasMore && (
        <div className="text-center mt-16">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="btn-secondary min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Loading…' : 'Load More'}
          </button>
        </div>
      )}
    </>
  )
}
