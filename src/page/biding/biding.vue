<template>
  <div class="biding" v-if="bidderId">
    <!-- 轮播图部分 -->
    <section>
      <swiper :circular="circular" v-if="circular.length"></swiper>
    </section>

    <!-- 小喇叭模块 -->
    <section>
      <div :class="{notice:broadcast}" v-if="broadcast">
        <p class="message">
            <img src="./images/notice.png" alt="">
            <span>{{broadcast}}</span>
        </p>
      </div>
    </section>

    <!-- 竞拍提醒 -->
    <div class="biding-tip" :class="{bidingTipActive: bidderStatus=='3',bidingTipOver:bidderStatus=='4'}" >
      <span class="text">{{bidingTipText}}</span>
      <span class="time">
        <span v-if="bidderStatus==='2'">距开拍&nbsp;&nbsp;</span>{{bidingTipTime}}</span>
    </div>

    <!-- 车辆信息 -->
    <section class="infom">
      <div class="infom-left">
        <div class="infom-up">
          <div class="type">{{autoName}}</div>
        </div>
        <div class="infom-mid">
          <span class="b-price">{{current_price}}：{{currentPrice}}万</span>
          <span class="g-price">指导价：{{guidePrice}}万</span>
        </div>
        <div class="infom-down">
          <span class="apply">{{enrolment}}人报名</span>
          <span> | </span>
          <span class="remind">{{settingRemind}}人设置提醒</span>
        </div>
      </div>
      <div v-if="isClockShow&&isTcmApp&&bidderStatus!=='4'" class="infom-right" @click="setClock">
        <img src="./images/clock.png" alt="设置提醒">
        <span class="clock">{{clockText}}</span>
      </div>

    </section>
    <!-- 具体参数 -->
    <section class="car-data">
      <ul>
        <li class="car-num">
          <span class="left">台 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 数 :</span>
          <span class="right">{{platformNum}}</span>
        </li>
        <li class="car-money">
          <span class="left">保&nbsp;&nbsp;证&nbsp;金：</span>
          <span class="right">￥{{deposit}}</span>
        </li>
        <li class="car-range">
          <span class="left">可售范围 :</span>
          <span class="right">{{saleArea}}</span>
        </li>
        <li class="car-place">
          <span class="left">提车地点 :</span>
          <span class="right">{{packUpPlace}}</span>
        </li>
        <li class="car-date">
          <span class="left">生产日期 :</span>
          <span class="right">{{produceTime}}</span>
        </li>
        <li>
          <span class="left">车身颜色 :</span>
          <span class="right">{{carColor}}</span>
        </li>
      </ul>
    </section>
    <!-- 竞拍记录 -->
    <section class="record" v-if="this.bidderRecord.length&&this.bidderStatus!==1&&this.bidderStatus!==2">
      <div id="record">
        <p class="record_title">
            <span class="title_left">竞拍记录</span>
            <span class="title_more" @click="recordlist(6)"  v-if="this.isTcmApp">查看更多 ></span>
        </p>
        <div class="record_list">
            <div class="list_title">
                <p>状态</p>
                <p>竞拍用户</p>
                <p>竞拍价</p>
                <p>时间</p>
            </div>
            <div class="list_cont" v-for="(item, index) in bidderRecord" :key="index" :style="{'color': index==0? 'red':'#000'}">
                <p>{{item.temporaryState}}</p>
                <p>{{item.bidders}}</p>
                <p>{{item.bidderPrice}}</p>
                <p>{{item.bidderTime}}</p>
            </div>
        </div>
      </div>
    </section>
    <!-- 竞拍流程 -->
    <section class="process">
      <div class="process-text">
        <span>|</span>
        <span>竞拍流程</span>
      </div>

      <img src="./images/record.png" alt="">
    </section>
    <!-- 保证金规则 -->
    <section class="rulebond">
      <Rulebond></Rulebond>
    </section>
    <!-- 商品介绍 -->
    <section class="product" v-if="shopInfo.length">
      <div class="product-text">
        <span>|</span>
        <span>商品介绍</span>
      </div>
      <ul>
        <li v-for="(item,index) in shopInfo" :key="index">
            <img :src="item" alt=""  @click="picView(item)">
        </li>
      </ul>
    </section>
    <!-- 底部按钮 -->
    <div class="bottom-btn" :class="{btnDisable:isBtnDisable}" @click="btnClick">
      {{bottomBtnText}}
    </div>
    <!-- 出价弹窗 -->
    <popup :showPopup="popupState" :clickAroundHide="true" :contentStyleObj="{
                background: '#fff',
            }" position="bottom" @changePopupState="changePopupState">
      <div class="popup-container">
        <div class="close-icon" @click="closePopup"></div>
        <div class="current-price">
          <span>当前价：
            <span class="price-num">{{this.currentPrice}}</span>
          </span>
          <font>万</font>
        </div>
        <div class="change-price">
          <div class="c-p-title">加价幅度</div>
          <div class="c-p-box">
            <span class="subtract-icon" @click="subtractPrice"></span>
            <span class="add-range">{{myAddPrice}}</span>
            <span class="add-icon" @click="addPrice"></span>
          </div>
        </div>
        <div class="popup-btn" @click="bidingHandle">
          立即出价
        </div>
      </div>
    </popup>

    <!-- 出价提示弹窗 -->
    <popup :showPopup="popupStatePrice" :clickAroundHide="true" :contentStyleObj="{
                background: '#fff',
                borderRadius: '0.13333rem'
            }" position="center" @changePopupState="changePopupStatePrice">
      <div class="pricePopupContent">
        <h2>出价失败</h2>
        <h4>{{bidingErrorText}}</h4>
        <div class="iKnow" @click="iKnowHandle">我知道了</div>
      </div>
    </popup>
    <!-- 前往下载 -->
    <popup class="" :showPopup="download_pup"  :clickAroundHide="true" :contentStyleObj="{
                    background:'white',
                    width: '8.5rem',
                    backgroundSize: '100% auto',
                    borderRadius: '.13333rem',
                    height:'6rem'
                }"
                @changePopupState="downState"
                position="center">
                <div class="download">
                  <div class="close-icon close-download" @click="closeDownload"></div>
                  <img src="./images/app.png" alt="">
                  <div class="download_text">请下载车商猫APP参与竞拍，即刻下载还可获得购车红包</div>
                  <div class="btn-goApp" @click="downloadApp">立即下载</div>
                </div>            
            </popup>
            <!-- 查看大图 -->
            <pic-view v-show="showBigImg" @closeTip="showBigImg = false" :bigImg="bigImg"></pic-view>
  </div>
