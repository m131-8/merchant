/**
 * Created by logen on 2017/3/27.
 */
const state = {
  usedCar: {
    vin: '',
    plate_number: '',
    jzg_car_model_id: 0,
    license_issued_on: '',
    mileage: '',
    jzg_color_id: 2,
    transfer_count: '0',
    owner_name: '',
    owner_mobile: '',
    verify_code: '',
    vehicle_province: '广东省',
    vehicle_province_code: '440000',
    vehicle_city: '深圳市',
    vehicle_city_code: '440300'
  },
  colorCar: {
    jzg_color: '白色'
  },
  brands: {}
}
const mutations = {
  updateVin(state, value) {
    state.usedCar.vin = value
  },
  updatePlateNumber(statue, value) {
    state.usedCar.plate_number = value
  },
  updateUsedcar(state, value) {
    state.usedCar = value
  },
  updateJzgCarModelId(state, value) {
    state.usedCar.jzg_car_model_id = value
  },
  updateLicenseIssuedOn(state, value) {
    state.usedCar.license_issued_on = value
  },
  updateMileage(statue, value) {
    state.usedCar.mileage = value
  },
  updateColor(statue, value) {
    state.colorCar.jzg_color = value
  },
  updateColorId(statue, value) {
    state.usedCar.jzg_color_id = value
  },
  updateTransferCount(statue, value) {
    state.usedCar.transfer_count = value
  },
  updateAddress(state, value) {
    state.usedCar.vehicle_province = value.province
    state.usedCar.vehicle_city = value.city
    state.usedCar.vehicle_province_code = value.provinceCode
    state.usedCar.vehicle_city_code = value.cityCode
  },
  updateName(statue, value) {
    state.usedCar.owner_name = value
  },
  updateMoblie(statue, value) {
    state.usedCar.owner_mobile = value
  },
  updateVerifyCode(statue, value) {
    state.usedCar.verify_code = value
  },
  updateBrands(state, value) {
    state.brands = value
  }
}
export default {
  state,
  mutations
}

