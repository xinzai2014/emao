import {
	FULL_PAYMENT,
	DISPLAY_CAR,
	DEFAULT_ADDRESS,
	CHOOSE_CAR,
	CAR_DATA,
	AJAX_LOADING,
	RETURN_DATA,
	ALERT,
	ADDRESS_FLAG,
	DEFAULT_BRAND,
	SPARE_DATA,
	MESSAGE_FLAG,
	SUCCESS_DATA,
  SUCCESS_URL,
  PAYMENT_URL
} from './mutations-types.js'

import {setStore, getStore} from '../config/mUtils'

export default {

	[FULL_PAYMENT](state,obj){ //保存全款购车地址
		state.fullPaymentData = obj;
    setStore('fullPaymentData',obj);
	},

	[DISPLAY_CAR](state,obj){ //保存申请展车信息
		state.displayData = obj;
    setStore('displayData',obj);
	},

	[DEFAULT_ADDRESS](state,obj){ //获取选中地址
		state.defaultAdress = obj;
		//存入sessionStorage
		setStore('defaultAdress', state.defaultAdress);
	},

	[CHOOSE_CAR](state,flag){ //控制选车显示隐藏 UI相关特效不需要记录
		state.chooseCar = flag;
	},

	[CAR_DATA](state,obj){ //获取选中车型
		state.carData = obj;
    setStore('carData',obj);
	},

	[AJAX_LOADING](state,flag){ //全局ajax_loading
		state.ajaxLoading = flag;
	},

	[RETURN_DATA](state,obj){ //获取选中车型;
		state.returnData = obj;
    setStore('returnData',obj);
	},

	[ALERT](state,obj){ //提示信息
		state.alert = obj;
	},

	[ADDRESS_FLAG](state,flag){ //从哪个页面跳转地址页面的标示
		state.addressFlag = flag;
    setStore('addressFlag',flag);
	},

	[DEFAULT_BRAND](state,flag){ //获取选中车型
		state.defaultBrand = flag;
    setStore('defaultBrand',flag);
	},

	[SPARE_DATA](state,obj){ //补余款传值
		state.spareData = obj;
    setStore('spareData',obj);
	},

	[MESSAGE_FLAG](state,flag){ //消息跳转地址页面的标示
		state.messageFlag = flag;
	},

	[SUCCESS_DATA](state,obj){ //成功结果页面传值
		state.successData = obj;
    setStore('successData',obj);
	},

  [SUCCESS_URL](state,obj){ //成功结果页面传值
    state.successURL = obj;
    setStore('successURL',obj);
  },

  [PAYMENT_URL](state,obj){ //进入汇款凭证页面标识，做回退使用
    state.paymentURL = obj;
    setStore('paymentURL',obj);
  }

}
