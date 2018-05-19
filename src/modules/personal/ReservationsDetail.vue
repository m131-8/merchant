<template>
  <!-- 预约详情 -->
  <article>
    <group gutter="0px">
      <cell class='reservations-details-service' :title="bookingInfo.service_consultant.name" :inline-desc='bookingInfo.service_consultant.mobile_number'>
        <img slot="icon" class="adviser-img" v-if="bookingInfo.service_consultant.avatar" :src="bookingInfo.service_consultant.avatar">
        <img slot="icon" class="adviser-img" v-else src="../../stylesheets/images/avatar-pic.png">
        <div slot="value">
          <a :href="`tel:${bookingInfo.service_consultant.mobile_number}`" class="service_mobile">
            <em class="icon-phone"></em>
          </a>
        </div>
      </cell>
    </group>
    <group :gutter="mt20">
      <cell class="reservations-details-status">
        <div class="reservations-details-id" slot="after-title">
          预约号：<span>{{bookingInfo.id}}</span>
        </div>
        <div slot="value">
          {{status}}
        </div>
      </cell>
      <cell class="reservations-details-time">
        <div slot="after-title">
          <p>预约时间：{{bookingInfo.appointed_time}}</p>
        </div>
        <datetime v-if="bookingInfo.status === 'pending_fulfillment'" slot="value" class="change-time" title="更改" :start-date="startDate" format="YYYY-MM-DD HH:mm" confirm-text="完成" cancel-text="取消" :min-hour="8" :max-hour="17" v-model="bookingInfo.appointed_time" @on-change="validateDate"></datetime>
      </cell>
      <cell class="reservations-details-info">
        <div slot="after-title">
          <p>
            <span>预约项目：</span>{{bookingInfo.service.name}}
          </p>
          <p>
            <span>车牌号：</span>{{bookingInfo.plate_number}}
          </p>
          <p>
            <span>联系人：</span>{{bookingInfo.contact_name}}
          </p>
          <p>
            <span>手机号码：</span>{{bookingInfo.contact_number}}
          </p>
          <p>
            <span>提交时间：</span>{{bookingInfo.created_at}}
          </p>
          <p>
            <span>备注：</span>{{bookingInfo.remark}}
          </p>
        </div>
      </cell>
    </group>
      <x-button v-if="bookingInfo.status === 'pending_fulfillment'" class="bottom-btn" @click.native="submit">{{btnName}}</x-button>
  </article>
</template>
<script>
import {
  Group,
  Cell,
  Datetime,
  XButton
} from 'cvux/src/components'
import util from '../../common/util'

export default {
  components: {
    Group,
    Cell,
    Datetime,
    XButton
  },
  data() {
    return {
      mt20: '0.266666667rem',
      tomorrowEight: '',
      error: true,
      btnName: '取消预约',
      startDate: util.formatTime(new Date(new Date().valueOf() + 24 * 3600 * 1000), 'yyyy-MM-dd'),
      bookingInfo: {
        service: {},
        service_consultant: {}
      }
    }
  },
  created() {
    let id = this.$route.query.id
    let now = new Date()
    this.tomorrowEight = new Date(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate()).getTime() + (32 * 3600 + 1800) * 1000
    if (id) {
      this.$rest.personal.getReservations(null, id).then(res => {
        if (res.code === 0) {
          // res.data.appointed_time = res.data.appointed_time.substr(0, 16)
          this.bookingInfo = res.data
          this.appointedTime = this.bookingInfo.appointed_time = res.data.appointed_time.substr(0, 16)
        } else {
          this.showToast(res.message)
        }
      })
    } else {
      this.showToast('id不存在')
    }
  },
  computed: {
    status() {
      let status = this.bookingInfo.status
      let statusName = ''
      switch (status) {
        case 'pending_fulfillment':
          statusName = '待到店'
          break
        case 'fulfilled':
          statusName = '已到店'
          break
        case 'canceled':
          statusName = '已取消'
          break
        default:
          statusName = '未知'
          break
      }
      return statusName
    }
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
          this.error = false
          this.btnName = '取消预约'
          this.showToast('预约时间只能从下一日的8:30-18:00')
        } else {
          this.error = true
          this.btnName = '确认变更'
        }
      }
    },
    submit() {
      if (this.btnName === '取消预约') {
        // delete发送请求
        this.$rest.personal.deleteReservation(null, this.bookingInfo.id).then(res => {
          if (res.code === 0) {
            // 重新渲染成 取消预约状态
            this.bookingInfo.status = 'canceled'
          } else {
            this.showToast(res.message)
          }
        })
      } else if (this.btnName === '确认变更' && this.error) {
        let time = {
          appointed_time: this.bookingInfo.appointed_time + ':00'
        }
        // 发送PATCH 修改时间请求
        this.$rest.personal.modifyReservationTime(time, this.bookingInfo.id).then(res => {
          if (res.code === 0) {
            this.showToast('修改时间成功！')
            this.btnName = '取消预约'
          } else {
            this.showToast(res.message)
          }
        })
      }
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/personal/reservationsdetail";
</style>
