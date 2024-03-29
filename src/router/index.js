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
//const editDeclare = r => require.ensure([],() => r(require('../page/editDeclare/editDeclare')),'editDeclare')

//售车申报资料审核中组件
//const auditDeclare = r => require.ensure([],() => r(require('../page/auditDeclare/auditDeclare')),'auditDeclare')

//售车申报资料组件
const rejectDeclare = r => require.ensure([],() => r(require('../page/rejectDeclare/rejectDeclare')),'rejectDeclare')

//已售车申报资料详情页组件
const soldCarDetail = r => require.ensure([],() => r(require('../page/soldCarDetail/soldCarDetail')),'soldCarDetail')

//全款购车确认订单
const orderConfrim = r => require.ensure([], () => r(require('../page/orderConfrim/orderConfrim')), 'orderConfrim')
const resultSuccess = r => require.ensure([], () => r(require('../page/orderConfrim/children/resultSuccess')), 'resultSuccess')

//申请展车确认订单
const displayConfrim = r => require.ensure([], () => r(require('../page/displayConfrim/displayConfrim')), 'displayConfrim')

//补余款确认订单
const balanceConfrim = r => require.ensure([], () => r(require('../page/balanceConfrim/balanceConfrim')), 'balanceConfrim')

//中转库组件
const storage = r => require.ensure([], () => r(require('../page/storage/storage')), 'storage')

//后期淘车猫加入专题
const auction = r => require.ensure([], () => r(require('../page/topic/20171111/auction')), 'auction')

//授权店认证
const empower = r => require.ensure([], () => r(require('../page/empower/empower')), 'empower')

//授权店升级引导
const empowerGuide = r => require.ensure([], () => r(require('../page/empower/empowerGuide')), 'empowerGuide')

//授权店提交成功
const empowerSuccess = r => require.ensure([], () => r(require('../page/empower/empowerSuccess')), 'empowerSuccess')

//授权店审核中
const empowerAudit = r => require.ensure([], () => r(require('../page/empower/empowerAudit')), 'empowerAudit')

//授权店审核通过
const empowerAdopt = r => require.ensure([], () => r(require('../page/empower/empowerAdopt')), 'empowerAdopt')

//app1.5.0加盟店H5
const problem = r => require.ensure([], () => r(require('../page/storesH5/problem')), 'problem')
const authorize = r => require.ensure([], () => r(require('../page/storesH5/authorize')), 'authorize')

//预售详情
const presellDetails = r => require.ensure([], () => r(require('../page/presell/presellDetails')),'presellDetails')
// 新预售详情
const detail = r => require.ensure([], () => r(require('../page/presell/detail')),'detail')

//预售确认预定
const presellReserve = r => require.ensure([], () => r(require('../page/presell/presellReserve')),'presellReserve')

//预售预定成功
const presellSuccess = r => require.ensure([],() => r(require('../page/presell/presellSuccess')),'presellSuccess')

//预售订单列表
const presellList = r => require.ensure([],() => r(require('../page/presell/presellList')),'presellList')

//邀请注册
const invitation = r => require.ensure([],() => r(require('../page/invitation/invitation')),'invitation')

//纪录
const record = r => require.ensure([],() => r(require('../page/invitation/record')),'record')

//领取
const receive = r => require.ensure([],() => r(require('../page/invitation/receive')),'receive')

const test = r => require.ensure([],() => r(require('../page/test/test')),'test')
//竞拍
const biding = r => require.ensure([],() => r(require('../page/biding/biding')),'biding')
//保证金规则详情页
const ruledetails = r => require.ensure([],() => r(require('../page/biding/ruledetails')),'ruledetails')
//竞拍记录列表详情页
const recordlist = r => require.ensure([],() => r(require('../page/biding/recordlist')),'recordlist')

//融资购车页面
const financing = r => require.ensure([], () => r(require('../page/financing/financing')), 'financing')
const subsuccess = r => require.ensure([], () => r(require('../page/financing/subsuccess')), 'subsuccess')
const animation = r => require.ensure([], () => r(require('../page/animation/animation')), 'animation')
// 帮助页面
const help = r => require.ensure([], () => r(require('../page/help/help')), 'help')

Vue.use(Router)

