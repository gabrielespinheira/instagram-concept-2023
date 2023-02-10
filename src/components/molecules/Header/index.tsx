import Link from 'next/link'
import { FiGithub, FiFigma } from 'react-icons/fi'
import { SiNotion } from 'react-icons/si'

import { Logo } from 'src/components'

const Header = () => {
  return (
    <header className="container justify-between">
      <div className="flex flex-row items-center">
        <Link href="/" className="flex flex-row items-center">
          <Logo type="logo" width={28} height={28} color="#f3f4f6" />
          <Logo type="name" width={120} height={28} color="#f3f4f6" />
        </Link>
        <div className="flex justify-center items-center text-xs h-6 rounded px-2 text-orange-400 border-orange-400/50 border font-medium">
          Concept
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <Link
          href=""
          target="_blank"
          className="text-gray-100/50 p-2 inline-flex items-center justify-center rounded-md text-sm hover:text-gray-100 hover:bg-gray-100/10 outline-none focus:bg-gray-100/10 focus:ring-2 focus:ring-white/20"
        >
          <SiNotion size={24} />
        </Link>

        <Link
          href=""
          target="_blank"
          className="text-gray-100/50 p-2 inline-flex items-center justify-center rounded-md text-sm hover:text-gray-100 hover:bg-gray-100/10 outline-none focus:bg-gray-100/10 focus:ring-2 focus:ring-white/20"
        >
          <FiFigma size={24} />
        </Link>

        <Link
          href="https://github.com/gabrielespinheira/instagram-concept-2023"
          target="_blank"
          className="text-gray-100/50 p-2 inline-flex items-center justify-center rounded-md text-sm hover:text-gray-100 hover:bg-gray-100/10 outline-none focus:bg-gray-100/10 focus:ring-2 focus:ring-white/20"
        >
          <FiGithub size={24} />
        </Link>
      </div>
    </header>
  )
}

export default Header
