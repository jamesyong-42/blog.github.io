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
    sidePanelShow: false,
    postShow: false,
    curPost: null,
    postLoading: false,
    curPostEl: {},
    curPostStyle: '',
    scrollBar: null,
    scrollPos: -1,
    browseHistory: {
      hasHistory: false,
      postIndex: -1,
      scrollPos: -1
    }
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
    toggleSidePanel(state) {
      state.sidePanelShow = !state.sidePanelShow
    },
    setPostShow(state, postShow) {
      state.postShow = postShow
    },
    setCurPost(state, curPost) {
      state.curPost = curPost
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
    },
    setBrowseHistory(state, payload) {
      state.browseHistory.hasHistory = true
      state.browseHistory.postIndex = payload.postIndex
      state.browseHistory.scrollPos = payload.scrollPos
    }
  },
  actions: {
    async nuxtServerInit({commit}, context) {
      let client = context.app.apolloProvider.defaultClient
      console.log('!!!nuxtServerInit st')
      const res = await client.query({
        query: QUERY_POSTS,
        variables: {
          owner: 'Sakilove',
          name: 'blog.github.io',
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
      console.log('!!!nuxtServerInit en')
    }
  }
})

export default store
