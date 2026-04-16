import type { Metadata } from 'next'
import CartContent from '@/components/cart/CartContent'

export const metadata: Metadata = {
  title: 'Cart',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return (
    <div className="max-w-[1440px] mx-auto py-16 px-20 max-md:px-10 max-sm:px-6">
      <h1 className="type-headline mb-12">
        Your Cart
      </h1>
      <CartContent />
    </div>
  )
}
