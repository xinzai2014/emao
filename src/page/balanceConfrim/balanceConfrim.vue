<template>

	<div>
    <!--首页-订单确认-头部-->
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion" @click="goback"></i>
        <strong class="brand-list-title">购车确认</strong>
    </header>
    <!--购车确认-->
    <!--购车确认-地址-姓名-->
    <section class="order-confirmation-address">
        <div class="order-name-phone clearfix">
            <div class="order-name">
                收货人：<span>{{address.name}}</span>
            </div>
            <div class="order-phone">{{address.phone}} </div>
        </div>
        <div class="order-address">
            地址：<strong>{{address.address}}</strong>
        </div>
    </section>
    <!--购车确认-车型信息-->
    <section class="order-car-info">
        <p class="order-car-name">{{car.name}}</p>
        <span class="order-car-color">{{car.color}}/{{car.inColor}}</span>
        <div class="order-price-count clearfix">
            <div class="order-car-price">
                订单总价：<span>{{car.price|getMoney}}元</span>
            </div>
            <div class="order-car-count">X <span>1</span></div>
        </div>
        <div class="order-message">
            <span>买家留言：</span>
            <input type="text" v-model="remark" placeholder="选填 (对此订单的相关说明)"/>
        </div>
    </section>
    <section class="deposit-con">
        已支付保证金： <span>-￥{{deposit|getMoney}}</span>
    </section>
    <!--购车确认-劵信息-->
    <section class="order-coupon-info">
        <!--使用优惠券-->
        <!--优惠券可使用-->
        <div class="order-coupon" @click="showCouponDialog">
            <div class="order-coupon-title">优惠券</div>
            <div v-if="coupon.length>0&&!checkCoupun"  class="order-coupon-con"><strong>使用</strong><i class="white-rt"></i></div>
            <div v-if="coupon.length==0" class="order-coupon-con"><strong>无可用</strong><i class="white-rt"></i></div>

            <div v-if="coupon.length>0&&checkCoupun" class="order-coupon-con">-￥<strong>{{couponData.price}}</strong><i class="white-rt"></i></div>
        </div>

        <div class="order-support-fee clearfix">
            <div class="order-support-title">营销支持费：</div>
            <div class="order-support-con" v-if="chooseMarket&&!updateMarket">可用￥<strong>{{marketingSupport.usable}}</strong></div>
            <div class="order-support-con" v-if="!chooseMarket">无可用</div>
            <div class="order-support-con" v-if="chooseMarket&&updateMarket">-￥<strong>{{updateMarketData|getMoney}}</strong><span @click="showMarketDialog">调整</span></div>
            <div class="order-suport-switch">
                <input type="checkbox"  v-model="checkMarket">
            </div>
        </div>

        <div class="order-support-fee clearfix">
            <div class="order-support-title">返利：</div>
            <div class="order-support-con" v-if="chooseRebate&&!updateRebate">可用￥<strong>{{rebate.usable}}</strong></div>
            <div class="order-support-con" v-if="!chooseRebate">无可用</div>
            <div class="order-support-con" v-if="chooseRebate&&updateRebate">-￥<strong>{{updateRebateData|getMoney}}</strong><span @click="showRebateDialog">调整</span></div>
            <div class="order-suport-switch">
                <input type="checkbox"  v-model="checkRebate">
            </div>
        </div>
    </section>
    <!--购车确认-总额-->
    <section class="order-rental">
        <div class="order-rental-info">
            <span>订单总价</span>
            <p><strong>￥{{car.price|getMoney}}</strong></p>
        </div>
        <div class="order-rental-info">
            <span>已付保证金</span>
            <p><i>-</i><strong>￥{{deposit|getMoney}}</strong></p>
        </div>
        <div class="order-rental-info">
            <span>优惠券（不可开票）</span>
            <p><i>-</i><strong>￥{{couponData.price|getMoney}}</strong></p>
        </div>
        <div class="order-rental-info" >
            <span>营销支持费</span>
            <p><i>-</i><strong>￥{{updateMarketData|getMoney}}</strong></p>
        </div>
        <div class="order-rental-info">
            <span>返利资金（不可开票）</span>
            <p><i>-</i><strong>￥{{updateRebateData|getMoney}}</strong></p>
        </div>
        <div class="order-rental-info">
            <span>应付金额</span>
            <p><strong><em>￥{{totalData|getMoney}}</em></strong></p>
        </div>
    </section>
    <p class="footer-bt"></p>
    <!--确认提交-->
    <section class="order-present-info">
        <div class="order-present" @click="sumbitOrder">确认提交</div>
        <div class="order-price">
            应付金额：
            <strong>￥{{totalData|getMoney}}</strong>
        </div>
    </section>

    <!-- 选择优惠券 -->
	<section class="coupon-popup" v-show="showCoupon"  :class="{anmiteStatus:coupon.length>0&&showCoupon}" @click="closeCouponDialog">
        <div class="coupon-in">
            <div class="coupon-title">
                <p>请选择1张优惠券</p>
                <i @click.stop="closeCouponDialog"></i>
            </div>
            <div class="coupon-list" id="couponList">
                <ul class="coupon-con">
                    <li v-for="(item,index) in coupon" :couponId="item.id" @click="chooseCoupon(index,item.id)" :key="index">
                        <dl class="clearfix">
                            <dt>¥ {{parseInt(item.price).toLocaleString()}}</dt>
                            <dd>
                                <p class="coupon-name">{{item.name}}</p>
                                <p class="coupon-date">有效期：<span>{{item.startDate}} - {{item.endDate}}</span></p>
                            </dd>
                        </dl>
                        <i class="coupon-chose-logo" v-show="item.check"></i>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <!-- 营销支持费 -->
    <section class="use-coupon-popup" v-show="showMarket" >
        <div class="use-coupon-out">
            <div class="use-coupon-in">
                <!--使用营销支持费-->
                <p class="use-coupon--title">使用营销支持费</p>
                <div class="use-coupon-quota">
                    <input type="number" v-model="marketData"  :max=marketingSupport.usable  min=0>
                    <span>元</span>
                </div>
                <p class="use-coupon-info">共 <span>{{marketingSupport.total|getMoney}}</span>元，本次最多可用 <span>{{marketingSupport.usable|getMoney}}</span>元</p>
            </div>
            <p class="use-coupon-choose">
                <span @click.stop="closeMarketDialog">取消</span>
                <span class="active" @click.stop="marketConfrim">确定</span>
            </p>
        </div>
    </section>

    <!-- 返利 -->
    <section class="use-coupon-popup" v-show="showRebate" >
        <div class="use-coupon-out">
            <div class="use-coupon-in">
                <!--使用营销支持费-->
                <p class="use-coupon--title">使用返利资金</p>
                <div class="use-coupon-quota">
                    <input type="number" v-model="rebateData"  :max=rebate.usable  min=0>
                    <span>元</span>
                </div>
                <p class="use-coupon-info">共 <span>{{rebate.total}}</span>元，本次最多可用 <span>{{rebate.usable}}</span>元</p>
            </div>
            <p class="use-coupon-choose">
                <span @click.stop="closeRebateDialog">取消</span>
                <span class="active" @click.stop="rebateConfrim">确定</span>
            </p>
        </div>
    </section>

    <!--购车协议-->
    <section class="buy-agreement-pupop" v-if="showAgreement">
        <div class="buy-agreement-in">
            <div class="buy-agreement-info">
                <p class="buy-agreement-con">
                    <iframe src="//tcmapi.emao.com/app_html/agreement/full" class="agreemenIframe"></iframe>
                </p>
            </div>
            <ul class="buy-agreement-choose clearfix">
                <li class="" @click="closeAgreementDialog">不同意</li>
                <li class="active" @click="sumbitOrder">同意</li>
            </ul>
        </div>
    </section>

    <!--是否使用优惠券弹窗-->
    <div class="balance-coupon-mask" v-if="showBalanceCouponMask">
        <div class="balance-coupon-cancel-car">
            <p class="balance-coupon-prompt-tit">您有{{coupon.length}}张优惠券可以使用，是否使用</p>
            <p class="balance-coupon-prompt-btn"><span @click.stop="balanceCouponDisuse">不用</span><span class="balance-coupon-confirm" @click.stop="backToUseBalanceCoupon">使用</span></p>
        </div>
    </div>

