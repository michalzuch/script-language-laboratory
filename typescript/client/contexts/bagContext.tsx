'use client'

import { Product } from '@/types/product'
import { createContext, ReactNode, useCallback, useState } from 'react'

type BagItem = {
  product: Product
  quantity: number
}

type BagContextType = {
  bag: BagItem[]
  addToBag: (product: Product) => void
  removeFromBag: (product: Product) => void
  clearBag: () => void
}

export const BagContext = createContext<BagContextType>({} as BagContextType)

export function BagProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([])

  const addToBag = useCallback((product: Product) => {
    setBag((currentBag) => {
      const existingItem = currentBag.find((item) => item.product.id === product.id)
      if (existingItem) {
        return currentBag.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentBag, { product, quantity: 1 }]
    })
  }, [])

  const removeFromBag = useCallback((product: Product) => {
    setBag((currentBag) => {
      const existingItem = currentBag.find((item) => item.product.id === product.id)
      if (existingItem) {
        if (existingItem.quantity === 1) {
          return currentBag.filter((item) => item.product.id !== product.id)
        }
        return currentBag.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
      return currentBag
    })
  }, [])

  const clearBag = useCallback(() => {
    setBag([])
  }, [])

  return (
    <BagContext.Provider value={{ bag, addToBag, removeFromBag, clearBag }}>{children}</BagContext.Provider>
  )
}
