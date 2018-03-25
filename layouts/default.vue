<template>
  <div>
    <nuxt :class="{'blur' : $store.state.infoShow}"/>
    <div v-if="$store.state.infoShow" class="info">
      <div class="info__content">
        <div class="info__content__close">
          <i class="fa fa-close" @click="infoClose"></i>
        </div>
        <div class="info__content__avatar"></div>
        <div class="info__content__intro">
          <h2>XXXXXXXXXXXXXXXXXXXXXXX</h2>
        </div>
        <div class="info__content__contact">
          <i class="fa fa-heart"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
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
        > i {
          float: right;
          cursor: pointer;
        }
      }
    }
  }
</style>
