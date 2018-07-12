<template>
  <div class="biding">
    <!-- 轮播图部分 -->
    <section>
      <swiper :circular="circular" v-if="circular.length"></swiper>
    </section>

    <!-- 小喇叭模块 -->
    <section>
      <Notice></Notice>
    </section>

    <!-- 竞拍提醒 -->
    <div class="biding-tip" :class="{bidingTipActive: bidderSatus=='3',bidingTipOver:bidderSatus=='4'}">
      <span class="text">{{bidingTipText}}</span>
      <span class="time">
        <span v-if="bidderSatus==='2'">距开拍&nbsp;&nbsp;</span>{{bidingTipTime}}</span>
    </div>

    <!-- 车辆信息 -->
    <section class="infom">
      <div class="infom-left">
        <div class="infom-up">
          <div class="type">2014新款 东风标致 经典版 1.6L 手动优尚型{{autoName}}</div>
        </div>
        <div class="infom-mid">
          <span class="b-price">当前价：7.6万{{currentPrice}}</span>
          <span class="g-price">指导价：10.05万{{guidePrice}}</span>
        </div>
        <div class="infom-down">
          <span class="apply">15人报名{{enrolment}}</span>
          <span> | </span>
          <span class="remind">18人设置提醒{{settingRemind}}</span>
        </div>
      </div>
      <div v-if="isClockShow&&isTcmApp" class="infom-right" @click="setClock">
        <img src="./images/clock.png" alt="设置提醒">
        <span class="clock">{{clockText}}</span>
      </div>

    </section>
    <!-- 具体参数 -->
    <section class="car-data">
      <ul>
        <li class="car-num">
          <span class="left">台数</span>
          <span class="right">1{{platformNum}}</span>
        </li>
        <li class="car-money">
          <span class="left">保证金</span>
          <span class="right">2000{{deposit}}</span>
        </li>
        <li class="car-range">
          <span class="left">可售范围</span>
          <span class="right">全国{{saleArea}}</span>
        </li>
        <li class="car-place">
          <span class="left">提车地点</span>
          <span class="right">广州{{packUpPlace}}</span>
        </li>
        <li class="car-date">
          <span class="left">生产日期</span>
          <span class="right">2018-7{{produceTime}}</span>
        </li>
        <li>
          <span class="left">车身颜色</span>
          <span class="right">红色{{carColor}}</span>
        </li>
      </ul>
    </section>
    <!-- 竞拍记录 -->
    <section class="record">
      <Record></Record>
    </section>
    <!-- 竞拍流程 -->
    <section class="process">
      <div class="process-text">
        <span>|</span>
        <span>竞拍流程</span>
      </div>

      <img src="./images/record.png" alt="">
    </section>
    <section class="rulebond">
      <Rulebond></Rulebond>
    </section>
    <!-- 商品介绍 -->
    <section class="product">
      <div class="product-text">
        <span>|</span>
        <span>商品介绍</span>
      </div>
      <ul>
        <li>
          <img src="http://img.zcool.cn/community/01f09e577b85450000012e7e182cf0.jpg@1280w_1l_2o_100sh.jpg" alt="">
        </li>
        <li>
          <img src="./images/text.png" alt="">
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
            <span class="price-num">7.39</span>
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

  </div>
