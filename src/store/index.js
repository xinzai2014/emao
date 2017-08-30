import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)


const state = {
	fullPaymentData:{}, //全款购车传参
	defaultAdress:{},
	chooseCar:false,
	carData:{
		carName:"选择车型"
	},
	ajaxLoading:false, //ajax加载Loading
	returnData:{}, //汇款凭证
	ajaxLoading:false,
	alert:{},
	addressFlag:"" //跳转选地址页面的标识
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})