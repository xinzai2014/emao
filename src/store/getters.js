import {setStore, getStore} from '../config/mUtils'
export default {
	getCar(state){ //首页搜索记录状态
		return state.carData || getStore("carData");
	},
  getFullData(state){ //getters也可以作为参数传递
    return getStore("fullPaymentData") || state.fullPaymentData;
  },
  getDisplayData(state){ //展车下单表示
    return getStore("displayData") || state.displayData;
  },
  getAddress(state){ //跳转到选地址页的标示
    return getStore("addressFlag") || state.addressFlag;
  },
  getDefaultAddress(state){ //默认地址
    return state.defaultAdress || getStore("defaultAdress");
  },
  getSuccessURL(state){ //默认地址
    return state.successURL || getStore("successURL");
  },
  getSpareData(state){ //默认地址
    return state.spareData || getStore("spareData");
  },
  getSuccessData(state){ //默认地址
    return state.successData || getStore("successData");
  },
  getDefaultBrand(state){ //默认地址
    return state.defaultBrand || getStore("defaultBrand");
  },
  getReturnData(state){
    return state.returnData || getStore("returnData");
  },
  getPaymentURL(state){ //汇款凭证页面进入标识
    return state.paymentURL || getStore("paymentURL");
  }
}
