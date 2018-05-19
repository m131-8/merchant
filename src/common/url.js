/**
 * url help methods
 */
export default {
  /**
   * 将查询字符串解析成一个对象
   * @param str
   * @returns {{}}
   */
  getParams(str) {
    let rs = {}
    if (typeof str === 'string' && str.trim()) {
      let decode = decodeURIComponent
      let pairs = str.split('&')
      for (let i = 0, l = pairs.length; i < l; ++i) {
        let pair = pairs[i].split('=')
        let key = decode(pair[0]).replace('[]', '')
        let val = decode(pair[1])
        if (key in rs) {
          if (Array.isArray(rs[key])) {
            rs[key].push(val)
          } else {
            rs[key] = [rs[key], val]
          }
        } else {
          rs[key] = val
        }
      }
    }
    return rs
  },
  /**
   * 解析location.hash部分，得出模块名称和传递的参数
   * @param hash location.hash
   * @returns {{}}
   */
  parseHash(hash) {
    let hashName = ''
    let dataObj = {}
    if (hash !== 'undefined' && hash !== '') {
      let hashArr = hash.substring(1).split('?')
      hashName = hashArr[0]
      if (hashArr.length > 1) {
        dataObj = this.getParams(hashArr[1])
      }
    }
    return {
      hashName: hashName,
      params: dataObj
    }
  },
  /**
   * 获取 location.search的值
   * @returns [Object] 对象
   */
  getSearch() {
    let hash = window.location.hash
    let index = hash.indexOf('?')
    let o = {}
    let item
    let searchs = [window.location.search, index !== -1 ? hash.substr(index) : '']
    searchs.forEach(search => {
      if (search) {
        search = search.substr(1).split('&')
        // for (var i = 0, len = search.length; i < len; i++) {
        //   item = search[i].split('=')
        //   o[item[0]] = item[1]
        // }
        search.forEach(val => {
          item = val.split('=')
          o[item[0]] = item[1]
        })
      }
    })
    return o
  }
}
