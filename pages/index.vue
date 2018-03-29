<template>
  <section class="container">
    <background></background>
    <div class="sub-container">
      <img class="ribben" src="/ribben.svg" @click="toggleSidePanel"/>

      <side-panel v-if="$store.state.sidePanelShow"></side-panel>
      <div class="blog__container"
           :class="$store.state.curPostStyle">
        <nuxt-child/>
      </div>
      <post-loading class="blog__container"></post-loading>
    </div>
  </section>
</template>

<script>
import Background from '~/components/Background.vue'
import BackgroundDouble from '~/components/BackgroundDouble.vue'
import PostLoading from '~/components/PostLoading.vue'
import SidePanel from '~/components/SidePanel.vue'
import Scrollbar from 'smooth-scrollbar'

export default {
  components: {
    SidePanel,
    Background,
    PostLoading,
    BackgroundDouble
  },
  data () {
    return {
      scrollBarOptions: {
        damping: 0.1,
        thumbMinSize: 20,
        alwaysShowTracks: false,
        continuousScrolling: true,
        plugins: {overscroll: { enable: true,
          effect: 'bounce',
          damping: 0.2,
          maxOverscroll: 150}}
      }
    }
  },

  mounted () {
    let scrollBar = this.$store.state.scrollBar
    if (!scrollBar) {
      scrollBar = Scrollbar.init(document.querySelector('.blog__container'), this.scrollBarOptions)
      Scrollbar.detachStyle()
      this.$store.commit('setScrollBar', scrollBar)
    }

  },
  methods: {
    toggleSidePanel () {
      this.$store.commit('toggleSidePanel')
    }
  }
}
</script>

<style lang="scss">
  @import "~assets/scss/main.scss";

  .container {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(0deg, #fd9d7a 0%, #82145a 52%, #2f064b 100%);
    overflow: hidden;
  }
  .sub-container {
    width: 80%;
    max-width: 1200px;
    height: 100%;
    min-height: 600px;
    margin: auto;
    position: relative;
    overflow: hidden;
  }

  .ribben {
    position: absolute;
    z-index: 999;
    cursor: pointer;
    top: -80px;
    right: 0;
    width: 50px;
    object-fit: contain;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    &:hover {
      transform: translate3D(0, 70px, 0);
    }
  }

  .blog__container {
    width: 66%;
    // max-width: 800px;
    height: 80%;
    overflow: hidden;
    margin-top: 10%;
    // margin-left: -25vw;
    background-color: rgba(84, 12, 82, 0.53);
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50px;
    padding: 20px;
    z-index: 999;

  }


</style>
