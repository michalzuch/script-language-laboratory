'use client'

import { useBag } from '@/hooks/useBag'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PaymentForm from './paymentForm'

export default function Bag() {
  const { bag, addToBag, removeFromBag } = useBag()
  const [isVisible, setIsVisible] = useState(false)
  const [isPaymentVisible, setIsPaymentVisible] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setIsVisible(bag.length > 0)
  }, [bag])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSuccess(true)
    setTimeout(() => {
      bag.forEach((item) => removeFromBag(item.product))
      setIsPaymentVisible(false)
      setIsSuccess(false)
      setIsProcessing(false)
    }, 2000)
  }

  const total = bag.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 border-t border-black/[0.1] bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-white/[0.1] dark:bg-black ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
      <div className='mx-auto max-w-screen-lg p-4'>
        <AnimatePresence mode='wait'>
          {!isPaymentVisible ?
            <motion.div key='cart' initial={{ x: 0 }} exit={{ x: -1000 }} transition={{ duration: 0.3 }}>
              <div className='mb-4'>
                <h2 className='text-xl font-medium'>Shopping Bag ({bag.length})</h2>
              </div>

              <div className='max-h-[30vh] overflow-y-auto'>
                <ul className='space-y-4'>
                  {bag.map((item) => (
                    <li
                      key={item.product.id}
                      className='flex items-center justify-between gap-4 border-b border-black/[0.1] pb-4 dark:border-white/[0.1]'>
                      <div>
                        <h3 className='font-medium'>{item.product.name}</h3>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className='flex items-center gap-3'>
                        <button
                          onClick={() => removeFromBag(item.product)}
                          className='rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-900'>
                          <MinusIcon className='h-4 w-4' />
                        </button>

                        <span className='min-w-[20px] text-center'>{item.quantity}</span>

                        <button
                          onClick={() => addToBag(item.product)}
                          className='rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-900'>
                          <PlusIcon className='h-4 w-4' />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mt-4 flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>Total</p>
                  <p className='text-xl font-medium'>${total.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => setIsPaymentVisible(true)}
                  className='rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'>
                  Checkout
                </button>
              </div>
            </motion.div>
          : <PaymentForm
              isProcessing={isProcessing}
              isSuccess={isSuccess}
              onBack={() => setIsPaymentVisible(false)}
              onSubmit={handlePayment}
            />
          }
        </AnimatePresence>
      </div>
    </div>
  )
}
