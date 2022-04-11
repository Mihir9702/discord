import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import '@styles/globals.css'
import Head from 'next/head'
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache'
import { MeDocument, MeQuery, LoginMutation, SignupMutation } from '../generated/graphql'

const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
})

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
