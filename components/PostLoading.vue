<template>
  <div
    class="PostLoading"
    :class="[`${$store.state.curPostStyle}`, $store.state.postLoading ? 'PostLoading--on' : '']">
    <div class="PostLoading__Wave"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--title"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-m"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-s"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-m"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-l"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-m"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-l"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-l"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-m"></div>
    <div class="PostLoading__Placeholder PostLoading__Placeholder--p-l"></div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
    },
    mounted () {
    },
    beforeRouterLeave () {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/main.scss";
  .PostLoading {
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
    &__Wave {
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
    &__Placeholder {
      position: relative;
      margin: $ft-sz-qt;
      z-index: 998;
      &--title {
        width: 15%;
        height: $ft-sz-page-title;
        padding: $pd-post-title;
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
  @-webkit-keyframes loadingAni {
    0%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
  @-moz-keyframes loadingAni {
    0%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
  @keyframes loadingAni {
    0%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
</style>
