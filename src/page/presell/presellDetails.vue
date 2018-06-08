<template>
    <div>
        <!--预售详情-图片滚动-->
        <swiper :circular="circular" v-if="circular.length"></swiper>
        <!-- 价格和倒计时 -->
        <section class="car-parameter">
            <div class="car-price">
                <div class="price-wrapper">
                <h4 class="true-price">{{presellData.prePrice}} <span>万</span></h4>
                <h4 class="guided-price">指导价：{{presellData.guidePrice}}万 / {{presellData.disparityPrice}}万</h4>
                </div>
                <div class="countdown">
                    <h4 :class="{'activeEnd': !countdownState}">{{countdownText}}</h4>
                    <div v-show="countdownState"><span>{{countdownArr[1]}}</span> 天 <span>{{countdownArr[2]}}</span> : <span>{{countdownArr[3]}}</span></div> 
                </div>
            </div>
        </section>
        <section class="car-info-wrap">
            <div class="car-time-place">
                <!-- 名字和设置提醒 -->
                <div class="car-name">
                    <h4 class="name-content">{{presellData.autoName}}</h4>
                    <div class="set-warning" v-if="isTcmApp" @click="setWarningFun">
                        <div class="btn-warning" :class="{'actived': tpresellData.isRemind == '1'}">
                            <span class="icon-warning"></span>
                            <span class="text-warning" v-if="presellData.isRemind == '0'">提醒我</span>
                            <span class="text-warning" v-else>已醒我</span>
                        </div>
                        <h4 class="desc-warning">{{presellData.remindNum}}人已提醒</h4>
                    </div>
                </div>
                <!-- 详情 -->
                <ul>
                    <li><span>可售范围：</span><a>{{presellData.area}}</a></li>
                    <li><span>到货时间：</span><a>{{presellData.arrivalTime}}</a></li>
                    <li><span>提货地点：</span><a>{{presellData.deliveryPlace}}</a></li>
                    <li><span>车型颜色：</span><a>{{presellData.autoColor}}</a></li>
                    <li><span>生产日期：</span><a>{{presellData.productionTime}}</a></li>
                    <li><span>备注：</span><a>{{presellData.remark}}</a></li>
                </ul>
                <!-- 同城 -->
                <div class="car-reserve" v-if="preSaleData.type == '2' ">
                    <p class="car-reserve-title">同省订购每满{{presellData.number}}台，即可享受发车到省</p>
                    <p class="car-reserve-tips">
                        <span>{{preSaleData.province}}</span>再订<i>{{preSaleData.endNum}}</i>台 <span>{{preSaleData.city}}</span> 提货
                    </p>
                    <div class="car-reserve-roll">
                        <ul ref="con1" :class="{anim:animate==true}">
                            <li v-for="(item, index) in preSaleData.buyList" :key="index">
                                <span>{{item.time}}</span>
                                <span>{{item.dealer}}</span>
                                <span>{{item.num}}</span>
                            </li>
                        </ul>
                    </div>

                    <p class="car-share"><img src="../../assets/presell_btn_icon.png" alt="" @click="showShareDialog"></p>
                    <p class="car-batch-count" v-if="preSaleData.batch > 0">已有<span>&nbsp;{{preSaleData.batch}}&nbsp;</span>批车辆发往{{preSaleData.city}}</p>
                </div>
            </div>
        </section>

        <section class="car-presell-flow">
            <p>抢购流程</p>
            <img src="../../assets/car-presell-flow.png" alt="">
        </section>

        <section class="car-presell-explain">
            <p class="presell-explain-title">关于限时抢购</p>
            <ul class="presell-explain-con">
                <li><span>1.</span>定金将在提车完成后，退回原支付账户；</li>
                <li><span>2.</span>支付定金可锁定车源，车辆入库后补齐尾款，前往指定地点提车；</li>
                <li><span>3.</span>车辆到库后，若五天内未提车，将取消订单，定金不退回。</li>
                <li><span>4.</span>抢购车源，为一猫采购的限时限量畅销车源；</li>
                <li><span>5.</span>因经销商原因，导致交易无法继续，定金将不予退还；</li>
                <li><span>6.</span>一猫原因造成车辆延迟交付，一猫退回定金并赔付 500 元代金券；</li>
                <li><span>7.</span>开票及申请合格证流程，与其他零售车型一致；</li>
                <li><span>8.</span>如有疑问可咨询渠道支持，或联系客服 <a style="color:#d5aa5c" href="tel:4008252368">400-825-2368</a>。</li>
            </ul>
        </section>
        <!-- 按钮 -->
        <section class="car-reserve-btn">
            <div v-if="btnState" class="car-presell-present"  @click="presellReserve">{{btnText}}</div>
            <div v-else class="car-presell-present-disabled">{{btnText}}</div>
        </section>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <popup
            class="registerPopup"
            :showPopup="registerpopupState"
            :clickAroundHide="true"
            :contentStyleObj="{
                background: `#fff url(${alertBg}) no-repeat`,
                backgroundSize: '100% auto',
                borderRadius: '.13333rem',
            }"
            @changePopupState="changeState"
            position="center">
            <div class="single"></div>
            <!-- 注册内容 -->
            <div class="register-wrapper" v-show="popupShowWhich === 'register'">
                <h4 class="ttl">新注册立得<span>100元券</span></h4>
                <div class="input-tel">
                    <input type="number" class="tel" v-model="telVal" placeholder="请输入手机号">
                </div>
                <div class="btn-register" @click="registerFun">立即领取</div>
            </div>
            <!-- 注册成功内容 -->
            <div class="register-success-wrapper" v-show="popupShowWhich === 'success'">
                <h4 class="ttl">欢迎加入车商猫</h4>
                <h4 class="desc">100购车优惠券已放入您的账户中，赶紧抢购吧！</h4>
                <div class="btn-goApp">前往APP</div>
            </div>
            <!-- 注册成功内容 -->
            <div class="registed-wrapper" v-show="popupShowWhich === 'registed '">
                <h4 class="ttl">欢迎加入车商猫</h4>
                <div class="btn-goApp">前往APP</div>
            </div>  
        </popup>
        <popup
            class="selectPopup"
            :showPopup="selectPopupState" 
            :contentStyleObj="{
                background: '#fff'
            }"
            position="bottom">
            <div class="select-wrapper">
                <h4 class="select-ttl">{{'限时抢购'}}</h4>
                <h4 class="car-ttl">{{'本田思域本田思域本田思域本田思域本田思域本田思域本田思域本田思域本田思域'}}</h4>
                <div class="price-wrapper">抢购价：<span>{{7.39}} 万</span></div>
                <div class="color-select">
                    <h4>可选颜色</h4>
                    <ul class="color-wrapper">
                        <li 
                            class="color-item" 
                            :class="{'active': selectData['selectColorIndex'] === index}"
                            v-for="(item, index) in stock" 
                            :key="index"
                            @click="selectColor(index)">
                            {{stock[index]['extColor']}}/{{stock[index]['extColor']}}
                        </li>
                    </ul>
                </div>
                <div class="num-wrapper">
                    <h4>预定数量</h4>
                    <div class="num-select">
                        <span class="btn-cut" @click="calculateFun(false, stock[selectData.selectColorIndex]['sum'])">-</span>
                        <span class="num-content">{{selectData.carNum}}</span>
                        <span class="btn-add" @click="calculateFun(true, stock[selectData.selectColorIndex]['sum'])">+</span>
                    </div> 
                </div>
                <div class="btn-go" @click="snapUpFun">立即抢购</div>
                <span class="btn-close" @click="selectPopupState = false"></span>
            </div>   
        </popup>
    </div>
