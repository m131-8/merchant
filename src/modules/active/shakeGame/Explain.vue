<template>
  <article class="g-explain-box">
    <div class="con"></div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      time: null
    }
  },
  created() {
    let activityId = this.$store.state.shakegame.activity.shake_game_activity_id
    if (activityId) {
      this.$rest.active.shakegame.getActivity(null, activityId).then((res) => {
        if (res.code === 401) { // openid登录   /auth/weixin/<int:store_id>/openid?next=<str:target_url>
          this.showToast(res.message)
          window.location.href = `auth/weixin/login/openid?next=` + encodeURIComponent(`?_=1#/active/shakegame/index?shake_game_activity_id=${activityId}`)
        } else {
          this.time = setInterval(() => {
            // 每隔1s询问后台是否游戏开始了没
            this.$rest.active.shakegame.getActivity(null, activityId).then((res) => {
              if (res.code === 0 && res.data.activity.status === 'ongoing') {
                clearInterval(this.time)
                this.$router.push('/active/shakegame/ready')
              }
            })
          }, 1000)
        }
      })
    } else {
      this.showToast('activityId不存在')
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
@import "../../../stylesheets/modules/active/shakegame/explain";
</style>
