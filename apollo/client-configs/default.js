import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


const API = 'https://api.github.com/graphql'
const token = 'a6daf3c45d51ea71468' + 'baaa8b16a4dfabe8c54ff' //prevent Github auto detection

export default () => {
  const httpLink = new HttpLink({ uri: API })

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { authorization: `Bearer ${token}` }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
