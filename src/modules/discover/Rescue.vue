<template>
  <article>
    <div class="rescue-map" id="container">
      <!--img src="../static/images/rescue-map.png" alt=""-->
    </div>
    <group title="救援电话">
      <cell>
        <div slot="after-title">
          <span class="cell-dis-w">24小时救援</span>
          <span slot="after-title">{{data.rescue_number}}</span>
        </div>
        <div slot="value">
          <a :href="`tel:${data.rescue_number}`" class="char-right">
            <em class="icon-phone"></em>
          </a>
        </div>
      </cell>
      <cell>
        <div slot="after-title">
          <span slot="after-title" class="cell-dis-w">联系交警</span>
          <span slot="after-title">122</span>
        </div>
        <div slot="value">
          <a href="tel:122" class="char-right">
            <em class="icon-phone"></em>
          </a>
        </div>
      </cell>
    </group>
    <group title="我的保险公司">
      <selector v-model="currentNumber" :options="insurance_list"></selector>
      <a :href="'tel:'+currentNumber" class="char-right selector-char-right">
        <em class="icon-phone"></em>
      </a>
    </group>
    <footer class="footer" v-if="!isDOS">
      <em class="icon-logo-zs"></em>中升集团
    </footer>
  </article>
</template>
<script>
import {
  Cell,
  Group,
  Selector,
  Flexbox,
  FlexboxItem
} from 'cvux/src/components'
export default {
  components: {
    Cell,
    Group,
    Selector,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      insurance_list: [{
        key: '95518',
        value: '中国人保 95518'
      }, {
        key: '95519',
        value: '中国人寿 95519'
      }, {
        key: '95500',
        value: '太平洋保险 95500'
      }, {
        key: '95511',
        value: '平安保险 95511'
      }, {
        key: '95585',
        value: '中华联合保险 95585'
      }, {
        key: '95505',
        value: '天安保险 95505'
      }, {
        key: '96012345',
        value: '大众保险 96012345'
      }, {
        key: '95509',
        value: '华泰保险 95509'
      }, {
        key: '95502',
        value: '永安保险 95502'
      }, {
        key: '95556',
        value: '华安保险 95556'
      }, {
        key: '95569',
        value: '安邦保险 95569'
      }, {
        key: '95510',
        value: '阳光保险 95510'
      }, {
        key: '400-699-5566',
        value: '中银保险 400-699-5566'
      }, {
        key: '400-889-5586',
        value: '都邦保险 400-889-5586'
      }, {
        key: '400-611-6666',
        value: '渤海保险 400-611-6666'
      }, {
        key: '400-860-0600',
        value: '众诚保险 400-860-0600'
      }, {
        key: '95552',
        value: '永诚保险 95552'
      }, {
        key: '400-881-7518',
        value: '富邦保险 400-881-7518'
      }, {
        key: '95589',
        value: '太平保险 95589'
      }, {
        key: '95592',
        value: '长安责任保险 95592'
      }, {
        key: '400-018-8688',
        value: '英大财险 400-018-8688'
      }, {
        key: '400-866-6555',
        value: '锦泰保险 400-866-6555'
      }],
      currentNumber: '95585',
      data: {}
    }
  },
  created() {
    this.$rest.discover.getRescueNumber(null, 'rescue_number').then(res => {
      if (res.code === 0) {
        this.data = res.data
        this.init()
      } else {
        this.showToast(res.message)
      }
    })
  },
  methods: {
    init() {
      let center = new window.qq.maps.LatLng(this.data.latitude, this.data.longitude)
      let map = new window.qq.maps.Map(document.getElementById('container'), {
        // 地图的中心地理坐标
        center: center,
        zoom: 18,
        // 关闭平移控件
        panControl: false,
        // 设置缩放控件的样式
        zoomControlOptions: {
          // 设置缩放控件样式为仅包含放大缩小两个按钮
          style: window.qq.maps.ZoomControlStyle.SMALL,
          position: window.qq.maps.ControlPosition.LEFT_BOTTOM
        }
      })
      // 信息窗口
      this.infoWin = new window.qq.maps.InfoWindow({
        map: map,
        content: this.data.name,
        position: center,
        visible: true
      })
    }
  },
  computed: {
    isDOS() {
      return this.$store.state.isDOS
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../stylesheets/modules/discover/rescue";
</style>
