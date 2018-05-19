<template>
  <article class="g-pxb-list">
    <div class="con">
      <h2 v-if="ranking"><span class="red">恭喜您获得第{{ranking}}名!</span>快去领取奖品吧</h2>
      <h2 v-else>很抱歉，这次您没获奖！</h2>
      <ul>
        <li v-for="item in rankings"><span class="name">{{item.contact_name}}</span> &nbsp;&nbsp; <span class="contact_mobile">{{item.contact_number}}</span></li>
      </ul>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      ranking: 0,
      rankings: []
    }
  },
  created() {
    let activityId = this.$store.state.shakegame.activity.shake_game_activity_id
    this.$rest.active.shakegame.getActivity(null, activityId).then((res) => {
      if (res.code === 0 && res.data.activity.status === 'finished') {
        this.ranking = res.data.enrollment.ranking
        this.rankings = res.data.rankings
      }
    })
  },
  methods: {}
}
</script>
<style scoped lang="less">
@import "../../../stylesheets/modules/active/shakegame/list";
</style>
