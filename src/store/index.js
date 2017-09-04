import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)


const state = {
	fullPaymentData:{}, //全款购车传参
	displayData:{}, //申请展车传参
	defaultAdress:{},
	chooseCar:false,
	carData:{
		carName:"选择车型"
	},
	defaultBrand:"", //首页跳转品牌页面传默认品牌
	ajaxLoading:false, //ajax加载Loading
	returnData:{}, //汇款凭证
	alert:{},
	addressFlag:"", //跳转选地址页面的标识
	spareData:{} //补余款传值
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})