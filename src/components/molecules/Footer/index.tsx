import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="container justify-center items-center">
      <span className="text-gray-400 text-sm">
        Created with <span className="text-red-500">♥️</span> by{' '}
        <Link
          href="https://gabs.app"
          target="_blank"
          className="text-gray-400 hover:text-white"
        >
          Gabriel Espinheira
        </Link>
      </span>
    </footer>
  )
}

export default Footer
