/**
 * Created by logen on 2017/3/27.
 */
const state = {
  services: [],
  advisors: []
}
const mutations = {
  updateServices(state, value) {
    state.services = value
  },
  updateAdvisors(state, value) {
    state.advisors = value
  }
}
export default {
  state,
  mutations
}

