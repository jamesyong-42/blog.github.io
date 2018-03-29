const { createApolloFetch } = require('apollo-fetch')


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'jamesyongs-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'James Yong&apos;s blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#1cfaff',
    height: '5px'
  },
  /*
  ** Build configuration
  */
  env: {
    token: '93f265e477aa86af2997cf',
    labels: ['TV', 'Movie', 'Music', 'Coding', 'Design', 'Reading', 'Travel']
  },
  css: [
    'normalize.css',
    'highlight.js/styles/github.css',
    '~assets/scss/main.scss',
    '@/assets/scss/main.scss'
    // Load a Node.js module directly (here it's a Sass file)
    // 'bulma',
    // CSS file in the project
    // '@/assets/css/main.css',
    // SCSS file in the project
    // '@/assets/css/main.scss'
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    minify: {
      collapseWhitespace: false
    },
    // routes: ['/1-TV', '2-Movie']
    routes: function () {
      const uri = 'https://api.github.com/graphql'
      const token = 'bb98e6fd2ec628ac7d' + 'bae028da70f7fb3e47bcc4' //prevent Github auto detection

      const apolloFetch = createApolloFetch({ uri })

      apolloFetch.use(({ request, options }, next) => {
        if (!options.headers) {
          options.headers = {};  // Create the headers object if needed.
        }
        options.headers['authorization'] = `Bearer ${token}`
        next()
      })
      const query = `query { 
      repository(owner: "Sakilove", name: "blog.github.io") {
        labels(first:20) {
          edges {
            node {
              name
            }
          }
        }
        issues(last: 100, labels: "Yong", states:OPEN) {
          totalCount
          edges {
            node {
              number
              title
              url
              id
              bodyHTML
              labels(first:2) {
                edges {
                  node {
                    name
                    description
                  }
                }
              }
            }
          }
        }
      }
     }`

      return apolloFetch({ query }) // all apolloFetch arguments are optional
        .then(result => {
          console.log(result)
          const { data } = result

          return data.repository.issues.edges.map((post, index) => {
            return {
              route: `/${index}-${post.node.title}`,
              payload: post.node
            }
          })
        })
        .catch(error => {
          console.log('got error')
          console.log(error)
        })

    }
  },
  plugins: [
    {src: '~/plugins/ga.js', ssr: false },
    {src: '~/plugins/overscroll', ssr: false} //set ssr:false fix 'SyntaxError: Unexpected token import'
  ],
  modules: ['@nuxtjs/apollo'],
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  }
}
