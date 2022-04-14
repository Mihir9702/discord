import { createClient } from 'urql'

const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },

  // * 😇 Exchanges / Caching soonTM
})

export default client
