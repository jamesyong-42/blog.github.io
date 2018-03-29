<template>
  <div class="SidePanel">
    <div class="SidePanel__BgDoubleContainer">
      <background-double></background-double>
    </div>
    <div class="SidePanel__Content">
      <div class="SidePanel__Content__Head">
        <div class="SidePanel__Content__Head__LanguageBtn">
          <template v-if="$store.state.locale === 'zh'">
            <span>EN</span>
          </template>
          <template v-else>
            <span>中文</span>
          </template>
          <svg :class="['icon', lanLoading ? 'icon--loading' : '']" @click="changeLanguage"><use xlink:href="#icon-refresh"></use></svg>
        </div>
        <div class="SidePanel__Content__Head__Logo">
          <img @click="infoOpen" src="/logo.svg"/>
        </div>
      </div>
      <div class="SidePanel__Content__Middle">
        <div class="SidePanel__Content__Middle__Tags">
          <div v-for="(tag, index) in $store.state.tags" :key="index"
               class="SidePanel__Content__Middle__Tags__Tag"
               :class="{'SidePanel__Content__Middle__Tags__Tag--selected' : tag.selected}"
               @click="tagClick(tag.name)"
          >
            <template v-if="$store.state.locale === 'zh'">
              {{ tag.name }} | {{ tag.count }}
            </template>
            <template v-else>
              {{ tag.nameEN }} | {{ tag.count }}
            </template>
          </div>
        </div>


      </div>
      <div class="SidePanel__Content__Bottom" :class="[$store.state.commentSection.containerShow ? 'SidePanel__Content__Bottom--show' : 'SidePanel__Content__Bottom--hide']">
        <div class="SidePanel__Content__Bottom__ToggleBtn">
          <svg class="icon" @click="toggleBottom"><use xlink:href="#icon-angle_down"></use></svg>
          <!--<svg class="icon icon-angle_up"><use xlink:href="#icon-angle_up"></use></svg>-->
        </div>
        <div class="SidePanel__Content__Bottom__CommentSection--mask">
          <div class="SidePanel__Content__Bottom__CommentSection--container">
            <div v-if="!disqusLoading && this.$store.state.disqusFail" class="disqus--fail">
              <div>
                <div>
                  <svg class="icon"><use xlink:href="#icon-invisible"></use></svg>
                </div>
                <div>
                  <template v-if="$store.state.locale === 'zh'">
                    评论区被墙了，请科学上网
                  </template>
                  <template v-else>
                    Loading failed...Maybe you need VPN
                  </template>

                </div>
              </div>
            </div>
            <div v-if="disqusLoading" :class="[disqusLoadingTooLong ? 'disqus--loading-too-long' : 'disqus--loading']">
              <div>
                <div>
                  <svg class="icon"><use xlink:href="#icon-refresh"></use></svg>
                </div>
                <div>
                  <template v-if="$store.state.locale === 'zh'">
                    评论区加载中...
                  </template>
                  <template v-else>
                    Comment section loading...
                  </template>
                </div>
                <div v-if="disqusLoadingTooLong">
                  <template v-if="$store.state.locale === 'zh'">
                    这么久没加载出来...可能你没有科学上网
                  </template>
                  <template v-else>
                    Bad internet...
                  </template>
                </div>
              </div>
            </div>
            <div class="SidePanel__Content__Bottom__CommentSection__Content">
              <vue-disqus v-if="$store.state.commentSection.commentShow"
                          shortname="tyrantax"
                          :identifier="commentID"
                          :title="commentTitle"
                          :language="$store.state.locale"
                          v-on:ready="disqusReady"
                          v-on:fail="disqusFail"
                          v-on:destroy="disqusDestroy"
              ></vue-disqus>
            </div>
          </div>
        </div>
        <!--<div class="SidePanel__Content__Bottom__CommentSectionFakeLayer">-->
          <!--<div class="SidePanel__Content__Bottom__CommentSectionFakeLayer__Content"></div>-->
        <!--</div>-->
       </div>
    </div>
  </div>
