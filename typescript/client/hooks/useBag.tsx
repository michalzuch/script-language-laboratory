import { BagContext } from '@/contexts/bagContext'
import { useContext } from 'react'

export function useBag() {
  const context = useContext(BagContext)
  if (!context) {
    throw new Error('useBag must be used within a BagProvider')
  }
  return context
}
