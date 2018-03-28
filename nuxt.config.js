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
    routes: ['/1-TV', '2-Movie']
    // routes: (ctx) => {
    //   console.log('OOOOOOOGGGGGGG', ctx)
    // }
  },
  plugins: [
    {src: '~/plugins/overscroll', ssr: false} //set ssr:false fix 'SyntaxError: Unexpected token import'
  ],
  modules: ['@nuxtjs/apollo'],
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  }
}