</template>
<script>
//引入弹窗
import Popup from "../../components/common/popup/popup.vue";
import alertTip from "../../components/common/alertTip/alertTip";
// 引入竞拍记录模块
import Record from "./record.vue";
// 引入保证金规则模块
import Rulebond from "./rulebond.vue";
// 引入小喇叭模块
import Notice from "./notice.vue";
//引入倒计时
import { timeCountdown, numberCountdown } from "../../common/js/countdown.js";
import swiper from "../../components/common/swiper/swiper";
export default {
  name: "biding",
  data() {
    return {
      sowingMap: [],//轮播图
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
      circular: [
        {
          id: 2,
          imgUrl:
            "http://img.zcool.cn/community/01f09e577b85450000012e7e182cf0.jpg@1280w_1l_2o_100sh.jpg"
        }
      ], //轮播图数据
      bidingTipText: "正在竞拍",
      bidingTipTime: "20小时08分04秒",
      bottomBtnText: "交保证金报名",
      bidderSatus: "3", //活动状态:1-未开始(>24h);2-未开始(<24h);3-进行中;4-已结束
      startTime: "2018/07/11 00:00:00", //活动开始时间;
      endTime: "2018/07/11 21:26:30", //活动结束时间;
      timeStr: "05月04日  10:20 开拍", //活动开始时间(bidderId=1时显示);
      remindStatus: "1", //闹钟状态(只有bidderSatus=1时显示):1-未设置 2:已设置
      isPay: 1, //0 未支付  1 已支付
      isBtnDisable: false,
      popupState: false,
      increasePrice: "200", //加价幅度
      myAddPrice: 200, //出价金额
      isClockShow: true,
      clockText: "设置提醒",
      bidderMoney: 2000,
      bidderId: 1,
      bidderRecord:[],
      shareInfo:[]
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
    //获取数据
    getdata() {
      let params;
      let data;
      if(this.isTcmApp){
         params = {
        token:this.$route.query.token,
        bidderId: this.$route.query.bidderId
      };
       this.$http({
        url: "https://tcmapi.emao.com/bidder/privateBidderDetail",
        method: "GET",
        params: params
      })
      .then(function(response){
          data=response.body.data;
      })
      .catch(error => {
          console.log(error);
          tost(error.body.msg)
        });
      }else{
        params = {
        bidderId: this.$route.query.bidderId
      }
        this.$http({
        url: "https://tcmapi.emao.com/bidder/bidderDetail",
        method: "GET",
        params: params
      })
        .then(function(response) {
           data = response.body.data;
           })
        .catch(error => {
          console.log(error);
        });
        }
        if(data){
          this.sowingMap = data.sowingMap; //轮播图
          for (var i = 0; i < this.sowingMap.length; i++) {
            this.circular[i] = {
              id: i,
              imgUrl: this.sowingMap[i]
            };
          }
          this.bidderId=data.bidderId;
          this.bidderSatus=data.bidderSatus;
          this.depositStatus=data.depositStatus;
          this.startTime=data.startTime;
          this.endTime=data.endTime;
          this.timeStr=data.timeStr;
          this.remindStatus=data.remindStatus;
          this.bidderRecord=data.bidderRecord;//竞拍记录

          this.autoName = data.autoName;
          this.currentPrice = data.currentPrice;
          this.guidePrice = data.guidePrice;
          this.enrolment = data.enrolment;
          this.settingRemind = data.settingRemind;
          this.platformNum = data.platformNum;
          this.deposit = data.deposit;
          this.increasePrice = data.increasePrice;
          this.saleArea = data.saleArea;
          this.packUpPlace = data.packUpPlace;
          this.produceTime = data.produceTime;
          this.carColor = data.carColor;
          this.shopInfo = data.shopInfo;
          this.shareInfo=data.shareInfo
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
    // 分享按钮添加
    addShareButton() {
      let _this = this;
      var obj = {
        actionname: "addShareButton", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
        actionid: "", //回调 ID：可选参数，与回调函数配套使用
        callback: "", //回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
        buttonTitle: "", //分享按钮的标题；可选参数，与 buttonImage 二选一
        buttonImage: this.shareInfo.icon, //分享按钮的图片地址；可选参数，与 buttonTitle 二选一；若没有该参数，或者 image 的地址为空，则使用 buttonTitle。若有此参数则优先使用该参数
        title: this.shareInfo.Title,
        subTitle: this.shareInfo.note,
        imgUrl: "", //分享信息图片链接
        url: "", //要分享内容的 url
        shareType: "2", //此字段用于后续统计区别类型, 0:普通分享,不需要统计 1:预售分享 2:抢购
        uniqId: "", //shareType为0时可空,分享统计id
        extra: this.$route.query.bidderId //分享需要的额外字段,竞拍id
      };
      this.tcmApp(obj);
    },
    // 分享按钮添加
    // 设置竞拍导航
    setBidingTip() {
      console.log(this.bidderSatus);
      // 活动状态:1-未开始(>24h);
      if (this.bidderSatus === "1") {
        this.bidingTipText = "即将开始";
        this.bidingTipTime = this.timeStr;
        return false;
      }
      // 2-未开始(<24h)
      if (this.bidderSatus === "2") {
        this.bidingTipText = "即将开始";
        this.bidingTipTime = "20小时08分04秒";
        let startTime = new Date(this.startTime);
        let endTime = new Date(this.endTime);
        let type = "double";
        timeCountdown(
          { startTime, endTime, type },
          update => {
            // 倒计时更新触发的操作写在这里
            this.bidingTipTime = `${update[2]}小时${update[3]}分${update[4]}秒`;
          },
          end => {
            // 倒计时结束触发的操作写在这里
            console.log(end);
            this.bidderSatus = "4";
          }
        );
        return false;
      }
      // 3-进行中
      if (this.bidderSatus === "3") {
        this.bidingTipText = "正在竞拍";
        this.bidingTipTime = "20小时08分04秒";
        let startTime = new Date(this.startTime);
        let endTime = new Date(this.endTime);
        let type = "double";
        let that = this;
        timeCountdown(
          { startTime, endTime, type },
          update => {
            // console.log(
            //   update[1] === "00" && update[2] === "00" && update[3] < 10
            // );
            if (update[1] === "00" && update[2] === "00" && update[3] < 10) {
              this.isClockShow = false;
            }
            // 倒计时更新触发的操作写在这里
            this.bidingTipTime = `${update[2]}小时${update[3]}分${update[4]}秒`;
          },
          end => {
            // 倒计时结束触发的操作写在这里
            console.log(end);
            this.bidderSatus = "4";
            this.setBidingTip();
            this.setBottomBtn();
          }
        );
        return false;
      }
      // 4-已结束
      if (this.bidderSatus === "4") {
        this.bidingTipText = "已结束-拍卖成交";
        this.bidingTipTime = "";
      }
    },
    // 设置底部按钮
    setBottomBtn() {
      //1.竞拍未开始状态
      if (this.bidderSatus === "1" || this.bidderSatus === "2") {
        console.log(this.isPay);
        //是否支付保证金
        if (this.isPay) {
          this.bottomBtnText = "已交保证金，等待开拍";
          this.isBtnDisable = true;
        } else {
          this.bottomBtnText = "交保证金报名";
          this.isBtnDisable = false;
        }
      }
      //2.竞拍进行中
      if (this.bidderSatus === "3") {
        //是否支付保证金
        if (this.isPay) {
          this.bottomBtnText = "我要出价";
          this.isBtnDisable = false;
        } else {
          this.bottomBtnText = "交保证金报名";
          this.isBtnDisable = false;
        }
      }
      //3.竞拍结束
      if (this.bidderSatus === "4") {
        this.bottomBtnText = "已结束";
        this.isBtnDisable = true;
      }
    },
    changePopupState(popupState) {
      this.popupState = popupState;
    },
    btnClick() {
      if (!this.isBtnDisable) {
        if (this.bottomBtnText === "交保证金报名") {
          this.setBtnClickLog(1);
          // 跳转到app交保证金页面
          /* openurl = emaotaochemao://push/ensureBidder&bidderId=xxx&bidderMoney=xxx 参数说明:bidderId: 竞拍id  bidderMoney: 竞拍保证金 */
          window.location.href = `emaotaochemao://push/ensureBidder&bidderId=${
            this.bidderId
          }&bidderMoney=${this.bidderMoney}`;
          return false;
        }
        if (this.bottomBtnText === "我要出价") {
          this.setBtnClickLog(2);
          console.log("我要出价");
          this.popupState = true;
        }
      }
    },
    //加价
    addPrice() {
      console.log("加价");
      this.myAddPrice = this.myAddPrice + (this.increasePrice - 0);
    },
    //减价
    subtractPrice() {
      console.log("减价");
      if (this.myAddPrice > this.increasePrice) {
        this.myAddPrice = this.myAddPrice - (this.increasePrice - 0);
      } else {
        this.tost(`加价幅度不能小于${this.increasePrice}`);
      }
    },
    //出价
    bidingHandle() {
      this.setBtnClickLog(3);
      console.log(this.myAddPrice);
      let params = {
        token: this.$route.query.token,
        bidderId: this.$route.query.bidderId,
        increasePrice: this.myAddPrice
      };
      this.$http({
        url: "https://tcmapi.emao.com/bidder/increasePrice",
        method: "GET",
        params: params
      })
        .then(function(res) {
          console.log(res);
          this.tost("加价成功");
        })
        .catch(error => {
          console.log(error);
          this.tost(error.body.msg);
        });
    },
    // 关闭弹窗
    closePopup() {
      this.popupState = false;
    },
    // 设置提醒
    setClock() {
      console.log(this.clockText);
      if (this.clockText === "设置提醒") {
        this.setBtnClickLog(4);
        let params = {
          token: this.$route.query.token,
          bidderId: this.$route.query.bidderId,
          remindStatus: "2" // 参数 2 为设置提醒
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/setingRemind",
          method: "GET",
          params: params
        })
          .then(function(res) {
            console.log(res);
            this.tost("设置提醒成功，将在开拍和结束前10分钟提醒您");
            this.clockText = "取消提醒";
          })
          .catch(error => {
            console.log(error);
            // this.$store.state.alert.text||this.alertText;
            this.tost("设置失败");
          });
      } else {
        this.setBtnClickLog(4);
        let params = {
          token: this.$route.query.token,
          bidderId: this.$route.query.bidderId,
          remindStatus: "1" // 参数 1 为取消提醒
        };
        this.$http({
          url: "https://tcmapi.emao.com/bidder/setingRemind",
          method: "GET",
          params: params
        })
          .then(function(res) {
            console.log(res);
            this.tost("取消成功");
            this.clockText = "设置提醒";
          })
          .catch(error => {
            console.log(error);
            // this.$store.state.alert.text||this.alertText;
            this.tost("取消失败");
          });
      }
    },
    // 设置闹钟提示样式
    setClockUI() {
      // 判断是否设置提醒 1-未设置 2-已设置
      if (this.remindStatus === "1") {
        console.log("1-未设置");
        //1.竞拍未开始状态
        if (this.bidderSatus === "1" || this.bidderSatus === "2") {
          this.clockText = "设置提醒";
        }
        //2.竞拍进行中
        if (this.bidderSatus === "3") {
          this.clockText = "设置提醒";
        }
        return false;
      }
      if (this.remindStatus === "2") {
        console.log("2-已设置");
        //1.竞拍未开始状态
        if (this.bidderSatus === "1" || this.bidderSatus === "2") {
          this.clockText = "取消提醒";
        }
        if (this.bidderSatus === "3") {
          this.clockText = "设置提醒";
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
          buttonType: buttonType
        };
      }

      this.$http({
        url: url,
        method: "GET",
        params: params
      })
        .then(function(res) {
          // console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.setClockUI();
    this.setBidingTip();
    this.setBottomBtn();
    this.getdata();
    this.renderDom();
    if(this.isTcmApp){this.addShareButton()}
  },

  components: {
    swiper,
    Popup,
    Record,
    Rulebond,
    Notice,
    alertTip
  }
};
</script>
<style>
.biding {
  width: 100%;
  padding-bottom: 1.41333rem;
}
.infom {
  padding: 0.13333rem 0.3rem 0.3rem;
  background: #fff;
  overflow: hidden;
  display: flex;
}

.infom-left {
  flex: 1;
  float: left;
}
.infom-right {
  height: 3rem;
  padding: 0.3rem 0.2rem 0.3rem 0.35rem;
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
  height: 1.33333rem;
  font-weight: 700;
  line-height: 0.66667rem;
}

.infom-mid {
  margin-top: 0.33333rem;
  margin-bottom: 0.2rem;
}
.infom-mid span {
  display: inline-block;
}
.infom-mid .b-price {
  font-size: 0.6rem;
  color: #e51c23;
  font-weight: 700;
}
.infom-mid .g-price {
  font-size: 0.34667rem;
  color: #999999;
  text-decoration: line-through;
  margin-left: 0.26667rem;
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
}
.car-data ul li span {
  width: 45%;
  float: left;
  font-size: 0.34667rem;

  margin-left: 5%;
}
.car-data ul li .left {
  color: #999;
}
.car-data ul li .right {
  color: #000;
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
</style>


