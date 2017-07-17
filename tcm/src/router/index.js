import Vue from 'vue'
import Router from 'vue-router'


//通用组件
import loading from '../components/loading/loading'


// //登录注册相关组件
import login from '../page/login/login'
import account from '../page/login/children/account'
import code from '../page/login/children/code'


// //首页相关组件
import index from '../page/index/index'

//车系详情页
import serie from '../page/serie/serie'

// //个人中心组件
import profile from '../page/profile/profile'

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
      path: '/', 
      name: 'loading',
      component: loading  //loading页面
    },
    {
      path: '/login',     //登录页面
      name: 'login',
      component: login,  
       children: [
        {
          path: 'account',   //账号登陆
          name: 'account',
          component: account
        },
        {
          path: 'code',   //验证码登录
          name: 'code',
          component: code
        }
      ]
    },
    // {
    //   path: '/auth',  //登录注册个人认证
    //   name: 'auth',
    //   component: auth
    // },
    {
      path: '/index',  //首页
      name: 'index',
      component: index
    },
    // {
    //   path: '/brand/:id',  //品牌页面
    //   name: 'brand',
    //   component: brand
    // },
    {
      path: '/serie/:id',  //车系列表页面
      name: 'serie',
      component: serie
    },
    // {
    //   path: '/configuration',  //参数配置页
    //   name: 'configuration',
    //   component: configuration
    // },
    // {
    //   path: '/orderConfrim/:id',  //全款购车确认页面
    //   name: 'orderConfrim',
    //   component: orderConfrim
    // },
    // {
    //   path: '/orderResult/:id',  //全款购车结果页
    //   name: 'orderResult',
    //   component: orderResult
    // },
    // {
    //   path: '/displayConfrim/:id',  //申请展车确认页面
    //   name: 'displayConfrim',
    //   component: displayConfrim
    // },
    // {
    //   path: '/displayResult/:id',  //申请展车结果页
    //   name: 'displayResult',
    //   component: displayResult
    // },
    {
      path: '/profile', //个人主页
      name: 'profile',
      component:profile,
    //   children: [
    //     {
    //       path: 'info',   //账户信息 子路由
    //       name: 'info'
    //       component: info,
    //       children: [
    //         {
    //           path: 'address',   //收货地址列表
    //           name: 'address'
    //           component: address,
    //           children: [
    //             {
    //               path: 'add',   //新增地址
    //               name: 'addressAdd',
    //               component: addressAdd
    //             },
    //             {
    //               path: 'edit/:id',   //编辑地址
    //               name: 'addressEdit',
    //               component: addressEdit
    //             }
    //           ]
    //         },
    //         {
    //           path: 'remit',   //汇款账户列表
    //           name: 'remit'
    //           component: remit,
    //           children: [
    //             {
    //               path: 'add',   //新增账户列表
    //               name: 'remitAdd',
    //               component: remitAdd
    //             },
    //             {
    //               path: 'edit/:id',   //编辑账户列表
    //               name: 'remitEdit',
    //               component: remitEdit
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    }
    // {
    //   path: 'rebate',  //我的返利
    //   name: 'rebate',
    //   component: rebate
    // },
    // {
    //   path: 'marketing',  //我的营销支持费
    //   name: 'marketing',
    //   component: marketing
    // },
    // {
    //   path: 'coupon',  //我的优惠券
    //   name: 'coupon',
    //   component: coupon
    // },
    // {
    //   path: 'order',  //我的订单列表
    //   name: 'order',
    //   component: order
    // },
    // {
    //   path: 'order/:id',  //我的订单详情页
    //   name: 'orderDetail',
    //   component: orderDetail
    // },
    // {
    //   path: 'obliga',  //我的待付款列表
    //   name: 'obliga',
    //   component: obliga
    // },
    // {
    //   path: 'sending',  //我的待发货列表
    //   name: 'sending',
    //   component: sending
    // },
    // {
    //   path: 'receiving',  //我的待收货列表
    //   name: 'receiving',
    //   component: receiving
    // },
    // {
    //   path: 'display',  //我的展车列表
    //   name: 'display',
    //   component: display
    // },
    // {
    //   path: 'display/:id',  //我的订单详情页
    //   name: 'displayDetail',
    //   component: displayDetail
    // },
    // {
    //   path: 'declare',  //我的售车申报列表
    //   name: 'declare',
    //   component: declare,
    //   children: [
    //     {
    //       path: '/edit/:id',   //提交申报资料
    //       name: 'editDeclare',
    //       component: editDeclare 
    //     }
    //   ]
    // },
    // {
    //   path: 'storage',  //我的中转库列表
    //   name: 'storage',
    //   component: storage
    // },
    // {
    //   path: 'message',  //我的消息列表
    //   name: 'message',
    //   component: message,
    //   children: [
    //     {
    //       path: 'order',   //订单提醒
    //       name: 'messageOrder',
    //       component: messageOrder 
    //     },
    //     {
    //       path: 'coupon',   //优惠券提醒
    //       name: 'messageCoupon',
    //       component: messageCoupon
    //     },
    //     {
    //       path: 'display',   //展车提醒
    //       name: 'messageDisplay',
    //       component: messageDisplay
    //     },
    //     {
    //       path: 'rebate',   //资金变动提醒
    //       name: 'messageRebate',
    //       component: messageRebate
    //     },
    //     {
    //       path: 'storage',   //中转库变动提醒
    //       name: 'messageStorage',
    //       component: messageStorage
    //     },
    //     {
    //       path: 'inform',   //优惠券提醒
    //       name: 'messageInform',
    //       component: messageInform
    //     }
    //   ]
    // }
  ]
})
