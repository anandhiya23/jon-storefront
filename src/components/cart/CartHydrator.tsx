'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export default function CartHydrator() {
  const hydrate = useCartStore((s) => s.hydrate)
  useEffect(() => {
    hydrate()
  }, [hydrate])
  return null
}
