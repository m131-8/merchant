<template>
  <article>
    <group>
      <x-input title="服务项目" :required="true" placeholder="请选择服务项目" :readonly="true" @click.native="onShowServices" v-model="appointment.service.name" @on-vali="afterValidate" is-link></x-input>
      <datetime class="datetime" title="预计到店" @on-change="validateDate" placeholder="请输入到店时间" :start-date="startDate" @on-vali="afterValidate" format="YYYY-MM-DD HH:mm" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}时" minute-row="{value}分" confirm-text="完成" cancel-text="取消" :min-hour="8" :max-hour="17" v-model="appointment.appointed_time"></datetime>
    </group>
    <group :gutter="mt10">
      <x-input title="车牌号码" :required="true" :is-type="validatePlateNumber" placeholder="粤A12345" v-model="appointment.plate_number" @on-vali="afterValidate"></x-input>
      <x-input title="当前里程" @on-vali="afterValidate" :is-type="validateMileage" placeholder="请输入公里数" v-model="appointment.mileage">
        <span slot="right">公里</span>
      </x-input>
    </group>
    <group :gutter="mt10">
      <x-input title="联系人 " :required="true" @on-vali="afterValidate" :is-type="validateName" placeholder="您的姓名" v-model="appointment.contact_name"></x-input>
      <x-input title='手机号码' type="tel" :required="true" @on-vali="afterValidate" :is-type="validateMobile" :max="11" placeholder="手机号码" v-model="appointment.contact_number"></x-input>
    </group>
    <group title="备注文字（选填）">
      <x-textarea :max="100" v-model="appointment.remark" placeholder="请输入100字以内的车辆情况描述" :show-counter="false"></x-textarea>
    </group>
    <group title="服务顾问">
      <x-input title="服务顾问" :required="true" :readonly="true" @on-vali="afterValidate" v-model="appointment.service_consultant.name" @click.native="onShowAdvisor" is-link>
        <img class="adviser-img" slot="label" :src="appointment.service_consultant.avatar" v-if="appointment.service_consultant.avatar">
        <img slot="label" class="adviser-img" src="../../stylesheets/images/avatar-pic.png" v-else>
        <span slot="right">更换顾问</span>
      </x-input>
    </group>
    <section class="appointment-btn-bottom">
      <x-button @click.native="onSubmit" class="appointment-btn-fix" :class="{active: !error}" :type="'primary'">
        <div>
          提交预约
        </div>
      </x-button>
    </section>
    <!-- 服务项目弹层 -->
    <popup v-model="showServicePopup" style="height: 100%;overflow: auto;">
      <group title="服务项目">
        <checker v-model="appointment.service.id">
          <checker-item class="appointment-item" v-for="item in services" :key="item.id" :value="item.id" @on-item-click="onSelectService">
            <cell class="appointment-adviser">
              <img slot="icon" class="appointment-adviser-img" :src="item.logo_url"></img>
              <span slot="after-title" class="appointment-title">{{item.name}}</span>
              <icon type="success_no_circle" v-if="item.id===appointment.service.id"></icon>
            </cell>
          </checker-item>
        </checker>
      </group>
    </popup>
    <!-- 服务顾问弹层 -->
    <popup v-model="showAdvisorPopup" style="height: 100%;overflow: auto;">
      <group title="服务顾问">
        <checker v-model="appointment.service_consultant.id">
          <checker-item class="appointment-item" v-for="item in advisors" :key="item.id" :value="item.id" @on-item-click="onSelectAdvisor">
            <cell class="appointment-adviser">
              <img slot="icon" class="adviser-img" :src="item.avatar"></img>
              <span slot="after-title" class="appointment-title">{{item.name}}</span>
              <icon type="success_no_circle" v-if="appointment.service_consultant.id===item.id"></icon>
            </cell>
          </checker-item>
        </checker>
      </group>
    </popup>
    <!-- 成功页弹层 -->
    <!-- <x-dialog v-model="showDialog" :scroll="false">
      <article class="appointment-dialog">
        <section class="appointment-dialog-hd">
          <icon class="appointment-dialog-hd_icon" @click.native="showDialog=false" type="clear"></icon>
        </section>
        <section class="appointment-dialog-bd">
          <i class="appointment-dialog-bd_icon"></i>
          <p class="appointment-dialog-bd_title">已预约</p>
          <p class="appointment-dialog-bd_info">服务顾问{{appointment.service_consultant.name}}将为您做好接车准备</br>欢迎届时光临</p>
        </section>
        <section class="appointment-dialog-ft">
          <a :href="`tel:${appointment.service_consultant.mobile_number}`">
            <i class="icon-phone"></i> 电话咨询
          </a>
          <a href="javascript:void(0);" @click.stop="onSendWx">
            <i class="icon-wx"></i> 微信咨询
          </a>
        </section>
      </article>
    </x-dialog> -->
  </article>
