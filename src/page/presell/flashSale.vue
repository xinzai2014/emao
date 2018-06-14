<template>
  <div ref="scrollWrapper" class="scroll-wrapper">
    <div class="scroll-inner" v-show="!activityEnd">
      <!--预售详情-图片滚动-->
      <swiper :circular="circular" v-if="circular.length"></swiper>
      <section class="car-parameter">
        <div class="car-price">
          <div class="price-wrapper">
            <h4 class="true-price">{{presellData.prePrice}} <span>万</span></h4>
            <h4 class="guided-price">指导价：{{presellData.guidePrice}}万 / 下 {{twoDetial(presellData.guidePrice - presellData.prePrice)}}万</h4>
          </div>
          <div class="countdown">
            <h4>距离结束还剩</h4>
            <div><span>{{entTime.day}}</span> 天 <span>{{entTime.hour}}</span> : <span>{{entTime.minutes}}</span></div> 
          </div>
        </div>
      </section>

      <section class="car-info-wrap">
      
        <div class="car-time-place">
          <p class="car-name">{{presellData.autoName}}</p>
          <ul>
            <li v-if="presellData.area !== null && presellData.area !== ''">
              <span>可售区域：</span>
              <a>{{presellData.area}}</a>
            </li>
            <li v-if="presellData.deliveryPlace">
              <span>提货地点：</span>
              <a>{{presellData.deliveryPlace}}</a>
            </li>
            <li v-if="presellData.autoColor">
              <span>车型颜色：</span>
              <a>{{presellData.autoColor}}</a>
            </li>
            <li v-if="presellData.arrivalTime">
              <span>到货日期：</span>
              <a>{{presellData.arrivalTime}}</a>
            </li>
            <li v-if="presellData.productionTime">
              <span>生产日期：</span>
              <a>{{presellData.productionTime}}</a>
            </li>
            <li v-if="presellData.remark">
              <span>备注：</span>
              <a>{{presellData.remark}}</a>
            </li>
          </ul>
        </div>
      </section>
      <section class="line"></section>
      <section class="car-presell-flow">
        <p>限时抢购</p>
        <img src="../../assets/flashSale_flow.png" alt="">
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
      <section class="line"></section>
    </div>
    <section class="car-reserve-btn" v-show="!activityEnd">
      <div v-if="presellData.endTime != '' " class="car-presell-present" @click="presellReserve">立即领取200元代金券</div>
      <div v-else class="car-presell-present-disabled">立即领取200元代金券</div>
    </section>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    <!-- 弹窗 -->
    <section class="popup-call" v-show="showPopupTel" data-around="false" @click="popupAround">
      <div class="popup-content">
        <div class="single"></div>
        <!-- 注册内容 -->
        <div class="register-wrapper" v-show="popupShowWhich === 'register'">
          <h4 class="ttl">今日注册得<span>200元购车券</span></h4>
          <div class="input-tel">
            <input type="number" class="tel" v-model="telVal" placeholder="请输入手机号">
            <span class="getCode" @click="getCode" :class="{'sended': hasSendCode}">{{getCodeText}}</span>
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
          <div class="btn-goApp" @click="downloadApp">前往APP</div>
        </div>
      </div>  
    </section> 
  </div>
   
</template>