</template>
<script>
import swiper from "../../components/common/swiper/swiper";
import alertTip from "../../components/common/alertTip/alertTip";
import Popup from "../../components/common/popup/popup.vue";
import VerificationCode from '../../components/common/verificationCode/verificationCode.vue';
import {timeCountdown} from '../../common/js/countdown.js'; 
import share from '../../common/js/shareOnly.js';


export default {
  name: "presellDetails",
  data() {
    return {
      stock: [
          {
              extColor: "黑色",
              extColorId: "1",
              initColor: "米色",
              initColorId: "3",
              sum: "15"
          },
          {
              extColor: "白色",
              extColorId: "2",
              initColor: "米色",
              initColorId: "3",
              sum: "5"
          }
      ],
      registerpopupState: false, // 注册弹窗
      selectPopupState: false, // 购买弹窗状态  
      circular: [], //轮播图数据
      animate: false, //是否运动
      presellData: {}, //页面数据
      preSaleData: {}, //预售信息
      showAlert: false, //是否显示弹窗
      alertText: null, //弹窗提示信息
      popupShowWhich: 'register', // 显示哪个弹窗，register和success
      telVal: '', // 电话号码
      btnState: true, // 按钮状态
      btnText: '立即抢购', // 按钮文案
      countdownText: '距离开始还剩', // 倒计时文案
      countdownState: true, // 倒计时文案状态
      countdownArr: [], // 倒计时数组
      selectData: {
          selectColorIndex: 0,
          carNum: 0
      }
    };
  },
  computed: {
    // 弹窗背景的图片
    alertBg () {
        return require('../../assets/flashSale_alert_bg.jpg')
    },
    /*判断是否是App*/
    isTcmApp () {
        if (
            typeof this.$route.query.token == "undefined" ||
            this.$route.query.token == ""
        ) {
            return false;
        } else {
            return true;
        }
    },
    /*判断浏览器来源*/
    getSource(){
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {     //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应用程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
            var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //在微信中打开
                return 3;
            }
            if (ua.match(/WeiBo/i) == "weibo") {
                //在新浪微博客户端打开
                return 5;
            }
            if (ua.match(/QQ/i) == "qq") {
                //在QQ空间打开
                return 4;
            }
            if (browser.versions.ios) {
                //是否在IOS浏览器打开
            }
            if (browser.versions.android) {
                //是否在安卓浏览器打开
            }
        } else {
            //否则就是PC浏览器打开
        }
    }
  },
  
  methods: {
    // 点击设置提醒按钮
    setWarningFun () {
        if ( this.presellData.isRemind == '1') {
            this.setStoreAlert('已经设置过了哟！')
            return;
        }
        const params = {
            token: this.$router.query.token,
            activeId: this.$router.query.id
        }
        this.$http({
            url: "preSale/setReminder",
            methods: "GET",
            params: params
        }).then(function(response) {
            const data = response.body.data;
            this.setStoreAlert('设置成功！')
            this.presellData.remindNum = data.remindNum;
            this.presellData.isRemind = data.isRemind
        }).catch((error) => {
            this.setStoreAlert('设置失败！')
        })
    },  
    // 设置弹窗状态
    changeState (state) {
        this.registerpopupState = state;
    },
    //单行文字滚动
    scroll() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.presellData.preSale.buyList.push(
          this.presellData.preSale.buyList[0]
        ); // 将数组的第一个元素添加到数组的
        this.presellData.preSale.buyList.shift(); //删除数组的第一个元素
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 500);
    },
    /*向App传值*/
    tcmApp(obj) {
      //emaoAppObject 是 native 向 WebView 注册的用来响应 JS 消息的对象
      //向 native 发送消息（TODO:具体使用中可根据 navigator.userAgent 中的信息来判断系统类型，在不同的系统中分别调用下面对应的代码）
      //或者由服务器判断响应不同的平台脚本
      if (navigator.userAgent.indexOf("iPhone") > 0) {
        window.webkit.messageHandlers.tcmAppObject.postMessage(obj); //向 iOS 发送消息，Android 无效
      } else {
        window.tcmAppObject.postMessage(JSON.stringify(obj)); //向 Android 发送消息，iOS 无效
      }
    },
    //用 JS 函数在新窗口打开指定链接
    windowOpen() {
      var obj = {
        actionname: "windowOpen", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
        url: `emaotaochemao://push/PresaleConfirmOrder?eventId=${this.$route.query.id}&extColorId=${this.stock[selectData.selectColorIndex].extColorId}&intColorId=${this.stock[selectData.selectColorIndex].intColorId}&presaleNum=${selectData.carNum}` // 要打开的链接
      };
      this.tcmApp(obj);
    },
    /*区分app与wap做不同的渲染*/
    renderDom() {
      if (this.isTcmApp) {
        document.title = "限时抢购";
      }
    },
    // 显示分享弹窗
    showShareDialog() {
        var obj = {
            actionname:"showShareDialog",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
            actionid:"messageId",//回调 ID：可选参数，与回调函数配套使用
            // callback:callback,//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
            title: this.presellData.shareInfo.shareText,
            subTitle: this.presellData.shareInfo.shareDescription,
            imgUrl:this.presellData.shareInfo.shareImg,
            url:this.presellData.shareInfo.shareUrl, //要分享内容的 url
            shareType:"1", //此字段用于后续统计区别类型, 0:普通分享,不需要统计 1:预售分享
            uniqueId: this.presellData.shareInfo.uniqueId, //shareType为0时可空,分享统计id
            extra: this.$route.query.id //分享需要的额外字段,预售id
        };
        this.tcmApp(obj);
    },
    //向导航条上添加分享按钮
    addShareButton() {
        let _this = this;
        var obj = {
            actionname:"addShareButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
            actionid:"messageId",//回调 ID：可选参数，与回调函数配套使用
            // callback:callback,//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
            buttonTitle:"分享",//分享按钮的标题；可选参数，与 buttonImage 二选一
            // buttonImage:"url",//分享按钮的图片地址；可选参数，与 buttonTitle 二选一；若没有该参数，或者 image 的地址为空，则使用 buttonTitle。若有此参数则优先使用该参数
            title: this.presellData.shareInfo.shareText,
            subTitle: this.presellData.shareInfo.shareDescription,
            imgUrl: this.presellData.shareInfo.shareImg,
            url: this.presellData.shareInfo.shareUrl, //要分享内容的 url
        };
        this.tcmApp(obj);
    },
    /*立即预定*/
    presellReserve() {
      if (this.isTcmApp) {
        this.selectPopupState = true;
      } else {
        this.registerpopupState = true;
      }
    },
    //获取数据
    getPresellDetails() {
      return new Promise((resolve, reject) => {
        var dataToken = sessionStorage.token;
        var params = {
            id: this.$route.query.id
        };
        if (this.isTcmApp) {
            params.token = dataToken
        } else {
            params.provinceId = this.$route.query.provinceId
            params.type = 6
            params.source = this.getSource
        }
        this.$http({
            url: "preSale/detail",
            methods: "GET",
            params: params
        }).then(function(response) {
            let data = response.body.data;
            this.presellData = data;
            this.circular = data.circular;
            this.preSaleData = data.preSale;
            this.presellModel = data.autoName;
            this.presellPrice = data.prePrice;
            this.stock = response.body.data.preSaleList;
            resolve(this.presellData);
            window.presellModel = data.autoName;
            window.presellPrice = data.prePrice;
            window.deliveryPlace = data.deliveryPlace;
            localStorage.setItem("deliveryPlace", data.deliveryPlace);
        });
      })  
    },
    twoDetial (x) {
        let f = parseFloat(x)
        if (isNaN(f)) {
            return false
        }
        f = Math.round(x * 100) / 100
        let s = f.toString()
        let rs = s.indexOf('.')
        if (rs < 0) {
            rs = s.length
            s += '.'
        }
        while (s.length <= rs + 2) {
            s += '0'
        }
        return s
    },
     // 注册
    registerFun () {
        let _this = this
        if (this.telVal === '') {
            this.initAlert('电话号码不能为空哟！', true);
            return
        }
        if (!/^\d{11}$/g.test(this.telVal)) {
            this.initAlert('电话号码为11位数字', true);
            return
        }
        this.$http({
            url: 'passport/registerWithoutCode',
            type: 'GET',
            params: {
                phone: _this.telVal,
                invite: _this.$route.query.invite,
                invitees: _this.$route.query.invitees
            }
        })
        .then((res) => {
            _this.initAlert('领取成功，请稍等', true);
            _this.popupShowWhich = 'success';
        })
        .catch((err) => {
            console.log(err.statusText)
            // let data = err.response.data;
            _this.initAlert(err.statusText, true);
            _this.$store.dispatch("AJAX_LOADING", false)
            if (data.code === 400) {
            _this.showPopupTel = false
            }
        })
    },
    //设置store
    setStoreAlert (content) {
        this.$store.dispatch("ALERT", {
            flag: true,
            text: content
        })
    },
    // 选择颜色
    selectColor (index) {
        this.selectData.selectColorIndex = index
        this.selectData.carNum = 0
    },
    // 计算预定数量
    calculateFun (boolean, sum) {
        if (boolean) {
            this.selectData.carNum = ++this.selectData.carNum > sum ? sum : this.selectData.carNum
            return
        }
        this.selectData.carNum = --this.selectData.carNum < 0 ? 0 : this.selectData.carNum
    },
    // 校验库存
    checkInventory () {
        return new Promise(resolve => {
            this.$http({
                url: '../',
                type: 'GET',
                params: {
                    eventId: this.$route.query.id,
                    extColorId: this.stock[selectData.selectColorIndex].extColorId,
                    intColorId: this.stock[selectData.selectColorIndex].intColorId,
                    presaleNum: selectData.carNum
                }
            })
            .then(response => {
                resolve()
            })
            .catch(error => {
                const data = error.body.data;
                const selectNum =  this.selectData.carNum;
                const stockNum = this.presellData.preSaleList[this.selectData.selectColorIndex].stockNum;
                this.selectData.carNum = selectNum > data.num ? data.num : selectNum;
                this.presellData.preSaleList[this.selectData.selectColorIndex].stockNum = stockNum > data.num ? data.num : stockNum;
            })
        })
        
    },
    // 立即抢购函数
    snapUpFun () {
        this.checkInventory().then(() => {
            alert('立即抢购');
            this.windowOpen();
        })
        
    },
    initAlert (content) {
        this.$store.dispatch("ALERT", // 通过store传值
            {
            flag:true,
            text:content
            }
        );
    }
  },
  created() {
    /*文字滚动效果*/
    // setInterval(this.scroll, 2000);
  },
  mounted() { 
    if (!sessionStorage.token) {
      sessionStorage.token = this.$route.query.token;
    }
    this.getPresellDetails().then((presellData) => {
        console.log('presellData', presellData)
        console.log(presellData.preSaleStartTime)
        console.log(presellData.preSaleEndTime)
        const startTime = new Date(presellData.preSaleStartTime);
        const endTime = new Date(presellData.preSaleEndTime);
        const shareData = presellData.shareInfo;
        
        timeCountdown({startTime, endTime}, (update) => {
            this.countdownArr = update;
            if (update[0] === 'start') {
                this.btnText = '等待抢购'
                this.btnState = false
                this.countdownText = '距离开始还剩'
                this.countdownState = true;
            }
            if (update[0] === 'ing') {
                this.btnText = '立即抢购'
                this.btnState = true
                this.countdownText = '距离结束还剩'
                this.countdownState = true;
            }
            if (update[0] === 'ing' && presellData.preSale.endNum === 0) {
                this.btnText = '已售罄'
                this.btnState = false
                this.countdownText = '已售罄'
                this.countdownState = false;
            }
        }, (end) => {
            this.countdownArr = end;
            this.btnState = false;
            this.btnText = '已结束';
            this.countdownText = '距离结束还剩'
            this.countdownState = true;
        })
        this.addShareButton();
        share(shareData);
    });
    this.renderDom();
  },
  components: {
    swiper,
    alertTip,
    Popup,
    VerificationCode
  }
};
</script>

