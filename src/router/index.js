import Vue from 'vue'
import Router from 'vue-router'


//通用组件
const loading = r => require.ensure([], () => r(require('../components/common/loading/loading')), 'loading')


//登录注册相关组件

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const account = r => require.ensure([], () => r(require('../page/login/children/account')), 'account')
const code = r => require.ensure([], () => r(require('../page/login/children/code')), 'code')
const auth = r => require.ensure([], () => r(require('../page/auth/auth')), 'auth')
const authResult = r => require.ensure([], () => r(require('../page/authResult/authResult')), 'authResult')
const aptitude = r => require.ensure([], () => r(require('../page/aptitude/aptitude')), 'aptitude')


//首页相关组件
const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')

//品牌列表
const brand = r => require.ensure([], () => r(require('../page/brand/brand')), 'brand')

//车系详情页
const serie = r => require.ensure([], () => r(require('../page/serie/serie')), 'serie')

//配置页面
const configuration = r => require.ensure([], () => r(require('../page/configuration/configuration')), 'configuration')
//对比页面
const contrast = r => require.ensure([], () => r(require('../page/contrast/contrast')), 'contrast')

//个人中心组件
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address/address')), 'address')
const addressAdd = r => require.ensure([], () => r(require('../page/profile/children/children/address/children/add')), 'addressAdd')
const addressEdit = r => require.ensure([], () => r(require('../page/profile/children/children/address/children/edit')), 'addressEdit')
const remit = r => require.ensure([], () => r(require('../page/profile/children/children/remit/remit')), 'remit')
const remitAdd = r => require.ensure([], () => r(require('../page/profile/children/children/remit/children/add')), 'remitAdd')
const remitEdit = r => require.ensure([], () => r(require('../page/profile/children/children/remit/children/edit')), 'remitEdit')

const password = r => require.ensure([], () => r(require('../page/profile/children/children/password/password')), 'password')


const passwordEdit = r => require.ensure([], () => r(require('../page/profile/children/children/password/children/edit')), 'passwordEdit')

const setting = r => require.ensure([], () => r(require('../page/profile/children/children/setting/setting')), 'setting')

const about = r => require.ensure([], () => r(require('../page/profile/children/children/setting/children/about')), 'about')

const companyInfo = r => require.ensure([], () => r(require('../page/profile/children/children/companyInfo/companyInfo')), 'companyInfo')
const agreement = r => require.ensure([], () => r(require('../page/profile/children/children/agreement/agreement')), 'agreement')


//优惠券
const coupon = r => require.ensure([], () => r(require('../page/coupon/coupon')), 'coupon')

//返利
const rebate = r => require.ensure([], () => r(require('../page/rebate/rebate')), 'rebate')
//营销支持费
const marketing = r => require.ensure([], () => r(require('../page/marketing/marketing')), 'marketing')

//订单列表
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const obliga = r => require.ensure([], () => r(require('../page/obliga/obliga')), 'obliga')
const sending = r => require.ensure([], () => r(require('../page/sending/sending')), 'sending')
const receiving = r => require.ensure([], () => r(require('../page/receiving/receiving')), 'receiving')
const orderDetail = r => require.ensure([], () => r(require('../page/orderDetail/orderDetail')), 'orderDetail')

//展车列表
const display = r => require.ensure([], () => r(require('../page/display/display')), 'display')
const cancel = r => require.ensure([], () => r(require('../page/cancel/cancel')), 'cancel')
const purchase = r => require.ensure([], () => r(require('../page/purchase/purchase')), 'purchase')
const displayDetail = r => require.ensure([], () => r(require('../page/displayDetail/displayDetail')), 'displayDetail')

//消息  messageOrder
const message = r => require.ensure([], () => r(require('../page/message/message')), 'message')
const messageOrder = r => require.ensure([], () => r(require('../page/message/children/order')), 'messageOrder')
const messageCoupon = r => require.ensure([], () => r(require('../page/message/children/coupon')), 'messageCoupon')
const messageDisplay = r => require.ensure([], () => r(require('../page/message/children/display')), 'messageDisplay')
const messageRebate = r => require.ensure([], () => r(require('../page/message/children/rebate')), 'messageRebate')
const messageStorage = r => require.ensure([], () => r(require('../page/message/children/storage')), 'messageStorage')
const messageInform = r => require.ensure([], () => r(require('../page/message/children/inform')), 'messageInform')