</div>

</template>

<script>
import BScroll from 'better-scroll';
export default {
	  name: 'orderConfrim',
	  data () {
	    return {
            orderId:null, //订单号
            deposit:0, //保证金
            initData:{}, //初始化路由带过来的数据
            address:{}, //地址信息
            car:{},     //购车信息
            coupon:[],  //优惠券
            marketingSupport:{}, //营销支持费
            rebate:{},            //返利
            showCoupon:false,     //优惠券弹出窗
            couponData:{},        //选中的优惠券初始数据
            checkCoupun:false,    //判断是否选择了优惠券
            scrollWrap:null,      //优惠券滚动容器
            checkMarket:false,    //营销支持费复选框
            chooseMarket:false,   //未选择营销支持费 营销支持费不为空
            showMarket:false,     //营销支持费弹窗
            marketData:null,      //初始营销支持费值
            updateMarket:false,    //修改过营销支持费
            updateMarketData:0.00, //获取修改过的营销支持费值
            showRebate:false,       //返利逻辑开始
            chooseRebate:false,    //判断返利是否为空
            checkRebate:false,     //返利复选框
            updateRebate:false,     //修改过返利值
            rebateData:null,        //初始化返利
            updateRebateData:0.00,   //获取修改过的返利值
            formData:{

            },
            remark:null,             //备注信息
            showAgreement:false,
            showBalanceCouponMask:false //是否显示使用优惠券弹窗
 	    }
	  },
	  methods:{
        goback(){
            this.$router.go(-1);
        },
	  	getData(){
			this.$http({
		          url:"order/full/confirm",
		          method:"GET",
		          params:this.initData
		      }).then(function (response) {
		      	   var data = response.body.data;
                   this.address = data.address;
		              this.car = data.car;
                   var coupon = data.coupon;
                   coupon.forEach(function(ele,index){ //初始化优惠券选中值
                        ele.check = false;
                   })
                   this.coupon = coupon; //单次初始化
                   if(coupon.length>0){
                        this.initIscroll("couponList",this.scrollWrap);
                   }
		           this.marketingSupport = data.marketingSupport;
                   if(data.marketingSupport.usable){ //判断是否有可用营销支持费
                        this.chooseMarket = true
                   }
                   if(data.marketingSupport.usable){ //判断是否有返利
                        this.chooseRebate = true
                   }
                   //this.marketData = data.marketingSupport.usable;
                   //this.rebateData = data.rebate.usable;
		           this.rebate = data.rebate;

                   //初始化提交表单信息
                   this.formData.total_price  = data.car.price;
                   this.formData.int_color_id = data.car.inColorId;
                   this.formData.ext_color_id = data.car.colorId;

		        },function(){

		        })
	  	},
        showCouponDialog(){ //显示优惠券弹窗
            this.showCoupon = !this.showCoupon;
        },
        closeCouponDialog(){ //关闭优惠券弹出窗
            this.showCoupon = !this.showCoupon;
        },
        chooseCoupon(index,id){  //选择优惠券
            this.coupon.forEach(function(ele,ind){
                if(index!=ind){
                  ele.check = false;
                }
            })
            this.coupon[index].check = !this.coupon[index].check;
            if(this.coupon[index].check){
                this.couponData = this.coupon[index];
                this.checkCoupun = true;
            }else{
                this.couponData = {};
                this.checkCoupun = false;
            }
        },
        showMarketDialog(){ //营销支持费弹出窗
            this.showMarket = !this.showMarket;
        },
        closeMarketDialog(){ //关闭营销支持费弹出窗
            this.showMarket = !this.showMarket;
        },
        marketConfrim(){   //营销支持费弹出窗确认按钮
            if(this.marketData == null||this.marketData == ""){
                 this.$store.dispatch("ALERT", // 通过store传值
                  {
                    flag:true,
                    text:"金额不能为空"
                  }
                 );
                 return false;
            }
            if(parseFloat(this.marketData)>parseFloat(this.marketingSupport.usable)){
                this.$store.dispatch("ALERT", // 通过store传值
                  {
                    flag:true,
                    text:"本次最多可用" + parseFloat(this.marketingSupport.usable).toLocaleString() + ".00元"
                  }
                 );
                return false;
            }
            this.showMarket = !this.showMarket;
            this.updateMarket = true;
            this.updateMarketData = this.marketData;
        },
        showRebateDialog(){ //返利弹出窗
            this.showRebate = !this.showMarket;
        },
        closeRebateDialog(){ //关闭返利弹出窗
            this.showRebate = false
        },
        rebateConfrim(){
            if(this.rebateData == null||this.rebateData == ""){
                 this.$store.dispatch("ALERT", // 通过store传值
                  {
                    flag:true,
                    text:"金额不能为空"
                  }
                 );
                 return false;
            }
            if(parseFloat(this.rebateData)>parseFloat(this.rebate.usable)){
                 this.$store.dispatch("ALERT", // 通过store传值
                  {
                    flag:true,
                    text:"本次最多可用" + parseFloat(this.rebate.usable).toLocaleString() + ".00元"
                  }
                 );
                 return false;
            }
            this.showRebate = !this.showRebate;
            this.updateRebate = true;
            this.updateRebateData = this.rebateData;
        },
        showAgreementDialog(){ //协议弹出窗
            this.showAgreement = true;
            //this.getAgreementData();
            return false;
        },
        closeAgreementDialog(){
            this.showAgreement = false;
            return false;
        },
        getAgreementData(){
            this.$http.get(
                "order/full/agreement?token="+sessionStorage.token).then(function (response) {
              },function(response){
            });
        },
        /*不用优惠券*/
        balanceCouponDisuse(){
            this.showBalanceCouponMask = false;
            setTimeout(this.sumbitOrderData,1000);
        },
        /*使用优惠券*/
        backToUseBalanceCoupon(){
            this.showBalanceCouponMask = false;
            this.showCouponDialog();
        },
        /*提交展车数据函数*/
        sumbitOrderData(){
          this.closeAgreementDialog();
          this.formData.order_num = this.orderId;
          this.formData.deduction = this.totalData;
          //this.formData.remark = this.remark;

          this.formData.coupon_price = this.couponData.price?this.couponData.price:0;//优惠券减免
          this.formData.coupon_id = this.couponData.id?this.couponData.id:0;
          this.formData.capital_price = this.updateMarketData>0?this.updateMarketData:0;
          this.formData.rebate_price = this.updateRebateData>0?this.updateRebateData:0;
          this.$http.post(
                  "order/show/balance?token="+sessionStorage.token,
                  this.formData).then(function (response) {
                      var data = response.body.data;
                      data["flag"] = true;
                      data["addressFlag"] = "balanceConfrim";
                      data["telephone"] = this.address.phone;
                      this.$store.dispatch("SUCCESS_DATA", // 通过store传值
                              data
                      )
                      this.$router.push("/resultSuccess");
                  },function(){

                  });
        },
        sumbitOrder(){ //提交表单
           if (this.coupon.length>0&&!this.checkCoupun) {
               this.showBalanceCouponMask = true;
               return
           }
           this.sumbitOrderData();
        },
        initIscroll(id,scrollWrap){ //初始化滚动容器
            setTimeout(function(){
                 scrollWrap = new BScroll(document.getElementById(id),{
                   probeType: 3,
                   click:true
                });
            },1000)
        },
	  },
	  mounted(){
         var spareData = this.$store.getters.getSpareData;
         this.orderId = spareData.orderNum;
         this.deposit = spareData.deposit.replace(",","");
         this.initData["token"] = sessionStorage.token;
         this.initData["orderNum"] = this.orderId;
         this.getData();
	  },
      filters:{
        getMoney:function(num){
            if(isNaN(num)){
                num = 0;
            }
            var arr = num.toString().split(".");
            var tagNum = arr.length>1?parseInt(arr[0]).toLocaleString() + "." + arr[1]:parseInt(arr[0]).toLocaleString() +".00"
            return tagNum;
        }
      },
      watch:{
        checkMarket(){
            if(!this.chooseMarket){
                this.checkMarket = false;
                return false;
            }else{
                if(this.checkMarket){
                    this.updateMarket = true
                    this.updateMarketData = parseInt(this.marketingSupport.usable);
                }else{
                    this.updateMarket = false;
                    this.updateMarketData = "0.00";
                }
            }
        },
        checkRebate(){
            if(!this.chooseRebate){
                this.checkRebate = false;
                return false;
            }else{
                if(this.checkRebate){
                    this.updateRebate = true
                    this.updateRebateData = parseInt(this.rebate.usable);
                }else{
                    this.updateRebate = false;
                    this.updateRebateData = "0.00";
                }
            }
        }
      },
      computed:{
        totalData:function(){
            var couponPrice = this.couponData.price?this.couponData.price:0;//优惠券减免
            var marketPrice = this.updateMarketData>0?this.updateMarketData:0;
            var rebatePrice = this.updateRebateData>0?this.updateRebateData:0;
            return this.car.price - couponPrice - marketPrice - rebatePrice - this.deposit;
        }
      },
    beforeRouteEnter(to, from, next){
        next(vm => {

        });
    }
}
</script>

