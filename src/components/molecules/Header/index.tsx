import Link from 'next/link'
import {
  FiGithub,
  FiFigma,
  FiLogOut,
  FiUser,
  FiSearch,
  FiCompass,
  FiUploadCloud,
} from 'react-icons/fi'
import { SiNotion } from 'react-icons/si'

import { useAtom, sessionAtom } from 'src/atoms'
import { Logo } from 'src/components'

const Header = () => {
  const [session, _] = useAtom(sessionAtom)

  return (
    <header className="container justify-between">
      <div className="flex flex-row items-center">
        <Link
          href={session ? '/feed' : '/'}
          className="flex flex-row items-center"
        >
          <Logo type="logo" width={28} height={28} color="#f3f4f6" />
          <Logo type="name" width={120} height={28} color="#f3f4f6" />
        </Link>
        <div className="flex justify-center items-center text-xs h-6 rounded px-2 text-orange-400 border-orange-400/50 border font-medium">
          Concept
        </div>
      </div>

      <div className="flex flex-row gap-4">
        {!session?.signed && (
          <>
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
          </>
        )}

        {session?.signed && (
          <>
            <Link
              href="/feed"
              className="text-gray-100/50 p-2 inline-flex items-center justify-center rounded-md text-sm hover:text-gray-100 hover:bg-gray-100/10 outline-none focus:bg-gray-100/10 focus:ring-2 focus:ring-white/20"
            >
              <FiCompass size={24} />
            </Link>

            <Link
              href="/upload"
              className="text-gray-100/50 p-2 inline-flex items-center justify-center rounded-md text-sm hover:text-gray-100 hover:bg-gray-100/10 outline-none focus:bg-gray-100/10 focus:ring-2 focus:ring-white/20"
            >
              <FiUploadCloud size={24} />
            </Link>

            <div className="group flex rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                className="input-after group-hover:border-gray-400 !py-1"
                placeholder="Search"
              />
              <button className="input-after-span cursor-pointer inline-flex items-center rounded-sm group-hover:border-gray-400 !py-1">
                <FiSearch size={18} />
              </button>
            </div>

            <Link
              href={`/${session.user.username}`}
              className="text-gray-100/50 p-2 inline-flex items-center justify-center rounded-md text-sm hover:text-gray-100 hover:bg-gray-100/10 outline-none focus:bg-gray-100/10 focus:ring-2 focus:ring-white/20"
            >
              <FiUser size={24} />
            </Link>

            <Link
              href="/logout"
              className="text-gray-100/50 p-2 inline-flex items-center justify-center rounded-md text-sm hover:text-gray-100 hover:bg-gray-100/10 outline-none focus:bg-gray-100/10 focus:ring-2 focus:ring-white/20"
            >
              <FiLogOut size={24} />
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
