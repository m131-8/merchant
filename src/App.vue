<template>
  <div id="app" style="height:100%;">
    <loading :show="loading.status" :text="loading.text" position="absolute"></loading>
    <toast v-model="toast.show" type="text" :time="toast.time">{{toast.text}}</toast>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>
<script>
import { Loading, Toast } from 'cvux/src/components'

export default {
  components: {
    Loading,
    Toast
  },
  created() {
    // 获取定制化信息
    this.$store.dispatch('UPDATE_CUSTOMIZED')
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    direction () { // 场景动画切换方向
      return this.$store.state.direction
    },
    toast () {
      return this.$store.state.toast
    }
  }
}
</script>

<style lang="less">
@import '~cvux/src/styles/reset';

body {
  background-color: #fbf9fe;
}

@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}
/**
* vue-router transition
*/
.router-view {
  width: 100%;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.vux-pop-out-enter-active {
  animation-name: popInLeft;
}
.vux-pop-out-leave-active {
  animation-name: popOutRight;
}
.vux-pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}
.vux-pop-in-leave-active {
  animation-name: popOutLeft;
}
</style>
