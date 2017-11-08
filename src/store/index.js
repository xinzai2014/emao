import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)


const state = {
	fullPaymentData:null, //全款购车传参
	displayData:null, //申请展车传参
	defaultAdress:null,
	chooseCar:false,
	carData:{
		carName:"选择车型"
	},
	defaultBrand:null, //首页跳转品牌页面传默认品牌
	ajaxLoading:false, //ajax加载Loading
	returnData:"", //汇款凭证
	alert:{},
	addressFlag:"", //跳转选地址页面的标识
	spareData:null, //补余款传值
	messageFlag:"",//消息页标识
	successData:null, //成功页数据
    successURL:null, //成功页会跳标识
    paymentURL:null,  //提交汇款凭证页面跳转标识
    paymentData:null, //汇款页面跳转汇款账户页面前保存数据
    orderURL:null, //订单/展车详情跳转
    serieURL:null  //车系详情页
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
