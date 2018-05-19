<template>
  <article>
    <header class="title-bar">
      <h2>排量和年款</h2>
    </header>
    <ul class="car-list car-list01">
      <li v-for="item in models" @click.stop="selModel(item.id)">
        <a href="javascript:void(0);">{{item.name}}</a>
      </li>
    </ul>
  </article>
</template>
<script>
export default {
  data() {
    return {
      models: []
    }
  },
  created() {
    let seriesId = this.$route.params.seriesId
    if (seriesId) {
      this.$rest.carInfo.getCarModelList(null, `${seriesId}/models`).then((res) => {
        if (res.code === 0) {
          this.models = res.models
        } else {
          this.showToast(res.message)
        }
      })
    } else {
      this.showToast('seriesId不存在')
    }
  },
  methods: {
    selModel(value) {
      this.$store.commit('updateJzgCarModelId', value)
      this.$router.push('/usedcar/submit')
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/car/carInfo";
</style>