</template>
<script>
  import BackgroundDouble from '~/components/BackgroundDouble.vue'
  import VueDisqus from '~/components/vue-disqus/VueDisqus.vue'
  import Scrollbar from 'smooth-scrollbar'
  export default {
    components: {
      BackgroundDouble,
      VueDisqus
    },
    data () {
      return {
        scrollBar: null,
        sidePanelEl: {},
        commentsBody: null,
        bottomShow: false,
        lanLoading: false,
        disqusLoading: true,
        disqusLoadingTooLong: false,
        disqusFailed: false,
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
      console.log('OG', this.$route)
      this.$store.commit('setCommentSectionComment', true)
      this.sidePanelEl = document.querySelector('.SidePanel')
      window.addEventListener('resize', this.sidePanelBGAdjust)
      this.sidePanelBGAdjust ()
      const self = this
      const disqusLoading = document.querySelector('.disqus--loading')
      disqusLoading.addEventListener('animationend', (target) => {
        self.disqusLoadingTooLong = true
        target.removeAllListeners()
      })
    },
    beforeDestroy () {
      this.$store.commit('setCommentSectionComment', false)
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
      },
      tagClick (tag) {
        console.log(tag)
        console.log(this.$route)
        if (this.$route.fullPath !== '/') {
          this.$router.push('/')
          const self = this
          setTimeout(() => {
            self.$store.commit('tagFilter', tag)
          }, 1200)
        } else {
          this.$store.commit('tagFilter', tag)
        }
      },
//      disqusScrollHack () {
//        this.commentsBody.style.transform =`translate3d(0, ${-this.scrollBar.scrollTop}px, 0)`
//      },
      disqusReady () {
        console.log('RRREEAADDYY!!')
        this.disqusLoading = false
        this.disqusLoadingTooLong = false
        this.$store.commit('setDisqusFail', false)
        // this.scrollBar.update()
//        this.comments = document.querySelector('.SidePanel__Content__Bottom__CommentSection--container')
//        this.commentsBody = document.querySelector('.SidePanel__Content__Bottom__CommentSection__Content')
//        const fakeLayer = document.querySelector('.SidePanel__Content__Bottom__CommentSectionFakeLayer')
//        console.log('RRREEAADDYY!!', this.commentsBody.getBoundingClientRect().height)
//        fakeLayer.childNodes[0].style.height = `${this.commentsBody.getBoundingClientRect().height}px`
//        // this.scrollBar = Scrollbar.init(commentSection, this.scrollBarOptions)
        // Scrollbar.detachStyle()
        // this.scrollBar.addListener(this.disqusScrollHack)
//        const disqus = document.getElementById('disqus_thread')
//        const iframe = disqus.childNodes[0]
//        window.addEventListener('mousewheel', () => {
//          console.log('what!!!!')
//        })
//        window.addEventListener('mousemove', () => {
//          console.log('what!!!!')
//        })

        // const doc = iframe.contentDocument
        // console.log(doc)
//        iframe.setAttribute('scrolling', true)
//        iframe.setAttribute('verticalscrolling', true)
        // console.log(iframe.attributes)
        this.$store.commit('setCommentSectionContainer', true)
        let that = this
        setTimeout(() => {
          that.lanLoading = false
        }, 500)
      },
      disqusFail () {
        this.lanLoading = false
        this.disqusLoading = false
        this.disqusLoadingTooLong = false
        this.$store.commit('setDisqusFail', true)
        this.$store.commit('setCommentSectionContainer', true)
        console.log('Fail!!')

      },
      disqusDestroy () {
        this.$store.commit('setCommentSectionContainer', false)
      },
      toggleBottom () {
        this.$store.commit('setCommentSectionContainer', !this.$store.state.commentSection.containerShow)
      },
      changeLanguage () {
        if (!this.lanLoading) {
          if (this.$store.state.disqusFail) {
            this.$store.dispatch('toggleLocale')
          } else {
            this.lanLoading = true
            this.$store.dispatch('toggleLocale')
            this.$store.commit('setCommentSectionComment', false)
            let that = this
            setTimeout(() => {
              that.$store.commit('setCommentSectionComment', true)
            }, 300)
          }

        }
      }
    }
  }

