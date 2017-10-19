import {setStore, getStore} from '../config/mUtils'
export default {
	getCar(state){ //首页搜索记录状态
		return state.carData && getStore("carData");
	},
  getFullData(state){ //getters也可以作为参数传递
    return state.fullPaymentData && getStore("fullPaymentData");
  },
  getAddress(state){ //跳转到选地址页的标示
    return state.addressFlag && getStore("addressFlag");
  },
  getDefaultAddress(state){ //默认地址
    return state.defaultAdress && getStore("defaultAdress");
  }
}
