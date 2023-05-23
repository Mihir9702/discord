import { createClient } from 'urql'

const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
    headers: {
      'x-forwarded-proto': 'https',
    },
  },
})

export default client
