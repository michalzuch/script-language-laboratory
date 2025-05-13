'use client'

import { useBag } from '@/hooks/useBag'
import { Product } from '@/types/product'

export default function ProductCard({ id, name, description, price, quantity, categoryId }: Product) {
  const { addToBag } = useBag()
  const product = { id, name, description, price, quantity, categoryId }

  return (
    <li
      key={id}
      className='rounded-lg border border-black/[0.1] bg-white p-4 transition-colors duration-200 hover:border-black/[0.2] dark:border-white/[0.1] dark:bg-black dark:hover:border-white/[0.2]'>
      <h3 className='mb-2 font-medium'>{name}</h3>
      <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>{description}</p>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='font-medium'>${price.toFixed(2)}</span>
          <span className='text-sm text-gray-600 dark:text-gray-400'>Stock: {quantity}</span>
        </div>
        <button
          onClick={() => addToBag(product)}
          className='w-full rounded-lg bg-black py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-gray-200'>
          Add to Bag
        </button>
      </div>
    </li>
  )
}
