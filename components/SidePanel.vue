<template>
  <div class="SidePanel">
    <div class="SidePanel__BgDoubleContainer">
      <background-double></background-double>
    </div>
    <div class="SidePanel__Content">
      <div class="SidePanel__Content__Head">
        <img @click="infoOpen" src="/logo.svg"/>
      </div>
      <div class="SidePanel__Content__Middle"></div>
      <div class="SidePanel__Content__Bottom">
        <vue-disqus shortname="tyrantax" :identifier="commentID" :title="commentTitle"></vue-disqus>
      </div>
    </div>

  </div>
</template>
<script>
  import BackgroundDouble from '~/components/BackgroundDouble.vue'
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  import Scrollbar from 'smooth-scrollbar'
  export default {
    components: {
      BackgroundDouble,
      VueDisqus
    },
    data () {
      return {
        sidePanelEl: {},
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
//    beforeMount () {
//      this.sidePanelEl = document.querySelector('.SidePanel')
//      window.addEventListener('resize', this.sidePanelBGAdjust)
//    },
    mounted () {
      Scrollbar.init(document.querySelector('.SidePanel__Content__Bottom'), this.scrollBarOptions)
      Scrollbar.detachStyle()
      this.sidePanelEl = document.querySelector('.SidePanel')
      window.addEventListener('resize', this.sidePanelBGAdjust)
      this.sidePanelBGAdjust ()
    },
    computed: {
      commentID () {
        if (this.$store.state.curPost) {
          return this.$store.state.curPost.id
        } else {
          return 'main'
        }
      },
      commentTitle () {
        if (this.$store.state.curPost) {
          return this.$store.state.curPost.title
        } else {
          return 'main'
        }
      }
    },
    methods: {
      sidePanelBGAdjust () {
        const offsetTop = this.sidePanelEl.getBoundingClientRect().top
        const offsetLeft = this.sidePanelEl.getBoundingClientRect().left
        const bgDouCont = this.sidePanelEl.childNodes[0]
        bgDouCont.style.top = `${-offsetTop}px`
        bgDouCont.style.left = `${-offsetLeft}px`
      },
      infoOpen () {
        this.$store.commit('setInfoShow', true)
      }
    }
  }

</script>
<style lang="scss">
  .SidePanel {
    width: 30%;
    height: 80%;
    overflow: hidden;
    margin-top: 10%;
    position: absolute;
    right: 10px;
    top: 0;
    padding: 20px;
    box-shadow: 0 0 15px rgb(58, 10, 56);
    border-radius: 50px;
    // background-color: rgba(84, 12, 82, 0.53);

    &__BgDoubleContainer {
      background: linear-gradient(0deg, #fd9d7a 0%, #82145a 52%, #2f064b 100%);
      width: 100vw;
      height: 100vh;
      position: absolute;
      filter: blur(10px);
    }
    &__Content {
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      z-index: 999;
      &__Head {
        width: 100%;
        height: 15%;
        padding-top: 20px;
        > img {
          width: 60%;
          margin-left: 20%;
          object-fit: contain;
          cursor: pointer;
          -webkit-transition: all 0.5s ease;
          -moz-transition: all 0.5s ease;
          -ms-transition: all 0.5s ease;
          -o-transition: all 0.5s ease;
          transition: all 0.5s ease;
          &:hover {
            filter: hue-rotate(20deg);
          }
        }
      }
      &__Middle {
        width: 100%;
        height: 35%;
        background-color: rgba(207, 144, 181, 0.33);
      }
      &__Bottom {
        width: 100%;
        height: 50%;
        padding: 20px;
        background-color: rgba(154, 24, 94, 0.33);
      }
    }

  }
</style>