<style>
.car-info-wrap{ padding:0 .4rem .4rem; background: #fff;}
.car-parameter{overflow: hidden;padding: 0 .4rem;background: url('../../assets/flashSale_bg.jpg') no-repeat;background-size: 100% 100%;}
.car-time-place .car-name { margin: 0 -.4rem .5rem; padding: 0.2rem .4rem;min-height:1.1rem;border-bottom: 1px solid #e0e0e0;display: flex; display: -webkit-flex;  align-items: center;
    background: -moz-linear-gradient(top, #ffc8b7 0%, #ffffff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffc8b7), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top, #ffc8b7 0%,#ffffff 100%);
    background: -o-linear-gradient(top, #ffc8b7 0%,#ffffff 100%);
    background: -ms-linear-gradient(top, #ffc8b7 0%,#ffffff 100%);
    background: linear-gradient(to bottom, #ffc8b7 0%,#ffffff 100%);
}
.car-time-place .car-name .name-content {font-size:.4rem; font-weight:bold; color:#000; line-height:.6rem; flex: 1;}
.car-time-place .car-name .set-warning {padding-left: .2rem;border-left: 1px solid #f1f1f1;}
.car-time-place .car-name .set-warning .btn-warning span{display: block}
.car-time-place .car-name .set-warning .btn-warning span.icon-warning {margin: 0 auto;width:0.56rem;height:0.56rem;background: url('../../assets/presell_warning.png') no-repeat;background-size: 100% 100%;}
.car-time-place .car-name .set-warning .btn-warning span.text-warning {margin: .1rem 0;text-align:center; color: #fc3238; font-size: 0.34667rem;}
.car-time-place .car-name .set-warning .desc-warning {text-align:center; color: #999; font-size: 0.29333rem;}
.car-time-place .car-name .set-warning .btn-warning.actived .icon-warning {background: url('../../assets/presell_warning_actived.png') no-repeat;background-size: 100% 100%}
.car-time-place .car-name .set-warning .btn-warning.actived .text-warning {color: #999}

.car-price{position:relative;display: flex; display: -webkit-flex;  align-items: center;color: #fff;height: 1.80667rem;}
.car-price .price-wrapper {flex: 1;font-size: 0.34667rem;}
.car-price .price-wrapper .true-price {margin-bottom: .16rem;font-size: 0.58667rem;}
.car-price .price-wrapper .true-price span{font-size: 0.34667rem;}
.car-price .countdown {flex: 0 0 2.26rem; text-align: center}
.car-price .countdown .activeEnd {color: #fff; font-size: 0.37333rem}
.car-price .countdown span {margin-top: .15rem;display: inline-block;width: 0.42667rem;line-height:0.42667rem;text-align:center;background: #fff;border-radius: .1rem;color: #fc3036}

.car-count-down {position: absolute;top: 0;right: -0.4rem;padding: 0.1333rem 0.4rem;color: #fff;border-top-left-radius: 0.667rem;border-bottom-left-radius: 0.667rem;background-color: #fc3238;}
.car-count-down span {display: block;}
.car-count-down span:nth-of-type(2) {font-size: 0.3467rem;font-weight: bold;}
.car-time-place ul li {margin-bottom: 0.267rem;}
.car-time-place ul li:after {display: block; content: '';clear: both;width: 0} 
.car-time-place ul li span{width:1.8rem;font-size:.346667rem;color:#999;float: left;}
.car-time-place ul li a{width:7.2rem;font-size:.32rem;color:#333; float: left;word-break: break-all; word-wrap:break-word;}
.car-reserve {display: none;padding: 0.467rem 0.5333rem;background-color: #fef9f1;}
.car-reserve-title {line-height: 0.9333rem;font-size: 0.372rem;color: #000;text-align: center;}
.car-reserve-tips {margin-bottom: 0.4rem;text-align: center;font-size: 0.3467rem;color: #ff5825;}
.car-reserve-tips i {font-weight: bold;font-style: normal;}
.car-reserve-roll {overflow: hidden;height: 1.8rem;}
.car-reserve-roll ul li {height: 0.4rem;margin-bottom: 0.267rem;line-height: 0.4rem;font-size: 0.32rem;text-align: center;color: #999;}

.car-reserve-roll ul li span:nth-of-type(2) {margin-left: 0.5rem;margin-right: 0.5rem;}

.car-share {text-align: center;}
.car-share img {width: 7.147rem;height: 1.68rem;}
.car-batch-count {text-align: center;color: #2c2c2c;font-size: 0.32rem;}
.car-presell-flow {margin-top: 0.4rem;padding-top: 0.533rem;padding-bottom: 0.533rem;text-align: center;background-color: #fff;}
.car-presell-flow p {font-size: 0.45333rem;color: #000;text-align: center;}
.car-presell-flow img {width: 7.707rem;height: 1.88rem;margin-top: 0.867rem;}
.car-presell-explain {margin-top: 0.4rem;margin-bottom: 1.4rem;padding: 0.533rem;background-color: #fff;}
.presell-explain-title {margin-bottom: 0.6rem;font-size: 0.45333rem;color: #000;text-align: center}
.presell-explain-con li {position: relative;margin-left: 0.6rem;margin-bottom: 0.267rem;color: #999;font-size: 0.4rem;line-height: 0.533rem;}
.presell-explain-con li span {position: absolute;left: -0.6rem;}
.car-reserve-btn {display: inline-block;position: fixed;bottom: 0;left: 0; height: 1.867rem;width: 100%;margin: 0 auto;background-color: #fff;line-height: 1.867rem;text-align: center;border-top: 1px solid #e7e7e7;}
.car-reserve-btn .car-presell-present {display: inline-block;width: 6.667rem;height: 1.1733rem;margin: 0 auto;text-align: center;line-height: 1.17333rem;font-size: 0.4rem;color: #fff;border: none;border-radius: 0.5867rem;background-color: #d5aa5c;}
.car-reserve-btn .car-presell-present-disabled {display: inline-block;width: 6.667rem;height: 1.1733rem;margin: 0 auto;text-align: center;line-height: 1.17333rem;font-size: 0.4rem;color: #999;border: none;border-radius: 0.5867rem;background-color: #e6e6e6;}

.anim {transition: all 0.5s;margin-top: -0.4rem;}

.registerPopup .single {margin: 0.53333rem auto;width: 2.53333rem;height: 0.8rem;background: url('../../assets/flashSale_single.jpg') no-repeat;background-size:100% auto}
.registerPopup .register-wrapper .ttl{margin: 0.4rem auto 0.93333rem;font-size: 0.53333rem;color: #d5aa5c;text-align: center}
.registerPopup .register-wrapper .ttl span {color: #ff5825}
.registerPopup .register-wrapper .input-tel {margin: auto;width: 7.6rem;display: flex;font-size: 0.32rem}
.registerPopup .register-wrapper .input-tel .tel {padding: 0 .4rem;width: 6.8rem; height: 1.2rem; line-height: 0.5rem; border: 1px solid #999;font-size: .34667rem;}
.registerPopup .register-wrapper .btn-register {margin: 1.2rem auto;width: 6.66667rem;line-height: 1.2rem;background: #d5aa5c; border-radius: .6rem;text-align: center;font-size: 0.45333rem;color: #fff}
.registerPopup .register-success-wrapper .ttl {text-align: center;font-size: 0.64rem;color: #ff5825;}
.registerPopup .register-success-wrapper .desc {margin: .53333rem auto 1.2rem;text-align: center;font-size: 0.4rem;color: #2c2c2c;}
.registerPopup .register-success-wrapper .btn-goApp {margin: 0 auto .8rem;width: 6.66667rem;line-height: 1.2rem;background: #d5aa5c; border-radius: .6rem;text-align: center;font-size: 0.45333rem;color: #fff}

.select-wrapper {position: relative; overflow: hidden; padding: 0.53333rem .4rem;}
.select-wrapper .select-ttl {height: 0.53333rem;line-height: 0.53333rem;padding-left: .4rem;border-left: 0.05333rem solid #000;font-size: 0.50667rem;color: #000}
.select-wrapper .car-ttl {margin: .8rem 0 .4rem; line-height: 0.6rem;font-size: 0.42667rem;color: #000}
.select-wrapper .price-wrapper {margin-bottom: 0.5333rem; padding-bottom: 0.5333rem;border-bottom: 1px solid #eee; font-size: 0.37333rem; color: #fc3036}
.select-wrapper .price-wrapper span {font-size: 0.48rem;}
.select-wrapper .color-select h4 {margin-bottom: .4rem;font-size: 0.34667rem;color: #2c2c2c}
.select-wrapper .color-select ul li {display:inline-block;margin: 0 .2rem .2rem 0;padding: .2rem .4rem;background: #f6f6f7;border-radius:0.10667rem;font-size: 0.34667rem;color: #2c2c2c}
.select-wrapper .color-select ul li.active {background: #d4a962;color: #fff}
.select-wrapper .num-wrapper {display: flex; overflow: hidden;align-items: center; justify-content: space-between; margin-top: 0.49333rem; padding-bottom: .4rem;border-bottom: 1px solid #eee;}
.select-wrapper .num-wrapper h4 { flex: 0 0 2rem;font-size: 0.37333rem;color: #000}
.select-wrapper .num-wrapper .num-select {display:flex;flex: 0 0 2rem; width: 2rem; height: 0.66667rem;}
.select-wrapper .num-wrapper .num-select span {flex: 1; text-align: center; line-height: 0.66667rem; font-size: .4rem; color: #e6b255;}
.select-wrapper .num-wrapper .num-select span.num-content {flex: 0 0 0.66667rem; border: 1px solid #e6b255;border-radius: 0.1rem; font-size: 0.37333rem; color:#2c2c2c}
.select-wrapper .btn-go {margin: .8rem auto .4rem; width: 5.33333rem; height: 1.2rem; line-height: 1.2rem; border-radius: .6rem; text-align: center; background: #d4a962; font-size: 0.45333rem; color: #fff}
.select-wrapper .btn-close {position: absolute; top:0;right:0;width: 1rem; height: 1rem;background: url('../../assets/presell_close.png') no-repeat center center; background-size: 0.32rem 0.32rem;}
</style>