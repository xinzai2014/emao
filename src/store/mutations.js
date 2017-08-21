import {
	FULL_PAYMENT,
	DEFAULT_ADDRESS,
	CHOOSE_CAR,
	CAR_DATA
} from './mutations-types.js'



export default {

	[FULL_PAYMENT](state,obj){ //保存全款购车地址
		console.log(obj);
		state.fullPaymentData = obj;
	},

	[DEFAULT_ADDRESS](state,obj){ //保存全款购车地址
		state.defaultAdress = obj;
	},

	[CHOOSE_CAR](state,flag){ //保存全款购车地址
		state.chooseCar = flag;
	},

	[CAR_DATA](state,obj){ //保存全款购车地址
		state.carData = obj;
	}

}
