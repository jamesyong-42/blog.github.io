<template>
  <div>
    <svg-icons></svg-icons>
    <svg-bg></svg-bg>
    <nuxt :class="{'blur' : $store.state.infoShow}"/>
    <div v-if="$store.state.infoShow" class="info">
      <div class="info__content">
        <div class="info__content__close">
          <svg @click="infoClose" class="icon"><use xlink:href="#icon-remove" ></use></svg>
        </div>
        <div class="info__content__avatar"></div>
        <div class="info__content__intro">
          <h2>Be the change you want to see in the world.</h2>
        </div>
        <div class="info__content__contact">
          <svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>
          <svg class="icon icon-behance"><use xlink:href="#icon-behance"></use></svg>
          <svg class="icon icon-facebook"><use xlink:href="#icon-facebook"></use></svg>
          <svg class="icon icon-envelope"><use xlink:href="#icon-envelope"></use></svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SvgIcons from '~/components/SVGIcons.vue'
  import SvgBg from '~/components/SVGBG.vue'
  export default {
    components: {
      SvgIcons,
      SvgBg
    },
    data () {
      return {
      }
    },
    methods: {
      infoClose () {
        this.$store.commit('setInfoShow', false)
      }
    }
  }
</script>
<style lang="scss">

  .blur {
    filter: blur(8px);
    pointer-events: none;
  }
  .info {
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(100, 17, 65, 0.5);
    &__content {
      color: white;
      &__avatar {
        width: 25vmin;
        height: 25vmin;
        margin: auto;
        background-image: url("/avatar.png");
        background-size: contain;
      }
      &__close {
        .icon {
          font-size: 3rem;
          float: right;
          cursor: pointer;
        }
      }
      &__intro {
        margin: auto;
      }
      &__contact {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        .icon {
          font-size: 2rem;
          margin: 0 10px;
          cursor: pointer;
        }
      }

    }
  }

  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }
</style>
