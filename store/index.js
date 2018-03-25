import Vuex from 'vuex'
import QUERY_POSTS from '~/apollo/graphql/posts.gql'

const store = () => new Vuex.Store({
  state: {
    locale: 'en',
    lang: {},
    labels: [],
    posts: [],
    postIDs: [],
    infoShow: false,
    postLoading: false,
    curPostEl: {},
    curPostStyle: '',
    scrollBar: null,
    scrollPos: -1
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
    },
    setPostLoading(state, postLoading) {
      state.postLoading = postLoading
    },
    setPostIDs(state, postIDs) {
      state.postIDs = postIDs
    },
    setInfoShow(state, infoShow) {
      state.infoShow = infoShow
    },
    setCurPostEl(state, curPostEl) {
      state.curPostEl = curPostEl
    },
    setCurPostStyle(state, curPostStyle) {
      state.curPostStyle = curPostStyle
    },
    setScrollBar(state, scrollBar) {
      state.scrollBar = scrollBar
    },
    setScrollPos(state, scrollPos) {
      state.scrollPos = scrollPos
    }
  },
  actions: {
    async nuxtServerInit({commit}, context) {
      let client = context.app.apolloProvider.defaultClient
      console.log('iiiiiii', context)
      const res = await client.query({
        query: QUERY_POSTS,
        variables: {
          owner: 'Sakilove',
          name: 'blog',
          last: 26
        }
      })
      const posts = res.data.repository.issues.edges
      const ids = posts.map(d => d.node.id)
      commit('setPostIDs', ids)
      commit('setPosts', posts)
      let lebels = res.data.repository.labels.edges.map(d => d.node.name)
      lebels.splice(lebels.indexOf('Yong'), 1)
      commit('setLabels', lebels)
    }
  }
})

export default store
