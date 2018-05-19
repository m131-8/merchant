<template>
  <!-- 修改个人资料 -->
  <article class="insures-art" :class="{'body-height': isShow}">
    <h2 class="title-bar">确认险种</h2>
    <div class="select-list-ins">
      <ul class="gap-left">
        <li @click="accordToggle($event)">
          与去年一致<em :class="{ iconBlueHook: isActive }"></em>
        </li>
      </ul>
    </div>
    <div class="select-list-ins mt10">
      <ul class="gap-left">
        <li id="refresh" @click="accordToggle()">
          重新勾选险种
          <em v-if="iconTriangleDown===true" class="iconTriangleDown"></em>
          <em v-else class="iconTriangleUp"></em>
        </li>
        <li class="list-ins-li" v-if="isShowAccord">
          <ul>
            <li v-for="item in newInsures" >
              <div  @click.stop="hookToggle(item.id)" class="icon-hook">
                <em :class="{iconBlueHook:item.isSelected}"></em>
              </div>
              <div class="inq-title" v-if="item.code === 'mb0005'">{{item.name}}</div><div class="inq-title" v-else>{{item.name}}</div><selector class="ins-select-box" v-if="item.glasses" :options="item.glasses" v-model="item.default_glass_type" @click.native.stop="stopEvent"></selector><selector class="ins-select-box" v-if="item.counts" :options="item.counts" v-model="item.default_count" @click.native.stop="stopEvent"></selector><div class="mlr10" v-if="item.hasX">X</div><selector class="ins-select-box" v-if="item.coverages" :options="item.coverages" v-model="item.default_coverage" @click.native.stop="stopEvent"></selector>
              <div v-if="item.has_ndi">
                <span class="inq-franchise" :class="{'inq-isfranchise':item.select_ndi}"  @click.stop="franchiseToggle(item.id)">不计免赔</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <group  v-bind:class="{ fnHide: insuresShow }">
      <cell title="选择保险公司" with_arrow isLink @click.native.stop="choiceInsCompany"  >
        {{companyValue}}
      </cell>
    </group>
    <div class="tip-ins-box" v-if="isShow">
      <div class="bg-filter"></div>
      <div class="tip-filter-box select-list-ins">
        <div class="list-ins-li">
          <radio :options="radioValue" @on-change="change"></radio>
        </div>
      </div>
    </div>
    <section class="mb30">
      <h2 class="title-bar">联系人</h2>
      <group gutter="0px">
        <x-input title="姓名" :required="true" placeholder="请输入您的姓名" @on-vali="afterValidate" :is-type="validateName" v-model="data.user_name"></x-input>
        <x-input title="手机号" :required="true" :is-type="validateMobile" @on-vali="afterValidate" :max="11" placeholder="请输入您的手机号" v-model="data.mobile"></x-input>
        <x-input title="车牌号" :required="true" placeholder="请输入您的车牌号" @on-vali="afterValidate" :is-type="validatePlateNumber" v-model="data.plate_number"></x-input>
      </group>
    </section>
    <section class="btn-bottom">
      <div class="btn-fix">
        <a class="btn" @click.stop="commitInsures">提交询价</a>
      </div>
    </section>
    <!-- <x-button class="bottom-btn" @click.native="commitInsures" >提交询价</x-button> -->
  </article>
</template>
<script>
import { Cell, XButton, XInput, Group, Radio, Checklist, Selector } from 'cvux/src/components'
import util from '../../common/util'

