import * as React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en' dir='ltr' className='dark'>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
