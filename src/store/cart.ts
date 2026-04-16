'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  createCartAction,
  addToCartAction,
  updateCartLinesAction,
  removeFromCartAction,
  getCartAction,
} from '@/lib/shopify/cart-actions'
import type { Cart } from '@/types'

interface CartStore {
  cartId: string | null
  cart: Cart | null
  loading: boolean

  hydrate: () => Promise<void>
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      loading: false,

      hydrate: async () => {
        const id = get().cartId
        if (!id) return
        try {
          const cart = await getCartAction(id)
          if (cart) set({ cart })
          else set({ cartId: null, cart: null })
        } catch {
          set({ cartId: null, cart: null })
        }
      },

      addItem: async (merchandiseId, quantity = 1) => {
        set({ loading: true })
        try {
          const id = get().cartId
          const cart = id
            ? await addToCartAction(id, [{ merchandiseId, quantity }])
            : await createCartAction([{ merchandiseId, quantity }])
          set({ cart, cartId: cart.id })
        } finally {
          set({ loading: false })
        }
      },

      updateItem: async (lineId, quantity) => {
        const id = get().cartId
        if (!id) return
        set({ loading: true })
        try {
          const cart = await updateCartLinesAction(id, [{ id: lineId, quantity }])
          set({ cart })
        } finally {
          set({ loading: false })
        }
      },

      removeItem: async (lineId) => {
        const id = get().cartId
        if (!id) return
        set({ loading: true })
        try {
          const cart = await removeFromCartAction(id, [lineId])
          set({ cart })
        } finally {
          set({ loading: false })
        }
      },
    }),
    { name: 'jon-cart', partialize: (s) => ({ cartId: s.cartId }) },
  ),
)
