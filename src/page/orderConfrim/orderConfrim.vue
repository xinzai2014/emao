<template>

	<div>
    <!--首页-订单确认-头部-->
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion" @click="goback"></i>
        <strong class="brand-list-title">全款购车确认</strong>
    </header>
    <!--购车确认-->
    <!--购车确认-地址-姓名-->
    <section class="order-confirmation-address" @click="goAdressList">
        <div class="order-name-phone clearfix">
            <div class="order-name">
                收货人：<span>{{address.name}}</span>
            </div>
            <div class="order-phone">{{address.phone}} </div>
        </div>
        <div class="order-address">
            地址：<strong>{{address.address}}</strong>
            <i class="white-rt"></i>
        </div>
    </section>
    <!--购车确认-车型信息-->
    <section class="order-car-info">
        <p class="order-car-name">{{car.name}}</p>
        <span class="order-car-color">{{car.color}}/{{car.inColor}}</span>
        <div class="order-price-count clearfix">
            <div class="order-car-price">
                总价：<span>{{car.price|getMoney}}元</span>
            </div>
            <div class="order-car-count">X <span>1</span></div>
        </div>
        <div class="order-message">
            <span>买家留言：</span>
            <input type="text" v-model="remark" placeholder="选填（对此展车的相关说明）"/>
        </div>
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
            <div class="order-support-con" v-if="chooseMarket&&!checkMarket&&!updateMarket">可用￥<strong>{{marketingSupport.usable}}</strong></div>
            <div class="order-support-con" v-if="!chooseMarket">无可用</div>
            <div class="order-support-con" v-if="chooseMarket&&checkMarket&&!updateMarket">使用￥<strong>{{marketingSupport.usable}}</strong><span @click="showMarketDialog">调整</span></div>
            <div class="order-support-con" v-if="chooseMarket&&checkMarket&&updateMarket">-￥<strong>{{updateMarketData}}</strong><span @click="showMarketDialog">调整</span></div>
            <div class="order-suport-switch" v-if="chooseMarket">
                <input type="checkbox"  v-model="checkMarket" @click="changeMarket">
            </div>
        </div>
        <div class="order-support-fee clearfix">
            <div class="order-support-title">返利：</div>
            <div class="order-support-con" v-if="chooseRebate&&!checkRebate&&!updateRebate">可用￥<strong>{{rebate.usable}}</strong></div>
            <div class="order-support-con" v-if="!chooseRebate">无可用</div>
            <div class="order-support-con" v-if="chooseRebate&&checkRebate&&!updateRebate">使用￥<strong>{{rebate.usable}}</strong><span @click="showRebateDialog">调整</span></div>
            <div class="order-support-con" v-if="chooseRebate&&checkRebate&&updateRebate">-￥<strong>{{updateRebateData}}</strong><span @click="showRebateDialog">调整</span></div>
            <div class="order-suport-switch" v-if="chooseRebate">
                <input type="checkbox"  v-model="checkRebate" @click="changeRebate">
            </div>
        </div>
    </section>
    <!--购车确认-总额-->
    <section class="order-rental">
        <div class="order-rental-info">
            <span>应付金额</span>
            <p><strong>￥{{car.price|getMoney}}</strong></p>
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
            <span>还需支付</span>
            <p><strong>￥{{totalData|getMoney}}</strong></p>
        </div>
    </section>

    <!--确认提交-->
    <section class="order-present-info">
        <div class="order-present" @click="showAgreementDialog">确认提交</div>
        <div class="order-price">
            需支付：
            <strong>￥{{totalData|getMoney}}</strong>
        </div>
    </section>
    
    <!-- 选择优惠券 -->
	<section class="coupon-popup"  :class="{anmiteStatus:coupon.length>0&&showCoupon}" @click="closeCouponDialog">
        <div class="coupon-in">
            <div class="coupon-title">
                <p>请选择1张优惠券</p>
                <i @click.stop="closeCouponDialog"></i>
            </div>
            <div class="coupon-list" id="couponList">
                <ul class="coupon-con">
                    <li v-for="(item,index) in coupon" :couponId="item.id" @click.stop="chooseCoupon(index,item.id)">
                        <dl class="clearfix">
                            <dt>¥ {{item.price}}</dt>
                            <dd>
                                <p class="coupon-name">{{item.name}}</p>
                                <p class="coupon-info">{{item.detail}}</p>
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
                <p class="use-coupon-info">共 <span>{{marketingSupport.total}}</span>元，本次最多可用 <span>{{marketingSupport.usable}}</span>元</p>
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
            <p class="buy-agreement-title">一猫特约经销商购车协议</p>
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

    <div class="dialog-content" v-if="showSuccessResult" :class="{dialogAnimateStyle:showSuccessResult}">
        <!--首页-订单确认-头部-->
        <header class="brand-list-header">
            <i class="white-lt brand-left-cion" @click="goback"></i>
            <strong class="brand-list-title">订购成功</strong>
        </header>
        <!--订购成功-->
        <section class="order-succeed">
            <p class="order-succeed-first"><i class="order-first-logo"></i>订购成功 <i class="order-succeed-logo"></i></p>
            <div class="order-second-out">
                <p class="order-succeed-second"><i></i>请在 <span>24小时</span>内汇款至以下银行账户</p>
                <div class="order-succeed-info">
                    <p class="clearfix"><span>汇款银行：</span><strong>{{successData.bankName}}</strong></p>
                    <p class="clearfix"><span>公司名称：</span><strong>{{successData.companyName}}</strong></p>
                    <p class="clearfix"><span>账号：</span><strong>{{successData.account}}</strong></p>
                    <p class="order-send" @click="sendMessage" :class='{"color-disabled":disabled}'>{{codeText}}</p>
                </div>
                <ul class="order-secceed-explain">
                    <li>汇款说明：</li>
                    <li>1.汇款后请上传汇款凭证</li>
                    <li>2.未按时间付款的订单系统将自动取消</li>
                </ul>
            </div>
            <p class="order-succeed-second order-succeed-third"><i></i>一猫确认收款后发货</p>
        </section>
        <section class="order-succeed-bottom clearfix">
            <div class="order-to-apply" @click="goIndex">返回订车页</div>
            <div class="order-to-check" @click="goDetail(successData.orderNum)">查看详情</div>
        </section>
    </div>

    <alert-tip v-if="showAlert" @closeTip = "showAlert = false" :alertText="alertText"></alert-tip>
