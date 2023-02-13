import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FiLoader } from 'react-icons/fi'

import { useAtom, sessionAtom } from 'src/atoms'
import { BasicTemplate } from 'src/components'

const Logout = () => {
  const [_, setSession] = useAtom(sessionAtom)
  const router = useRouter()

  useEffect(() => {
    logoutUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function logoutUser() {
    setSession(null)
    router.push('/')
  }

  return (
    <BasicTemplate>
      <FiLoader
        className="h-8 w-8 text-white animate-spin"
        aria-hidden="true"
      />
    </BasicTemplate>
  )
}

export default Logout
