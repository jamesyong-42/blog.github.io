/* eslint-disable */

export default ({ app }) => {
  /*
   ** 只在生成模式的客户端中使用
   */

  /*
  ** Include Google Analytics Script
  */
  if (process.BROWSER_BUILD && process.env.NODE_ENV === 'production') {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    /*
     ** Set the current page
     */
    ga('create', 'UA-86178986-2', 'auto')
    /*
     ** Every time the route changes (fired on initialization too)
     */
    app.router.afterEach((to, from) => {
      /*
       ** We tell Google Analytic to add a page view
       */
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')
    })
  }

}
