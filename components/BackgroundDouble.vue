<template>
  <div id="bg-container-double">
    <div class="stars-mid bg-item" data-depth="0.25"></div>
    <div class="stars-big bg-item" data-depth="0.30"></div>
    <!--<img class="bg-item" src="/lighthouse-wave4.svg" data-depth="0.35"/>-->
    <!--<img class="bg-item" src="/lighthouse-wave3.svg" data-depth="0.40"/>-->
    <!--<img class="bg-item" src="/lighthouse.svg" data-depth="0.50"/>-->
    <!--<img class="bg-item" src="/lighthouse-wave2.svg" data-depth="0.55"/>-->
    <!--<img class="bg-item" src="/lighthouse-wave1.svg" data-depth="0.60"/>-->
    <!--SVG-Sprite-->

    <svg class="bg-item" data-depth="0.35" x="0px" y="0px"
         viewBox="0 0 2606.8 1415.9" preserveAspectRatio="xMinYMin slice">
      <use xlink:href="#wave4"  width="2606.8" height="1415.9" x="-1303.4" y="-707.9" transform="matrix(1 0 0 -1 1303.41 707.93)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item" data-depth="0.40" x="0px" y="0px"
         viewBox="0 0 2606.8 1415.9" preserveAspectRatio="xMinYMin slice">
      <use xlink:href="#wave3"  width="2611.4" height="1415.9" x="-1305.7" y="-707.9" transform="matrix(1 0 0 -1 1305.1851 708.86)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item" data-depth="0.50" x="0px" y="0px"
         viewBox="0 0 2606.8 1415.9" preserveAspectRatio="xMinYMin slice">
      <use xlink:href="#lighthouse"  width="2606.8" height="1415.9" x="-1303.4" y="-707.9" transform="matrix(1 0 0 -1 1303.41 707.93)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item" data-depth="0.55" x="0px" y="0px"
         viewBox="0 0 2606.8 1415.9" preserveAspectRatio="xMinYMin slice">
      <use xlink:href="#wave2"  width="2606.8" height="1415.9" x="-1303.4" y="-707.9" transform="matrix(1 0 0 -1 1306.5851 710.93)" style="overflow:visible;"/>
    </svg>
    <svg class="bg-item" data-depth="0.60" x="0px" y="0px"
         viewBox="0 0 2606.8 1415.9" preserveAspectRatio="xMinYMin slice">
      <use xlink:href="#wave1"  width="2608.5" height="1417.8" x="-1304.2" y="-708.9" transform="matrix(1 0 0 -1 1305.1484 711.9077)" style="overflow:visible;"/>
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
