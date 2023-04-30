import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import type { AppProps } from 'next/app'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Connect: a discord clone</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
