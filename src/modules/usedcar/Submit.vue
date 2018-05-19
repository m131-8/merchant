<template>
  <article>
    <group gutter="0px">
      <x-input title="车架号" v-model.trim="vin" placeholder="输入17位车架号，识别车型" :max="17">
        <span class="usedcar-sure-btn" slot="right" @click="searchVin()">确定</span>
      </x-input>
      <cell class="usedcar-brand-info" link='/car/brand' is-link v-if='jzgCarModelId' title="车型">
        <div solt="value" style="color: #000;">{{carInfo.model_name}}</div>
      </cell>
      <x-input title="车型" v-model="carInfo.model_name" placeholder="请选择您的车型" @click.native="go('brand')" disabled is-link  v-else></x-input>
    </group>
    <group :gutter='mt10' class="text-black-pro">
      <x-input title="车牌号" placeholder="请输入车牌号" v-model="plateNumber"></x-input>
      <datetime class="datetime" title="新车交车" placeholder="请选择新车交车日期" :min-year="1970" start-date="1970-01-01" :end-date="endDate" format="YYYY-MM-DD" confirm-text="完成" cancel-text="取消" v-model="licenseIssuedOn"></datetime>
      <x-input title="行驶里程" :max="7" placeholder="请输入公里数" v-model="mileage">
        <span slot='right' style="color: #000">公里</span>
      </x-input>
      <x-input title="车身颜色" style="color: #000" @click.native="go('color')" readonly="readonly" is-link v-model="color"></x-input>
      <selector title="过户次数" v-model="transfer_count" :options="countList"></selector>
      <x-address title="车辆归属地" v-model="address" hideDistrict :list="addressData" class="address-before" :placeholder="addressPlaceholder"></x-address>
    </group>
    <group :gutter='mt10' class="owner-info">
      <x-input title="车主姓名" :max="30" placeholder="注意，需要填写车主的姓名" v-model="ownerName"></x-input>
      <x-input title="车主手机" placeholder="车主手机号码" :max="11" v-model="ownerMobile" keyboard="number" is-type="china-mobile">
      </x-input>
      <x-input title="短信验证" name="username" required placeholder="请输入短信验证码" :max="6" v-model="verifyCode"></x-input>
      <verify-code v-model="options" @on-getCode="getCode"></verify-code>
    </group>
    <x-dialog v-model="showCarModel" class="car_model_dialog">
      <group title="请选择您的车型">
        <radio :options="modelList" v-model="chooseCar" @on-change="change"></radio>
      </group>
    </x-dialog>
    <section class="btn-bottom">
      <div class="btn-fix">
        <a class="btn" @click.stop="submit">提交</a>
      </div>
    </section>
    <!-- <x-button class="bottom-btn" @click.native="submit" >提交</x-button> -->
  </article>
</template>
<script>
import {
  Group,
  Cell,
  Selector,
  XAddress,
  Datetime,
  AddressChinaData,
  XButton,
  VerifyCode,
  XInput,
  Radio,
  XDialog
} from 'cvux/src/components'
import util from '../../common/util'
import cache from '../../common/cache'
import value2name from 'cvux/src/filters/value2name'

