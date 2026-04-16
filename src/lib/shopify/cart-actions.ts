'use server'

import { storefrontFetch } from './client'
import {
  CREATE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_LINES,
  GET_CART,
} from './queries'
import type { Cart } from '@/types'

interface CartLineInput {
  merchandiseId: string
  quantity: number
}

export async function createCartAction(lines: CartLineInput[]): Promise<Cart> {
  const data = await storefrontFetch<{ cartCreate: { cart: Cart } }>(
    CREATE_CART,
    { lines },
  )
  return data.cartCreate.cart
}

export async function addToCartAction(
  cartId: string,
  lines: CartLineInput[],
): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesAdd: { cart: Cart } }>(
    ADD_TO_CART,
    { cartId, lines },
  )
  return data.cartLinesAdd.cart
}

export async function updateCartLinesAction(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesUpdate: { cart: Cart } }>(
    UPDATE_CART_LINES,
    { cartId, lines },
  )
  return data.cartLinesUpdate.cart
}

export async function removeFromCartAction(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesRemove: { cart: Cart } }>(
    REMOVE_FROM_CART,
    { cartId, lineIds },
  )
  return data.cartLinesRemove.cart
}

export async function getCartAction(cartId: string): Promise<Cart | null> {
  const data = await storefrontFetch<{ cart: Cart | null }>(GET_CART, { cartId })
  return data.cart
}
