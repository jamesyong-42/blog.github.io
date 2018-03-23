<template>
  <section class="container">
    <background></background>
    <div id="blog-container">
      <nuxt-child/>
    </div>
  </section>
</template>

<script>
import Background from '~/components/Background.vue'
import Scrollbar from 'smooth-scrollbar'

export default {
  components: {
    Background
  },
  data () {
    return {
      scrollBarOptions: {
        damping: 0.02,
        thumbMinSize: 20,
        alwaysShowTracks: false,
        continuousScrolling: true
      }
    }
  },
  mounted () {
    let scrollBar = Scrollbar.get(document.querySelector('#blog-container'))
    if (!scrollBar) {
      scrollBar = Scrollbar.init(document.querySelector('#blog-container'), this.scrollBarOptions)
    }
  }
}
</script>

<style>
  html {
    overflow: hidden;
  }
.container {
  width: 100vw;
  height: 100vh;
  background-color: #1b195b;
  overflow: hidden;
}
#blog-container {
  width: 65vw;
  max-width: 600px;
  height: 80vh;
  overflow: hidden;
  margin: 10vh auto;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
  left: -10vw;
  border-radius: 20px;
  padding: 20px;
  z-index: 9999;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