</template>
<script>
import Vue from 'vue';
//引入查看大图组件
import picView from '../../components/common/picView/picView'
//引入弹窗
import Popup from "../../components/common/popup/popup.vue";
import alertTip from "../../components/common/alertTip/alertTip";
// 引入保证金规则模块
import Rulebond from "./rulebond.vue";
//引入倒计时
import { timeCountdown, numberCountdown } from "../../common/js/countdown.js";
import swiper from "../../components/common/swiper/swiper";
import share from '../../common/js/shareOnly.js';
export default {
  name: "biding",
  data() {
    return {
      current_price:'当前价',
      broadcast: '', //广播数据
      sowingMap: [], //轮播图
      autoName: "", //车型全称
      currentPrice: "", //当前价格
      guidePrice: "", //指导价格
      enrolment: "", //报名人数
      settingRemind: "", //设置闹钟人数
      platformNum: "", //台数
      deposit: "", //定金
      increasePrice: "", //加价幅度
      saleArea: "", //可售范围
      packUpPlace: "", //提车地点
      produceTime: "", //生产日期
      carColor: "", //车型颜色
      shopInfo: [], //商品详情
      circular: [], //轮播图数据
      bidingTipText: "正在竞拍",
      bidingTipTime: "",
      bottomBtnText: "交保证金报名",
      bidderStatus: "", //活动状态:1-未开始(>24h);2-未开始(<24h);3-进行中;4-已结束
      startTime: "", //活动开始时间;
      endTime: "", //活动结束时间;
      timeStr: "", //活动开始时间(bidderId=1时显示);
      remindStatus: "", //闹钟状态(只有bidderStatus=1时显示):1-未设置 2:已设置
      isBtnDisable: false,
      popupState: false,
      increasePrice: "", //加价幅度
      myAddPrice: '', //出价金额
      isClockShow: true,
      clockText: "设置提醒",
      bidderMoney: '',
      bidderId: '',
      bidderRecord: [],
      shareInfo: [],
      depositStatus: "", //定金状态:1-已付; 2-未付
      popupStatePrice: false,
      bidingErrorText: "竞拍已结束，关注一下其他场次吧",
      list: [],  // 竞拍记录5条数据列表
      uniqId:'',
      download_pup:false,
      bigImg:'',
      showBigImg:false,
      endnum:0,
      shareData:{}//二次分享参数
    };
  },
  computed: {
    // 判断是否是APP
    isTcmApp() {
      if (
        typeof this.$route.query.token == "undefined" ||
        this.$route.query.token == ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    picView(src){
      this.bigImg=src;
      this.showBigImg=true;
    },
    //获取数据
    getdata() {
      if (this.isTcmApp) {
        let params = {
          token: this.$route.query.token,
          bidderId: this.$route.query.bidderId
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/privateBidderDetail",
          method: "GET",
          params: params
        })
          .then(function(response) {
           let data = response.body.data;
           this.assignment(data)
           this.getrecordlist();
           this.setClockUI();
           this.setBidingTip();
           this.setBottomBtn();
           this.addShareButton();
          })
          .catch(error => {
            
            this.tost(error.body.msg);
          });
      } else {
        let params = {
          bidderId: this.$route.query.bidderId
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/bidderDetail",
          method: "GET",
          params: params
        })
          .then(function(response) {
      
            let data = response.body.data;
            this.assignment(data);
            share(this.shareData);         
            this.getrecordlist();
            this.setClockUI();
            this.setBidingTip();
            this.setBottomBtn();

          })
          .catch(error => {

          });
      }
    },
    //data赋值
    assignment(data){
           if (data) {
      
        this.sowingMap = data.sowingMap; //轮播图
        if(this.sowingMap.length){
          for (var i = 0; i < this.sowingMap.length; i++) {
          this.circular[i] = {
            id: i,
            imgUrl: this.sowingMap[i]
          };
        }  
        }else{
          this.circular=[{id:1}];
          this.circular[0].imgUrl=require('./images/holder.png');
        }
         
        this.bidderId = data.bidderId;
        this.bidderStatus = data.bidderStatus;
        this.depositStatus = data.depositStatus;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.timeStr = data.timeStr;
        this.remindStatus = data.remindStatus;
        this.bidderRecord = data.bidderRecord; //竞拍记录

        this.autoName = data.autoName;
        this.currentPrice = data.currentPrice;
        this.guidePrice = Number(data.guidePrice);
        this.enrolment = data.enrolment;
        this.settingRemind = data.settingRemind;
        this.platformNum = data.platformNum;
        this.deposit = data.deposit;
        this.increasePrice = Number(data.increasePrice);
        this.saleArea = data.saleArea;
        this.packUpPlace = data.packUpPlace;
        this.produceTime = data.produceTime;
        this.carColor = data.carColor;
        this.shopInfo = data.shopInfo;
        this.shareInfo = data.shareInfo;
        this.shareData = {
                title: data.shareInfo.title,
                desc: data.shareInfo.note,
                link: data.shareInfo.url,
                // imgUrl: data.shareInfo.icon
                imgUrl:"https://img.emao.net/dealer/material/nc/xt/olcb-300x300.jpg"
            };
        this.myAddPrice=Number(this.increasePrice);
        this.bidderMoney=this.deposit;
        this.uniqId=data.uniqId
      }
    },
    getEndData() {
      if (this.isTcmApp) {
        let params = {
          token: this.$route.query.token,
          bidderId: this.$route.query.bidderId,
          noLoading: true
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/privateBidderDetail",
          method: "GET",
          params: params
        })
          .then(function(response) {
           let data = response.body.data;
           this.newdata(data)
           
          })
          
      } else {
        let params = {
          bidderId: this.$route.query.bidderId,
          noLoading: true
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/bidderDetail",
          method: "GET",
          params: params
        })
          .then(function(response) {
            let data = response.body.data;
          this.newdata(data)
           
          })
          
      }
    },
    newdata(data){
       this.currentPrice=(data.currentPrice-0)>(this.currentPrice-0)?data.currentPrice:this.currentPrice;//看获取当前价是否大于页面价格
           this.bidderRecord = data.bidderRecord==[]?this.bidderRecord:data.bidderRecord;//竞拍记录  
          let len = this.bidderRecord.length
          if (len > 5) {
            this.bidderRecord = this.bidderRecord.slice(0,5)
          }
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
    /*区分app与wap做不同的渲染*/
    renderDom() {
      document.title = "竞拍";
    },
    // 获取详情页竞拍记录列表数据（进行中）
    getrecordlist(){
       let len = this.bidderRecord.length
          
          if (len > 5) {
            this.bidderRecord = this.bidderRecord.slice(0,5)
          }
      if(this.bidderStatus === '1'||this.bidderStatus === '2'||this.bidderStatus === '3'){
        // 获取广播数据
        this.getnewdata()
      } else {  
       return;
      }
    },
    getnewdata(){
      this.broadcast='';
     
      
      this.$http({
        url: 'https://tcmapi.emao.com/bidder/asynclBidderChange',
        type: 'GET',
        params: {
          bidderId: this.bidderId,
          noLoading: true
        }
      })
      .then((res)=>{
        if(this.bidderStatus!==4){
        let data = res.body
        
        this.enrolment=data.enrolment; //报名人数
        this.settingRemind=data.settingRemind;//设置闹钟人数
        
        this.currentPrice=(data.currentPrice-0)>(this.currentPrice-0)?data.currentPrice:this.currentPrice;//看获取当前价是否大于页面价格

        this.settingRemind=data.settingRemind;
        this.broadcast =data.broadcast; //广播
        // 如果活动进行时，同时获取广播数据和竞拍记录数据，竞拍记录列表数据为定时接口
        if(this.bidderStatus === '3'){
          // 清空全局记录数据,再赋值定时接口的数据
          // this.bidderRecord = []
          this.bidderRecord = data.bidderRecord==[]?this.bidderRecord:data.bidderRecord;//竞拍记录  
          let len = this.bidderRecord.length
          if (len > 5) {
            this.bidderRecord = this.bidderRecord.slice(0,5)
          }
        }
       setTimeout(this.getnewdata,1500)
         }else{
           this.broadcast =res.body.broadcast||""; //广播
         }
      })
      .catch((e)=>{
       
        if(this.bidderStatus=="4"){
          this.endnum++;
          if(this.endnum==3){
              return;
          }
        }
         setTimeout(this.getnewdata,1500)
      })
    },
    // 分享按钮添加
    addShareButton() {
      let _this = this;
      var obj = {
        actionname: "addShareButton", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
        actionid: "", //回调 ID：可选参数，与回调函数配套使用
        callback: "", //回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
        buttonTitle: "分享", //分享按钮的标题；可选参数，与 buttonImage 二选一
        buttonImage: '', //分享按钮的图片地址；可选参数，与 buttonTitle 二选一；若没有该参数，或者 image 的地址为空，则使用 buttonTitle。若有此参数则优先使用该参数
        title: this.shareInfo.title,
        subTitle: this.shareInfo.note,
        imgUrl: this.shareInfo.icon, //分享信息图片链接
        url: this.shareInfo.url, //要分享内容的 url
        shareType: "2", //此字段用于后续统计区别类型, 0:普通分享,不需要统计 1:预售分享 2:抢购
        uniqId: this.uniqId+'', //shareType为0时可空,分享统计id
        extra: this.$route.query.bidderId //分享需要的额外字段,竞拍id
      };
      this.tcmApp(obj);
    },
    
    // 设置竞拍导航
    setBidingTip() {
      
      // 活动状态:1-未开始(>24h);
      if (this.bidderStatus === "1") {
        this.bidingTipText = "即将开始";
        this.bidingTipTime = this.timeStr;
        return false;
      }
      // 2-未开始(<24h)
      if (this.bidderStatus === "2") {
        this.bidingTipText = "即将开始";
        this.bidingTipTime = "";
        let startTime = new Date(this.startTime);
        let endTime = new Date(this.endTime);
        let type = "double";
        timeCountdown(
          { startTime, endTime, type },
          update => {
            
            // 倒计时更新触发的操作写在这里
            this.bidingTipTime = `${update[2]}小时${update[3]}分${update[4]}秒`;
            if (update[0] === "ing") {
              this.bidderStatus = "3";
              this.setClockUI();
              this.setBidingTip();
              this.setBottomBtn();
            }
          },
          end => {
            // 倒计时结束触发的操作写在这里
            
          }
        );
        return false;
      }
      // 3-进行中
      if (this.bidderStatus === "3") {
        this.bidingTipText = "正在竞拍";
        this.bidingTipTime = "";
        let startTime = new Date(this.startTime);
        let endTime = new Date(this.endTime);   
        let type = "double";
        let that = this;
        timeCountdown(
          { startTime, endTime, type },
          update => {
            if (update[1] === "00" && update[2] === "00" && update[3] < 10) {
              this.isClockShow = false;
            }
            // 倒计时更新触发的操作写在这里
             if (update[1] === "00" ){
                this.bidingTipTime = `${update[2]}小时${update[3]}分${update[4]}秒结束`;
             }else{
               this.bidingTipTime = `${update[1]}天${update[2]}小时${update[3]}分${update[4]}秒结束`;
             }
            
          },
          end => {
            // 倒计时结束触发的操作写在这里
            this.bidderStatus = "4";            
            this.setBidingTip();
            this.setBottomBtn();
            //重新请求数据
            this.getEndData();
          }
        );
        return false;
      }
      // 4-已结束
      if (this.bidderStatus === "4") {
        this.bidingTipText = "已结束-拍卖成交";
        this.bidingTipTime = "";
      }
    },
    // 设置底部按钮
    setBottomBtn() {
      if(this.isTcmApp){}
      //1.竞拍未开始状态
      if (this.bidderStatus === "1" || this.bidderStatus === "2") {
        this.current_price="起拍价"
        if(this.isTcmApp){
           //是否支付保证金
        if (this.depositStatus === "1") {
          this.bottomBtnText = "已交保证金，等待开拍";
          this.isBtnDisable = true;
        } else {
          this.bottomBtnText = "交保证金报名";
          this.isBtnDisable = false;
        }
        }else{
          this.bottomBtnText = "我要参加"
        }
       
      }
      //2.竞拍进行中
      if (this.bidderStatus === "3") {
        this.current_price="当前价"
        if(this.isTcmApp){
           //是否支付保证金
        if (this.depositStatus === "1") {
          this.bottomBtnText = "我要出价";
          this.isBtnDisable = false;
        } else {
          this.bottomBtnText = "交保证金报名";
          this.isBtnDisable = false;
        }
        }else{
           this.bottomBtnText ="我要出价"
        }
       
      }
      //3.竞拍结束
      if (this.bidderStatus === "4") {
        this.current_price='成交价'
        if(this.isTcmApp){
           this.bottomBtnText = "竞拍已结束";
           this.isBtnDisable = true;
        }else{
          this.bottomBtnText ="去看看其他场次竞拍"
        }
       
      }
      
    },
    changePopupState(popupState) {
      this.popupState = popupState;
    },
    changePopupStatePrice(popupState) {
      this.setBtnClickLog(11);//出价失败弹窗
      this.popupStatePrice = popupState;
    },
    // 出价失败-我知道了
    iKnowHandle() {
      this.setBtnClickLog(10);
      this.popupStatePrice = false;
    },
    btnClick() {
      if(!this.isTcmApp){
         if (this.bidderStatus === "1" || this.bidderStatus === "2"){
           this.setBtnClickLog(17)//我要参加
         }
         if (this.bidderStatus === "3"){
           this.setBtnClickLog(2)//我要出价
         }
         if (this.bidderStatus === "4")[
            this.setBtnClickLog(18)//去看其他场次
         ]
        this.downState(true)

        return;
      }
      if (!this.isBtnDisable) {
        if (this.bottomBtnText === "交保证金报名") {
          this.setBtnClickLog(1);
          
          
          // 跳转到app交保证金页面
          /* openurl = emaotaochemao://push/ensureBidder&bidderId=xxx&bidderMoney=xxx 参数说明:bidderId: 竞拍id  bidderMoney: 竞拍保证金 */
          window.location= `emaotaochemao://push/ensureBidder?bidderId=${this.bidderId}
            &bidderMoney=${this.bidderMoney}`;
          // return false;  
        }
        if (this.bottomBtnText === "我要出价") {
          this.setBtnClickLog(2);
          
          this.popupState = true;
        }
      }
    },
    //加价
    addPrice() {
     
      this.myAddPrice = (this.myAddPrice - 0) + (this.increasePrice - 0);
    },
    //减价
    subtractPrice() {
      
      if (this.myAddPrice > this.increasePrice) {
        this.myAddPrice = (this.myAddPrice - 0) - (this.increasePrice - 0);
      } else {
        this.tost(`加价幅度不能小于${this.increasePrice}`);
      }
    },
    //出价
    bidingHandle() {
      let _this=this;
      this.setBtnClickLog(3);
      
      let params = {
        token: this.$route.query.token,
        bidderId: this.$route.query.bidderId,
        currentPrice:this.currentPrice,
        increasePrice: this.myAddPrice
      };
      this.$http({
        url: "https://tcmapi.emao.com/bidder/increasePrice",
        method: "GET",
        params: params
      })
        .then(function(res) {
           
          this.tost(res.body.data.msg)
          this.currentPrice=res.body.data.currentPrice
          this.popupState = false;
          this.myAddPrice=this.increasePrice;//加价成功我的加价重置
          //加价成功后重新对竞拍记录赋值

          this.bidderRecord =(res.body.data.bidderRecord&& res.body.data.bidderRecord!==[])?res.body.data.bidderRecord:this.bidderRecord;           
          let len = this.bidderRecord.length
          if (len > 5) {
            this.bidderRecord = this.bidderRecord.slice(0,5)
          }

        })
        .catch(error => {
          
          this.bidingErrorText = error.body.msg
          this.popupState = false;
          this.popupStatePrice = true;  
        });
    },
    // 关闭弹窗
    closePopup() {
      this.popupState = false;
    },
    // 设置提醒
    setClock() {
      
      if (this.clockText === "设置提醒") {
        this.setBtnClickLog(4);
        let params = {
          token: this.$route.query.token,
          bidderId: this.$route.query.bidderId,
          remindStatus: 2 // 参数 2 为设置提醒
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/setingRemind",
          method: "POST",
          params: params
        })
          .then(function(res) {
            
            this.settingRemind=res.body.data.settingRemind;
            this.tost("设置提醒成功，将在开拍和结束前10分钟提醒您");
            this.clockText = "取消提醒";
          })
          .catch(error => {
           
            this.tost("设置失败");
          });
      } else {
        this.setBtnClickLog(5);
        let params = {
          token: this.$route.query.token,
          bidderId: this.$route.query.bidderId,
          remindStatus: 1 // 参数 1 为取消提醒
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/setingRemind",
          method: "POST",
          params: params
        })
          .then(function(res) {
            
            this.settingRemind=res.body.data.settingRemind;
            this.tost("取消成功");
            this.clockText = "设置提醒";
          })
          .catch(error => {
           
            this.tost("取消失败");
          });
      }
    },
    // 设置闹钟提示样式
    setClockUI() {
      // 判断是否设置提醒 1-未设置 2-已设置
      if (this.remindStatus === "1") {
       
        //1.竞拍未开始状态
        if (this.bidderStatus === "1" || this.bidderStatus === "2") {
          this.clockText = "设置提醒";
        }
        //2.竞拍进行中
        if (this.bidderStatus === "3") {
          this.clockText = "设置提醒";
        }
        return false;
      }
      if (this.remindStatus === "2") {
       
        //1.竞拍未开始状态
        if (this.bidderStatus === "1" || this.bidderStatus === "2") {
          this.clockText = "取消提醒";
        }
        if (this.bidderStatus === "3") {
          this.clockText = "取消提醒";
        }

        return false;
      }
    },
    // Tost提醒
    tost(content) {
      this.$store.dispatch(
        "ALERT", // 通过store传值
        {
          flag: true,
          text: content
        }
      );
    },
    /**
     * 按钮统计方法
     * params: buttonType 按钮类型[必传]
     * 1=支付保证金,2=我要出价, 3=立即出价,
     * 4=设置提醒,5=取消提醒,6=查看全部,
     * 7=查看细则,8=导航右上角分享,9=分享类型,
     * 10=出价失败弹窗-知道了,11=出价失败弹窗-关闭,
     * 12=选择自提点,13=确认支付,14=提交汇款凭证,
     * 15=竞拍订单,16=支付全款,17=我要参加,
     * 18=去看看其他场次竞拍,19=弹窗-立即下载,20=弹窗-关闭
     */
    setBtnClickLog(btnType) {
      let token = this.$route.query.token;
      let bidderId = this.$route.query.bidderId;
      let buttonType = btnType;
      let uniqId = this.$route.query.uniqId;
      let url = "";
      let params = null;
      if (this.isTcmApp) {
        url = "https://tcmapi.emao.com/bidder/browseAppLog";
        params = {
          token: token,
          bidderId: bidderId,
          buttonType: buttonType
        };
      } else {
        url = "https://tcmapi.emao.com/bidder/browseWapLog";
        params = {
          bidderId: bidderId,
          buttonType: buttonType,
          uniqId: uniqId,
          
        };
      }

      this.$http({
        url: url,
        method: "POST",
        params: params
      })
        .then(function(res) {
          //按钮统计
          if(btnType==19){
           window.location=`http://url.cn/5Ne6oti`;
          }
      
        })
        .catch(error => {
         
        });
    },

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
        windowOpen() {
            var obj = {
            actionname: "windowOpen",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
             url:  `https://tcm.m.emao.com/#/biding/recordlist?bidderId=${this.$route.query.bidderId}`// 要打开的链接
             };
             this.tcmApp(obj);
             
            },

    // 竞拍记录查看更多按钮点击
    recordlist (btnType) {
      this.setBtnClickLog(btnType)
      this.windowOpen()
      // this.$router.push({path: "/biding/recordlist",query:{bidderId: this.bidderId}})
      
    },
    //下载APP弹窗
     downState(download_pup){
       if(download_pup===false){
         this.setBtnClickLog(20)//点击周围弹窗关闭
       }
      this.download_pup=download_pup;
    },
    downloadApp(){
      this.setBtnClickLog(19)//立即下载 ；
    },
    closeDownload(){
      this.setBtnClickLog(20)//弹窗关闭
      this.download_pup=false;
      
    }
    
  },
  created() {
    this.getdata();
    
    this.renderDom();
 
  },

  components: {
    swiper,
    Popup,
    Rulebond,
    alertTip,
    picView
  }
};
</script>
<style>

