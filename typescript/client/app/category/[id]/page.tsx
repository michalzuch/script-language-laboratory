import ProductCard from '@/components/productCard'
import { getCategory, getProductsByCategory } from '@/helpers/dataFetching'
import { iconMap } from '@/helpers/iconMapper'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const category = await getCategory(id).catch((error) => {
    console.error(error)
    return {
      icon: 'default',
      name: 'Category not found',
    }
  })
  const products = await getProductsByCategory(id).catch((error) => {
    console.error(error)
    return []
  })

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
              <ProductCard key={product.id} {...product} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
