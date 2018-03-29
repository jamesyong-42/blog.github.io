<template>
  <div class="blog__list">
    <template v-if="$store.state.posts">
      <template v-for="(post, index) in $store.state.posts">
        <div :id="'item-' + index" :key="index" class="blog__list__item">
          <div class="blog__list__item__content"
               :data-labelstyle="post.style"
               :class="post.style">
            <!--<a @click="blogClick(post.node.id, post.node.title)">{{ post.node.title }}</a>-->
            <nuxt-link :to="`/${index}-${post.title}`">{{ post.title }}</nuxt-link>
            <svg :class="`icon icon-${post.icon}`"><use :xlink:href="`#icon-${post.icon}`"></use></svg>
            <!--<i :class="`blog__list__item__content__icon ${post.node.labels.edges[0].node.name}`"></i>-->
          </div>
        </div>
      </template>
    </template>

  </div>
</template>

<script>
  function addClass (obj, cls) {
    var objClass = obj.className
    // 获取 class 内容.
    var blank = (objClass !== '') ? ' ' : ''
    // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    var added = objClass + blank + cls
    // 组合原来的 class 和需要添加的 class.
    obj.className = added
    // 替换原来的 class.
  }
  function removeClass (obj, cls) {
    var objClass = ' ' + obj.className + ' '
    // 获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
    objClass = objClass.replace(/(\s+)/gi, ' ')
    // 将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
    var removed = objClass.replace(' ' + cls + ' ', ' ')
    // 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '')
    // 去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed
    // 替换原来的 class.
  }
  //fix hack: beforeRouterEnter(){next(vm => {this is after mounted!!!I need it before mount to make animation smooth})}
  // var tmp = ''
  export default {

    beforeRouteEnter (to, from, next) {
      console.log('beforeRouteEnter' + from.fullPath)
      // tmp = from.fullPath
      // console.log('beforeRouteEnter')
      next()
    },
    beforeCreate () {
      console.log('beforeCreate')
    },
    created () {
      console.log('created')
    },
    beforeMount () {
      // this.routeFrom = tmp
      // tmp = ''

      this.$store.commit('setCurPostStyle', '')
      this.$store.commit('setCurPost', null)
      console.log('beforeMount')
    },
    mounted () {
      this.$store.commit('setCommentSectionComment', true)
      if (this.$store.state.browseHistory.hasHistory) {
        const index = this.$store.state.browseHistory.postIndex
        const targetCont = document.getElementById('item-' + index)
        const target = targetCont.childNodes[0]
        addClass(target, 'blog__list__item__content--inactive')
        target.addEventListener('animationend', () => {
          removeClass(target, 'blog__list__item__content--inactive')
        })
        if (this.$store.state.browseHistory.scrollPos !== -1) {
          const scrollBar = this.$store.state.scrollBar
          scrollBar.update() //force update since content change!!
          scrollBar.setPosition(0, this.$store.state.browseHistory.scrollPos)
        } else {
          const scrollBar = this.$store.state.scrollBar
          scrollBar.update()
          scrollBar.scrollIntoView(targetCont, {
            offsetLeft: targetCont.offsetLeft + 20,
//              offsetBottom: 12,
//              alignToTop: false,
            onlyScrollIfNeeded: false})

        }
      }

//      const that = this
//      setTimeout(() => {
//        // console.log(that.routeFrom)
//        that.routeFrom = ''
//      }, 500)
//      console.log('mounted')
//
//      const scrollBar = this.$store.state.scrollBar
//      if (scrollBar) {
//        const scrollPos = this.$store.state.scrollPos
//        if (scrollPos === -1) {
//          if (this.routeFrom.length > 2) {
//            const s = this.routeFrom.slice(1)
//            const i = s.split('-')[0]
//            const target = document.getElementById('item-' + i)
//            scrollBar.update()
//            scrollBar.scrollIntoView(target, {
//              offsetLeft: target.offsetLeft + 20,
//              offsetBottom: 12,
//              alignToTop: false,
//              onlyScrollIfNeeded: false})
//          }
//        } else {
//          scrollBar.update() //force update since content change!!
//          scrollBar.setPosition(0, scrollPos)
//          // console.log('scrollPos', scrollPos, scrollBar)
//        }
//      }

    },
    beforeUpdate () {
      console.log('beforeUpdate')
    },
    updated () {
      console.log('updated')
    },
    beforeDestroy () {

      console.log('beforeDestroy')
    },
    destroyed () {
      console.log('destroyed')
    },

    beforeRouteLeave (to, from, next) {
      this.$store.commit('setCommentSectionComment', false)

      const str = to.fullPath.slice(1)
      const index = str.split('-')[0]

      const target = document.getElementById('item-' + index).childNodes[0]
      const labelstyle = target.dataset.labelstyle
      this.$store.commit('setCurPostEl', target)
      addClass(target, 'blog__list__item__content--active')

      const offset = this.$store.state.scrollBar.offset.y

      let that = this
      setTimeout(() => {
        that.$store.commit('setCurPostStyle', labelstyle)
        that.$store.commit('setPostLoading', true)
        setTimeout(() => {
          that.$store.commit('setBrowseHistory', {postIndex: parseInt(index), scrollPos: offset})
          next()
        }, 500)
      }, 500)


      // this.$store.commit('setScrollPos', scrollBar.offset.y)



      // console.log('llllllllleeeeve', this.$route.path, to)
      // this.routeTo = to.fullPath

    },
    components: {
    },
    data: () => ({
      loading: 0,
      repository: null,
      routeTo: '',
      routeFrom: ''
    }),
//    apollo: {
//      $loadingKey: 'loading',
//      repository: {
//        query: fetchPosts,
//        variables: {
//          owner: 'Sakilove',
//          name: 'blog',
//          last: 25
//        }
//      }
////      postCount: {
////        query: gql`{ _allPostsMeta { count } }`,
////        update: ({ _allPostsMeta }) => _allPostsMeta.count
////      }
//    },
    methods: {
//      loadMorePosts () {
//        this.$apollo.queries.allPosts.fetchMore({
//          variables: {
//            skip: this.allPosts.length
//          },
//          updateQuery: (previousResult, { fetchMoreResult }) => {
//            if (!fetchMoreResult) {
//              return previousResult
//            }
//            return Object.assign({}, previousResult, {
//              allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
//            })
//          }
//        })
//      }
    }
  }
