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
  PAYMENT_URL,
  PAYMENT_DATA,
  SERIE_URL,
  ORDER_URL,
	PRESELL_DATA,
	PRESELL_FLAG
} from './mutations-types.js'


export default {

	[FULL_PAYMENT](context,obj){ //action 提交mutations 全款购车
		context.commit(FULL_PAYMENT,obj);
	},

	[DISPLAY_CAR](context,obj){ //action 提交mutations 申请展车
		context.commit(DISPLAY_CAR,obj);
	},

	[DEFAULT_ADDRESS](context,obj){ //action 提交mutations  选中地址
		context.commit(DEFAULT_ADDRESS,obj);
	},

	[CHOOSE_CAR](context,obj){ //action 提交mutations  选车显示隐藏
		context.commit(CHOOSE_CAR,obj);
	},

	[CAR_DATA](context,obj){ //action 提交mutations  选中车型
		context.commit(CAR_DATA,obj);
	},

	[AJAX_LOADING](context,flag){ //action 提交mutations  全局loading
		context.commit(AJAX_LOADING,flag);
	},


	[RETURN_DATA](context,obj){ //action 提交mutations  选中车型
		context.commit(RETURN_DATA,obj);
	},

	[ALERT](context,obj){ //action 提交mutations  全局弹出窗
		context.commit(ALERT,obj);
	},

	[ADDRESS_FLAG](context,flag){ //从哪个页面跳转地址页面的标示
		context.commit(ADDRESS_FLAG,flag);
	},

	[DEFAULT_BRAND](context,flag){ //首页跳品牌页面传品牌值
		context.commit(DEFAULT_BRAND,flag);
	},

	[SPARE_DATA](context,flag){ //补余款传值
		context.commit(SPARE_DATA,flag);
	},

	[MESSAGE_FLAG](context,flag){ //首页跳品牌页面传品牌值
		context.commit(MESSAGE_FLAG,flag);
	},

	[SUCCESS_DATA](context,obj){ //成功结果页面传值
    context.commit(SUCCESS_DATA,obj);
  },

  [SUCCESS_URL](context,obj){ //成功结果页面传值
    context.commit(SUCCESS_URL,obj);
  },

  [PAYMENT_URL](context,obj){ //汇款凭证页面代码优化
    context.commit(PAYMENT_URL,obj);
  },

  [PAYMENT_DATA](context,obj){
    context.commit(PAYMENT_DATA,obj);
  },

  [SERIE_URL](context,obj){
    context.commit(SERIE_URL,obj);
  },

  [ORDER_URL](context,obj){
    context.commit(ORDER_URL,obj);
  },
  [PRESELL_DATA](context,obj){  //保存预售预定页下订单成功返回的数据
	context.commit(PRESELL_DATA,obj);
  },

  [PRESELL_FLAG](context,obj){   //预售预定页跳转地址
	context.commit(PRESELL_FLAG,obj);
  }
}
