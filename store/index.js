import Vuex from 'vuex'
import QUERY_POSTS from '~/apollo/graphql/posts.gql'

const store = () => new Vuex.Store({
  state: {
    locale: 'en',
    lang: {},
    labels: [],
    posts: [],
    postIDs: {}
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale
    },
    setLabels(state, labels) {
      state.labels = labels
    },
    setPosts(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async nuxtServerInit({commit}, context) {
      let client = context.app.apolloProvider.defaultClient
      commit('setLabels', ['w', 'r'])
      const res = await client.query({
        query: QUERY_POSTS,
        variables: {
          owner: 'Sakilove',
          name: 'blog',
          last: 20
        }
      })
      const posts = res.data.repository.issues.edges
      posts.forEach(d => {

      })
      commit('setPosts', res.data.repository.issues.edges)
    }
  }
})

export default store
