import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'

const endpoint = new HttpLink({
  uri: 'https://us-west-2.cdn.hygraph.com/content/cmgs1u0o900kp07uqowxfkrvs/master'
})

const token = process.env.GRAPHQL_TOKEN

const authLink = new SetContextLink(({ headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(endpoint),
    cache: new InMemoryCache()
  })
}

export default createApolloClient