</div>

</template>

<script>
import BScroll from 'better-scroll';
import alertTip from '../../components/common/alertTip/alertTip'
export default {
	  name: 'orderConfrim',
	  data () {
	    return {
            serieId:null, //车系ID值，返回用
	    	initData:null, //初始化路由带过来的数据
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
            showSuccessResult:false,
            successData:null,
            showAlert:false,
            alertText:"",
            messageData:{},
            codeText:"发送到手机", //下单成功后发送短信到手机
            num:60, //下单成功后倒计时
            disabled:false,
            routerAddress:false
 	    }
	  },
	  methods:{
        goback(){
            this.$router.push("/serie/" + this.serieId);
        },
        goIndex(){
            this.$router.push("/index");
        },
        goDetail(id){
            this.$router.push("/orderDetail/" + id);
        },
        goAdressList(){
            this.$router.push("/profile/info/address");
        },
	  	getData(){
			this.$http({
		          url:"order/full/confirm",
		          method:"GET",
		          params:this.initData
		      }).then(function (response) {
		      	   var data = response.body.data;
		           if(this.routerAddress){
                        this.address = this.$store.state.defaultAdress;
                   }else{
                        this.address = data.address;
                   }
		           this.car = data.car;
                   var coupon = data.coupon;
                   coupon.forEach(function(ele,index){ //初始化优惠券选中值
                        ele.check = false;
                   })
		           this.coupon = coupon;
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
                   this.formData.total_price = data.car.price;
                   this.formData.address_id = data.address.id;
		        },function(){

		        })
	  	},
        showCouponDialog(){ //显示优惠券弹窗
            this.showCoupon = !this.showCoupon;
            this.initIscroll("couponList",this.scrollWrap);
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
        changeMarket(){ //切换营销支持费checkbox
            var check = this.checkMarket; //点击获取的时候是基础值
            if(check){
                this.checkMarket = false ;
                this.updateMarket = false ;
                this.updateMarketData = 0;
            }else{
                this.checkMarket = true; 
                this.updateMarketData = parseInt(this.marketingSupport.usable);
            }
        },
        showMarketDialog(){ //营销支持费弹出窗
            this.showMarket = !this.showMarket;
        },
        closeMarketDialog(){ //关闭营销支持费弹出窗
            this.showMarket = !this.showMarket;
        },
        marketConfrim(){   //营销支持费弹出窗确认按钮
            if(parseInt(this.marketData)>parseInt(this.marketingSupport.usable)){
                this.showAlert = true;
                this.alertText="营销支持费不能大于" + this.marketingSupport.usable;
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
             if(parseInt(this.rebateData)>parseInt(this.rebate.usable)){
                this.showAlert = true;
                this.alertText="返利不能大于" + this.rebate.usable;
                return false;
            }
            this.showRebate = !this.showRebate;
            this.updateRebate = true;
            this.updateRebateData = this.rebateData;
        },
        changeRebate(){ //切换营销支持费checkbox
            var check = this.checkRebate; //点击获取的时候是基础值
            if(check){
                this.checkRebate = false ;
                this.updateRebate = false ;
                this.updateRebateData = 0;
            }else{
                this.checkRebate = true; 
                this.updateRebateData = parseInt(this.rebate.usable);
            }
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
        sumbitOrder(){ //提交表单
            this.closeAgreementDialog();
            this.formData.deduction = this.totalData;
            this.formData.remark = this.remark;

            this.formData.coupon_price = this.couponData.price?this.couponData.price:0;//优惠券减免
            this.formData.coupon_id = this.couponData.id?this.couponData.id:0;
            this.formData.capital_price = this.updateMarketData>0?this.updateMarketData:0;
            this.formData.rebate_price = this.updateRebateData>0?this.updateRebateData:0;
            this.$http.post(
                "order/full/create?token="+sessionStorage.token,
                this.formData).then(function (response) {
                    this.showSuccessResult = true;
                    this.successData = response.body.data;
              },function(){
            });
        },
        initIscroll(id,scrollWrap){ //初始化滚动容器
            setTimeout(function(){
                 scrollWrap = new BScroll(document.getElementById(id),{
                   probeType: 3,
                   click:true
                });
            },1000) 
        },
        sendMessage(){  //发送成功短信
            if(this.disabled){
                return false;
            }
            this.messageData["token"] = sessionStorage.token;
            this.messageData["phone"] = this.address.phone;
            this.messageData["content"] = "【一猫汽车】您已提交订单，请在24小时内汇款，逾期订单取消需重新下单。汇款银行：" + 
                this.successData.bankName+ ",账号：" + 
                this.successData.account + ",公司名称：" + 
                this.successData.companyName + "如有疑问可拨打客服：400-000-1234。"
            this.$http.post(
                  "message/send",
                  this.messageData,
              ).then(function (response) {
                this.setCode();
            },function(){

            })
        }, 
        setCode(){ //验证码效果
            this.codeText = this.num+"s";
            this.disabled = true;
            var that = this;
            window.timer = window.setInterval(()=>{
                that.num--;
                that.codeText = this.num+"s";
                this.disabled = true;
                if(!this.num){
                    this.codeText = "发送到手机";
                    this.num = 60;
                    this.disabled = false;
                    window.clearInterval(window.timer);
                    return false;
                }
            },1000);
        },
	  },
	  mounted(){
        console.log(this.$store.state.defaultAdress);
        console.log(this.$store.state.fullPaymentData);
        console.log(this.$router.currentRoute.query);
        this.serieId = this.$router.currentRoute.query.serieId;
	  },
      filters:{
        getMoney:function(num){
            if(isNaN(num)){
                num = 0;
            }
            return parseInt(num).toFixed(2);
        }
      },
      components:{
        alertTip
      },
      computed:{
        totalData:function(){
            var couponPrice = this.couponData.price?this.couponData.price:0;//优惠券减免
            var marketPrice = this.updateMarketData>0?this.updateMarketData:0;
            var rebatePrice = this.updateRebateData>0?this.updateRebateData:0;
            return this.car.price - couponPrice - marketPrice - rebatePrice;
        }
      },
	  beforeRouteEnter (to, from, next) {
		  next(vm => {
		    // 通过 `vm` 访问组件实例

            vm.initData = vm.$store.state.fullPaymentData; //从vuex中获取
            vm.address = vm.$store.state.defaultAdress; //从vuex中获取
		    //vm.initData = vm.$router.currentRoute.query; //从路由中获取
		    vm.initData.token = sessionStorage.token;
		    vm.getData();
            //保存提交信息
            vm.formData.auto_id =  vm.initData.autoId;         //车型ID
            vm.formData.ext_color_id =  vm.initData.colorId;   //外观颜色
            vm.formData.int_color_id =  vm.initData.inColorId; //内饰颜色

            if(from.name=='address'){
                    vm.routerAddress = true;
                }else{
                    vm.routerAddress = false;
                }
		  })
		}
}
</script>

<style>

.brand-header-out{position:relative;z-index:3;}
.brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;}
.brand-left-cion{float:left;margin-left:.4666rem;margin-top:.4rem;}
.brand-switch{float:right;margin-right:.4666rem;font-size:.4rem;color:#d5aa5c;}
.brand-list-open{position:absolute;z-index:4;width:10rem;top:1.1733rem;left:0;background-color:#fff;}
	/*订单确认*/
.order-confirmation-address{padding:.533rem .4rem;margin-bottom:.4rem;font-size:.4rem;color:#2c2c2c;background-color:#fff;}
.order-name{float:left;}
.order-phone{float:right;margin-right:.7733rem;}
.order-address{position:relative;margin-top:.4rem;padding-right:.4rem;}
.order-address i{position:absolute;top:0;right:.1333rem;}
.order-car-info{background-color:#fff;padding:.5333rem .4rem;margin-bottom:.4rem;}
.order-car-name{font-size: .42667rem;color: #000;font-weight:600;}
.order-car-color{display:block;margin-top:.1333rem;font-size: .3467rem;color: #999;}
.order-price-count{margin-top:.4667rem;margin-bottom:.4rem;font-size:.3733rem;}
.order-car-price{float:left;color:#2c2c2c;}
.order-car-price span{color:#fc3036;}
.order-car-count{float:right;color:#999;}
.order-car-count span{}
.order-message{padding:.4rem 0;color:#2c2c2c;font-size:.3733rem;border-top:1px solid #e0e0e0;}
.order-message input{display: inline-block;height: 0.75rem;width: 7rem;line-height: 0.75rem;color: #999;border: none;}
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
.order-suport-switch{float:right;margin-right:0;width: .6933rem;font-size:0;}
.order-suport-switch input{-webkit-tap-highlight-color: rgba(0,0,0,0);-webkit-appearance: none;appearance: none;position: relative;width: .6933rem;height: .4267rem; border: 1px solid #dfdfdf;outline: 0;border-radius: 16px; box-sizing: border-box;
     background-color: #dfdfdf;  -webkit-transition: background-color .1s,border .1s;  transition: background-color .1s,border .1s;-webkit-tap-highlight-color: rgba(0,0,0,0);}
.order-suport-switch input:checked{border-color: #04be02;background-color: #04be02;}
.order-suport-switch input:after,.order-suport-switch input:before{content: " ";position: absolute;top: 0;left: 0;height:.4rem;border-radius:.2rem;-webkit-transition: -webkit-transform .3s;}
.order-suport-switch input:before{width: .667rem; background-color: #fdfdfd;}
.order-suport-switch input:checked:before{transform: scale(0);}
.order-suport-switch input:after{width: .4rem;background-color: #fff;transition: transform .35s cubic-bezier(.4,.4,.25,1.35),-webkit-transform .35s cubic-bezier(.4,.4,.25,1.35);}
.order-suport-switch input:checked:after{transform: translateX(.2667rem);}
/*checkbox按钮结束*/
.order-rental{margin-bottom:1.667rem;padding:.533rem .4rem;font-size:.3467rem;background-color:#fff;}
.order-rental-info{height:.8667rem;line-height:.8667rem;}
.order-rental-info span{display:block;float:left;color:#999;}
.order-rental-info p{float:right;}
.order-rental-info strong{color:#2c2c2c;}
.order-present-info{position:fixed;bottom:0;width:10rem;background-color:#fff;}
.order-present{float:right;width:3rem;height:1.2667rem;text-align:center;line-height:1.2667rem;font-size:.3467rem;color:#fff;background-color:#d5aa5c;}
.order-price{float:right;height:1.2667rem;margin-right: .4rem;line-height: 1.2667rem;font-size:.3467rem;color:#2c2c2c;}
.order-price strong{font-size:.4267rem;color:#fc3036;}


/*选择优惠券-浮层*/
.coupon-popup{position:fixed;z-index:2;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);transform:translateY(100%);}
.coupon-in{position:fixed;bottom:0;width:10rem;background-color:#f5f5f5;height:65%}
.coupon-title{position:relative;height:1.533rem;padding-left:.4rem;font-size:.5067rem;color:#000;line-height:1.5333rem;}
.coupon-title i{display:block;position:absolute;top:.5333rem;right:.4667rem;width:.3733rem;height:.3733rem;background:url("../../assets/close.png") no-repeat;background-size:contain;}
.coupon-con{padding: 0 .533rem .5333rem .533rem;}
.coupon-con li{position:relative;width:9.1467rem;height:2.9467rem;margin-top:.4rem;background:url("../../assets/coupon-bg.png") no-repeat;background-size:100% 100%;}
.coupon-con dt{float:left;width:2.7733rem;height:2.7733rem;text-align:center;line-height:2.7733rem;font-size:.533rem;color:#d5aa5c;}
.coupon-con  dd{margin-left:2.7733rem;padding:.4rem;}
.coupon-name{font-size:.4rem;color:#2c2c2c;}
.coupon-info{font-size:.32rem;color:#999;}
.coupon-date{font-size:.32rem;color:#999;}
.coupon-chose-logo{position:absolute;top:-.1333rem;left:-.1333rem;display:block;width:.4rem;height:.4rem;background:url("../../assets/chose-icon.png") no-repeat;background-size:contain;}

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
</style>

