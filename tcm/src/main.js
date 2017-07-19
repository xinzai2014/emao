// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//表单验证元素
import Validator  from 'vee-validate';
Vue.use(Validator);

//自定义电话号码验证规则
// Validator.extend('mobile', {
//     messages: {
//       en:field => field + '必须是11位手机号码',
//     },
//     validate: value => {
//       return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
//     }
// });



//ajax接口数据交互
//import axios from 'axios' //有坑，暂时不用
import VueResource from 'vue-resource'
Vue.use(VueResource)




//全局默认配置
Vue.http.options.root = "https://tcmapi.emao.com/" //接口域名
Vue.http.headers.common = {
	Accept:"application/json;version=1.0.0"
};
Vue.http.headers.common['X-Emao-TCM-Wap'] = "1";


//页面公用元素
import '../plugins/flexible.js'
import '../style/reset.css';
import '../style/common.css';
import '../plugins/swiper.min.js'
import '../plugins/swiper.min.css';



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',          //vue实例挂载点
  router,              //路由配置对象
  render: h => h(App), //都是将模板挂载到实例上去,render函数优先级别高于template;更推荐使用,生成的虚拟DOM
// template: '<App/>',
  components: { App }  //全局组件
})
