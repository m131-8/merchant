/**
 * vuex 状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import rest from '../rest'
import violations from './modules/discover/violations'
import submit from './modules/usedcar/submit'
import shakegame from './modules/active/shakegame'
import appointment from './modules/appointment/index'

Vue.use(Vuex)

const state = {
  loading: {
    status: false,
    text: '',
    time: 0
  },
  direction: 'forward',
  toast: {
    show: false,
    text: '',
    time: 1000
  },
  customized: null, // 网站定制
  isDOS: false,
  authPrefix: 'replacing_auth'
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations: {
    UPDATE_LOADING (state, loading) {
      state.loading = Object.assign({}, state.loading, loading)
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    UPDATE_TOAST (state, toast) {
      state.toast = toast
    },
    // 更新网站定制
    UPDATE_CUSTOMIZED (state, customized) {
      // 如果是未切换的中升网站进行重定向
      if (customized.group_config.is_zs_group) {
      } else { // 判断是否DOS相关的集团
        state.isDOS = true
      }
      state.customized = customized
    }
  },
  actions: {
    UPDATE_TOAST ({commit}, toast) {
      let t = Object.assign({}, toast)
      commit('UPDATE_TOAST', t)
      let st = null
      clearTimeout(st)
      st = setTimeout(() => {
        toast.show = false
        t = Object.assign({}, toast)
        commit('UPDATE_TOAST', t)
      }, t.time)
    },
    UPDATE_LOADING ({commit}, loading) {
      commit('UPDATE_LOADING', loading)
      if (loading && loading.time) {
        let st = null
        clearTimeout(st)
        st = setTimeout(() => {
          loading.show = false
          commit('UPDATE_LOADING', loading)
        }, loading.time)
      }
    },
    UPDATE_CUSTOMIZED({commit}) {
      return rest.login.getCustomized(null).then(res => {
        if (res.code === 0) {
          commit('UPDATE_CUSTOMIZED', res.data)
        }
      })
    }
  },
  modules: {
    violations,
    submit,
    shakegame,
    appointment
  }
})