</template>
<script>
import {
  Group,
  Cell,
  XInput,
  Datetime,
  XTextarea,
  Checker,
  CheckerItem,
  XButton,
  Popup,
  Icon
  // XDialog
} from 'cvux/src/components'
import util from '../../common/util'

export default {
  components: {
    Group,
    Cell,
    XInput,
    Datetime,
    XTextarea,
    Checker,
    CheckerItem,
    XButton,
    Popup,
    Icon
    // XDialog
  },
  data() {
    return {
      mt10: '0.13333333rem',
      tomorrowEight: '',
      timeError: false,
      appointment: {
        service: {
          name: ''
        }, // 服务类型
        appointed_time: '', // 预计到店
        plate_number: '', // 车牌号码
        mileage: '', // 当前里程
        contact_name: '', // 联系人
        contact_number: '', // 手机号码
        remark: '', // 备注
        service_consultant: { // 服务顾问
          name: ''
        }
      },
      fields: ['appointed_time', 'plate_number', 'mileage', 'contact_name', 'contact_number', 'remark'],
      form: {
        service_id: 0, // 服务类型id
        appointed_time: '', // 预计到店
        plate_number: '', // 车牌号码
        mileage: '', // 当前里程
        contact_name: '', // 联系人
        contact_number: '', // 手机号码
        remark: '', // 备注
        service_consultant_id: 0 // 服务顾问id
      },
      startDate: util.formatTime(new Date(new Date().valueOf() + 24 * 3600 * 1000), 'yyyy-MM-dd'), // datetime组件开始时间
      validStatus: {}, // 表单校验状态
      showAdvisorPopup: false, // 顾问类别
      showServicePopup: false, // 服务类别
      // showDialog: false, // 展示成功对话框
      error: null, // 校验结果
      services: [], // 服务类别列表
      advisors: [], // 服务顾问列表
      isClicked: false
    }
  },
  created() {
    let now = new Date()
    this.tomorrowEight = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()).getTime() + (32 * 3600 + 1800) * 1000
    this.services = this.$store.state.appointment.services
    this.advisors = this.$store.state.appointment.advisors
    // 获取订单信息
    this.$rest.appointment.getLastBooking().then(res => {
      if (res.code === 0) {
        let data = res.data
        // 最后近一次预约
        if (data.last_booking) {
          this.appointment = data.last_booking
          this.appointment.appointed_time = '' // 置空预约时
          this.form.service_id = this.appointment.service.id // 设置服务类型id
          // 判断服务顾问选择
          if (!this.appointment.service_consultant) {
            if (data.default_service_consultant) {
              this.appointment.service_consultant = data.default_service_consultant
            } else {
              this.appointment.service_consultant = { name: '' }
            }
          }
        } else {
          if (data.default_service_consultant) {
            this.appointment.service_consultant = data.default_service_consultant
          }
        }
        // 设置顾问id
        this.form.service_consultant_id = this.appointment.service_consultant.id
      } else {
        this.showToast(res.message)
      }
    })
  },
  methods: {
    validateDate(value) {
      // 时间校验
      let appointedDate = ''
      let selectTime = ''
      if (typeof value === 'string') {
        selectTime = value + ':00'
        appointedDate = new Date(selectTime.replace(/-/g, '/')).getTime()
        if (appointedDate < this.tomorrowEight || !util.timeInBettwen('8:30:00', '18:00:00', selectTime)) {
          this.timeError = true
          this.showToast('预约时间只能从下一日的8:30-18:00')
        } else {
          this.timeError = false
        }
      }
    },
    validatePlateNumber(val) {
      let valid = util.regexpMap.car_plate_number.test(val)
      return this.validate(val, valid, '请输入有效的车牌号，如\'粤B12345\'')
    },
    validateMileage(val) {
      let valid = util.regexpMap.regexp_car_mileage.test(val)
      return this.validate(val, valid, '请输入有效的里程')
    },
    validateName(val) {
      let valid = util.regexpMap.regexp_name_cn.test(val) || util.regexpMap.regexp_name_en.test(val)
      return this.validate(val, valid, '请输入有效的联系人名字')
    },
    validateMobile(val) {
      let valid = util.regexpMap.regexp_mobile.test(val)
      return this.validate(val, valid, '请输入有效的电话号码')
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
    afterValidate(errors, valid, uuid) {
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
    onSelectService(id) {
      this.showServicePopup = false
        // 服务展示
      this.appointment.service = this.services.find(val => {
        return id === val.id
      })
        // 设置表单值
      this.form.service_id = id
    },
    onShowServices() {
      if (this.services.length <= 0) {
        this.$rest.appointment.getServices().then((res) => {
          if (res.code === 0) {
            let services = res.data.services
            this.services = services
            this.showServicePopup = true
            this.$store.commit('updateServices', services)
          } else {
            this.showToast('系统繁忙，请稍候再试！！')
          }
        })
      } else {
        this.showServicePopup = true
      }
    },
    // 选择顾问
    onSelectAdvisor(id) {
      this.showAdvisorPopup = false
      // 顾问展示
      this.appointment.service_consultant = this.advisors.find(val => {
        return id === val.id
      })
      // 设置表单
      this.form.service_consultant_id = id
    },
    // 打开顾问列表
    onShowAdvisor() {
      if (this.advisors.length <= 0) {
        this.$rest.appointment.getServiceAdvisors().then((res) => {
          if (res.code === 0) {
            // 展示弹层
            let advisors = res.data.service_consultants
            this.advisors = advisors
            this.showAdvisorPopup = true
            this.$store.commit('updateAdvisors', advisors)
          } else {
            this.showToast('系统繁忙，请稍候再试！！')
          }
        })
      } else {
        this.showAdvisorPopup = true
      }
    },
    getError() {
      let validStatus = this.validStatus
      return Object.values(validStatus).find(v => {
        return !v.valid
      })
    },
    onSendWx() {
      this.$wechat.promise.then(wx => {
        window.WeixinJSBridge.call('closeWindow')
      }, wx => {
        console.log('微信JSSDK校验错误:', wx.res)
      })
    },
    onSubmit() {
      let error = this.getError()
      if (!error) {
        if (this.timeError) {
          this.showToast('预约时间只能从下一日的8:30-18:00')
        } else {
          this.fields.forEach(v => {
            this.form[v] = this.appointment[v]
          })
          this.form.appointed_time = this.form.appointed_time.trim() + ':00'
          if (this.isClicked) {
            return false
          }
          this.isClicked = true
          this.$rest.appointment.bookingService(this.form).then(res => {
            if (res.code === 0) {
              // this.showDialog = true
              this.$router.push({
                path: '/appointment/success',
                query: {
                  name: this.appointment.service_consultant.name,
                  mobile_number: this.appointment.service_consultant.mobile_number
                }
              })
            } else {
              this.showToast(res.message)
            }
            this.isClicked = false
          }, (res) => {
            this.isClicked = false
            this.showToast(res.message)
          })
        }
      } else {
        if (error.msg) {
          this.showToast(error.msg)
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/appointment/index";
</style>
