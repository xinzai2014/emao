import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)


const state = {
	// autoId:1258,
	// fullPayment:{
	// 	id:2,
	// 	name:3
	// },
	// displayPayment:{
	// 	sex:"男",
	// 	name:"胡再兴"
	// }
	fullPaymentData:{}, //全款购车传参
	defaultAdress:{},
	chooseCar:false,
	carData:{
		carName:"选择车型"
	},
	ajaxLoading:false, //ajax加载Loading
	returnData:{} //汇款凭证
	ajaxLoading:false,
	alert:{
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})