/**
 * Created by David on 2017/3/15.
 */

const state = {
  violationInfo: {}
}

const mutations = {
  updateViolationInfo(state, value) {
    state.violationInfo = value
  }
}

export default {
  state,
  mutations
}

