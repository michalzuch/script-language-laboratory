import api from '@/helpers/api'
import { iconMap } from '@/helpers/iconMapper'
import { Category } from '@/types/category'
import { StackIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default async function Home() {
  const { data }: { data: Category[] } = await api.get('/categories').catch((error) => {
    console.error(error)
    return { data: [] }
  })

  return (
    <div className='min-h-screen p-4 md:p-8'>
      <main className='mx-auto max-w-screen-lg'>
        <div className='w-full'>
          <h2 className='mb-6 flex items-center gap-2 text-2xl font-medium'>
            <StackIcon className='h-6 w-6' />
            Categories
          </h2>
          <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {data.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className='flex items-center gap-3 rounded-lg border border-black/[0.1] bg-white p-4 transition-colors duration-200 hover:border-black/[0.2] dark:border-white/[0.1] dark:bg-black dark:hover:border-white/[0.2]'>
                  {iconMap[category.icon] || iconMap.default}
                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
