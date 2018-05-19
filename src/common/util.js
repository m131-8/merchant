/*
 * util helper methods
 */

import cookie from './cookie'
export default {
  regexpMap: {
    regexp_mobile: /^1[3|4|5|7|8]\d{9}$/, // 手机校验
    regexp_name_cn: /^([\u4e00-\u9fa5]{2,8})$/, // 中文姓名校验
    regexp_name_en: /^([A-Z]+\s?[A-Z]*\s?[A-Z]*)$/i, // 英文姓名校验
    regexp_captcha: /^\d{6}$/, // 验证码校验
    car_plate_number: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9\u4e00-\u9fa5]{1}$/i, // 车牌号校验
    regexp_vin: /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{2}\d{6}$/i, // 车架号
    regexp_car_mileage: /^([1-9]\d\d\d\d\d\d|[1-9]\d{0,6}|[1-9])$/, // 里程
    regexp_coupon_code: /^\d{12}$/, // 优惠券
    regexp_decimals: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/ // 支持两位小数
  },
  // 键值对的缓存数据~
  keyMap: {
    'CACHE_STORE_ID': 'cache_store_id',
    'CACHE_STORE_STATUS': 'cache_store_status'
  },
  // 判断一个时间是否在指定的时间当中 bt=8:00:00,et=20:00:00,rt=2016-11-11 9:23:23
  timeInBettwen(bt, et, rt) {
    let placeholder = '2016-11-11 '
    let reg = /[^\s]*\s?([^.]*)\.?.*/
    let aRt = rt.replace(reg, '$1').split(':')
    let nRt = aRt[0] * 3600 + aRt[1] * 60 + aRt[2] * 1

    let aBt = (placeholder + bt).replace(reg, '$1').split(':')
    let nBt = aBt[0] * 3600 + aBt[1] * 60 + aBt[2] * 1

    let aEt = (placeholder + et).replace(reg, '$1').split(':')
    let nEt = aEt[0] * 3600 + aEt[1] * 60 + aEt[2] * 1
    return nBt <= nRt && nRt <= nEt
  },
  /**
   * 判断两个时间相差多少
   * @param t1 {String/Date} 时间1
   * @param t2 {String/Date} 时间2
   * @param offset {number} 偏差，单位是毫秒
   */
  diffTime(t1, t2, offset) {
    if (typeof t1 === 'string') {
      t1 = new Date(t1.replace(/-/g, '/'))
    }
    if (typeof t2 === 'string') {
      t2 = new Date(t2.replace(/-/g, '/'))
    }
    offset = offset || 0
    let r = t1.getTime() - t2.getTime() - offset
    return r
  },
  /**
   * 得到将来的某个日期
   * @param str 创建订单时间
   * @param days 失效时间
   * @returns {Date}
   */
  getEndTime(str, days) {
    let date = new Date(str.replace(/-/g, '/'))
    date.setDate(date.getDate() + days)
    return date
  },
  /**
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * 例子：
   * formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
   * formatTime(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
   * 参照：http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
   */
  formatTime(time, fmt) {
    try {
      if (typeof time === 'string') {
        time = time.replace(/-/g, '/')
        time = new Date(time)
      }
      let o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
    } catch (e) {
      throw new Error(e + '>>时间格式化失败>>' + time + '>>' + fmt)
    }
    return fmt
  },

  /**
   * @param {Object} param 将要转为URL参数字符串的对象
   * @param {Object} key URL参数字符串的前缀
   * @param {Boolean} encode true/false 是否进行URL编码,默认为true
   * @source http://www.tuicool.com/articles/uaIr2mj
   * return URL参数字符串
   */
  urlEncode(param, key, encode) {
    if (param == null) {
      return ''
    }
    if (!key) {
      key = ''
    }
    var paramStr = ''
    var t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode === null || encode) ? window.encodeURIComponent(param) : param)
    } else {
      for (var i in param) {
        var k = key === null ? i : key + (param instanceof Array ? '-' + i + '-' : i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }
    return paramStr
  },
  /**
   * 判断即时时间
   * @param endtime 结束时间
   * @param target 目标对象
   * @param callback
   * @returns {string}
   */
  loopTime(endtime, callback) {
    let nowtime = new Date()
    if (nowtime.getTime() < endtime.getTime()) {
      setTimeout(() => {
        this.loopTime(endtime, callback)
      }, 1000)
    }
  },
  /**
   * 原生ajax请求
   * @param mode 请求方式get/post
   * @param url 请求接口
   * @param data 请求参数
   * @param callback 请求回调
   */
  sendAjax(mode, url, data, callback1, callback2) {
    let csrftoken = cookie.getCookie('csrf-token')
    // 因为只在移动端则没有做IE拦截
    let request = new window.XMLHttpRequest()
    // 2. 设置回调监听
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        let res = JSON.parse(request.responseText)
        if (res.code === 0) {
          callback1()
        }
      } else if (request.readyState === 4 && request.status === 401) {
        let res = JSON.parse(request.responseText)
        if (res.code === 402) {
          callback2()
        }
      }
    }
    request.open(mode, url)
    // 4. 设置请求头, 对请求体数据进行编码处理
    request.setRequestHeader('Accept', 'application/json, text/plain, */*')
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    request.setRequestHeader('Content-type', 'application/json;charset=utf-8', true)
    request.setRequestHeader('channelType', 'wx')
    request.setRequestHeader('X-CSRF-Token', csrftoken)
    // 5. 发请求
    request.send(data)
  }
}

