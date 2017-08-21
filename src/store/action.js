import {
	FULL_PAYMENT,
	DEFAULT_ADDRESS,
	CHOOSE_CAR,
	CAR_DATA
} from './mutations-types.js'


export default {

	[FULL_PAYMENT](context,obj){ //action 提交mutations
		context.commit(FULL_PAYMENT,obj);
	},

	[DEFAULT_ADDRESS](context,obj){ //action 提交mutations
		context.commit(DEFAULT_ADDRESS,obj);
	},

	[CHOOSE_CAR](context,obj){ //action 提交mutations
		context.commit(CHOOSE_CAR,obj);
	},

	[CAR_DATA](context,obj){ //action 提交mutations
		context.commit(CAR_DATA,obj);
	}

}