/* 小喇叭样式 */
.notice {
    height: 0.85rem;
    font-size: 0.4rem;
    vertical-align: center;
    color: #fff;
    padding-right: 0.26667rem;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    top: -2rem;
    left: 0.4rem;
    z-index: 9;
    animation: fadeout 2s linear ;
}

@keyframes fadeout {
  0%{
     background: rgba(0, 0, 0, 0.7);
    top: 0.4rem;
   
  }
  25% {
    background: rgba(0, 0, 0, 0.5);
    top: 0.2rem;
  }
  50% {
    background: rgba(0, 0, 0, 0.3);
    top: 0rem;
  }
  75% {
    background: rgba(0, 0, 0, 0.1);
    top: -1rem;
  }
  100% {
    background: rgba(0, 0, 0, 0);
    top: -2rem;
    
  }
  
}
.message {
    height: 0.8rem;
}
.message img {
    display: inline-block;
    width: 0.66667rem;
    float: left;
}
.message span {
    height: 0.8rem;
    line-height: 0.8rem;
}



/* 竞拍记录模块样式 */
#record {
    box-sizing: border-box;
    padding: 0.53333rem 0.4rem;
    background: #fff;
}
.record_title {
    line-height: 0.533333rem;
    border-left: 0.05333rem solid #000;
    padding-left: 0.34666rem;
}
.title_left {
    color: #000;
    font-size: 0.50667rem;
    font-weight: 700;
}
.title_more {
    float: right;
    font-size: 0.32rem;
    color: #999;
}
.record_list {
    padding-top: 0.66667rem;
}
.list_title {
    padding-bottom: 0.56rem;
    font-size: 0.33333rem;
}
.list_title, .list_cont {
    width: 100%;
    display: flex;
}
.list_title p {
    display: inline-block;
}
.list_title p:nth-child(1) {
    width: 18%;
}
.list_title p:nth-child(2) {
    width: 36%;
}
.list_title p:nth-child(3) {
    width: 16%;
}
.list_title p:nth-child(4) {
    width: 30%;
    text-align: right;
}