export default {
  components: {
    Group,
    Cell,
    Selector,
    XAddress,
    Datetime,
    AddressChinaData,
    XButton,
    VerifyCode,
    XInput,
    Radio,
    XDialog
  },
  data() {
    return {
      showCarModel: false,
      chooseCar: '',
      modelList: [],
      storeAddress: [],
      addressPlaceholder: '',
      mt10: '0.266666667rem',
      endDate: util.formatTime(new Date(new Date().valueOf()), 'yyyy-MM-dd'), // datetime组件截止时间
      carModelId: '',
      secondsTimer: null,
      countList: [],
      addressData: AddressChinaData,
      isClicked: false,
      carInfo: {
        model_name: ''
      },
      options: {
        show: false,
        time: 21,
        start: false,
        codeText: '获取验证码'
      }
    }
  },
  created() {
    // 过户次数定义0-10次
    for (let item = 0; item < 11; item++) {
      let obj = {
        key: `${item}`,
        value: `${item}次`
      }
      this.countList.push(obj)
    }
    let jzgCarId = this.$store.state.submit.usedCar.jzg_car_model_id
    if (jzgCarId) {
      this.getCarInfo(jzgCarId)
    }
    // 获取门店地址
    this.$rest.store.getStoreInfo().then((res) => {
      if (res.code === 0) {
        this.storeAddress.push(res.data.province_code)
        this.storeAddress.push(res.data.city_code)
      }
    })
  },
  computed: {
    vin: {
      get() {
        return this.$store.state.submit.usedCar.vin
      },
      set(value) {
        this.$store.commit('updateVin', value)
      }
    },
    jzgCarModelId: {
      get() {
        return this.$store.state.submit.usedCar.jzg_car_model_id
      },
      set(value) {
        this.$store.commit('updateJzgCarModelId', value)
      }
    },
    plateNumber: {
      get() {
        return this.$store.state.submit.usedCar.plate_number
      },
      set(value) {
        this.$store.commit('updatePlateNumber', value)
      }
    },
    licenseIssuedOn: {
      get() {
        return this.$store.state.submit.usedCar.license_issued_on
      },
      set(value) {
        let today = new Date().toISOString().slice(0, 10)
        if (value > today) {
          this.showToast('上牌时间必须为今天或以前的时间')
        } else {
          this.$store.commit('updateLicenseIssuedOn', value)
        }
      }
    },
    mileage: {
      get() {
        return this.$store.state.submit.usedCar.mileage
      },
      set(value) {
        let valid = util.regexpMap.regexp_car_mileage.test(value)
        if (valid) {
          this.$store.commit('updateMileage', value)
        } else {
          this.showToast('请输入有效的里程')
        }
      }
    },
    color_id: {
      get () {
        return this.$store.state.submit.usedCar.jzg_color_id
      },
      set(value) {
        return this.$store.state.submit.usedCar.jzg_color_id
      }
    },
    color: {
      get () {
        return this.$store.state.submit.colorCar.jzg_color
      },
      set(value) {
        return this.$store.state.submit.colorCar.jzg_color
      }
    },
    transfer_count: {
      get() {
        return this.$store.state.submit.usedCar.transfer_count
      },
      set(value) {
        this.$store.commit('updateTransferCount', value)
      }
    },
    address: {
      get() {
        if (this.storeAddress.length === 0) {
          this.addressPlaceholder = '请选择'
        } else {
          this.addressPlaceholder = ''
        }
        return this.storeAddress
      },
      set(value) {
        let address = this.getName(value).split(' ')
        let province = address[0]
        let city = address[1]
        let provinceCode = value[0]
        let cityCode = value[1]
        this.$store.commit('updateAddress', {
          province,
          city,
          provinceCode,
          cityCode
        })
      }
    },
    ownerName: {
      get() {
        return this.$store.state.submit.usedCar.owner_name
      },
      set(value) {
        this.$store.commit('updateName', value)
      }
    },
    ownerMobile: {
      get() {
        return this.$store.state.submit.usedCar.owner_mobile
      },
      set(value) {
        this.$store.commit('updateMoblie', value)
      }
    },
    verifyCode: {
      get() {
        return this.$store.state.submit.usedCar.verify_code
      },
      set(value, AddressChinaData) {
        this.$store.commit('updateVerifyCode', value, AddressChinaData)
      }
    }
  },
  watch: {
    'vin' () {
      this.$store.commit('updateVin', this.vin.toUpperCase())
    }
  },
  methods: {
    change(val) {
      let item = this.modelList.find(v => {
        return v.key === val
      })
      this.carInfo.model_name = item.value
      this.$store.commit('updateJzgCarModelId', item.key)
      this.showCarModel = false
    },
    searchVin() { // 搜索车型
      let vin = this.vin
      if (!util.regexpMap.regexp_vin.test(vin)) {
        this.showToast('请输入正确的车架号')
      } else {
        this.$rest.carInfo.getModelsByVin(null, `${vin}/car_models`).then((res) => {
          if (res.code === 0) {
            let models = res.data.models
            if (models.length > 1) {
              let list = []
              models.forEach((v, index) => {
                let obj = {
                  key: v.id + '',
                  value: v.model_name
                }
                list.push(obj)
              })
              this.modelList = list
              this.showCarModel = true
            } else if (models.length === 1) {
              this.carInfo.model_name = models[0].model_name
//              this.$store.state.submit.usedCar.jzg_car_model_id = models[0].id
              this.$store.commit('updateJzgCarModelId', models[0].id)
            } else {
              this.showToast('查找不到对应的车型')
            }
          } else {
            this.showToast(res.message)
          }
        })
      }
    },
    getCarInfo(id) {
      this.$rest.usedCar.getCarDetailByModelId(null, id).then((res) => {
        if (res.code === 0) {
          this.carInfo = res.data
//          this.$store.state.submit.carInfo.model_name = res.data.model_name
        } else {
          this.showToast(res.message)
        }
      })
    },
    // 获取地址名字
    getName(value) {
      return value2name(value, AddressChinaData)
    },
    // 车颜色
//    getColor() {
//      this.$router.push('/car/color')
//    },
    go(url) {
      this.$router.push({ path: `/car/${url}` })
    },
    getCode() {
      let mobile = this.ownerMobile
      let storeId = this.$route.query.storeId
      if (!storeId) {
        storeId = cache.getLocalStorageData(util.keyMap.CACHE_STORE_ID)
      }
      if (!util.regexpMap.regexp_mobile.test(mobile)) {
        this.showToast('请输入正确的手机号码')
      } else {
        this.options.show = true
        this.$rest.login.getCaptchaCode(null, `${storeId}/verify_code/${mobile}`).then((res) => {
          if (res.code === 0) {
            this.options.show = false
            this.options.start = true
          } else {
            this.showToast(res.message)
          }
        })
      }
    },
    submit() {
      let today = new Date().toISOString().slice(0, 10)
      if (!this.jzgCarModelId) {
        this.showToast('请先选择您的车型')
        return false
      }
      if (!this.plateNumber) {
        this.showToast('请输入车牌号')
        return false
      } else if (!util.regexpMap.car_plate_number.test(this.plateNumber)) {
        this.showToast('请输入正确的车牌号')
        return false
      }
      if (!this.licenseIssuedOn) {
        this.showToast('请选择新车交车日期')
        return false
      } else if (this.licenseIssuedOn > today) {
        this.showToast('新车交车日期必须为今天或以前的时间')
        return false
      }
      if (!this.mileage) {
        this.showToast('请输入公里数')
        return false
      } else if (!util.regexpMap.regexp_car_mileage.test(this.mileage)) {
        this.showToast('请输入正确的公里数')
        return false
      }
      if (!this.ownerName) {
        this.showToast('请输入车主的姓名')
        return false
      }
      if (!this.ownerMobile) {
        this.showToast('请输入手机号码')
        return false
      } else if (!util.regexpMap.regexp_mobile.test(this.ownerMobile)) {
        this.showToast('请输入正确的手机号码')
        return false
      }
      if (!this.verifyCode) {
        this.showToast('请输入短信验证码')
        return false
      } else if (!util.regexpMap.regexp_captcha.test(this.verifyCode)) {
        this.showToast('请输入正确的短信验证码')
        return false
      }
      if (this.isClicked) {
        return false
      }
      this.isClicked = true
      let usedCar = this.$store.state.submit.usedCar
      this.$rest.usedCar.publishUsedCar(usedCar).then((res) => {
        if (res.code === 0) {
          this.isClicked = false
          this.$router.push('/usedcar/success')
        } else {
          this.isClicked = false
          this.showToast(res.message)
        }
      }, (res) => {
        this.isClicked = false
        this.showToast(res.message)
      })
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/usedcar/submit";
</style>