//付款凭证
const payment = r => require.ensure([], () => r(require('../page/payment/payment')), 'payment')
const paymentSubmit = r => require.ensure([], () => r(require('../page/paymentSubmit/paymentSubmit')), 'paymentSubmit')

//售车申报组件
const declare = r => require.ensure([], () => r(require('../page/declare/declare')), 'declare')

//已售车申报组件
const soldCar = r => require.ensure([], () => r(require('../page/soldCar/soldCar')), 'soldCar')

//售车申报资料提交组件
const editDeclare = r => require.ensure([],() => r(require('../page/editDeclare/editDeclare')),'editDeclare')


//全款购车确认订单
const orderConfrim = r => require.ensure([], () => r(require('../page/orderConfrim/orderConfrim')), 'orderConfrim')
const resultSuccess = r => require.ensure([], () => r(require('../page/orderConfrim/children/resultSuccess')), 'resultSuccess')


//申请展车确认订单
const displayConfrim = r => require.ensure([], () => r(require('../page/displayConfrim/displayConfrim')), 'displayConfrim')

//补余款确认订单
const balanceConfrim = r => require.ensure([], () => r(require('../page/balanceConfrim/balanceConfrim')), 'balanceConfrim')

//中转库组件
const storage = r => require.ensure([], () => r(require('../page/storage/storage')), 'storage')

Vue.use(Router)