.list_cont p {
    display: inline-block;
}
.list_cont p:nth-child(1) {
    width: 18%;
}
.list_cont p:nth-child(2) {
    width: 36%;
}
.list_cont p:nth-child(3) {
    width: 16%;
}
.list_cont p:nth-child(4) {
    width: 30%;
    text-align: right;
}


.list_cont {
    line-height: 0.66667rem;
    font-size: 0.26666rem;
}
.list_cont:nth-child(1) {
    color: red;
}




.biding {
  width: 100%;
  padding-bottom: 1.41333rem;
}
.infom {
  padding: 0.13333rem 0.3rem 0.15rem;
  background: #fff;
  overflow: hidden;
  display: flex;
}

.infom-left {
  flex: 1;
  float: left;
}
.infom-right {
  /* height: 3rem; */
  padding: 0.15rem 0.2rem 0.15rem 0.35rem;
  float: right;
  border-left: #999999 solid 0.01333rem;
}
.infom-right img {
  display: block;
  margin-top: 0.4rem;
  margin-left: 0.2rem;
  width: 1.3rem;
}
.infom-right .clock {
  display: block;
  text-align: center;
  margin-top: 0.5rem;
}
.infom-up {
  overflow: hidden;
}
.infom-up .type {
  float: left;
  font-size: 0.42667rem;
  width: 6.93333rem;
  /* height: 1.33333rem; */
  font-weight: 700;
  line-height: 0.66667rem;
}