<script>
  import swiper from '../../components/common/swiper/swiper'
  import alertTip from '../../components/common/alertTip/alertTip';
  import BScroll from 'better-scroll'
  import md5 from 'js-md5';
  
  export default{
    name:'presellDetails',
    data(){
      return {
        circular: [],
        entTime: {
          day: 0,
          hour: 0,
          minutes: 0
        },
        animate:false,  //是否运动
        presellData: {},  //页面数据
        showHeadStatus:false,  //是否显示头部
        showAlert:false,  //是否显示弹提示
        alertText:null,   //弹窗提示信息
        showPopupTel: false,// 是否显示弹窗
        getCodeText: '获取验证码',
        popupShowWhich: 'register', // register注册弹窗，success注册成功弹窗
        hasSendCode: false, // 是否已经发送信息
        codeVal: '', // 验证码
        telVal: '', // 电话号码
        activityEnd: false // 活动结束
      }
    },
    created (){
      this.getPresellDetails();
    },
    methods:{
      // 点击弹窗周围，弹窗消失
      popupAround (e) {
        if (e.target.getAttribute('data-around') === 'false') {
          this.showPopupTel = false
        }
      },
      // 点击获取验证码
      getCode () {
        let _this = this;
        if (this.telVal == '') {
          this.initAlert('请填写正确的电话号码', true);
          return
        }
        if (!/^\d{11}$/g.test(this.telVal)) {
          this.initAlert('电话号码为11位数字', true);
          return
        }
        
        if (this.hasSendCode) { return; }
        this.$axios({
          url: 'https://tcmapi.emao.com/withoutAuth/message/verify',
          type: 'GET',
          params: {
            phone: _this.telVal,
            invite: _this.$route.query.invite,
            invitees: _this.$route.query.invitees
          }
        })
        .then((res) => {
          _this.sourceData = res.data.data;
          this.initAlert('获取成功，请稍等', true);
          this.hasSendCode = true;
          _this.timer();
        })
        .catch((err) => {
          console.log("车源数据请求失败", err);
        })
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
      // 计时器
      timer () {
        let time = 60;
        let _this = this;
        this.time = setInterval(() => {
          if (time < 1) {
            clearInterval(_this.time);
            _this.getCodeText = '获取验证码';
            _this.hasSendCode = false;
            time = 60;
            return;
          }
          _this.getCodeText = `${time}s后重新获取`;
          time--;
        }, 1000)
      },
      /*立即预定*/
      presellReserve(){
        if (this.presellData.preStockNum == '0') {
          this.initAlert("抱歉，车辆已售罄", true);
          return false;
        }
        this.showPopupTel = true;
        this.popupShowWhich = 'register';
        this.codeVal = '';
        this.telVal = '';
      },
      //获取数据
      getPresellDetails(){
        let _this = this;
        this.$axios({
          url:'https://tcmapi.emao.com/withoutAuth/preSale/detail',
          methods:'GET',
          params:{
            id : _this.$route.query.id,
            invite: _this.$route.query.invite,
            invitees: _this.$route.query.invitees
          }
        }).then((response) => {
          let data = response.data.data;
          _this.presellData = data;
          _this.circular = data.circular;
          _this.entTime.day = data.entTime.day;
          _this.entTime.hour = data.entTime.hour;
          _this.entTime.minutes = data.entTime.minutes;
          console.log("response", data);
        })
        .catch((err) => {
          let data = err.response.data;
          _this.$store.dispatch("AJAX_LOADING", false)
          if (data.code === 404) {
            _this.initAlert('活动已结束', true);
            _this.activityEnd = true;
          }
        })
      },
      // 注册alert
      initAlert (content, open) {
        this.showAlert = open;  //是否显示弹窗
        this.alertText = content   //弹窗提示信息
      },
      // 前往下载
      downloadApp () {
        window.location.href = `https://m.emao.com/csm.html?invite=${this.$route.query.invite}&invitees=${this.$route.query.invitees}`
      },
      initScroll () {
        let _this = this;
        this.sourceScroll = new BScroll(_this.$refs.scrollWrapper, {
          probeType: 3,
          click: true
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
      }
    },
    mounted(){
      let _this = this
      
      this.$nextTick(() => {
        _this.initScroll();
      })

    },
    updated () {
      this.sourceScroll.refresh();
    },
    components:{
      swiper,
      alertTip
    }
  }
</script>

<style>
  /* body {
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  } */
  input{
    -webkit-appearance: none;
    outline: none;
  }
  .scroll-wrapper {position: relative; width: 100%; height: 100vh;}
  .scroll-inner {padding-bottom: 4rem}
  .line {width: 100%;height: 0.4rem;background: #f1f1f1;}
  .car-info-wrap{ padding:0 .4rem .4rem; background: #fff;}
  .car-parameter{overflow: hidden;padding: 0 .4rem;background: url('../../assets/flashSale_bg.jpg') no-repeat;background-size: 100% 100%;}
  .car-time-place .car-name { margin: 0 -.4rem .5rem; padding: 0 .4rem;font-size:.4rem; font-weight:bold; color:#000; line-height:1.26667rem; border-bottom: 1px solid #e0e0e0;
    background: -moz-linear-gradient(top, #ffc8b7 0%, #ffffff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffc8b7), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top, #ffc8b7 0%,#ffffff 100%);
    background: -o-linear-gradient(top, #ffc8b7 0%,#ffffff 100%);
    background: -ms-linear-gradient(top, #ffc8b7 0%,#ffffff 100%);
    background: linear-gradient(to bottom, #ffc8b7 0%,#ffffff 100%);
  }
  .car-price{position:relative;display: flex; display: -webkit-flex; color: #fff; align-items: center;height: 1.80667rem;}
  .car-price .price-wrapper {flex: 1;font-size: 0.34667rem;}
  .car-price .price-wrapper .true-price {margin-bottom: .16rem;font-size: 0.58667rem;}
  .car-price .price-wrapper .true-price span{font-size: 0.34667rem;}
  .car-price .countdown {flex: 0 0 2.26rem;}
  .car-price .countdown span {margin-top: .15rem;display: inline-block;width: 0.42667rem;line-height:0.42667rem;text-align:center;background: #fff;border-radius: .1rem;color: #fc3036}

  .car-time-place ul li{margin-bottom:.267rem;}
  .car-time-place ul li span{font-size:.346667rem;color:#999;}
  .car-time-place ul li a{font-size:.32rem;color:#333;}

  .car-share{text-align:center;}
  .car-share img{width:7.147rem;height:1.68rem;}
  .car-batch-count{text-align:center;color:#2c2c2c;font-size:.32rem;}
  .car-presell-flow{margin-top:.4rem;padding-top:.533rem;padding-bottom:.533rem;text-align:center;background-color:#fff;}
  .car-presell-flow p{font-size:.45333rem;color:#000;text-align:center;}
  .car-presell-flow img{width:7.707rem;height:1.88rem;margin-top:.867rem;}
  .car-presell-explain{margin-top:0.267rem;padding:.533rem;background-color:#fff; border-top: .2rem solid #f1f1f1;}
  .presell-explain-title{margin-bottom:.6rem;font-size:.45333rem;color:#000;text-align:center;}
  .presell-explain-con li{position:relative;margin-left:.6rem;margin-bottom:.267rem;color:#999;font-size:.4rem;line-height:.6rem;}
  .presell-explain-con li span{position:absolute;left:-.6rem;}
  .car-reserve-btn{position: fixed;left:0;right:0;bottom:0;width:100%;margin:0 auto;background-color:#fff;line-height:1.867rem;text-align:center;border-top: 1px solid #f1f1f1;}
  .car-reserve-btn .car-presell-present{display:inline-block;width:6.667rem;height:1.1733rem;margin:0 auto;text-align:center;line-height:1.17333rem;font-size:.4rem;color:#fff;border:none;border-radius:.5867rem;background-color:#d5aa5c;}
  .car-reserve-btn .car-presell-present-disabled{display:inline-block;width:6.667rem;height:1.1733rem;margin:0 auto;text-align:center;line-height:1.17333rem;font-size:.4rem;color:#999;border:none;border-radius:.5867rem;background-color:#e6e6e6;}
  .anim{transition: all 0.5s;margin-top: -.4rem;}

  .popup-call {position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 10; background: rgba(0, 0, 0, 0.5);}
  .popup-content {overflow: hidden;position: fixed; top: 50%; left: 0.4rem; right: 0.4rem; background: #fff; border-radius: 0.13333rem; overflow: hidden; transform: translateY(-50%);min-height: 7rem;background: #fff url('../../assets/flashSale_alert_bg.jpg') no-repeat;background-size:100% auto}
  .popup-content .single {margin: 0.53333rem auto;width: 2.53333rem;height: 0.8rem;background: url('../../assets/flashSale_single.jpg') no-repeat;background-size:100% auto}
  .popup-content .register-wrapper .ttl{margin: 0.4rem auto 0.9333rem;font-size: 0.53333rem;color: #d5aa5c;text-align: center}
  .popup-content .register-wrapper .ttl span {color: #ff5825}
  .popup-content .register-wrapper .input-tel {margin: auto;width: 7.6rem;display: flex;font-size: 0.32rem}
  .popup-content .register-wrapper .input-tel .tel {flex: 1;padding: 0 .3rem; line-height: 0.5rem;border: 1px solid #d5aa5c; border-right: none;}
  .popup-content .register-wrapper .input-tel .getCode {flex: 0 0 2.30667rem;height: 1.17333rem;border:1px solid #d5aa5c;background: #d5aa5c;text-align: center;line-height: 1.17333rem;color:#fff}
  .popup-content .register-wrapper .input-tel .sended {background: #e6e6e6; border: 1px solid #e6e6e6;}
  .popup-content .register-wrapper .input-code { margin: 0.4rem auto 1.2rem;width: 7.6rem;height: 1.17333rem;}
  .popup-content .register-wrapper .input-code input {padding: 0 .4rem;width: 100%; height: 1.2rem; line-height: 0.5rem; border: 1px solid #999;}
  .popup-content .register-wrapper .btn-register {margin: 0 auto .8rem;width: 6.66667rem;line-height: 1.2rem;background: #d5aa5c; border-radius: .6rem;text-align: center;font-size: 0.45333rem;color: #fff}
  .popup-content .register-success-wrapper .ttl {text-align: center;font-size: 0.64rem;color: #ff5825;}
  .popup-content .register-success-wrapper .desc {margin: .53333rem auto 1.2rem;text-align: center;font-size: 0.4rem;color: #2c2c2c;}
  .popup-content .register-success-wrapper .btn-goApp {margin: 0 auto .8rem;width: 6.66667rem;line-height: 1.2rem;background: #d5aa5c; border-radius: .6rem;text-align: center;font-size: 0.45333rem;color: #fff}
</style>
