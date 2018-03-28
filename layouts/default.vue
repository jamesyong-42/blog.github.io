<template>
  <div>
    <svg-icons></svg-icons>
    <nuxt :class="{'blur' : $store.state.infoShow}"/>
    <div v-if="$store.state.infoShow" class="info">
      <div class="info__content">
        <div class="info__content__close">
          <svg @click="infoClose" class="icon"><use xlink:href="#icon-remove" ></use></svg>
        </div>
        <div class="info__content__avatar"></div>
        <div class="info__content__intro">
          <h2>XXXXXXXXXXXXXXXXXXXXXXX</h2>
        </div>
        <div class="info__content__contact">
          <svg class="icon icon-github"><use xlink:href="#icon-github"></use></svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SvgIcons from '~/components/SVGIcons.vue'
  export default {
    components: {
      SvgIcons
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

      &__avatar {
        width: 30vmin;
        height: 30vmin;
        margin: auto;
        background-image: url("/avatar.png");
        background-size: contain;
      }
      &__intro {
        margin: auto;
      }
      &__contact {
        margin: auto;
      }
      &__close {
        .icon {
          font-size: 3rem;
          color: white;
          float: right;
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