.infom-mid {
  margin-top: 0.15rem;
  margin-bottom: 0.2rem;
}
.infom-mid span {
  display: inline-block;
}
.infom-mid .b-price {
  font-size: 0.6rem;
  color: #e51c23;
  font-weight: 700;
  margin-right: 0.26667rem;
}
.infom-mid .g-price {
  font-size: 0.34667rem;
  color: #999999;
  text-decoration: line-through;
}
.infom-down {
}
.infom-down span {
  display: inline-block;
  margin-right: 0.3rem;
  font-size: 0.34667rem;
  color: #999999;
}
.infom-down .apply {
}
.infom-down .remind {
  color: #999999;
}
.car-data::before {
  content: "";
  width: 95%;
  height: 1px;
  margin: 0 auto;
  display: block;
  background: #999;
}
.car-data {
  background: #fff;
  margin-bottom: 0.3rem;
}
.car-data ul {
  padding-bottom: 0.3rem;
}
.car-data ul li {
  overflow: hidden;
  padding: 0.133rem;
  display: flex
}
.car-data ul li span {
  float: left;
  font-size: 0.34667rem;
}
.car-data ul li .left {
  margin-left: 3%;
  color: #999;
  width: 25%;
}
.car-data ul li .right {
  color: #000;
  flex: 1;
  text-align: left;
}
.rulebond,
.record {
  margin-bottom: 0.3rem;
}
.process,
.rulebond,
.product {
  background: #fff;
  padding: 0.3rem 0.25rem;
}
.process-text,
.product-text {
  font-size: 0.50667rem;
  font-weight: 700;
  margin: 0.3rem;
}
.process img {
  width: 100%;
  margin: 0.3rem auto 0;
  border-bottom: #999 solid 0.01333rem;
  padding-bottom: 0.5rem;
}
.product ul li img {
  width: 100%;
  margin: 0 auto 0.2rem;
}

