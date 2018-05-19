<template>
  <article class="g-ready-box">
    <div class="start">
      <span class="three" v-if='number[2]'>3</span>
      <span class="two" v-if='number[1]'>2</span>
      <span class="one" v-if='number[0]'>1</span>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      number: [false, false, true],
      time: null
    }
  },
  created() {
    let n = 2
    this.time = setInterval(() => {
      this.number = [false, false, false]
      n = n - 1
      this.number[n] = true
      if (n < 0) {
        clearInterval(this.time)
        this.$router.push({
          path: '/active/shakegame/shake'
        })
      }
    }, 1000)
  },
  methods: {}
}
</script>
<style scoped lang="less">
@import "../../../stylesheets/modules/active/shakegame/ready";
</style>
