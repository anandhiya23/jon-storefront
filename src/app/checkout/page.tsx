'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'

export default function CheckoutPage() {
  const router = useRouter()
  const cart = useCartStore((s) => s.cart)
  const cartId = useCartStore((s) => s.cartId)

  useEffect(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    } else if (!cartId) {
      router.replace('/cart')
    }
  }, [cart, cartId, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="type-label text-outline animate-pulse">Redirecting to checkout…</p>
    </div>
  )
}
