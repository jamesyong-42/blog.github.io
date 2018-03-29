<template>
  <div id="bg-container-double">
    <div class="stars-mid bg-item" data-depth="0.2"></div>
    <div class="stars-big bg-item" data-depth="0.3"></div>
    <!--<img class="bg-item" src="/lighthouse-wave4.svg" data-depth="0.35"/>-->
    <!--<img class="bg-item" src="/lighthouse-wave3.svg" data-depth="0.40"/>-->
    <!--<img class="bg-item" src="/lighthouse.svg" data-depth="0.50"/>-->
    <!--<img class="bg-item" src="/lighthouse-wave2.svg" data-depth="0.55"/>-->
    <!--<img class="bg-item" src="/lighthouse-wave1.svg" data-depth="0.60"/>-->
    <!--SVG-Sprite-->

    <svg class="bg-item" data-depth="0.45" x="0px" y="0px"
         viewBox="0 0 2607 1416" preserveAspectRatio="xMidYMid slice">
      <use xlink:href="#wave4"  width="2607" height="1416" x="-1304" y="-708" transform="matrix(1 0 0 -1 1304 708)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item" data-depth="0.5" x="0px" y="0px"
         viewBox="0 0 2607 1416" preserveAspectRatio="xMidYMid slice">
      <use xlink:href="#wave3"  width="2612" height="1416" x="-1306" y="-708" transform="matrix(1 0 0 -1 1306 709)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item" data-depth="0.4" x="0px" y="0px"
         viewBox="0 0 2607 1416" preserveAspectRatio="xMidYMid slice">
      <use xlink:href="#lighthouse"  width="2607" height="1416" x="-1304" y="-707.9" transform="matrix(1 0 0 -1 1304 708)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item" data-depth="0.8" x="0px" y="0px"
         viewBox="0 0 2607 1416" preserveAspectRatio="xMidYMid slice">
      <use xlink:href="#wave2"  width="2607" height="1416" x="-1304" y="-708" transform="matrix(1 0 0 -1 1307 711)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item wave1" data-depth="1.2" x="0px" y="0px"
         viewBox="0 0 2607 1416" preserveAspectRatio="xMidYMid slice">
      <use xlink:href="#wave1"  width="2609" height="1418" x="-1305" y="-709" transform="matrix(1 0 0 -1 1306 712)" style="overflow:visible;"/>
    </svg>
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
      const bg = document.getElementById('bg-container-double')
      new Parallax(bg)
    },
    beforeRouterLeave () {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  #bg-container-double {
    width: 140%;
    height: 140%;
    position: absolute;
    top: 0;
    left: -20%;

    .bg-item {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      will-change: transform;
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
  }

</style>
