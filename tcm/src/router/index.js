import Vue from 'vue'
import Router from 'vue-router'

//登录注册模块嵌套路由

import loading from '../components/loading/loading'
import login from '../components/login/login'

import pass from '../components/login/pass'
import code from '../components/login/code'

import index from '../components/index/index'
import serieList from '../components/serieList/serieList'

import my from '../components/my'

Vue.use(Router)


//代码分割点，后期再规划
// const loading = resolve => {
//   require.ensure([loading], () => {
//     resolve(require(loading))
//   })
// }

// const login = resolve => {
//   require.ensure([login], () => {
//     resolve(require(login))
//   })
// }

// const index = resolve => {
//   require.ensure([index], () => {
//     resolve(require(index))
//   })
// }




export default new Router({
  routes: [
    {
      path: '*', 
      name: 'loading',
      component: loading
    },
    {
      path: '/login',
      name: 'login',
      component: login,
       children: [
        {
          path: 'pass',
          component: pass
        },
        {
          path: 'code',
          component: code
        }
      ]
    },
    {
      path: '/index', 
      name: 'index',
      component: index
    },
    {
      path: '/my',
      name: 'my',
      component:my
    },
    {
      path: '/serieList/:serieID',
      name: 'serieList',
      component:serieList
    }
  ]
})
