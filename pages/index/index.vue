<template>
  <div class="blog__list">
    <template v-if="$store.state.posts">
      <template v-for="(post, index) in $store.state.posts">
        <div :key="index" class="blog__list__item">
          <div class="blog__list__item__content">
            <nuxt-link :to="'/'+ post.node.title">{{ post.node.title }}</nuxt-link>
          </div>
        </div>
      </template>
    </template>

  </div>
</template>

<script>
  import gql from 'graphql-tag'
  const fetchPosts = gql`
    query repository($owner: String!, $name: String!, $last: Int!) {
      repository(owner: $owner, name: $name) {
        issues(last: $last, states:OPEN) {
          edges {
            node {
              title
              url
              id
              labels(first:5) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
  }
  `
  export default {
    async asyncData (context) {
//      console.log('111' + context)
//      let client = context.app.apolloProvider.defaultClient
//      client.query({
//        query: fetchPosts,
//        variables: {
//          owner: 'Sakilove',
//          name: 'blog',
//          last: 20
//        }
//      }).then(res => {
//        console.log(res)
//        context.store.commit('setPosts', res.data.repository.issues.edges)
//      }).catch(err => {
//        console.log(err)
//      })
    },
    beforeCreate () {
      console.log('beforeCreate')
    },
    created () {
      console.log('created')
    },
    beforeMount () {
      console.log('beforeMount')
    },
    mounted () {
      console.log('mounted')
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
    components: {
    },
    data: () => ({
      loading: 0,
      repository: null
    }),
    apollo: {
      $loadingKey: 'loading',
      repository: {
        query: fetchPosts,
        variables: {
          owner: 'Sakilove',
          name: 'blog',
          last: 20
        }
      }
//      postCount: {
//        query: gql`{ _allPostsMeta { count } }`,
//        update: ({ _allPostsMeta }) => _allPostsMeta.count
//      }
    },
    mounted () {
//      setInterval(() => {
//        console.log(this.repository)
//      }, 1000)
    },
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
        }
      }
    }
  }
  @keyframes circleEnlarge {
    from {
      transform: scale(1, 1);
    }
    to {
      transform: scale(15, 15);
    }
  }
</style>
