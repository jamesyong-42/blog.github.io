<template>
  <section class="container">
    <background></background>
    <div class="sub-container">
      <img class="ribben" src="/ribben.svg" @click="infoOpen"/>
      <div class="blog__container"
           :class="$store.state.curPostStyle">
        <nuxt-child/>
      </div>
      <post-loading class="blog__container"></post-loading>
      <!--<div-->
            <!--class="blog__container loading"-->
           <!--:class="[`${$store.state.curPostStyle}`, $store.state.postLoading ? 'loading&#45;&#45;on' : '']">-->
        <!--<div class="loading__wave"></div>-->
        <!--&lt;!&ndash;<div class="loading__wave-bg"></div>&ndash;&gt;-->

        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;title"></div>-->

        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-m"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-s"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-m"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-l"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-m"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-l"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-l"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-m"></div>-->
        <!--<div class="loading__placeholder loading__placeholder&#45;&#45;p-l"></div>-->
      <!--</div>-->
    </div>
  </section>
</template>

<script>
import Background from '~/components/Background.vue'
import PostLoading from '~/components/PostLoading.vue'
import Scrollbar from 'smooth-scrollbar'

export default {
  components: {
    Background,
    PostLoading
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
    infoOpen () {
      this.$store.commit('setInfoShow', true)
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
    max-width: 1000px;
    height: 100%;
    margin: auto;
    position: relative;
    overflow: hidden;
  }

  .ribben {
    position: absolute;
    cursor: pointer;
    top: -80px;
    right: 0;
    width: 50px;
    object-fit: contain;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
    &:hover {
      transform: translate3D(0, 70px, 0);
    }
  }
  .blog__container {
    width: 65vw;
    max-width: 800px;
    height: 80vh;
    overflow: hidden;
    margin-top: 10vh;
    // margin-left: -25vw;
    background-color: rgba(84, 12, 82, 0.53);
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50px;
    padding: 20px;
    z-index: 999;

    h1 {
      color: $clr-h1;
    }
    &.style1 {
      // @include linearGradient($clr-gr-deg, $clr-1-1, $clr-1-2);
      // @include blogTextColorTheme($clr-1-1, $clr-1-2, $clr-1-3, $clr-1-p);
    }
    &.style2 {
      // @include linearGradient($clr-gr-deg, $clr-2-1, $clr-2-2);
      // @include blogTextColorTheme($clr-2-1, $clr-2-2, $clr-2-3, $clr-2-p);
    }
    &.style3 {
      // @include linearGradient($clr-gr-deg, $clr-3-1, $clr-3-2);
      // @include blogTextColorTheme($clr-3-1, $clr-3-2, $clr-3-3, $clr-3-p);
    }
    &.style4 {
      // @include linearGradient($clr-gr-deg, $clr-4-1, $clr-4-2);
      // @include blogTextColorTheme($clr-4-1, $clr-4-2, $clr-4-3, $clr-4-p);
    }
    &.style5 {
      // @include linearGradient($clr-gr-deg, $clr-5-1, $clr-5-2);
      // @include blogTextColorTheme($clr-5-1, $clr-5-2, $clr-5-3, $clr-5-p);
    }
    &.style6 {
      // @include linearGradient($clr-gr-deg, $clr-6-1, $clr-6-2);
      // @include blogTextColorTheme($clr-6-1, $clr-6-2, $clr-6-3, $clr-6-p);
    }
    &.style7 {
      // @include linearGradient($clr-gr-deg, $clr-7-1, $clr-7-2);
      // @include blogTextColorTheme($clr-7-1, $clr-7-2, $clr-7-3, $clr-7-p);
    }
  }

  .loading {
    pointer-events: none;
    padding: 65px;
    opacity: 0;
    -webkit-transition: opacity 0.5s ease;
    -moz-transition: opacity 0.5s ease;
    -ms-transition: opacity 0.5s ease;
    -o-transition: opacity 0.5s ease;
    transition: opacity 0.5s ease;

    &--on {
      opacity: 1;
    }
    &__wave {
      width: calc(100% - 130px);
      height: calc(100% - 130px);
      background-size: 3000px 100%;
      -webkit-animation: loadingAni 1s linear infinite;
      -moz-animation: loadingAni 1s linear infinite;
      animation: loadingAni 1s linear infinite;
      position: absolute;
      top: 65px;
      left: 65px;
      z-index: 999;
    }
    &__wave-bg {
      width: calc(100% - 130px);
      height: calc(100% - 130px);
      position: absolute;
      top: 65px;
      left: 65px;
      z-index: 997;
    }
    &__placeholder {
      /*background-size: 1600px 100%;*/
      /*-webkit-animation: loadingAni 1s linear infinite;*/
      /*-moz-animation: loadingAni 1s linear infinite;*/
      /*animation: loadingAni 1s linear infinite;*/
      position: relative;
      margin: $ft-sz-qt;
      z-index: 998;
      &--title {
        width: 15%;
        height: $ft-sz-page-title;
      }
      &--h1 {
        width: 20%;
        height: $ft-sz-h1;
      }
      &--p-s {
        width: 25%;
        height: $ft-sz-qt;
      }
      &--p-m {
        width: 55%;
        height: $ft-sz-qt;
      }
      &--p-l {
        width: 85%;
        height: $ft-sz-qt;
      }
    }
  }
  /*@-webkit-keyframes loadingAni {*/
    /*0%{background-position:100% 50%}*/
    /*100%{background-position:0% 50%}*/
  /*}*/
  /*@-moz-keyframes loadingAni {*/
    /*0%{background-position:100% 50%}*/
    /*100%{background-position:0% 50%}*/
  /*}*/
  /*@keyframes loadingAni {*/
    /*0%{background-position:100% 50%}*/
    /*100%{background-position:0% 50%}*/
  /*}*/


</style>
