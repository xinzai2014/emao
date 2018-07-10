<template>
    <div class="biding">
        <!-- 轮播图部分 -->
        <section>
             <swiper :circular="circular" v-if="circular.length"></swiper>
        </section>

        <!-- 竞拍提醒 -->
        <div class="biding-tip"  :class="{bidingTipActive: bidderSatus=='3',bidingTipOver:bidderSatus=='4'}">
            <span class="text">{{bidingTipText}}</span><span class="time"><span v-if="bidderSatus==='2'">距开拍&nbsp;&nbsp;</span>{{bidingTipTime}}</span>
        </div>
        
        <!-- 车辆信息 -->
        <section class="infom">
            <div class="infom-left">
                <div class="infom-up">
                    <div class="type">2014新款 东风标致 经典版 1.6L 手动优尚型</div>
                </div>
                <div class="infom-mid">
                    <span class="b-price">起拍价：7.6万</span> 
                    <span class="g-price">指导价：10.05万</span>
                </div>            
                <div class="infom-down">
                    <span class="apply">15人报名</span>
                    <span>   |   </span>
                    <span class="remind">18人设置提醒</span>
                </div>
              </div>
               <div class="infom-right">
                   <img src="./images/clock.png" alt="设置提醒">
                   <span class="clock">设置提醒</span>
                   </div> 
                      
        </section>
        <!-- 具体参数 -->
        <section class="car-data">
            <ul>
                <li class="car-num">
                    <span class="left">台数</span>
                    <span class="right">1</span>  
                </li>
                <li class="car-money">
                    <span class="left">保证金</span>
                    <span class="right">2000</span>
                </li>
                <li class="car-range">
                    <span class="left">可售范围</span>
                    <span class="right">全国</span>
                </li>
                <li class="car-place">
                    <span class="left" >提车地点</span>
                    <span class="right">广州</span>
                </li>
                <li class="car-date" >
                    <span class="left">生产日期</span>
                    <span class="right">2018-7</span>
                </li>
                <li>
                    <span class="left">车身颜色</span>
                    <span class="right">红色</span>
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
            <span >竞拍流程</span>
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
            <span >商品介绍</span>
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
        <popup 
            :showPopup="popupState"
            :clickAroundHide="true"
            :contentStyleObj="{
                background: '#fff',
            }"
            position="bottom"
            @changePopupState="changePopupState">
            <div class="popup-content">
                <div class="close-icon" @click="closePopup"></div>
                <div class="current-price">
                    <span>当前价：<span class="price-num">7.39</span></span> <font>万</font>
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
import Record from "./record.vue";
import Rulebond from "./rulebond.vue";
//引入倒计时
import { timeCountdown, numberCountdown } from "../../common/js/countdown.js";
import swiper from "../../components/common/swiper/swiper";
export default {
  name: "biding",
  data() {
    return {
      sowingMap: [],
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
      startTime: "2018/07/10 20:23:23", //活动开始时间;
      endTime: "2018/07/11 20:23:23", //活动结束时间;
      timeStr: "05月04日  10:20 开拍", //活动开始时间(bidderId=1时显示);
      remindStatus: "1", //闹钟状态(只有bidderSatus=1时显示):1-未设置 2:已设置
      isPay: 0,
      isBtnDisable: false,
      popupState: false,
      increasePrice: "200", //加价幅度
      myAddPrice: 200 //出价金额
    };
  },
  computed: {},
  methods: {
    //获取数据
    getdata() {
      const params = {
        bidderId: this.$route.query.bidderId
      };
      this.$http({
        url: "https://tcmapi.emao.com/bidder/bidderDetail",
        method: "GET",
        params: params
      }).then(function(response) {
        const data = response.body.data;
        this.sowingMap = data.sowingMap; //轮播图
      });
    },
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
        let that = this;
        timeCountdown(
          { startTime, endTime, type },
          update => {
            // 倒计时更新触发的操作写在这里
            console.log(update);
            that.bidingTipTime = `${update[2]}小时${update[3]}分${update[4]}秒`;
          },
          end => {
            // 倒计时结束触发的操作写在这里
            console.log(end);
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
            // 倒计时更新触发的操作写在这里
            console.log(update);
            that.bidingTipTime = `${update[2]}小时${update[3]}分${update[4]}秒`;
          },
          end => {
            // 倒计时结束触发的操作写在这里
            console.log(end);
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
          console.log("交保证金报名");
          return false;
        }
        if (this.bottomBtnText === "我要出价") {
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
      }
    },
    //出价
    bidingHandle() {
      console.log(this.myAddPrice);
    },
    closePopup() {
      this.popupState = false;
    }
  },
  created() {
    this.setBidingTip();
    this.setBottomBtn();
  },

  components: {
    swiper,
    Popup,
    Record,
    Rulebond
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
}

.infom-left {
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
}
.infom-right .clock {
  display: block;
  text-align: center;
  margin-top: 0.5rem;
}
.infom-up {
  margin-top: 0.2rem;
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
  margin-right: 0.3rem;
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
.process,
.product {
  background: #fff;
  padding: 0.3rem 0.25rem;
  margin-bottom: 0.3rem;
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
.popup-content {
  position: relative;
  height: 4.42667rem;
}
.popup-content .popup-btn {
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


