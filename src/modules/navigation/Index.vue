<template>
  <article>
    <group v-for='(group, index) in groups' :key="index" :title="group[0].path.split('/')[1]" title-color="#5F58F0" class="router">
      <cell v-for='item in group' :key="item.path" :title="item.meta.title" :inline-desc="item.path" :link="item.path | toMock"></cell>
    </group>
  </article>
</template>
<script>
import {
  Cell,
  Group
} from 'cvux/src/components'
import route from '../../router'

export default {
  components: {
    Cell,
    Group
  },
  data() {
    return {
      groups: []
    }
  },
  created() {
    let _this = this
    let allRoutes = route.routes.slice(2)
    let pathArr = []
    allRoutes.sort()
    allRoutes.forEach((v) => {
      let path = v.path.split('/')[1]
      if (pathArr.indexOf(path) < 0) {
        pathArr.push(path)
      }
    })
    pathArr.forEach((v) => {
      let group = []
      allRoutes.forEach((i) => {
        let pathA = i.path.split('/')[1]
        if (v === pathA) {
          group.push(i)
        }
      })
      _this.groups.push(group)
    })
  },
  filters: {
    toMock(val) {
      let path = ''
      if (/:/.test(val)) {
        path = val.replace(/:[^/]*/g, '1100')
      } else {
        path = val
      }
      return path
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
@w2: 75rem;
.router .weui_cell {
  height: 50/@w2;
  line-height: 37.5/@w2;
}
</style>
