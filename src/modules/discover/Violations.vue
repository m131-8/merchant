<template>
  <article class="violation">
    <group>
      <x-address class="address-before" title="车牌所在地" v-model="address" raw-value :list="addressData" hide-district :placeholder="addressPlaceholder"></x-address>
      <x-input title="车牌号码" placeholder="比如：粤B8888" v-model="form.plate_number"></x-input>
      <x-input title="发动机号" :placeholder="placeholder.enginePh" v-model="form.engine_number"></x-input>
      <x-input title="车架号" :placeholder="placeholder.vinPh" v-model="form.vin"></x-input>
    </group>
    <br>
    <divider>发动机号、车架号在您的行驶证上可找到，如图：</divider>
    <div class="img_wrapper">
      <img src="../../stylesheets/images/vehicle.png">
    </div>
    <x-button class="bottom-btn" @click.native="check">查询</x-button>
  </article>
</template>
<script>
import {
  XAddress,
  Group,
  XButton,
  XInput,
  Divider
} from 'cvux/src/components'
import util from '../../common/util'
import cache from '../../common/cache'

export default {
  components: {
    Group,
    XInput,
    XButton,
    XAddress,
    Divider
  },
  data() {
    return {
      addressPlaceholder: '',
      violationsVersion: '20161109',
      violationsLocalStorageVersionKey: 'LS_VIOLATIONS_VERSION',
      citiesLocalStorageKey: 'LS_DISCOVER_VIOLATIONS_CITIES',
      address: [],
      addressData: [],
      form: {
        city: '',
        plate_number: '',
        engine_number: '',
        vin: ''
      }
    }
  },
  created() {
    this.$rest.discover.getCities().then(res => {
      if (res.code === 0) {
        let version = cache.getLocalStorageData(this.violationsLocalStorageVersionKey)
        if (this.violationsVersion !== version) {
          cache.setLocalStorageData(this.citiesLocalStorageKey, '')
        }
        // 处理返回数据并缓存
        if (cache.getLocalStorageData(this.citiesLocalStorageKey).length === 0) {
          this.getAddress(res)
        }
        this.addressData = cache.getLocalStorageData(this.citiesLocalStorageKey)
        // 根据缓存及门店信息，设置默认值
        this.getStoreAddress(res.hint.province, res.hint.city)
      } else {
        this.showToast(res.message)
      }
    })
  },
  mounted() {
    this.$rest.login.is_openid_login(null, `login/is-openid-login`).then((res) => {
      if (res.code === 0) {
        if (!res.data.is_login) {
          window.location.href = 'auth/weixin/login/openid?next=' + encodeURIComponent('?#/discover/violations')
        }
      } else {
        this.showToast('系统繁忙，请稍后再试!!')
      }
    })
  },
  watch: {
    address () {
      if (this.address.length === 0) {
        this.addressPlaceholder = '请选择'
      } else {
        this.addressPlaceholder = ''
      }
    }
  },
  computed: {
    placeholder() {
      let placeholder = {
        enginePh: '请输入发动机号',
        vinPh: '请输入车架号'
      }
      let cityCode = this.address[1]
      let list = this.addressData
      for (var i = 0, l = list.length; i < l; i++) {
        let v = list[i]
        if (cityCode === v.value) {
          if (typeof v.engine_number === 'number') {
            placeholder.enginePh = v.engine_number ? `请输入发动机号后${v.engine_number}位` : '请输入完整发动机号'
          }
          if (typeof v.vin === 'number') {
            placeholder.vinPh = v.vin ? `请输入车架号后${v.vin}位` : '请输入完整车架号'
          }
          break
        }
      }
      return placeholder
    }
  },
  methods: {
    // 转化数据成为xaddress接受的json格式，name/value/parent
    getAddress(res) {
      // 请求省市数据接口
      let cities = cities = res.cities
      let addressList = []
      // 遍历并提取出省，添加name/value字段
      Object.keys(cities).forEach((v, i) => {
        let item = {
          value: i + 2 + '',
          name: v || '' // 省级名称
        }
        addressList.push(item)
      })
      // 遍历提出省下面的市级数组
      Object.values(cities).forEach((v, i) => {
        v.forEach((k) => {
          let item = {
            value: k.city_code,
            name: k.city_name || '',
            parent: i + 2 + '', // 对应省级规则为索引+2
            engine_number: k.engine_number,
            vin: k.vin
          }
          addressList.push(item)
        })
      })
      // 设置缓存
      cache.setLocalStorageData(this.citiesLocalStorageKey, addressList)
      cache.setLocalStorageData(this.violationsLocalStorageVersionKey, this.violationsVersion)
    },
    // 通过name，查找到对应的value，xaddress中是通过value值来进行省市区联动的
    findValue(data, target) {
      let result = ''
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === target) {
          result = data[i].value
          break
        }
      }
      return result
    },
    // 通过门店地址获取对应的xaddress地址
    getStoreAddress(province, city) {
      let storeProvince = this.findValue(this.addressData, province)
      let storeCity = this.findValue(this.addressData, city)
      // 判断门店地址信息是否完整
      if (storeProvince !== '' && storeCity !== '') {
        this.address = [storeProvince, storeCity]
      } else {
        this.address = []
      }
    },
    check() {
      this.form.city = this.address[1]
      if (!util.regexpMap.car_plate_number.test(this.form.plate_number)) {
        this.showToast('请输入正确的车牌号,如粤A12345')
        return false
      }
      if (this.placeholder.enginePh) {
        if (!this.form.engine_number) {
          this.showToast(this.placeholder.enginePh)
          return false
        }
      }
      if (this.placeholder.vinPh) {
        if (!this.form.vin) {
          this.showToast(this.placeholder.vinPh)
          return false
        }
      }
      this.$rest.discover.getViolations(this.form).then((res) => {
        if (res.code === 0) {
          let detail = {
            plate_number: this.form.plate_number,
            violations: res.violations
          }
          this.$store.commit('updateViolationInfo', detail)
          this.$router.push('/discover/violationsdetail')
        } else if (res.code === 401) {
          window.location.href = 'auth/weixin/login/openid?next=' + encodeURIComponent('?#/discover/violations')
        } else {
          this.showToast(res.message)
        }
      })
    }
  }
}
</script>
<style lang="less">
@w2: 75rem;
.violation {
  .img_wrapper {
    text-align: center;
    // width: 100%;
    margin: 0 30/@w2;
  }
  .vux-popup-picker-value {
    color: #000;
  }
  .address-before .weui_cell_bd p {
    width: 180/@w2 !important;
    display: inline-block;
    padding-right: 10/@w2;
  }
}

</style>
