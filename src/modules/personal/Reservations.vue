<template>
  <article>
    <!-- 暂无预约 -->
    <section class="no-resevation" v-if="totalCount===0">
      <i class="icon-no-order icon-no-resevation"></i>
      <p>暂无预约</p>
      <!-- 底部tabbar -->
      <router-link :to="{ path: '/appointment/index'}">
        <div class="no-reservation-bottom">
          <em class="icon-reservation"></em>
          <span>预约保养</span>
        </div>
      </router-link>
    </section>
    <section v-else>
      <!-- 养修预约列表-->
      <group gutter='0.13333333rem' v-for="item in bookings" :key="item.id" class="reservatrion-card">
        <cell :title="'预约号: '+item.id" class="reservation-number">
          <div slot="value">{{item.status | statusName}}</div>
        </cell>
        <router-link :to="{ path: '/personal/reservations_detail', query: { id: item.id } }">
          <cell :title="item.plate_number+'（'+item.service.name+'）'" :inline-desc="item | timeType">
            <div class="service-icon" slot="icon">
              <img :src="item.service.logo_url">
            </div>
          </cell>
        </router-link>
        <cell v-if="item.status==='pending_fulfillment'">
          <div slot="value">
            <!-- <x-button mini><a style="color: #000;" href="'tel: 1591403938'">联系顾问</a></x-button>
            <x-button mini @click="cancel">取消预约</x-button> -->
            <a :href="'tel:'+item.service_consultant.mobile_number" class="reservation-btn">联系顾问</a>
            <a href="javascript:;" class="reservation-btn" @click.stop="cancel(item.id)">取消预约</a>
          </div>
        </cell>
      </group>
    </section>
    <confirm v-model="show" title="确定取消？" confirmText="确定" cancelText='取消' @on-cancel="onCancel" @on-confirm="onConfirm">
    </confirm>
  </article>
</template>
<script>
import {
  Group,
  Cell,
  Confirm
} from 'cvux/src/components'
import util from '../../common/util'

export default {
  components: {
    Group,
    Cell,
    Confirm
  },
  data() {
    return {
      id: '',
      show: false,
      bookings: [],
      totalCount: -1
    }
  },
  created() {
    // 获取订单信息
    this.getReservations()
  },
  filters: {
    statusName(status) {
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
    },
    timeType(item) {
      let timeType = ''
      let time = ''
      switch (item.status) {
        case 'pending_fulfillment':
        case 'fulfilled':
          time = item.appointed_time ? util.formatTime(item.appointed_time, 'yyyy-MM-dd hh:mm') : ''
          timeType = '预约时间: ' + time
          break
        case 'canceled':
          time = item.canceled_at ? util.formatTime(item.canceled_at, 'yyyy-MM-dd hh:mm') : ''
          timeType = '取消时间: ' + time
          break
        default:
          timeType = '未知'
          break
      }
      return timeType
    }
  },
  methods: {
    getReservations() {
      this.$rest.personal.getReservations().then(res => {
        if (res.code === 0) {
          this.bookings = res.data.bookings
          this.totalCount = res.data.total_count
        } else {
          this.showToast(res.message)
        }
      })
    },
    cancel(val) {
      this.show = true
      this.id = val
    },
    onCancel() {
      this.show = false
    },
    onConfirm() {
      this.$rest.personal.deleteReservation(null, this.id).then((res) => {
        if (res.code === 0) {
          this.getReservations()
          this.show = false
        } else {
          this.showToast(res.message)
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/personal/reservations";
.reservatrion-card .weui_cells {
  line-height: 1.36666667;
}

.reservation-number .weui_cell_ft {
  color: #000;
}
</style>
