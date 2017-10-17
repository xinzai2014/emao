import {setStore, getStore} from '../config/mUtils'
export default {
	getCar(state){ //首页搜索记录状态
		return state.carData && getStore("carData");
	},
  getFullData(state){ //getters也可以作为参数传递
    return state.fullPaymentData && getStore("fullPaymentData");
  }
}
