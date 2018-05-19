<template>
  <div>
    <group gutter="0px">
      <cell class="check-others" :title="plateNumber" value="其他车辆查询" link='/discover/violations'></cell>
    </group>
    <div class="content">
      <group v-for="item in violations" :key="item.code">
        <div class="illegal-info db"><span>违章详情：</span><em class="fx1">{{item.description}}</em></div>
        <!-- <cell title="违章详情：" :value="item.description"></cell> -->
        <cell class="violations-fine-point" :title="item.is_handled | selStatus">
          <div slot="value">
            <span v-if="item.fine">罚款：{{item.fine}}</span>
            <span v-else>罚款：0</span>
            <span v-if="item.point">扣分：{{item.point}}</span>
            <span v-else>扣分：0</span>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import {
  Group,
  Cell
} from 'cvux/src/components'

export default {
  components: {
    Group,
    Cell
  },
  filters: {
    selStatus(val) {
      let status = ''
      switch (val) {
        case 0:
          status = '未处理'
          break
        case 1:
          status = '已处理'
          break
        case 2:
          status = '未知'
          break
      }
      return status
    }
  },
  computed: {
    plateNumber() {
      return this.$store.state.violations.violationInfo.plate_number
    },
    violations() {
      return this.$store.state.violations.violationInfo.violations
    }
  },
  methods: {}
}
</script>
<style lang="less">
@import "../../stylesheets/modules/discover/violationsDetail";
</style>
