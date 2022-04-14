import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { client } from '@utils/urql'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}

export default MyApp