var router=new Router({
    routes: [
        // {
        //     path: '*',
        //     name: 'loading',
        //     component: loading  //默认路由，匹配不到的时候跳转loading
        // },
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
            path: '/resultSuccess',  //下单成功页
            name: 'resultSuccess',
            component: resultSuccess
        },
        {
            path: '/balanceConfrim/:id',  //补余款下单页面
            name: 'balanceConfrim',
            component: balanceConfrim
        },
        {
            path: '/contrast',  //配置对比页面
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
        },
        //{
        //    path: '/editDeclare/:id',   //提交申报资料
        //    name: 'editDeclare',
        //    component: editDeclare
        //},
        //{
        //    path: '/auditDeclare/:id',   //提交申报资料审核中
        //    name: 'auditDeclare',
        //    component: auditDeclare
        //},
        {
            path: '/rejectDeclare',   //提交申报资料三种状态
            name: 'rejectDeclare',
            component: rejectDeclare
        },
        {
            path: '/soldCar',  //已售车辆申报列表
            name: 'soldCar',
            component: soldCar
        },
        {
            path: '/soldCarDetail/:id',   //已售车辆申报资料详情页
            name: 'soldCarDetail',
            component: soldCarDetail
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
        },
        {
          path: '/zt/201711/auction',  //提交汇款凭证
          name: 'auction',
          component: auction,
        },
        {
            path: '/empower',  //授权店认证
            name: 'empower',
            component: empower
        },
        {
            path: '/empower/empowerGuide',  //授权店升级引导
            name: 'empowerGuide',
            component: empowerGuide
        },
        {
            path: '/empower/empowerSuccess',  //授权店提交成功
            name: 'empowerSuccess',
            component: empowerSuccess
        },
        {
            path: '/empower/empowerAudit',  //授权店审核中
            name: 'empowerAudit',
            component: empowerAudit
        },
        {
            path: '/empower/empowerAdopt',  //授权店审核通过
            name: 'empowerAdopt',
            component: empowerAdopt
        },
        {

            path: '/storesH5/problem',  //几个小问题
            name: 'problem',
            component: problem
        },
        {
            path: '/storesH5/authorize',  //授权店
            name: 'authorize',
            component: authorize
        } ,
        {
            path:'/presell/detail',  //预售详情页
            name:'detail',
            component:detail
        },
        {
            path:'/presell/presellReserve/:id',   //预售确认预定
            name:'presellReserve',
            component:presellReserve
        },
        {
            path:'/presell/presellDetails',   //预售确认预定
            name:'presellDetails',
            component:presellDetails
        },
        {
            path:'/presell/presellSuccess',  //预定成功
            name:'presellSuccess',
            component:presellSuccess
        },
        {
            path:'/presell/presellList',     //预售订单列表
            name:'presellList',
            component:presellList
        }
        ,
        {
            path:'/invitation/invitation',     //邀请注册
            name:'invitation',
            component:invitation
        }
        ,
        {
            path:'/invitation/record',     //纪录
            name:'record',
            component:record
        }
        ,
        {
            path:'/invitation/receive',     //领取
            name:'receive',
            component:receive
        }
        ,
        {
            path:'/test',     //领取
            name:'test',
            component:test
        },
        {
            path:'/biding',     //竞拍
            name:'biding',
            component:biding
        },
        {
            path:'/biding/ruledetails',     //保证金规则详情页
            name:'ruledetails',
            component:ruledetails
        },
        {
            path:'/biding/recordlist',     //竞拍记录列表详情页
            name:'recordlist',
            component:recordlist
        }
        ,
        {
            path:'/financing',     //融资购车
            name:'financing',
            component:financing
        },
        {
            path:'/financing/subsuccess',     //融资购车提交成功
            name:'subsuccess',
            component:subsuccess
        } ,
        {
            path:'/animation',     //融资
            name:'animation',
            component:animation
        }  ,
        {
            path:'/help',     //帮助
            name:'help',
            component:help
        } 
    ]
})



router.beforeEach((to, from, next) => {
    var token = sessionStorage.getItem('token');

    if(token == null){ //用于app内部跳转多个参数后续完善
        if(to.name=='receive'){
            next();
        }else{
            var href = window.location.href,
                str = href.indexOf('token=');
                if(str != -1){
                    token = href.substr(str+6,str+38);
                }  
        }
    };
    var href = window.location.href,
        str = href.indexOf('apiVersion=');
    if(str != -1){
        var apiVersion = href.substr(str+11,5);
        sessionStorage.apiVersion = apiVersion;
    }else{
        sessionStorage.apiVersion = '';
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    //如何做登录完了回到某个页面去呢  
    if(to.name=='receive'||to.name=="loading"||to.name=='account'||to.name=='code'||to.name == "auction"||to.name == "receive"||to.name == "presellDetails"){ //不需要登录可以直接跳转的 //专题后面想想能不能单独路由
        next();
    }else if(!!(token&&(to.name=="auth"||to.name=='authResult'||to.name=='aptitude'))){ //需要登录但是不用认证才能进去的页面
        next();
    }else if(!!token){ //登录并且已经认证过需要认证
        next();
    }else{
        next();
    }
})


export default router;
