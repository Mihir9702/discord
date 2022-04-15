import Head from 'next/head'
import { Provider } from 'urql'
import client from '../urql'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
