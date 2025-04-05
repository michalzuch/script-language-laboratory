import { iconMap } from '@/helpers/iconMapper'
import { useCategoryData } from '@/hooks/useCategoryData'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const [category, products] = await useCategoryData(id)

  return (
    <div className='min-h-screen p-4 md:p-8'>
      <main className='mx-auto max-w-screen-lg'>
        <div className='w-full'>
          <div className='mb-6 flex flex-col gap-2'>
            <Link
              href='/'
              className='text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'>
              <ArrowLeftIcon className='mr-1 inline-block' /> Back to Categories
            </Link>
            <h2 className='flex items-center gap-2 text-2xl font-medium'>
              {iconMap[category.icon] || iconMap.default}
              {category.name}
            </h2>
          </div>
          <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map((product) => (
              <li
                key={product.id}
                className='rounded-lg border border-black/[0.1] bg-white p-4 transition-colors duration-200 hover:border-black/[0.2] dark:border-white/[0.1] dark:bg-black dark:hover:border-white/[0.2]'>
                <h3 className='mb-2 font-medium'>{product.name}</h3>
                <p className='mb-2 text-sm text-gray-600 dark:text-gray-400'>{product.description}</p>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>${product.price.toFixed(2)}</span>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>Stock: {product.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
