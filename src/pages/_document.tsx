import { Html, Head, Main, NextScript } from 'next/document'
import { fontFamily } from './_app'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="full-screen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" type="image/x-icon" href="/instagram.svg" />
      </Head>
      <body
        className={`${fontFamily.variable} font-sans bg-slate-900 text-gray-100`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
