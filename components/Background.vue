<template>
  <div id="bg-container">
    <div class="stars-tiny bg-item" data-depth="0.25"></div>
    <div class="stars-mid bg-item" data-depth="0.35"></div>
    <div class="stars-big bg-item" data-depth="0.45"></div>
    <img class="bg-item" src="/lighthouse-cloud2.svg" data-depth="0.55"/>
    <img class="bg-item" src="/lighthouse-cloud1.svg" data-depth="0.65"/>
    <img class="bg-item" src="/lighthouse.svg" data-depth="0.75"/>
    <img class="bg-item" src="/lighthouse-rock.svg" data-depth="0.85"/>
    <img class="bg-item" src="/lighthouse-wave1.svg" data-depth="0.95"/>
    <img class="bg-item" src="/lighthouse-wave2.svg" data-depth="1.05"/>
    <img class="bg-item" src="/lighthouse-wave3.svg" data-depth="1.15"/>

  </div>
</template>

<script>
  import Parallax from 'parallax-js'
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

      const bg = document.getElementById('bg-container')
      new Parallax(bg)
    },
    beforeRouterLeave () {
    },
    methods: {
    }
  }
</script>

<style>
  #bg-container {
    width: 120%;
    height: 120%;
    position: absolute;
    top: -10%;
    left: -10%;
  }
  .bg-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .stars-tiny {
    background-image: url("/stars-tiny.png");
  }
  .stars-mid {
    background-image: url("/stars-mid.png");
  }
  .stars-big {
    background-image: url("/stars-big.png");
  }
</style>
