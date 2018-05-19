<template>
  <article class="dealer-page">
    <div class="dealer-banner">
      <img :src="image.url">
    </div>
    <div class="navigation">
      <group>
        <cell title="地址导航" is-link>
          <span @click="locate" slot="child" class="location"></span>
          <i slot="icon" class="icon-yxjl"></i>
        </cell>
        <cell title="拨打电话" is-link>
          <i slot="icon" class="icon-phone"></i>
          <a :href="'tel:' + store.contact_number" class="phone" slot="child"></a>
        </cell>
      </group>
    </div>
    <div class="dealer-info">
      <p class="newline">{{store.description}}</p>
    </div>
  </article>
</template>
<script>
import {
  Group,
  Cell
} from 'cvux/src/components'
// import wxHelp from '../../../common/wxhelp'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      store: {},
      image: {}
    }
  },
  created() {
    this.$rest.store.getStoreInfo().then(res => {
      if (res.code === 0) {
        this.store = res.data
          // 选取第一张图片展示
        this.image = this.store.images.find(item => {
          return item.sequence === 1
        })
      }
    })
  },
  methods: {
    locate() {
      let address = this.store
      if (Object.keys(address).length) {
        this.$wechat.promise.then(wx => {
          wx.openLocationByWx(address.latitude || '', address.longitude || '', address.name || '', address.address || '', address.scale || 12, address.infoUrl || '')
        }, wx => {
          console.log('微信JSSDK校验错误:', wx.res)
        })
      }
    }
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/active/dealer";
.navigation {
  .weui_cell {
    position: relative;
    .phone {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .location {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
}
</style>
