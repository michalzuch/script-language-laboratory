import { BoxIcon, HomeIcon, LaptopIcon, PersonIcon, ReaderIcon } from '@radix-ui/react-icons'

export const iconMap: Record<string, React.ReactNode> = {
  LaptopIcon: <LaptopIcon className='h-5 w-5' />,
  ReaderIcon: <ReaderIcon className='h-5 w-5' />,
  HomeIcon: <HomeIcon className='h-5 w-5' />,
  PersonIcon: <PersonIcon className='h-5 w-5' />,
  default: <BoxIcon className='h-5 w-5' />,
}