<style>

.brand-header-out{position:relative;z-index:3;}
.brand-switch{float:right;margin-right:.4666rem;font-size:.4rem;color:#d5aa5c;}
.brand-list-open{position:absolute;z-index:4;width:10rem;top:1.1733rem;left:0;background-color:#fff;}
	/*订单确认*/
.order-confirmation-address{padding:.533rem .4rem;margin-bottom:.4rem;font-size:.4rem;color:#2c2c2c;background-color:#fff;position:relative;}
.order-name{float:left;}
.order-phone{float:right;margin-right:.7733rem;}
.order-address{margin-top:.4rem;padding-right:.4rem;}
.order-confirmation-address i{position:absolute;top:0;left:auto;right:0.4rem;bottom:0;margin:auto;}
.order-car-info{background-color:#fff;padding:.5333rem .4rem 0;margin-bottom:.4rem;}
.order-car-name{font-size: .4rem;color: #000;font-weight:600;}
.order-car-color{display:block;margin-top:.1833rem;font-size: .3467rem;color: #999;}
.order-price-count{margin-top:.3667rem;margin-bottom:.4rem;font-size:.3733rem;}
.order-car-price{float:left;color:#2c2c2c;}
.order-car-price span{color:#fc3036;}
.order-car-count{float:right;color:#999;}
.order-car-count span{}
.order-message{padding:.4rem 0;color:#2c2c2c;font-size:.3733rem;border-top:1px solid #e0e0e0;}
.order-message input{display: inline-block;height: 0.75rem;width: 7rem;line-height: 0.75rem;border: none;}
.order-coupon-info{padding:0 .4rem;margin-bottom:.4rem;background-color:#fff;}
.order-coupon-title{float:left;color:#2c2c2c;font-size:.4rem;}
.order-coupon-con{float:right;color:#999;font-size:.3733rem;}
.order-coupon-con strong{margin-right:.2667rem;}
.order-coupon-con i{}
.order-coupon{height:1.467rem;line-height:1.467rem;border-bottom:1px solid #e0e0e0;}
.order-support-fee{height:1.467rem;line-height:1.467rem;border-bottom:1px solid #e0e0e0;}
.order-support-title{float:left;color:#2c2c2c;font-size:.4rem;}
.order-support-con{float:left;color:#999;font-size:.3733rem;}
.order-support-con span{margin-left:.4rem;color:#d5aa5c;font-size:.3733rem;font-weight:600;}
/*checkbox按钮开始*/
.order-suport-switch{float:right;margin-right:0;font-size:0;line-height:1;margin-top:0.273rem;}
.order-suport-switch input{-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-appearance: none;appearance: none;position: relative;width:1.4rem;height: 0.9rem; border: 1px solid #dfdfdf;outline: 0;border-radius: 0.45rem; box-sizing: content-box;
     background-color: #dfdfdf;  -webkit-transition: background-color .1s,border .1s;  transition: background-color .1s,border .1s;-webkit-tap-highlight-color: rgba(0,0,0,0);}
.order-suport-switch input:checked{border-color: #04be02;background-color: #04be02;}
.order-suport-switch input:after,.order-suport-switch input:before{content: " ";position: absolute;top: 0;left: 0;height:.4rem;border-radius:.2rem;-webkit-transition: -webkit-transform .3s;}
.order-suport-switch input:before{width:100%; background-color: #fdfdfd;height:0.9rem;border-radius: 0.45rem; }
.order-suport-switch input:checked:before{transform: scale(0);}
.order-suport-switch input:after{width: .9rem;height:0.9rem;background-color: #fff;transition: transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);border-radius:50%;box-shadow:0 1px 3px rgba(0, 0, 0, 0.4);}
.order-suport-switch input:checked:after{transform: translateX(.5rem);}
/*checkbox按钮结束*/
.order-rental{margin-bottom:1.667rem;padding:.533rem .4rem;font-size:.3467rem;background-color:#fff;}
.order-rental-info{height:.8667rem;line-height:.8667rem;}
.order-rental-info span{display:block;float:left;color:#999;}
.order-rental-info p{float:right;}
.order-rental-info strong{color:#2c2c2c;}
.order-rental-info em{color:#fc3036;}
.order-present-info{position:fixed;bottom:0;width:10rem;background-color:#fff;}
.order-present{float:right;width:3rem;height:1.2667rem;text-align:center;line-height:1.2667rem;font-size:0.4rem;color:#fff;background-color:#d5aa5c;}
.order-price{float:right;height:1.2667rem;margin-right: .4rem;line-height: 1.2667rem;font-size:.3467rem;color:#2c2c2c;}
.order-price strong{font-size:.4267rem;color:#fc3036;}

/*选择优惠券-浮层*/
.coupon-popup{position:fixed;z-index:2;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);transform:translateY(100%);}
.coupon-in{position:fixed;bottom:0;width:10rem;background-color:#f5f5f5;height:50%}
.coupon-title{position:relative;height:1.533rem;padding-left:.4rem;font-size:.5067rem;color:#000;line-height:1.5333rem;}
.coupon-title i{display:block;position:absolute;top:.5333rem;right:.4667rem;width:.3733rem;height:.3733rem;background:url("../../assets/close.png") no-repeat;background-size:contain;}
.coupon-con{padding: 0 .533rem .5333rem .533rem;}
.coupon-con li{position:relative;margin-top:.4rem;background:url("../../assets/coupon-bg.png") no-repeat;background-size:100% 100%;}
.coupon-con dt{float:left;width:2.7733rem;height:2.7733rem;text-align:center;line-height:2.7733rem;font-size:.533rem;color:#d5aa5c;}
.coupon-con  dd{margin-left:2.7733rem;padding:.4rem;}
.coupon-name{font-size:.4rem;color:#2c2c2c;}
.coupon-info{font-size:.32rem;color:#999;}
.coupon-date{font-size:.32rem;color:#999;margin-top:0.25rem}
.coupon-chose-logo{position:absolute;top:0.1rem;left:0.1rem;display:block;width:.4rem;height:.4rem;background:url("../../assets/chose-icon.png") no-repeat;background-size:contain;}

/*营销支持费，返利*/
.use-coupon-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.use-coupon-out{position:absolute;top:50%;left:50%;overflow:hidden;padding-top:.533rem;border-radius:.2666rem;background-color:#fff;transform:translate(-50%,-50%);}
.use-coupon-in{padding:0 .533rem 0 .533rem;}
.use-coupon--title{margin-bottom:.267rem;font-size:.4rem;color:#2c2c2c;}
.use-coupon-quota{width:7.6rem;height:1.067rem;border:1px solid #e0e0e0;border-radius:.133rem;}
.use-coupon-quota input{width:6.6667rem;height:1.067rem;font-size:.48rem;color:#333;border:none;text-indent:0.25rem;}
.use-coupon-quota span{color:#999;}
.use-coupon-info{margin-top:.2667rem;margin-bottom:.467rem;font-size:.32rem;color:#2c2c2c;}
.use-coupon-info span{color:#fc3036;}
.use-coupon-choose{width:100%;height:1.173rem;}
.use-coupon-choose span{display:block;float:left;width:50%;text-align:center;line-height:1.173rem;font-size:.4533rem;color:#2c2c2c;background-color:#f5f5f5;}
.use-coupon-choose span.active{color:#fff;background-color:#d5aa5c;}

/*购车协议*/
.buy-agreement-pupop{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.buy-agreement-in{position:relative;height:80%;margin:1.7067rem .5333rem 1.9333rem .5333rem;font-size:.4rem;border-radius:.1333rem;background-color:#fff;}
.buy-agreement-info{padding:.4rem .533rem .4rem .533rem;}
.buy-agreement-title{height:1.2rem;padding-left:.5333rem;color:#2c2c2c;line-height:1.2rem;border-bottom:1px solid #eee;}
.buy-agreement-con{color:#999;line-height:.6667rem;}
.buy-agreement-choose{position:absolute;bottom:0;width:100%;}
.buy-agreement-choose li{float:left;width:50%;height:1.173rem;text-align:center;line-height:1.173rem;font-size:.4267rem;color:#2c2c2c;background-color:#f5f5f5;}
.buy-agreement-choose li.active{color:#fff;background-color:#d5aa5c;}

.coupon-list{
    height:100%;
    overflow:hidden;
}

@keyframes myAnmaite
{
0% {transform:translateY(100%);opacity: 0}
100% {transform:translateY(0);opacity: 1}
}


.anmiteStatus {
    animation: myAnmaite 0.8s;
    animation-iteration-count:1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}

/*订购成功页面*/
.order-succeed{height:100%;padding:.5333rem .4rem 0 .4rem;background-color:#fff;}
.order-succeed-first{margin-bottom:1.067rem;font-size:.4rem;color:#2ac26e;font-weight:600;}
.order-first-logo{display:inline-block;width:.5333rem;height:.533rem;margin-right:.2667rem;vertical-align:bottom;background:url("../../assets/first-icon.png");background-size:100% 100%;}
.order-succeed-logo{display:inline-block;width:.4rem;height:.4rem;margin-left:.2133rem;vertical-align:bottom;background:url("../../assets/complete-icon.png");background-size:100% 100%;}
.order-succeed-second i{display:inline-block;width:.5333rem;height:.533rem;margin-right:.2667rem;vertical-align: bottom;background:url("../../assets/second-icon.png");background-size:100% 100%;}
.order-succeed-second span{color:#fc3D36;}
.order-succeed-second {font-size:.4rem;color:#2c2c2c;}
.order-succeed-info{margin:.5333rem .8rem .4rem .8rem;padding-top:.5333rem;border:1px solid #d5aa5c;}
.order-succeed-info p{margin-bottom:.4rem;font-size:.4rem;}
.order-succeed-info p span{display:block;float:left;width:2rem;padding-left:.2667rem;text-align:right;color:#999;}
.order-succeed-info p strong{display:block;margin-left:2rem;padding-right:.133rem;color:#2c2c2c;}
.order-succeed-info .order-send{height:1.2rem;margin-bottom:0;line-height:1.2rem;font-size:.4533rem;color:#fff;text-align:center;background-color:#d5aa5c;}
.order-succeed-info .color-disabled{background:#999}
.order-secceed-explain{margin:.4rem .8rem 0 .8rem;}
.order-secceed-explain li{margin-bottom:.1333rem;font-size:.32rem;color:#999;}
.order-succeed-third{font-size:.4rem;color:#2c2c2c;}
.order-succeed-third i{display:inline-block;width:.5333rem;height:.533rem;margin-right:.2667rem;background:url("../../assets/third-icon.png");background-size:100% 100%;}
.order-succeed-bottom{position:fixed;bottom:.533rem;left:.4rem;right:.4rem;}
.order-succeed-third{margin-top:1.0667rem;}
.order-succeed-bottom div{float:left;width:4.4rem;height:1.067rem;font-size:.4267rem;line-height:1.067rem;text-align:center;border-radius:.4rem;}
.order-to-apply{margin-right:.4rem;color:#2c2c2c;background-color:#f6f5fa;}
.order-to-check{color:#fff;background-color:#d5aa5c;}



/*订购失败*/
.order-failure{background-color:#fff;}
.order-failure-logo{margin-top:2.9333rem;text-align:center;}
.order-failure-logo img{width:4rem;height:4rem;}
.order-failure-message{font-size:.4rem;color:#2c2c2c;text-align:center;}
.order-failure-back{width:1.9333rem;height:1.0667rem;margin:.8rem auto 0;line-height:1.0667rem;text-align:center;border:1px solid #d5aa5c;border-radius:2.66rem;}


.dialog-content{
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    transform:translateX(100%);
}


@keyframes dialogAnimate
{
0% {transform:translateX(100%);opacity: 0}
100% {transform:translateX(0);opacity: 1}
}


.dialogAnimateStyle {
    animation: dialogAnimate 0.8s;
    animation-iteration-count:1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}


.agreemenIframe{
    width:100%;
    height:10rem;
    border:none;
}

.deposit-con{
    padding:0 0.4rem;
    background:#FFF;
    line-height:1.467rem;
    margin-bottom:0.4rem;
    font-size:0.4rem;
}

.deposit-con span{
    float:right;
}

/*是否使用弹窗样式*/
.balance-coupon-mask{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.8);
    position:fixed;
    left:0;
    top:0;
    z-index:203;
}
.balance-coupon-cancel-car{
    position:fixed;
    width:7.2rem;
    height:3.65rem;
    background:#fff;
    border-radius:0.133333rem;
    overflow:hidden;
    left:50%;
    top:50%;
    margin-top:-1.866667rem;
    margin-left:-3.6rem;
}
.balance-coupon-prompt-tit{
    text-align:center;
    font-size:0.4rem;
    color:#2c2c2c;
    margin:0.986667rem 0;
}
.balance-coupon-prompt-btn{
    background:#f5f5f5;
    overflow:hidden;
    height:1.173333rem;
    line-height:1.173333rem;
}
.balance-coupon-prompt-btn span{
    display:block;
    width:50%;
    float:left;
    text-align:center;
    font-size:0.453333rem;
}
.balance-coupon-prompt-btn span.balance-coupon-confirm{
    background:#d6ab55;
    color:#fff;
}
</style>

