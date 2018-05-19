<template>
  <article class="g-shake-box">
    <div class="con">
      <span class="signal signal-tell"></span>
    </div>
    <span class="phone-txt">疯狂摇动你的手机吧！</span>
    <shake @on-shake="onShake" :stop="isStop" :timeout="50"></shake>
  </article>
</template>
<script>
import {
  Shake
} from 'cvux/src/components'

export default {
  components: {
    Shake
  },
  data() {
    return {
      isStop: false,
      timestamp: 0,
      time_sec: 0,
      count: 0,
      change: 0,
      timeCount: null,
      myShakeEvent: null,
      activityId: 0
    }
  },
  created() {
    this.activityId = this.$store.state.shakegame.activity.shake_game_activity_id
    if (this.activityId) {
      this.$rest.active.shakegame.getActivity(null, this.activityId).then((res) => {
        if (res.code === 401) { // openid登录   /auth/weixin/<int:store_id>/openid?next=<str:target_url>
          this.showToast(res.message)
          window.location.href = `auth/weixin/login/openid?next=` + encodeURIComponent(`?_=1#/active/shakegame/index?shake_game_activity_id=${this.activityId}`)
        } else {
          this.isStop = true
          this.sendShake()
        }
      })
    } else {
      this.showToast('activityId不存在')
    }
  },
  methods: {
    onShake() {
      this.count += 1
    },
    sendShake() {
      // 每隔200ms 当count发生改变时上传摇动次数
      this.timeCount = setInterval(() => {
        let timesTamp = new Date().getTime()
        let timeSec = ''
          // 判断count是否变化
        if (this.change === this.count) { // count 发生改变
          return
        } else {
          timeSec = Math.floor(timesTamp / 1000)
          this.change = this.count
          this.$rest.active.shakegame.sendShakeRecord({
            'timestamp': timeSec,
            'count': this.count
          }, `${this.activityId}/record`).then(res => {
            if (res.code === 409 || res.code === 403) { // 您已经完成游戏   // 活动不在进行中
              // 停止发送
              this.stopSend()
              this.showToast(res.message)
                // 跳转到获奖名单
              this.gameIsOver()
            } else if (res.code === 400) { // 没有报名等错误
              this.stopSend()
              this.showToast(res.message)
              window.location.href = `auth/weixin/login/openid?next=` + encodeURIComponent(`?_=1#/active/shakegame/index?shake_game_activity_id=${this.activityId}`)
            }
          })
        }
      }, 400)
    },
    stopSend() {
      this.isStop = false
      clearInterval(this.timeCount)
      this.count = 0
    },
    gameIsOver() {
      let time = setInterval(() => {
        this.$rest.active.shakegame.getActivity(null, this.activityId).then((res) => {
          if (res.code === 0 && res.data.activity.status === 'finished') {
            clearInterval(time)
            this.$router.push('/active/shakegame/list')
          }
        })
      }, 500)
    }
  }
}
</script>
<style scoped lang="less">
@import "../../../stylesheets/modules/active/shakegame/shake";
</style>
