<template>
  <article>
    <group class="personal-data text-black-pro">
      <x-input title="账号" name="username" placeholder="请输入手机号码" v-model="data.mobile_number" readonly="readonly"></x-input>
      <x-input title="姓名" name="mobile" placeholder="请输入姓名" v-model="data.name"></x-input>
      <x-address title="选择地区" v-model="address" :list="addressData" class="address-before" :placeholder="addressPlaceholder"></x-address>
      <x-input title="详细地址" name="mobile" placeholder="街道门牌信息" v-model="data.address"></x-input>
    </group>
    <x-button class="bottom-btn" @click="saveBtn">保存</x-button>
  </article>
</template>
<script>
import {
  Group,
  Cell,
  XAddress,
  AddressChinaData,
  XButton,
  XInput
} from 'cvux/src/components'
import value2name from 'cvux/src/filters/value2name'

export default {
  components: {
    Group,
    Cell,
    XAddress,
    AddressChinaData,
    XButton,
    XInput
  },
  data() {
    return {
      addressPlaceholder: '',
      address: [],
      data: {},
      addressData: AddressChinaData
    }
  },
  created() {
    this.$rest.personal.getMyInfo().then(res => {
      if (res.code === 0) {
        this.data = res.data
        // 用户保存过省市区
        if (this.data.province_code && this.data.city_code && this.data.district_code) {
          this.address = [this.data.province_code, this.data.city_code, this.data.district_code]
        }
      } else {
        this.showToast(res.message)
      }
      return this.address
    }).then(address => {
      // 用户没有保存过省市区，则获取门店地址作为默认值
      if (this.address.length === 0) {
        this.$rest.store.getStoreInfo().then((res) => {
          if (res.code === 0) {
            this.address.push(res.data.province_code)
            this.address.push(res.data.city_code)
            this.address.push(res.data.district_code)
          } else {
            this.addressPlaceholder = '请选择'
          }
        })
      }
    })
  },
  methods: {
    getName(value) {
      return value2name(value, AddressChinaData)
    },
    saveBtn() {
      let addressCode = this.address
      let addressName = this.getName(addressCode).split(' ')
      let personalData = {
        name: this.data.name,
        address: this.data.address,
        province: addressName[0],
        city: addressName[1],
        district: addressName[2],
        province_code: addressCode[0],
        city_code: addressCode[1],
        district_code: addressCode[2]
      }
      if (!this.data.name) {
        this.showToast('请完成姓名')
        return
      }
      if (!this.data.address) {
        this.showToast('请完成街道门牌信息')
        return
      }
      this.$rest.personal.modifyInfo(personalData).then(res => {
        if (res.code === 0) {
          this.showToast('修改成功')
          this.$router.go(-1)
        } else {
          this.showToast(res.message)
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/usedcar/submit";
</style>
