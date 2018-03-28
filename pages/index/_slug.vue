<template>
  <div class="post">
    <nuxt-link id="return-btn" class="Post__ReturnBtn" :to="'/'"><i class="fa fa-angle-left"></i></nuxt-link>
    <div id="mask" class="Post__HeadMask">
      <!--<h1>{{title}}</h1>-->
      <!--<div v-html="body"></div>-->
      <div class="mask__double"
           :class="$store.state.curPostStyle">

      </div>
    </div>
    <h1 class="post__title">{{title}}</h1>
    <div v-html="body"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  import QUERY_POST from '~/apollo/graphql/post.gql'
  import Scrollbar from 'smooth-scrollbar'
  export default {
    beforeRouteEnter (to, from, next) {
      console.log('beforeRouteEnter' + from.fullPath)
      // tmp = from.fullPath
      // console.log('beforeRouteEnter')
      next()
    },
    async asyncData({ app, route, store, error, payload }) {
      // Default data
      let client = app.apolloProvider.defaultClient
      let data = {
        title: '',
        body: '',
        label: '',
        returnBtn: {},
        mask: {},
        index: -1
      }
      const slug = route.params.slug
      const index = parseInt(slug.split('-')[0])
      const post = store.state.posts[index].node
      const curStyle = post.labels.edges[0].node.description
      const id = post.id
      console.log('post async st!!!!!', store.state)
      store.commit('setCurPostStyle', curStyle)
      store.commit('setCurPost', post)

      if (payload) {
        data.body = payload.bodyHTML
        data.title = payload.title
        data.label = payload.labels.edges[0].node.name
        console.log('post async en!!!!!', store.state)
        return data
      } else {
        const res = await client.query({
          query: QUERY_POST,
          variables: {
            id: id
          }
        })
        data.index = index
        data.body = res.data.node.bodyHTML
        data.title = res.data.node.title
        data.label = res.data.node.labels.edges[0].node.name
        // console.log(data.body)
        console.log('post async en!!!!!', store.state)
        return data
      }
    },
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
    },
    beforeMount () {

    },
    mounted () {
      if (!this.$store.state.browseHistory.hasHistory) {
        this.$store.commit('setBrowseHistory', {postIndex: this.index, scrollPos: -1})
      }

      let scrollBar = this.$store.state.scrollBar
      if (!scrollBar) {
        scrollBar = Scrollbar.init(document.querySelector('.blog__container'), this.scrollBarOptions)
        Scrollbar.detachStyle()
        this.$store.commit('setScrollBar', scrollBar)
      }
      this.$store.commit('setPostLoading', false)
      this.returnBtn = document.querySelector('.Post__ReturnBtn')
      this.mask = document.querySelector('.Post__HeadMask')
      this.$store.state.scrollBar.addListener(this.freezeReturnBtn)
    },
    beforeRouterLeave () {
    },
    methods: {
      freezeReturnBtn () {
        const offset = this.$store.state.scrollBar.offset.y
        this.returnBtn.style.transform = `translate3d(0, ${offset}px ,0)`
        this.mask.style.transform = `translate3d(0, ${offset}px ,0)`
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/main.scss";

  .post{
    margin: -20px;
    padding: 65px;
    transform-style: preserve-3d;
    > a {
      z-index: 999;
      position: absolute;
      will-change: transform;
      right: 45px;
      top: 30px;
      > i {
        font-size: 50px;
        color: white;
      }
    }
    &__title {
      border-bottom-style: double;
      border-bottom-width: 8px;
    }
  }

  #mask {
    will-change: transform;
    position: absolute;
    width: 100%;
    height: 200px;
    left: 0;
    z-index: 998;

    top: -130px;
    overflow: hidden;

  }
  .mask__double {
    width: 100%;
    height: 80vh;
    position: absolute;
    left: 0;
    top: 130px;
    z-index: 998;
    background-color: #3b8070;
    &.style1 {
      @include linearGradient($clr-gr-deg, $clr-1-1, $clr-1-2);
    }
    &.style2 {
      @include linearGradient($clr-gr-deg, $clr-2-1, $clr-2-2);
    }
    &.style3 {
      @include linearGradient($clr-gr-deg, $clr-3-1, $clr-3-2);
    }
    &.style4 {
      @include linearGradient($clr-gr-deg, $clr-4-1, $clr-4-2);
    }
    &.style5 {
      @include linearGradient($clr-gr-deg, $clr-5-1, $clr-5-2);
    }
    &.style6 {
      @include linearGradient($clr-gr-deg, $clr-6-1, $clr-6-2);
    }
    &.style7 {
      @include linearGradient($clr-gr-deg, $clr-7-1, $clr-7-2);
    }
  }

</style>
