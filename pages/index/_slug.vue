<template>
  <div id="article-container">
    <nuxt-link :to="'/'">返回</nuxt-link>
    <template v-html="body"></template>
  </div>
</template>

<script>
  import marked from 'marked'
  import gql from 'graphql-tag'
  const fetchBody = gql`
    query repository($owner: String!, $name: String!, $last: Int!) {
      repository(owner: $owner, name: $name) {
        issues(last: $last, states:OPEN) {
          edges {
            node {
              title
              url
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
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
      body () {
        return marked('**marked**')
      }
    },
    mounted () {
    },
    beforeRouterLeave () {
    },
    methods: {
    }
  }
</script>

<style>


</style>
