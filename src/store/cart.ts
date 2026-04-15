'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Cart, CartItem } from '@/types'

interface CartStore {
  cartId: string | null
  cart: Cart | null
  isOpen: boolean
  setCart: (cart: Cart) => void
  setCartId: (id: string) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      isOpen: false,

      setCart: (cart) => set({ cart }),
      setCartId: (id) => set({ cartId: id }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      itemCount: () => {
        const lines = get().cart?.lines?.nodes ?? []
        return lines.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
      },
    }),
    { name: 'jon-cart', partialize: (s) => ({ cartId: s.cartId }) },
  ),
)
