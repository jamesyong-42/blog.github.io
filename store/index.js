import Vuex from 'vuex'
import QUERY_POSTS from '~/apollo/graphql/posts.gql'

const store = () => new Vuex.Store({
  state: {
    locale: 'zh',
    lang: {},
    labels: [],
    tags: [],
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
    },
    commentSection: {
      containerShow: false,
      commentShow: false
    },
    disqusFail: false
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale
    },
    setLabels(state, labels) {
      state.labels = labels
    },
    setTags(state, tags) {
      state.tags = tags
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
    },
    setCommentSection(state, payload) {
      state.commentSection.containerShow = payload.containerShow
      state.commentSection.commentShow = payload.commentShow

    },
    setCommentSectionContainer(state, containerShow) {
      state.commentSection.containerShow = containerShow
    },
    setCommentSectionComment(state, commentShow) {
      state.commentSection.commentShow = commentShow
    },
    setDisqusFail(state, disqusFail) {
      state.disqusFail = disqusFail
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
      const posts = res.data.repository.issues.edges.map(p => {
        let style = 'style' + Math.ceil(Math.random() * 7)
        let icon = 'Design'
        let tags = []
        const labels = p.node.labels.edges
        labels.forEach(l => {
          if (l.node.name.match(/style\d/)) {
            style = l.node.name
          }
          if (l.node.name.split('-')[0] === 'i') {
            icon = l.node.name.split('-')[1]
          }
          if (l.node.name.split('-')[0] === 'tag') {
            tags.push(l.node.name.split('-')[1])
          }
        })
        return {
          style: style,
          icon: icon,
          tags: tags,
          title: p.node.title,
          id: p.node.id
        }
      })
      const ids = posts.map(d => d.id)

      commit('setPostIDs', ids)
      commit('setPosts', posts)
      let tags = []
      res.data.repository.labels.edges.map(d => {
        if(d.node.name.indexOf('tag') !== -1) {
          tags.push(d.node.name.split('-')[1])
        }
      })
      commit('setTags', tags)


      console.log('!!!nuxtServerInit en')
    },
    commentSectionOn ({commit}) {
      commit('setCommentSection', {
        containerShow: false,
        commentShow: true
      })
    },
    commentSectionOff ({commit}) {
      commit('setCommentSection', {
        containerShow: false,
        commentShow: false
      })
    },
    toggleSectionContainer ({commit, state}) {
      commit('setCommentSection', {
        containerShow: !state.commentSection.containerShow,
        commentShow: state.commentSection.commentShow
      })
    },
    sectionContainerOn ({commit, state}) {
      commit('setCommentSection', {
        containerShow: true,
        commentShow: state.commentSection.commentShow
      })
    },
    toggleLocale ({commit, state}) {
      if (state.locale === 'zh') {
        commit('setLocale', 'en')
      } else {
        commit('setLocale', 'zh')
      }
    }
  }
})

export default store