.biding-tip {
  background: #00c385;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #ffffff;
  font-size: 0.32rem;
}

.bidingTipActive {
  background: #fc3036;
}
.bidingTipOver {
  background: #cccccc;
}
.biding-tip .text {
  margin-left: 0.45333rem;
  margin-right: 0.42667rem;
}

.bottom-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.41333rem;
  line-height: 1.41333rem;
  text-align: center;
  background: #d5aa5c;
  color: #ffffff;
  font-size: 0.50667rem;
}
.btnDisable {
  background: #cccccc;
}
.popup-container {
  position: relative;
  height: 4.42667rem;
}
.popup-container .popup-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1.41333rem;
  line-height: 1.41333rem;
  text-align: center;
  background: #d5aa5c;
  color: #ffffff;
  font-size: 0.50667rem;
}
.current-price,
.change-price {
  margin-left: 0.61333rem;
  height: 0.82667rem;
  line-height: 0.82667rem;
}
.current-price {
  margin-top: 0.66667rem;
  margin-bottom: 0.4rem;
  color: #ff2c2d;
  font-size: 0.45333rem;
}

.current-price .price-num {
  font-size: 0.58667rem;
}
.current-price font {
  font-size: 0.34667rem;
}
.c-p-box span {
  display: inline-block;
}
.c-p-box .add-range {
  margin: 0 0.26667rem;
  width: 2.02667rem;
  height: 0.82667rem;
  line-height: 0.82667rem;
  text-align: center;
  border: 1px solid #e0e0e0;
  font-size: 0.4rem;
}
.c-p-title,
.c-p-box {
  float: left;
}
.c-p-title {
  font-size: 0.4rem;
  margin-right: 0.90667rem;
}
.subtract-icon {
  position: relative;
  top: 0.1rem;
  width: 0.46667rem;
  height: 0.46667rem;
  background: url("./images/subtract.png") no-repeat center center;
  background-size: 100%;
}
.add-icon {
  position: relative;
  top: 0.1rem;
  width: 0.46667rem;
  height: 0.46667rem;
  background: url("./images/add.png") no-repeat center;
  background-size: 100% 100%;
}
.close-icon {
  position: absolute;
  width: 0.37333rem;
  height: 0.37333rem;
  top: -0.2rem;
  right: 0.4rem;
}

.pricePopupContent {
  width: 7.2rem;
  text-align: center;
}
.pricePopupContent h2 {
  margin-top: 0.8rem;
  font-size: 0.48rem;
}
.pricePopupContent h4 {
  margin-top: 0.37333rem;
  margin-bottom: 0.45333rem;
  font-size: 0.4rem;
}
.pricePopupContent .iKnow {
  height: 1.17333rem;
  line-height: 1.17333rem;
  background: #d7ac4d;
  color: #ffffff;
  font-size: 0.45333rem;
}
.download{
  width:100%;
  height: 100%;
  overflow: hidden;
}
.download .close-download{
  top: 0.2rem;
}
.download .download_text{
  font-size: .4rem;
  width: 7rem;
  text-align: center;
  margin: .5rem auto;
}
.download img{
width: 3rem;
height: 1rem;
display: block;
margin: .5rem auto;
}
.btn-goApp {
  margin: 1rem auto .8rem;
  width: 6.66667rem;
  line-height: 1.2rem;
  background: #d5aa5c; 
  border-radius: .6rem;
  text-align: center;
  font-size: 0.45333rem;
  color: #fff}
</style>


