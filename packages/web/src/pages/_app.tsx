import Head from 'next/head'
import type { AppProps } from 'next/app'
import '../../styles/globals.css'
import { Provider } from 'urql'
import client from '../urql'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Connect: a discord clone</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
