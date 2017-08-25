import {
	FULL_PAYMENT,
	DEFAULT_ADDRESS,
	CHOOSE_CAR,
	CAR_DATA,
	AJAX_LOADING,
	RETURN_DATA,
	ALERT
} from './mutations-types.js'


export default {

	[FULL_PAYMENT](context,obj){ //action 提交mutations 全款购车
		context.commit(FULL_PAYMENT,obj);
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
	}

}
