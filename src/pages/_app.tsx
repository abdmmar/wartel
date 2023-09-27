import { ApolloProvider } from '@/components/provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  weight: ['400', '500', '600'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Phone Book</title>
        <meta name="description" content="Phone book applications" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider>
        <style jsx global>
          {`
            html {
              font-family: ${inter.style.fontFamily};
            }
          `}
        </style>
        <div className={`${inter.className}`}>
          <Toaster />
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    </>
  )
}
