<template>
  <div id="bg-container">
    <div class="stars-tiny bg-item" data-depth="0.15"></div>
    <div class="stars-mid bg-item" data-depth="0.25"></div>
    <div class="stars-big bg-item" data-depth="0.30"></div>
    <img class="bg-item" src="/lighthouse-wave4.svg" data-depth="0.35"/>
    <img class="bg-item" src="/lighthouse-wave3.svg" data-depth="0.40"/>
    <img class="bg-item" src="/lighthouse.svg" data-depth="0.50"/>
    <img class="bg-item" src="/lighthouse-wave2.svg" data-depth="0.55"/>
    <img class="bg-item" src="/lighthouse-wave1.svg" data-depth="0.60"/>
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
    width: 140%;
    height: 140%;
    position: absolute;
    top: 0;
    left: -20%;
  }
  .bg-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
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
