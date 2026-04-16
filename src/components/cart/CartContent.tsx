'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export default function CartContent() {
  const cart = useCartStore((s) => s.cart)
  const loading = useCartStore((s) => s.loading)
  const updateItem = useCartStore((s) => s.updateItem)
  const removeItem = useCartStore((s) => s.removeItem)

  const lines = cart?.lines.nodes ?? []
  const isEmpty = lines.length === 0

  return (
    <div className="grid grid-cols-[1fr_400px] gap-20 max-md:grid-cols-1 max-md:gap-12">
      <div>
        {isEmpty ? (
          <div className="py-20 border-t border-surface-high text-center">
            <p className="text-on-surface-variant mb-8">Your cart is empty.</p>
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="border-t border-surface-high">
            {lines.map((line) => {
              const img = line.merchandise.product.images.nodes[0]
              const price = line.merchandise.price
              return (
                <div
                  key={line.id}
                  className="flex gap-6 py-6 border-b border-surface-high items-start"
                >
                  <Link
                    href={`/products/${line.merchandise.product.handle}`}
                    className="relative w-24 h-32 bg-surface-low shrink-0 overflow-hidden block"
                  >
                    {img && (
                      <Image
                        src={img.url}
                        alt={img.altText ?? line.merchandise.product.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </Link>

                  <div className="flex-1">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      className="font-semibold text-[0.9375rem] no-underline text-on-surface block mb-1"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    <p className="type-label text-outline mb-4">
                      {line.merchandise.title}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-outline-variant">
                        <button
                          type="button"
                          onClick={() => updateItem(line.id, line.quantity - 1)}
                          disabled={loading || line.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 bg-transparent border-none cursor-pointer disabled:opacity-30"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={loading}
                          aria-label="Increase quantity"
                          className="w-8 h-8 bg-transparent border-none cursor-pointer disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        disabled={loading}
                        className="type-label bg-transparent border-none border-b border-outline cursor-pointer p-0 text-on-surface-variant disabled:opacity-30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-semibold text-[0.9375rem] shrink-0">
                    {formatPrice(price.amount, price.currencyCode)}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="bg-surface-low p-8 self-start">
        <p className="type-label mb-8">Order Summary</p>

          <div className="border-t border-surface-high pt-6">
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-on-surface-variant">Subtotal</span>
              <span>
                {cart
                  ? formatPrice(
                      cart.cost.subtotalAmount.amount,
                      cart.cost.subtotalAmount.currencyCode,
                    )
                  : '—'}
              </span>
            </div>
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-on-surface-variant">Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-surface-high font-bold text-base">
              <span>Total</span>
              <span>
                {cart
                  ? formatPrice(
                      cart.cost.totalAmount.amount,
                      cart.cost.totalAmount.currencyCode,
                    )
                  : '—'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl
            }}
            disabled={isEmpty || loading}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
      </div>
    </div>
  )
}
