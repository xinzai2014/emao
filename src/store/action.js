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
	MESSAGE_FLAG
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
	}
	
}