</script>

<style lang="scss">
  .blog__list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    &__item {
      width: 33.3%;
      position: relative;
      &:before {
        content: "";
        display: block;
        padding-top: 100%; /* initial ratio of 1:1*/
      }
      &__content {
        margin: 10px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #9a185e;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;

        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -ms-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;

        > a {
          width: 80%;
          overflow: hidden;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          line-height: 1.5rem;
          // word-break: break-all;
          text-align: center;
          overflow-wrap: break-word;
          hyphens: manual;
          text-overflow: ellipsis;
          z-index: 99;
        }
        &--active {
          transform: scale(15, 15);
          z-index: 999;
          > a {
            color: transparent;
          }
          .icon {
            opacity: 0;
          }
        }
        &--inactive {
          z-index: 999;
          animation-fill-mode: backwards;
          animation-name: circleRestore;
          animation-duration: 0.5s;
          animation-timing-function: ease;
          pointer-events: none;
          > a {
            animation-fill-mode: backwards;
            animation-name: opacitySwitch;
            animation-delay: 0.5s;
            animation-duration: 0.1s;
            animation-timing-function: ease;
          }
          .icon {
            animation-delay: 0.5s;
            animation-fill-mode: backwards;
            animation-name: opacitySwitch;
            animation-duration: 0.1s;
            animation-timing-function: ease;
          }
        }
      }
    }
  }
  @keyframes circleEnlarge {
    from {
      transform: scale(1, 1);
    }
    to {
      transform: scale(10, 10);
    }
  }
  @keyframes circleRestore {
    from {
      transform: scale(10, 10);
    }
    to {
      transform: scale(1, 1);
    }
  }
  @keyframes opacitySwitch {
    from {
      opacity: 0;

    }
    to {
      opacity: 1;

    }
  }
  @keyframes fade {
    from {
      opacity: 1;

    }
    to {
      opacity: 0;

    }
  }
</style>
