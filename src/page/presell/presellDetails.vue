<template>
    <div>
        <header class="user-tit declare-head" v-if="showHeadStatus">
            <span class="white-lt" @click="goToIndex"></span>
            限时抢购
            <em>分享</em>
        </header>
        <!--预售详情-图片滚动-->
        <swiper :circular="circular" v-if="circular.length"></swiper>
        <section class="car-parameter">
            <div class="car-price">
                <div class="price-wrapper">
                <h4 class="true-price">123.00 <span>万</span></h4>
                <h4 class="guided-price">指导价：123.00万 / 下 123.00万</h4>
                </div>
                <div class="countdown">
                <h4>距离结束还剩</h4>
                <div><span>00</span> 天 <span>00</span> : <span>00</span></div> 
                </div>
            </div>
        </section>
        <section class="car-info-wrap">
            <div class="car-time-place">
                <div class="car-name">
                    <h4 class="name-content">名字名字字</h4>
                    <div class="set-warning">
                        <div class="btn-warning actived">
                            <span class="icon-warning"></span>
                            <span class="text-warning">提醒我</span>
                        </div>
                        <h4 class="desc-warning">12人已提醒</h4>
                    </div>
                </div>
                <ul>
                    <li>
                        <span>可售范围：</span>
                        <em>{{presellData.area}}</em>
                    </li>
                    <li>
                        <span>到货时间：</span>
                        <em>{{presellData.arrivalTime}}</em>
                    </li>
                    <li>
                        <span>提货地点：</span>
                         <em>{{presellData.deliveryPlace}}</em>
                        <!--<em>广州</em>-->
                    </li>
                    <li>
                        <span>车型颜色：</span>
                        <em>{{presellData.autoColor}}</em>
                    </li>
                    <li>
                        <span>生产日期：</span>
                        <em>{{presellData.productionTime}}</em>
                    </li>
                </ul>
                <div class="car-reserve" v-if="preSaleData.type == '2' ">
                    <p class="car-reserve-title">同省订购每满12台，即可享受发车到省</p>
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

                    <p class="car-share"><img src="../../assets/presell-share.png" alt="" @click="shareToWeichat"></p>
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
                <li>
                    <span>1、</span>
                    限时抢购车源，为一猫采购的限时限量畅销车源；
                </li>
                <li>
                    <span>2、</span>
                    支付定金可锁定车源，车辆入库后补齐尾款，前往指定地点提车；
                </li>
                <li>
                    <span>3、</span>
                    定金可抵扣车款；
                </li>
                <li>
                    <span>4、</span>
                    因经销商原因，导致交易无法继续，定金将不予退还；
                </li>
                <li>
                    <span>5、</span>
                    一猫原因造成车辆延迟交付，一猫退回定金并赔付 500 元代金券；
                </li>
                <li>
                    <span>6、</span>
                    开票及申请合格证流程，与其他零售车型一致；
                </li>
                <li>
                    <span>7、</span>
                    如有疑问可咨询渠道支持，或联系客服 400-825-2368。
                </li>
            </ul>
        </section>

        <section class="car-reserve-btn">
            <input v-if="presellData.endTime != '' " class="car-presell-present" type="button" name="立即预定" value="立即预定" @click="presellReserve"/>
            <input v-else class="car-presell-present-disabled" type="button" name="立即预定" value="立即预定" disabled/>
        </section>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <popup
            class="registerPopup"
            :showPopup="registerpopupState" 
            :contentStyleObj="{
                borderRadius: '.13333rem',
            }"
            position="center">
            <div class="single"></div>
            <!-- 注册内容 -->
            <div class="register-wrapper" v-show="popupShowWhich === 'register'">
                <h4 class="ttl">今日注册得<span>200元购车券</span></h4>
                <div class="input-tel">
                    <input type="number" class="tel" v-model="telVal" placeholder="请输入手机号">
                    <verification-code
                        :time = "60"
                        :options="{
                            url: 'https://tcmapi.emao.com/withoutAuth/message/verify',
                            params: codeParams
                        }"
                        :initStyleObj="{
                            background: '#d5aa5c',
                            textAlign: 'center',
                            lineHeight: '1.17333rem',
                            color: '#fff'
                        }"
                        :activeStyleObj="{
                            background: '#e6e6e6d',
                        }"></verification-code> 
                </div>
                <div class="input-code">
                    <input type="number" class="code" v-model="codeVal" placeholder="请输入验证码">
                </div>
                <div class="btn-register" @click="registerFun">立即领取</div>
            </div>
            <!-- 注册成功内容 -->
            <div class="register-success-wrapper" v-show="popupShowWhich === 'success'">
                <h4 class="ttl">恭喜您获得200元购车券</h4>
                <h4 class="desc">宝骏510库存有限，前往车商猫APP立即抢购</h4>
                <div class="btn-goApp">前往APP</div>
            </div>   
        </popup>
        <popup 
            :showPopup="buyPopupState" 
            :contentStyleObj="{
                background: '#fff'
            }"
            position="bottom">
            11111
            <br>
            11111    
        </popup>
    </div>
