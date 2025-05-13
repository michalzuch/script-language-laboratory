'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

interface PaymentFormProps {
  isProcessing: boolean
  isSuccess: boolean
  onBack: () => void
  onSubmit: (e: React.FormEvent) => Promise<void>
}

export default function PaymentForm({ isProcessing, isSuccess, onBack, onSubmit }: PaymentFormProps) {
  return (
    <motion.div key='payment' initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
      <div className='mb-4'>
        <h2 className='text-xl font-medium'>Payment Details</h2>
      </div>

      <form onSubmit={onSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <label htmlFor='cardNumber' className='block text-sm font-medium'>
            Card Number
          </label>
          <input
            id='cardNumber'
            type='text'
            placeholder='4242 4242 4242 4242'
            disabled={isProcessing}
            className='w-full rounded-lg border border-black/[0.1] bg-white p-2 dark:border-white/[0.1] dark:bg-black'
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label htmlFor='expiryDate' className='block text-sm font-medium'>
              Expiry Date
            </label>
            <input
              id='expiryDate'
              type='text'
              placeholder='MM/YY'
              disabled={isProcessing}
              className='w-full rounded-lg border border-black/[0.1] bg-white p-2 dark:border-white/[0.1] dark:bg-black'
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='cvv' className='block text-sm font-medium'>
              CVV
            </label>
            <input
              id='cvv'
              type='text'
              placeholder='123'
              disabled={isProcessing}
              className='w-full rounded-lg border border-black/[0.1] bg-white p-2 dark:border-white/[0.1] dark:bg-black'
            />
          </div>
        </div>
        <div className='flex items-center justify-between pt-4'>
          <button
            type='button'
            onClick={onBack}
            className='text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'>
            ← Back to cart
          </button>
          <button
            type='submit'
            disabled={isProcessing}
            className={`rounded-lg px-4 py-2 transition-colors ${
              isSuccess ? 'bg-green-600 text-white'
              : isProcessing ? 'cursor-not-allowed bg-gray-400 text-white'
              : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
            }`}>
            {isSuccess ?
              <div className='flex items-center gap-2'>
                <CheckIcon className='h-4 w-4' />
                Payment Successful
              </div>
            : isProcessing ?
              'Processing...'
            : 'Pay Now'}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
