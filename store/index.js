import Vuex from 'vuex'
import QUERY_POSTS from '~/apollo/graphql/posts.gql'

const store = () => new Vuex.Store({
  state: {
    locale: 'zh',
    lang: {},
    labels: [],
    tags: [],
    postsOrig: [],
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
    setPostsOrig(state, postsOrig) {
      state.postsOrig = postsOrig
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
    // setCommentSection(state, payload) {
    //   state.commentSection.containerShow = payload.containerShow
    //   state.commentSection.commentShow = payload.commentShow
    //
    // },
    setCommentSectionContainer(state, containerShow) {
      state.commentSection.containerShow = containerShow
    },
    setCommentSectionComment(state, commentShow) {
      state.commentSection.commentShow = commentShow
    },
    setDisqusFail(state, disqusFail) {
      state.disqusFail = disqusFail
    },
    tagFilter (state, tag) {
      let tt = state.tags.find(t => {
        return t.name === tag
      })
      if (tt.selected) {
        state.posts = state.postsOrig
        state.tags.forEach(d => {
          d.selected = false
        })
      } else {
        state.tags.forEach(d => {
          state.posts = tt.posts
          if (d.name === tag) {
            d.selected = true
          } else {
            d.selected = false
          }
        })
      }
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


      let tags = []
      res.data.repository.labels.edges.map(d => {
        if(d.node.name.indexOf('tag') !== -1) {
          tags.push({
            name: d.node.name.split('-')[1],
            nameEN: d.node.description,
            count: 0,
            posts:[],
            selected: false
          })
        }
      })

      const posts = res.data.repository.issues.edges.map(p => {
        let style = 'style' + Math.ceil(Math.random() * 7)
        let icon = 'Design'
        let ts = []
        const labels = p.node.labels.edges
        labels.forEach(l => {
          if (l.node.name.match(/style\d/)) {
            style = l.node.name
          }
          if (l.node.name.split('-')[0] === 'i') {
            icon = l.node.name.split('-')[1]
          }
          if (l.node.name.split('-')[0] === 'tag') {
            ts.push(
            {
              name: l.node.name.split('-')[1],
              nameEN: l.node.description
            }
            )
          }
        })
        const pp = {
          style: style,
          icon: icon,
          tags: ts,
          title: p.node.title,
          id: p.node.id
        }
        pp.tags.forEach(tag => {
          tags.forEach(t => {
            if (t.name === tag.name) {
              t.count ++
              t.posts.push(pp)
            }
          })
        })
        return pp
      })

      const ids = posts.map(d => d.id)
      commit('setTags', tags)
      commit('setPostIDs', ids)
      commit('setPosts', posts)
      commit('setPostsOrig', posts)
      console.log('!!!nuxtServerInit en')
    },
    // commentSectionOn ({commit}) {
    //   commit('setCommentSection', {
    //     containerShow: false,
    //     commentShow: true
    //   })
    // },
    // commentSectionOff ({commit}) {
    //   commit('setCommentSection', {
    //     containerShow: false,
    //     commentShow: false
    //   })
    // },
    // toggleSectionContainer ({commit, state}) {
    //   commit('setCommentSection', {
    //     containerShow: !state.commentSection.containerShow,
    //     commentShow: state.commentSection.commentShow
    //   })
    // },
    // sectionContainerOn ({commit, state}) {
    //   commit('setCommentSection', {
    //     containerShow: true,
    //     commentShow: state.commentSection.commentShow
    //   })
    // },
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