</template>


<script>
import swiper from "../../components/common/swiper/swiper";
import alertTip from "../../components/common/alertTip/alertTip";
import Popup from "../../components/common/popup/popup.vue";
import VerificationCode from '../../components/common/verificationCode/verificationCode.vue'; 


export default {
  name: "presellDetails",
  data() {
    return {
      registerpopupState: true, // 注册弹窗
      buyPopupState: false, // 购买弹窗状态  
      circular: [], //轮播图数据
      animate: false, //是否运动
      presellData: {}, //页面数据
      preSaleData: {}, //预售信息
      showHeadStatus: false, //是否显示头部
      showAlert: false, //是否显示弹窗
      alertText: null, //弹窗提示信息
      popupShowWhich: 'register', // 显示哪个弹窗，register和success
      codeVal: '', // 验证码
      telVal: '', // 电话号码
    };
  },
  computed: {
      codeParams () {
          return {
              phone: this.telVal
          }
      }
  },
  created() {
    /*文字滚动效果*/
    // setInterval(this.scroll, 2000);
  },
  methods: {
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
    //向导航条上添加分享按钮
    addShareButton() {
      var obj = {
        actionname: "addShareButton", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
        actionid: "messageId", //回调 ID：可选参数，与回调函数配套使用
        //callback:callback,//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
        buttonTitle: "分享", //分享按钮的标题；可选参数，与 buttonImage 二选一
        //buttonImage:"url",//分享按钮的图片地址；可选参数，与 buttonTitle 二选一；若没有该参数，或者 image 的地址为空，则使用 buttonTitle。若有此参数则优先使用该参数
        title: window.presellModel + "【抢购：" + window.presellPrice + "万】",
        subTitle:
          window.deliveryPlace + "提车，车商猫爆款限量抢购，还不抓紧上车！",
        imgUrl: "https://zt.m.emao.com/img/shareApp.png",
        url: "http://url.cn/5Ne6oti" //要分享内容的 url
      };
      this.tcmApp(obj);
    },
    //向社交媒体分享信息
    shareMessage() {
      var obj = {
        actionname: "shareMessage", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
        actionid: "messageId", //回调 ID：可选参数，与回调函数配套使用
        //callback:callback,//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
        toSNS: "weichat", //社交媒体参数，只有三个选项：weichat（微信），wcircle（微信朋友圈），qq
        title: window.presellModel + "【抢购：" + window.presellPrice + "万】",
        subTitle:
          window.deliveryPlace + "提车，车商猫爆款限量抢购，还不抓紧上车！",
        imgUrl: "https://zt.m.emao.com/img/shareApp.png",
        url: "http://url.cn/5Ne6oti" //要分享内容的 url
      };
      this.tcmApp(obj);
    },
    //用 JS 函数在新窗口打开指定链接
    windowOpen() {
      var obj = {
        actionname: "windowOpen", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
        url: window.location.origin + "/#/presell/presellReserve/" + window.id // 要打开的链接
      };
      this.tcmApp(obj);
    },
    /*判断是否是App*/
    isTcmApp() {
      // return navigator.userAgent.indexOf("tcm") !== -1;
      if (
        typeof this.$route.query.token == "undefined" ||
        this.$route.query.token == ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    /*区分app与wap做不同的渲染*/
    renderDom() {
      if (this.isTcmApp()) {
        document.title = "限时抢购";
        this.showHeadStatus = false;
        //setTimeout(this.addShareButton,1500);
      } else {
        this.showHeadStatus = true;
      }
    },
    /*返回首页*/
    goToIndex() {
      this.$router.push("/index");
    },
    /*页面分享到微信*/
    shareToWeichat() {
      this.shareMessage();
    },
    /*立即预定*/
    presellReserve() {
      if (this.presellData.preStockNum == "0") {
        this.showAlert = true;
        this.alertText = "抱歉，车辆已售罄";
        return false;
      }
      if (this.isTcmApp()) {
        //var id = this.$route.params.id;
        window.id = this.$route.params.id;
        //window.open("/#/presell/presellReserve/" + id,'_blank');
        this.windowOpen();
      } else {
        var id = this.$route.params.id;
        this.$router.push("/presell/presellReserve/" + id);
        this.$store.dispatch("PRESELL_FLAG", {
          tag: "presellDetails",
          id: id
        });
      }
    },
    //获取数据
    getPresellDetails() {
      var dataToken = sessionStorage.token;
      var data = {
        token: dataToken,
        id: this.$route.params.id
      };
      this.$http({
        url: "preSale/detail",
        methods: "GET",
        params: data
      }).then(function(response) {
        this.presellData = response.body.data;
        this.circular = response.body.data.circular;
        this.preSaleData = response.body.data.preSale;
        this.presellModel = response.body.data.autoName;
        this.presellPrice = response.body.data.prePrice;
        window.presellModel = response.body.data.autoName;
        window.presellPrice = response.body.data.prePrice;
        window.deliveryPlace = this.presellData.deliveryPlace;
        localStorage.setItem("deliveryPlace", response.body.data.deliveryPlace);
        this.addShareButton();
      });
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
        if (this.codeVal === '') {
            this.initAlert('验证码不能为空哟！', true);
            return
        }
        if (!/^\d{6}$/g.test(this.codeVal)) {
            this.initAlert('验证码为6为数字', true);
            return
        }
        this.$axios({
            url: 'https://tcmapi.emao.com/withoutAuth/passport/register',
            type: 'GET',
            params: {
            phone: _this.telVal,
            code: md5(_this.codeVal),
            invite: _this.$route.query.invite,
            invitees: _this.$route.query.invitees
            }
        })
        .then((res) => {
            _this.initAlert('领取成功，请稍等', true);
            _this.popupShowWhich = 'success';
        })
        .catch((err) => {
            let data = err.response.data;
            _this.initAlert(data.msg, true);
            _this.$store.dispatch("AJAX_LOADING", false)
            if (data.code === 400) {
            _this.showPopupTel = false
            }
        })
    },
  },
  mounted() {
    if (!sessionStorage.token) {
      sessionStorage.token = this.$route.query.token;
    }
    this.getPresellDetails();
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
.user-tit {font-weight: normal;}
.declare-head {position: relative;}
.declare-head em { position: absolute;right: 0.4rem;color: #d5aa5c;}
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
.car-price .countdown span {margin-top: .15rem;display: inline-block;width: 0.42667rem;line-height:0.42667rem;text-align:center;background: #fff;border-radius: .1rem;color: #fc3036}

.car-count-down {position: absolute;top: 0;right: -0.4rem;padding: 0.1333rem 0.4rem;color: #fff;border-top-left-radius: 0.667rem;border-bottom-left-radius: 0.667rem;background-color: #fc3238;}
.car-count-down span {display: block;}
.car-count-down span:nth-of-type(2) {font-size: 0.3467rem;font-weight: bold;}
.car-time-place ul li {margin-bottom: 0.267rem;}
.car-time-place ul li span {font-size: 0.32rem;color: #999;}
.car-time-place ul li em {font-size: 0.32rem;color: #333;}
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
.car-presell-flow p {font-size: 0.372rem;color: #000;text-align: center;}
.car-presell-flow img {width: 7.707rem;height: 1.88rem;margin-top: 0.867rem;}
.car-presell-explain {margin-top: 0.4rem;margin-bottom: 1.4rem;padding: 0.533rem;background-color: #fff;}
.presell-explain-title {margin-bottom: 0.6rem;font-size: 0.3467rem;color: #000;text-align: center}
.presell-explain-con li {position: relative;margin-left: 0.6rem;margin-bottom: 0.267rem;color: #999;font-size: 0.4rem;line-height: 0.533rem;}
.presell-explain-con li span {position: absolute;left: -0.6rem;}
.car-reserve-btn {display: inline-block;position: fixed;bottom: 0;left: 0; height: 1.867rem;width: 100%;margin: 0 auto;background-color: #fff;line-height: 1.867rem;text-align: center;border-top: 1px solid #e7e7e7;}
.car-reserve-btn .car-presell-present {display: inline-block;width: 6.667rem;height: 1.1733rem;margin: 0 auto;text-align: center;line-height: 1.17333rem;font-size: 0.4rem;color: #fff;border: none;border-radius: 0.5867rem;background-color: #d5aa5c;}
.car-reserve-btn .car-presell-present-disabled {display: inline-block;width: 6.667rem;height: 1.1733rem;margin: 0 auto;text-align: center;line-height: 1.17333rem;font-size: 0.4rem;color: #999;border: none;border-radius: 0.5867rem;background-color: #e6e6e6;}

.anim {transition: all 0.5s;margin-top: -0.4rem;}

.registerPopup .single {margin: 0.53333rem auto;width: 2.53333rem;height: 0.8rem;background: url('../../assets/flashSale_single.jpg') no-repeat;background-size:100% auto}
.registerPopup .register-wrapper .ttl{margin: 0.4rem auto 0.9333rem;font-size: 0.53333rem;color: #d5aa5c;text-align: center}
.registerPopup .register-wrapper .ttl span {color: #ff5825}
.registerPopup .register-wrapper .input-tel {margin: auto;width: 7.6rem;display: flex;font-size: 0.32rem}
.registerPopup .register-wrapper .input-tel .tel {flex: 1;padding: 0 .3rem; line-height: 0.5rem;border: 1px solid #d5aa5c; border-right: none;}
.registerPopup .register-wrapper .input-tel .getCode {flex: 0 0 2.30667rem;height: 1.17333rem;border:1px solid #d5aa5c;background: #d5aa5c;text-align: center;line-height: 1.17333rem;color:#fff}
.registerPopup .register-wrapper .input-tel .sended {background: #e6e6e6; border: 1px solid #e6e6e6;}
.registerPopup .register-wrapper .input-code { margin: 0.4rem auto 1.2rem;width: 7.6rem;height: 1.17333rem;}
.registerPopup .register-wrapper .input-code input {padding: 0 .4rem;width: 6.8rem; height: 1.2rem; line-height: 0.5rem; border: 1px solid #999;}
.registerPopup .register-wrapper .btn-register {margin: 0 auto .8rem;width: 6.66667rem;line-height: 1.2rem;background: #d5aa5c; border-radius: .6rem;text-align: center;font-size: 0.45333rem;color: #fff}
.registerPopup .register-success-wrapper .ttl {text-align: center;font-size: 0.64rem;color: #ff5825;}
.registerPopup .register-success-wrapper .desc {margin: .53333rem auto 1.2rem;text-align: center;font-size: 0.4rem;color: #2c2c2c;}
.registerPopup .register-success-wrapper .btn-goApp {margin: 0 auto .8rem;width: 6.66667rem;line-height: 1.2rem;background: #d5aa5c; border-radius: .6rem;text-align: center;font-size: 0.45333rem;color: #fff}
</style>