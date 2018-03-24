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
  background: linear-gradient(0deg, #fd9d7a 0%, #82145a 52%, #2f064b 100%);
  overflow: hidden;
}
#blog-container {
  width: 65vw;
  max-width: 600px;
  height: 80vh;
  overflow: hidden;
  margin: 10vh auto;
  background-color: #540c5288;
  position: relative;
  left: -10vw;
  border-radius: 50px;
  padding: 20px;
  z-index: 9999;

}

</style>