export default {
  components: { Cell, XButton, XInput, Group, Radio, Checklist, Selector },
  data() {
    return {
      isClicked: false,
      data: {
        mobile: '', // 手机号码
        user_name: '', // 联系人
        plate_number: '' // 车牌号码
      },
      iconTriangleDown: true,
      error: null, // 校验结果
      validStatus: {}, // 表单校验状态
      inquiriesData: [], // 险种信息
      fields: ['mobile', 'user_name', 'plate_number'],
      form: {
        mobile: '', // 手机号码
        user_name: '', // 联系人
        plate_number: '' // 车牌号码
      },
      newInsures: [],
      radioValue: [],
      companyValue: '请选择',
      isShow: false,
      isShowAccord: false,
      isActive: true,
      isNewActive: true,
      insuresShow: true, // 保险公司默认隐藏
      showDialog: false,
      same_with_last_year: true, // 与去年保持一致
      company_id: '0' // 保险公司ID
    }
  },
  created() {
    this.$rest.inq.getInsuresList().then(res => {
      if (res.code === 0) {
        this.data = res.data
        let company = res.data.companys
        let insures = res.data.insures
        // 选择保险公司
        for (var item = 0; item < company.length; item++) {
          this.radioValue.push({
            value: company[item].name,
            key: company[item].id
          })
        }
        // 重新勾选险种
        this.newInsures = this.filterData(insures)
      } else {
        this.showToast(res.message)
      }
    })
  },
  methods: {
    stopEvent: () => {},
    change(value) {
      this.radioValue.forEach((v) => {
        if (v.key === value) {
          this.companyValue = v.value
          this.company_id = v.key
        }
      })
      setTimeout(() => {
        this.isShow = false
      }, 200)
    },
    validatePlateNumber(val) {
      let valid = util.regexpMap.car_plate_number.test(val)
      return this.validate(val, valid, '请输入有效的车牌号，如\'粤B12345\'')
    },
    validateMileage(val) {
      let valid = util.regexpMap.regexp_car_mileage.test(val)
      return this.validate(val, valid, '请输入有效的里程')
    },
    validateMobile(val) {
      let valid = util.regexpMap.regexp_mobile.test(val)
      return this.validate(val, valid, '请输入有效的电话号码')
    },
    validateName(val) {
      let valid = util.regexpMap.regexp_name_cn.test(val) || util.regexpMap.regexp_name_en.test(val)
      return this.validate(val, valid, '请输入有效的联系人名字')
    },
    validate(val, valid, msg) {
      let validStatus = {}
      if (valid) {
        validStatus.valid = true
        validStatus.msg = ''
      } else {
        validStatus.valid = false
        validStatus.msg = msg
      }
      return validStatus
    },
    // 校验不通过时展示提示信息
    afterValidate (errors, valid, uuid) {
      // 将校验信息放进hash map 中
      // let msg = errors.format || errors.required
      let msg = Object.values(errors).pop()
      let validStatus = this.validStatus
      validStatus[uuid] = validStatus.uuid || {}
      validStatus[uuid].valid = valid
      validStatus[uuid].msg = msg
      // 获取一个错误的表单项
      this.error = this.getError()
      // if (this.error && this.error.msg) {
      // this.showToast(this.error.msg)
      // }
    },
    getError () {
      let validStatus = this.validStatus
      return Object.values(validStatus).find(v => {
        return !v.valid
      })
    },
    // 与去年一致
    accordToggle() {
      let isShowAccord = this.isShowAccord
      if (!isShowAccord) {
        this.isShowAccord = true
        this.isActive = false
        this.insuresShow = false
        this.iconTriangleDown = false
      } else {
        this.isShowAccord = false
        this.isActive = true
        this.insuresShow = true
        this.iconTriangleDown = true
      }
    },
    hookToggle (id) {
      this.newInsures.forEach(v => {
        if (v.id === id && v.id !== 10017 && v.id !== 10018) {
          // 车船税和交强险为强制保险
          v.isSelected = !v.isSelected
        }
      })
    },
    franchiseToggle (id) {
      this.newInsures.forEach((v, index, arr) => {
        if (v.id === id) {
          // 不计免赔
          if (v.has_ndi) {
            arr[index].select_ndi = !v.select_ndi
          }
        }
      })
    },
    choiceInsCompany() {
      this.isShow = true
    },
    commitInsures() {
      let insures = this.newInsures
      if (!this.insuresShow && (this.companyValue === '请选择' || this.companyValue === '')) {
        // 保险公司显示状态下未选择公司
        this.showToast('请选择保险公司')
        return false
      }
      let error = this.getError()
      if (!error) {
        let newDefault = insures.filter(v => {
          // 是否是选中selected_by_default
          let isSelected = v.isSelected
          if (isSelected) {
            return {
              key: v,
              value: `${v}`,
              selected: isSelected
            }
          }
        })
        this.inquiriesData = [] // 清空所有inquiriesData数组信息
        for (var i = 0; i < newDefault.length; i++) {
          var id = 'kind_id:' + newDefault[i].id
          var ndi = '|select_ndi:' + newDefault[i].select_ndi
          if (newDefault[i].glasses !== undefined) {
            // 存在玻璃险种
            this.inquiriesData.push(id + ndi + '|glass_type:' + newDefault[i].default_glass_type)
          } else if (newDefault[i].coverages !== undefined) {
            if (newDefault[i].counts !== undefined) {
              // 存在座位
              this.inquiriesData.push(id + ndi + '|count:' + newDefault[i].default_count + '|coverage:' + newDefault[i].default_coverage)
            } else {
              // 存在各种险种
              this.inquiriesData.push(id + ndi + '|coverage:' + newDefault[i].default_coverage)
            }
          } else {
            this.inquiriesData.push(id + ndi)
          }
        }
        if (!this.insuresShow) {
          this.form.same_with_last_year = false
          this.form.company_id = this.company_id
          this.form.insures = this.inquiriesData
        } else {
          this.form.same_with_last_year = true
          this.form.company_id = '0'
          this.form.insures = ''
        }
        this.fields.forEach(v => {
          this.form[v] = this.data[v]
        })
        if (this.form.insures.length) {
          this.form.insures = this.form.insures.join(',')
        }
        if (this.isClicked) {
          return false
        }
        this.isClicked = true
        this.$rest.inq.commitInq(this.form, 'inquiry-insure').then(res => {
          if (res.code === 0) {
            this.$router.push({path: '/inquiries/success'})
          } else {
            this.showToast(res.message)
          }
          this.isClicked = false
        }, (res) => {
          this.isClicked = false
          this.showToast(res.message)
        })
      } else {
        if (error.msg) {
          this.showToast(error.msg)
        }
      }
    },
    filterData(insures) {
      let newInsures = insures.map(v => {
        let insure = {}
        // step 1: 保险名称
        insure.name = v.name
        insure.code = v.code
        insure.id = v.id
        insure.select_ndi = false
        let properties = v.properties
        // 是否需要乘法运算符号
        let needsMulti = {
          counts: false,
          coverage: false
        }
        // 是否有不计免赔
        if (properties && properties.has_ndi && properties.has_ndi === true) {
          insure.has_ndi = properties.has_ndi
        }
        // step 2: 是否有玻璃保险
        if (properties && properties.glass_type && properties.glass_type.length > 0) {
          let newGlasses = properties.glass_type.map(v => {
            let isSelected = false
            // 是否默认值
            if (properties.default_glass_type === v) {
              isSelected = true
            }
            return {
              key: v,
              value: `${v}`,
              selected: isSelected
            }
          })
          insure.default_glass_type = properties.default_glass_type
          insure.glasses = newGlasses
        }
        // step 3: 可选择座位
        if (properties && properties.counts && properties.counts.length > 0) {
          needsMulti.counts = true
          let newCounts = properties.counts.map(v => {
            // let isSelected = false
            // 是否默认值
            // if (properties.default_count === v) {
            //   isSelected = true
            // }
            // 是否有单位
            let unit = properties.unit || '座'
            return {
              key: v + '',
              value: `${v}${unit}`
            }
          })
          insure.counts = newCounts
          insure.default_count = properties.default_count || newCounts[3].key
        }
        // step 4: 可选择保额
        if (properties && properties.coverages && properties.coverages.length > 0) {
          needsMulti.coverages = true
          let newCoverages = properties.coverages.map(v => {
            let isSelected = false
            if (properties.default_coverage === v) { // 是否默认值
              isSelected = true
            }
            // 是否有单位
            let unit = properties.coverage_unit || '元'
            return {
              key: v,
              value: `${v}${unit}`,
              selected: isSelected
            }
          })
          // 需要连接符
          insure.hasX = needsMulti.counts && needsMulti.coverages
          insure.coverages = newCoverages
          insure.default_coverage = properties.default_coverage
        }
        // step 5: 是否强制保险
        insure.isSelected = v.is_force || v.selected_by_default
        return insure
      })
      return newInsures
    }
  },
  filters: {}
}
</script>
<style lang="less">
@import "../../stylesheets/modules/inquiries/inq.less";
</style>
