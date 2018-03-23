<template>
  <div id="article-container">
    <nuxt-link :to="'/'">返回</nuxt-link>
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
  }
  .bg-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
  }

</style>
