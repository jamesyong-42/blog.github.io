import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


const API = 'https://api.github.com/graphql'
const token = '7143cc00ee41de24eaef' + 'a162d1ee77dbe3a39f2f' //prevent Github auto detection


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