var router=new Router({
    routes: [
        {
            path: '*', 
            name: 'loading',
            component: loading  //默认路由，匹配不到的时候跳转loading
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
        {
            path: '/auth',  //登录注册个人认证
            name: 'auth',
            component: auth
        },
        {
            path: '/authResult',  //登录注册个人认证
            name: 'authResult',
            component: authResult
        },
        {
            path: '/aptitude',  //登录注册个人认证
            name: 'aptitude',
            component: aptitude
        },
        {
            path: '/index',  //首页
            name: 'index',
            component: index
        },
        {
            path: '/brand/:id',  //品牌页面
            name: 'brand',
            component: brand
        },
        {
            path: '/serie/:id',  //车系列表页面
            name: 'serie',
            component: serie
        },
        {
            path: '/configuration',  //参数配置页
            name: 'configuration',
            component: configuration
        },
        {
            path: '/orderConfrim/:id',  //全款购车确认页面
            name: 'orderConfrim',
            component: orderConfrim
        },
        {
            path: '/resultSuccess',  //参数配置页
            name: 'resultSuccess',
            component: resultSuccess
        },
        {
            path: '/balanceConfrim/:id',  //补余款下单页面
            name: 'balanceConfrim',
            component: balanceConfrim
        },
        {
            path: '/contrast',  //全款购车结果页
            name: 'contrast',
            component: contrast
        },
        {
            path: '/displayConfrim/:id',  //申请展车确认页面
            name: 'displayConfrim',
            component: displayConfrim
        },
        // {
        //   path: '/displayResult/:id',  //申请展车结果页
        //   name: 'displayResult',
        //   component: displayResult
        // },
        {
            path: '/profile', //个人主页
            name: 'profile',
            component:profile,
            children: [
                {
                    path: 'info',   //账户信息 子路由
                    name: 'info',
                    component: info,
                    children: [
                        {
                            path: 'address',   //收货地址列表
                            name: 'address',
                            component: address,
                            children: [
                                {
                                    path: 'add',   //新增地址
                                    name: 'addressAdd',
                                    component: addressAdd
                                },
                                {
                                    path: 'edit/:id',   //编辑地址
                                    name: 'addressEdit',
                                    component: addressEdit
                                }
                            ]
                        },
                        {
                            path: 'remit',   //汇款账户列表
                            name: 'remit',
                            component: remit,
                            children: [
                                {
                                    path: 'add',   //新增账户列表
                                    name: 'remitAdd',
                                    component: remitAdd
                                },
                                {
                                    path: 'edit/:id',   //编辑账户列表
                                    name: 'remitEdit',
                                    component: remitEdit
                                }
                            ]
                        },
                        {
                            path: 'password',   //汇款账户列表
                            name: 'password',
                            component: password,
                            children: [
                                {
                                    path: 'edit',   //新增账户列表
                                    name: 'passwordEdit',
                                    component: passwordEdit
                                }
                            ]
                        },
                        {
                            path: 'setting',   //汇款账户列表
                            name: 'setting',
                            component: setting,
                            children: [
                                {
                                    path: 'about',   //新增账户列表
                                    name: 'about',
                                    component: about
                                }
                            ]
                        }
                        ,
                        {
                            path: 'companyInfo',   //汇款账户列表
                            name: 'companyInfo',
                            component: companyInfo
                        },
                        {
                            path: 'agreement',   //汇款账户列表
                            name: 'agreement',
                            component: agreement
                        }
                    ]
                }
            ]
        },
        {
            path: '/rebate',  //我的返利
            name: 'rebate',
            component: rebate
        },
        {
            path: '/marketing',  //我的营销支持费
            name: 'marketing',
            component: marketing
        },
        {
            path: '/coupon',  //我的优惠券
            name: 'coupon',
            component: coupon
        },
        {
            path: '/order',  //我的订单列表
            name: 'order',
            component: order
        },
        {
            path: '/orderDetail/:id',  //我的订单详情页
            name: 'orderDetail',
            component: orderDetail
        },
        {
            path: '/obliga',  //我的待付款列表
            name: 'obliga',
            component: obliga
        },
        {
            path: '/sending',  //我的待发货列表
            name: 'sending',
            component: sending
        },
        {
            path: '/receiving',  //我的待收货列表
            name: 'receiving',
            component: receiving
        },
        {
            path: '/display',  //我的展车列表
            name: 'display',
            component: display
        },
        {
            path: '/cancel',   //退订&取消展车
            name: 'cancel',
            component: cancel
        },
        {
            path: '/purchase',   //已购展车
            name: 'purchase',
            component: purchase
        },
        {
            path: '/displayDetail/:id',  //我的展车订单详情页
            name: 'displayDetail',
            component: displayDetail
        },
        // {
        //   path: '/declare',  //我的售车申报列表
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
        {
            path: '/message',  //我的消息列表
            name: 'message',
            component: message,
            children: [
                {
                    path: 'order',   //订单提醒
                    name: 'messageOrder',
                    component: messageOrder
                },
                {
                    path: 'coupon',   //优惠券提醒
                    name: 'messageCoupon',
                    component: messageCoupon
                },
                {
                    path: 'display',   //展车提醒
                    name: 'messageDisplay',
                    component: messageDisplay
                },
                {
                    path: 'rebate',   //资金变动提醒
                    name: 'messageRebate',
                    component: messageRebate
                },
                {
                    path: 'storage',   //中转库变动提醒
                    name: 'messageStorage',
                    component: messageStorage
                },
                {
                    path: 'inform',   //通知
                    name: 'messageInform',
                    component: messageInform
                }
            ]
        },
        {
            path: '/payment/:id',  //汇款凭证
            name: 'payment',
            component: payment,
        },
        {
            path: '/declare',  //我的售车申报列表
            name: 'declare',
            component: declare
            //children: [
            //  {
            //    path: 'edit/:id',   //提交申报资料
            //    name: 'editDeclare',
            //    component: editDeclare
            //  }
            //]
        },
        {
            path: '/editDeclare/:id',   //提交申报资料
            name: 'editDeclare',
            component: editDeclare
        },
        {
            path: '/soldCar',  //已售车辆申报列表
            name: 'soldCar',
            component: soldCar
        },
        {
            path: '/storage',  //我的中转库列表
            name: 'storage',
            component: storage
        },
        {
            path: '/paymentSubmit',  //提交汇款凭证
            name: 'paymentSubmit',
            component: paymentSubmit,
        }
    ]
})


router.beforeEach((to, from, next) => {
    var token = sessionStorage.getItem('token');
    var idCardAuth = sessionStorage.getItem('idCardAuth');
    //如何做登录完了回到某个页面去呢
    if(to.name=="loading"||to.name=='account'||to.name=='code'){ //不需要登录可以直接跳转的
        next();
    }else if(!!(token&&(to.name=="auth"||to.name=='authResult'||to.name=='aptitude'))){ //需要登录但是不用认证才能进去的页面
        next();
    }else if(!!(token&&(idCardAuth==1))){ //登录并且已经认证过需要认证
        next();
    }else{
        next('/');
    }
})

export default router;
