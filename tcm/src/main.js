// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//无限滚动加载
import InfiniteScroll from 'vue-infinite-scroll';
Vue.use(InfiniteScroll);

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



Vue.config.productionTip = false;


Vue.directive('load-more',{
	inserted(el, binding, vnode) {
		const getStyle = (element, attr, NumberMode = 'int') => {
		    let target;
		    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
		    if (attr === 'scrollTop') { 
		        target = element.scrollTop;
		    }else if(element.currentStyle){
		        target = element.currentStyle[attr]; 
		    }else{ 
		        target = document.defaultView.getComputedStyle(element,null)[attr]; 
		    }
		    //在获取 opactiy 时需要获取小数 parseFloat
		    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
		} 
		const loadMore = (element, callback) => {
			let windowHeight = window.screen.height;
			let height;
			let setTop;
			let paddingBottom;
			let marginBottom;
		    let requestFram;
		    let oldScrollTop;

		    document.body.addEventListener('scroll',() => {
		       loadMore();
		    }, false)
		    //运动开始时获取元素 高度 和 offseTop, pading, margin
			element.addEventListener('touchstart',() => {
		        height = element.offsetHeight;
		        setTop = element.offsetTop;
		        paddingBottom = getStyle(element,'paddingBottom');
		        marginBottom = getStyle(element,'marginBottom');
		    },{passive: true})

		    //运动过程中保持监听 scrollTop 的值判断是否到达底部
		    element.addEventListener('touchmove',() => {
		       loadMore();
		    },{passive: true})

		    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
		    element.addEventListener('touchend',() => {
		       	oldScrollTop = document.body.scrollTop;
		       	moveEnd();
		    },{passive: true})
		    
		    const moveEnd = () => {
		        requestFram = requestAnimationFrame(() => {
		            if (document.body.scrollTop != oldScrollTop) {
		                oldScrollTop = document.body.scrollTop;
		                loadMore();
		                moveEnd();
		            }else{
		            	cancelAnimationFrame(requestFram);
		            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
		            	height = element.offsetHeight;
		                loadMore();
		            }
		        })
		    }
		    const loadMore = () => {
		        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
		            callback();
		        }
		    }
		}
		//loadMore(el,binding.value);
		window.addEventListener('scroll', function () {
			if(document.body.scrollTop + window.innerHeight >= el.clientHeight) {
				var fnc = binding.value; 
				fnc(); 
			}
		})
      }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',          //vue实例挂载点
  router,              //路由配置对象
  render: h => h(App), //都是将模板挂载到实例上去,render函数优先级别高于template;更推荐使用,生成的虚拟DOM
// template: '<App/>',
  components: { App }  //全局组件
})