</script>
<style lang="scss">
  @import "~assets/scss/main.scss";

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
        &__LanguageBtn {
          padding: 0 20px;
          color: white;
          font-size: 1rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .icon {
            cursor: pointer;
            margin-left: 5px;
            font-size: 1.5rem;

            &--loading {
              -webkit-animation: circling 0.5s infinite;
              -o-animation: circling 0.5s infinite;
              animation: circling 0.5s infinite;
            }
          }
        }
        &__Logo {
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          > img {
            height: 100%;
            object-fit: contain;
            cursor: pointer;
            @include transition(all 0.5s ease);
            &:hover {
              filter: hue-rotate(20deg);
            }
          }
        }

      }
      &__Middle {
        width: 100%;
        height: 35%;
        padding: 10px;
        background-color: rgba(207, 144, 181, 0.33);
        &__Tags {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-flow: row wrap;
          &__Tag {
            padding: 5px 8px 5px 8px;
            margin-right: 5px;
            margin-bottom: 5px;
            display: inline-block;
            color: #EFEFEF;
            font-size: 0.9rem;
            text-shadow: none;

            background-color: hsla(270, 66%, 87%, 0.2);
            box-shadow: inset 0 0 1em .5em hsla(270, 77%, 82%, 0.1);
            -webkit-filter: drop-shadow(0 1px 1px hsla(0,0%,0%,0.5));
            filter: drop-shadow(0 1px 1px hsla(0, 0%, 0%, 0.5));
            cursor: pointer;

            &:hover {
              color: #1ecf99;
            }
            &--selected {
              color: #1ecf99;
              background-color: hsla(274, 60%, 19%, 0.78);
            }
          }
        }
      }
      &__Bottom {
        width: 100%;
        height: 50%;
        padding: 0 20px;
        background-color: rgba(255, 248, 248, 0.52);
        scroll-behavior: smooth;
        overflow: hidden;
        position: relative;
        @include transition(transform 0.3s ease);
        transform-style: preserve-3d;
        will-change: transform;
        &__ToggleBtn {
          width: 100%;
          height: 12%;

          text-align: center;
          .icon {
            margin-top: 5px;
            font-size: 2rem;

            color: white;
            cursor: pointer;
            @include transition(transform 0.3s ease);
            will-change: transform;
          }
        }
        &__CommentSection {
          &--mask {
            z-index: 99;
            position: relative;
            width: 100%;
            height: calc(100% - 50px);
            overflow: hidden;
          }
          &--container{
            width: calc(100% + 18px);
            padding: 5px;
            height: 100%;
            overflow-y: scroll;
          }

          &__Content {
            width: 100%;
            /*-webkit-transition: all 0.1s ease;*/
            /*-moz-transition: all 0.1s ease;*/
            /*-ms-transition: all 0.1s ease;*/
            /*-o-transition: all 0.1s ease;*/
            /*transition: all 0.1s ease;*/
            /*transform-style: preserve-3d;*/
            /*will-change: transform;*/
          }
        }
        &--show {
          transform: translate3d(0, 0, 0);
          .icon {
            transform: rotate(0deg);
          }
        }
        &--hide {
          transform: translate3d(0, 89%, 0);
          .icon {
            transform: rotate(180deg);
          }
        }
        /*&__CommentSectionFakeLayer {*/
          /*width: 100%;*/
          /*height: calc(100% - 50px);*/
          /*top: 50px;*/
          /*position: absolute;*/
          /*// pointer-events: none;*/
          /*overflow: hidden;*/
          /*scroll-behavior: smooth;*/

          /*&__Content {*/
            /*width: 100%;*/
            /*height: 0;*/

          /*}*/
        /*}*/
      }
    }

  }
  .disqus--fail {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    .icon {
      font-size: 2.5rem;
    }
    div {
      width: 100%;
      text-align: center;
    }
  }
  .disqus--loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    .icon {
      font-size: 2.5rem;
      -webkit-animation: circling 0.5s ease 0s 15;
      -o-animation: circling 0.5s ease 0s 15;
      animation: circling 0.5s ease 0s 15;

    }
    div {
      width: 100%;
      text-align: center;
    }
  }
  .disqus--loading-too-long {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    .icon {
      font-size: 2.5rem;
      -webkit-animation: circling 0.5s linear infinite;
      -o-animation: circling 0.5s linear infinite;
      animation: circling 0.5s linear infinite;

    }
    div {
      width: 100%;
      text-align: center;
    }
  }
  @keyframes circling {
    from {
       transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
