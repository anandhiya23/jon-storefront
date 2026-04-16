'use client'

import { useMemo, useState } from 'react'
import { useCartStore } from '@/store/cart'
import type { ProductVariant } from '@/types'

const SIZE_OPTION = 'size'

interface Props {
  variants: ProductVariant[]
}

export default function AddToCartForm({ variants }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const loading = useCartStore((s) => s.loading)

  const sizeOptions = useMemo(() => {
    const seen = new Set<string>()
    const out: string[] = []
    for (const v of variants) {
      const sizeOpt = v.selectedOptions.find((o) => o.name.toLowerCase() === SIZE_OPTION)
      if (sizeOpt && !seen.has(sizeOpt.value)) {
        seen.add(sizeOpt.value)
        out.push(sizeOpt.value)
      }
    }
    return out
  }, [variants])

  const hasSizes = sizeOptions.length > 0
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const activeVariant = useMemo(() => {
    if (!hasSizes) return variants[0] ?? null
    if (!selectedSize) return null
    return (
      variants.find((v) =>
        v.selectedOptions.some(
          (o) => o.name.toLowerCase() === SIZE_OPTION && o.value === selectedSize,
        ),
      ) ?? null
    )
  }, [variants, selectedSize, hasSizes])

  const canAdd = !!activeVariant && activeVariant.availableForSale && !loading

  let buttonLabel = 'Add to Cart'
  if (loading) buttonLabel = 'Adding…'
  else if (hasSizes && !selectedSize) buttonLabel = 'Select a Size'
  else if (activeVariant && !activeVariant.availableForSale) buttonLabel = 'Sold Out'

  async function handleAdd() {
    if (!activeVariant) return
    await addItem(activeVariant.id, 1)
  }

  return (
    <>
      {hasSizes && (
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className="type-label">Size</span>
            <button className="type-label bg-transparent border-none border-b border-outline cursor-pointer p-0 text-on-surface-variant">
              Size Guide
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {sizeOptions.map((size) => {
              const isActive = size === selectedSize
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-[52px] h-[52px] border rounded-none font-[inherit] text-[0.75rem] font-semibold tracking-[0.05em] cursor-pointer transition-all duration-150 ${
                    isActive
                      ? 'bg-black text-on-primary border-black'
                      : 'border-outline-variant bg-transparent hover:bg-black hover:text-on-primary hover:border-black'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={!canAdd}
        className="btn-primary w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonLabel}
      </button>
    </>
  )
}
