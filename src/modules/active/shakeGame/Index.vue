<template>
  <article class="g-login-box">
    <form>
      <span class="cow"></span>
      <h2>&nbsp;</h2>
      <div class="input-con">
        <input type="text" class="userName" name="userName" placeholder="请输入姓名" v-model="userName">
        <br />
        <input type="text" class="userPhone" name="userPhone" placeholder="请输入手机号" maxlength="11" v-model="userPhone">
        <br />
        <a class="submit" href="javascript:void(0)" @click='submit'></a>
      </div>
    </form>
  </article>
</template>
<script>
import url from '../../../common/url'
import util from '../../../common/util'

export default {
  data() {
    return {
      activityId: '',
      userName: '',
      userPhone: ''
    }
  },
  created() {
    let activity = url.getSearch()
    this.activityId = activity.shake_game_activity_id
    if (this.activityId) {
      this.$store.commit('setActivity', activity)
      this.$rest.active.shakegame.getActivity(null, this.activityId).then((res) => {
        let status = ''
        if (res.code === 401) { // openid登录   /auth/weixin/<int:store_id>/openid?next=<str:target_url>
          this.showToast(res.message)
          window.location.href = `auth/weixin/login/openid?next=` + encodeURIComponent(`?_=1#/active/shakegame/index?shake_game_activity_id=${activity.shake_game_activity_id}`)
        } else if (res.code === 0) {
          status = res.data.activity.status
          switch (status) {
            case 'waiting':
              if (res.data.enrollment.is_enrolled) {
                this.$router.push('/active/shakegame/explain')
              }
              break
            case 'ongoing':
              this.showToast('活动进行中,请下次报名')
              this.$wechat.promise.then(wx => {
                window.WeixinJSBridge.call('closeWindow')
              }, wx => {
                console.log('微信JSSDK校验错误:', wx.res)
              })
              break
            case 'finished':
              this.showToast('活动已结束')
              this.$router.push('/active/shakegame/list')
              break
            case 'canceled':
              this.showToast('活动已取消')
              this.$wechat.promise.then(wx => {
                window.WeixinJSBridge.call('closeWindow')
              }, wx => {
                console.log('微信JSSDK校验错误:', wx.res)
              })
              break
          }
        }
      })
    }
  },
  methods: {
    submit() {
      let useInfo = {
        contact_name: this.userName,
        contact_number: this.userPhone
      }
      if (!useInfo.contact_name) {
        this.showToast('请输入姓名')
        return false
      }
      if (!util.regexpMap.regexp_mobile.test(useInfo.contact_number)) {
        this.showToast('请输入正确的手机号码')
        return false
      }
      this.$rest.active.shakegame.login(useInfo, this.activityId).then((res) => {
        if (res.code === 0) {
          this.$router.push('/active/shakegame/explain')
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import "../../../stylesheets/modules/active/shakegame/index";
</style>
