import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Inter as FontFamily } from '@next/font/google'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'

import { fetcher } from 'src/utils'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

export const fontFamily = FontFamily({
  subsets: ['latin'],
  variable: '--font-inter',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
      </Head>

      <SWRConfig
        value={{
          fetcher: fetcher,
          refreshInterval: 0,
        }}
      >
        <main className={`${fontFamily.variable} font-sans`}>
          <Component {...pageProps} />
        </main>

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </SWRConfig>
    </>
  )
}

export default App
