<template>
  <!-- 弹窗 -->
  <section class="popup-wrapper" v-show="showPopup" data-around="false" @click="popupAround">
    <transition :name="position">
      <div 
        class="popup-content" 
        :class="{
          'popup-content-center': position === 'center',
          'popup-content-bottom': position === 'bottom',
          'popup-content-top': position === 'top'
        }" 
        v-show="showPopup" 
        :style="contentStyleObj">
        <slot></slot>
      </div>  
    </transition>
  </section> 
</template>

<script>
  export default {
    props: {
      // 方向
      position: {
        type: String,
        default: 'down'
      },
      // 是否显示弹窗
      showPopup: {
        type: Boolean,
        default: false
      },
      // 点击周围弹窗消失
      clickAroundHide: {
        type: Boolean,
        default: false
      },
      // 内容样式
      contentStyleObj: {
        type: Object,
        default: () => {
          return {
            background: '#fff'
          }
        }
      }
    },
    mounted () {
      this.noScrollWithPopup(this.showPopup);
    },
    methods: {
      // 点击弹窗周围，弹窗消失
      popupAround (e) {
        if (this.clickAroundHide && e.target.getAttribute('data-around') === 'false') {
          this.$emit('changePopupState', false)
        }
      },
      // 阻止默认事件
      preventFun (event) {
        event.preventDefault();
      },
      // 弹窗出现时禁止滚动
      noScrollWithPopup (isShowPopup) {
        if (isShowPopup === true) {
          document.body.addEventListener('touchmove', this.preventFun);
        } else {
          document.body.removeEventListener('touchmove', this.preventFun);
        }
      },
      beforeEnter (el) {
        el.style.transition = 'top 1s linear 1s';
        el.style.top = '50%'
      },
      enter (el, done) {
        el.style.top = '70%';
        done();
      }
    }
  }
</script>

<style scoped>
  .popup-wrapper {position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 10; background: rgba(0, 0, 0, 0.5);}
  .popup-content {overflow: hidden;position: fixed;z-index: 10000;}
  .popup-content-center {top: 50%; left: 0.4rem; right: 0.4rem; transform: translateY(-50%);}
  .popup-content-bottom {bottom: 0; left: 0;right:0}
  .popup-content-top {top: 0; left: 0;right:0}

  .center-enter-active {
    transition: all .3s ease;
  }
  .center-enter, .center-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
  .bottom-enter-active {
    transition: all .3s ease;
  }
  .bottom-enter, .bottom-leave-to {
    bottom: -100%;
  }
  .top-enter-active {
    transition: all .3s ease;
  }
  .top-enter, .top-leave-to {
    top: -100%;
  }
</style>
