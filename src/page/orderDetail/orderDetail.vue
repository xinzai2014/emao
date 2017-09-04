<template>
    <div>
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>订单详情
        </header>
        <section class="details-wrap">
          <div class="details-tit">
              <h4>
                <span v-if="orderInfo.status=='7'||orderInfo.status=='27'">剩余：{{orderInfo.remaining}}自动取消</span>
                <span v-if="orderInfo.status=='4'">{{orderInfo.remaining}}后，自动确认收货</span>
                {{orderInfo.state}}
              </h4>
              <p v-if="orderInfo.status=='27'">原因：{{orderInfo.auditInstructions}}</p>
          </div>
          <div class="details-addres" v-if="address.id" @click="toAddress">
              <div class="details-user">
                  <span>{{address.phone}}</span>收货人：{{address.name}}
              </div>
              <p>地址：{{address.address}}</p>
          </div>
          <div class="details-addres" v-if="!address.id" @click="toAddress">
              <i class="white-rt out"></i>
              添加收货地址
          </div>
          <div class="order-ct">
              <p class="order-number">
                  <span>{{time}}</span>订单号：{{orderInfo.orderNum}}
              </p>
              <div class="order-full">
                  <h3>{{orderInfo.name}}</h3>
                  <p class="interior">{{orderInfo.color}}</p>
                  <p class="payment"><em> ×1</em>全款购买：<span>{{orderInfo.price}}元</span></p>
              </div>
              <p class="leave" v-if="orderInfo.remark">
                  <span>买家留言：</span>{{orderInfo.remark||'未留言'}}
              </p>
              <p class="car-vin" v-if="orderInfo.status=='3'||orderInfo.status=='4'||orderInfo.status=='5'"><span>{{vinActive}}</span>车辆VIN码：{{orderInfo.vinNumber}}</p>
              <div class="settlement">
                  <p><span>￥{{capitalInfo.totalPrice}}</span>订单总价：</p>
                  <!--<p><span>-￥{{capitalInfo.deposit||'0.00'}}</span>已付保证金：</p>-->
                  <p><span>-￥{{capitalInfo.coupon}}</span>优惠券抵扣（不可开票）：</p>
                  <p><span>-￥{{capitalInfo.capital}}</span>营销支持费抵扣：</p>
                  <p><span>-￥{{capitalInfo.rebate}}</span>返利资金抵扣（不可开票）：</p>
                  <p v-if="orderInfo.status=='7'||orderInfo.status=='27'||orderInfo.status=='6'"><span>￥{{capitalInfo.deduction}}</span>需付款：</p>
                  <p v-else><span>￥{{capitalInfo.deduction}}</span>实付款：</p>
              </div>
          </div>
          <div class="request-ct" v-if="orderInfo.status!='6'">
              <p class="remit-tit">汇款信息</p>
              <div class="send-to" v-if="bankInfo.accountType!=2">
                       <p>
                          <label>汇款单位：</label>
                          <span>{{bankInfo.companyName}}</span>
                      </p>
                       <p>
                          <label>开户银行：</label>
                          <span>{{bankInfo.bankName}}</span>
                      </p>
                  <p class="send-phone" @click="sendMes" v-if="orderInfo.status=='7'||orderInfo.status=='27'">{{sendText}}</p>
                  <router-link :to="{name:'payment',params:{id:orderInfo.orderNum}}" v-if="orderInfo.status=='8'||orderInfo.status=='3'||orderInfo.status=='4'||orderInfo.status=='5'">
                    <p class="send-phone">查看详情</p>
                  </router-link>
              </div>
              <div class="send-to" v-if="bankInfo.accountType==2">
                  <p>
                      <label>付款人：</label>
                      <span>{{bankInfo.companyName}}</span>
                  </p>
                  <p>
                      <label>银行：</label>
                      <span>{{bankInfo.bankName}}</span>
                  </p>
                  <p class="send-phone" @click="sendMes" v-if="orderInfo.status=='7'||orderInfo.status=='27'">{{sendText}}</p>
                  <router-link :to="{name:'payment',params:{id:orderInfo.orderNum}}" v-if="orderInfo.status=='8'||orderInfo.status=='3'||orderInfo.status=='4'||orderInfo.status=='5'">
                    <p class="send-phone">查看详情</p>
                  </router-link>
              </div>
              <div class="nstructions" v-if="orderInfo.status!='8'&&orderInfo.status!='3'&&orderInfo.status!='4'&&orderInfo.status!='5'">
                  <span>汇款说明：</span>
                  <em>1.汇款后请上传汇款凭证</em>
                  <em>2.未按时间付款的订单系统将自动取消</em>
              </div>
              <p class="cancel" @click="PopShow" v-if="orderInfo.status=='7'||orderInfo.status=='27'">取消订单</p>
          </div>
          <p class="visib-98"></p>
          <div class="remits-fixed" v-if="orderInfo.status=='7'||orderInfo.status=='27'" @click="paymentSubmit">
             提交汇款凭证
          </div>
          <div class="remits-fixed active" v-if="orderInfo.status=='8'" >提交汇款凭证</div>
          <div class="remits-fixed" v-if="orderInfo.status=='4'" @click="confirmCar">确认收货</div>
      </section>
      <div class="mask" v-show="pop">
        <div class="cancel-car">
            <p class="prompt-tit">确认取消该订单？</p>
            <p class="prompt-btn"><span @click="hidePop">点错了</span><span class="confirm" @click="cancel">确认取消</span></p>
        </div>
     </div>
     <!-- 确认收货 -->
      <div class="mask-receipt" v-show="receiptShow">
          <div class="receipt">
              <div class="receipt-tit">
                  <b>{{receiptData.name}}</b>
                  <span>{{receiptData.color}}</span>
              </div>
              <p class="receipt-code">{{receiptData.vinNumber}}</p>
              <div class="options" v-if="receiptData.attachment">
                  <b>请确认随车附件：</b>
                  <p>{{receiptData.attachment}}</p>
              </div>
              <p class="prompt-btn"><span @click="hidePop">取消</span><span class="confirm" @click="receiptStatus">确认收货</span></p>
          </div>
      </div>

      <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
      <transition name="slide">
        <section class="fixed_box" v-if="success">
          <div class="brand-header-out">
              <header class="brand-list-header">
                  <i class="white-lt brand-left-cion" @click="hide_success"></i>
                  <strong class="brand-list-title">收货成功</strong>
              </header>
          </div>
          <section class="no-auto">
              <img src="../../assets/receipt-succeed.png" alt="">
              <p>收货成功</p>
              <p>可在 <router-link :to="{name:'declare'}"><span>售车申报</span></router-link>中查看并管理</p>
          </section>

        </section>
        </transition>
    </div>
</template>

<script>
import alertTip from '../../components/common/alertTip/alertTip'
export default {
  data () {
    return {
        orderInfo:{},
        address:{},
        bankInfo:{},
        capitalInfo:{},
        countNum:'',
        countTime:'',
        sendText:'发送到手机',
        pop:false,
        receiptShow:false,
        Token:sessionStorage.getItem('token'),
        receiptData:{},
        receiptShow:false,
         showAlert: false, //弹出框
          alertText: null, //弹出信息
          vinActive:'',
          success:false
    }
  },     components:{
        alertTip
      },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.go(-1);
    },
    hide_success(){
      this.success=false;
      this.fillData();
    },
    paymentSubmit(){
      this.$router.push({name:'paymentSubmit'});
      this.$store.dispatch("RETURN_DATA", // 通过store传值
        {
            orderNum:this.orderInfo.orderNum,
            orderId:this.orderInfo.id
        }
      );
    },
    confirmCar(){ //确认收货弹框信息
      this.receiptShow = !this.receiptShow;
      var data = {
          token:this.Token,
          orderNum:this.orderInfo.orderNum
      }
      this.$http({
          url:"order/full/receiptDetail",
          method:"GET",
          params:data
      }).then(function (response) {
        console.log(response)
        this.receiptData = response.body.data;
          console.log(this.receiptData)
      }).catch(function (error) {
          this.showAlert = true;
           this.alertText = error.body.msg||"请求失败了";
      });
    },
    receiptStatus(){
      this.receiptShow = !this.receiptShow;
      var data = {
          token:this.Token,
          goods_stock_id:this.receiptData.id
      }
      this.$http.post("order/full/receipt",data)
      .then(function (response) {
         this.showAlert = true;
        this.alertText = '确认收货成功！';
        this.success=true;
        //this.orderInfo.status='5';
        //this.orderInfo.state='交易完成';
      }).catch(function (error) {
          this.showAlert = true;
        this.alertText = error.body.msg||"请求失败了";
      });
    },
    toAddress(){
        //this.$router.push({name:'address'});
    },
    PopShow(){
      this.pop=true;
    },
    hidePop(){
      this.pop=false;
      this.receiptShow=false;
    },
    getQuery(){
      return this.$route.query.address;
    },
    cancel(){
      this.pop=false;
      var data={
        token:sessionStorage.token,
        order_num:this.orderInfo.orderNum
      }
      this.$http.post("order/full/cancel",data).then(function (response) {
        this.orderInfo.status=6;
        this.orderInfo.state='已取消';
      }).catch(function (error) {
          this.showAlert = true;
        this.alertText = error.body.msg||"请求失败了";
      });
      
    },
    sendMes(){
        this.$http.post("message/send",{
          token:sessionStorage.token,
          content:'汇款信息：'+'\n'+'汇款银行：'+this.bankInfo.bankName+'\n'+'公司名称:'+this.bankInfo.companyName+'\n'+'汇款账户:'+this.bankInfo.account,
          phone:''
        }).then(function (response) {
            var num=60;
            let timer = setInterval(()=>{
              num--;
              this.sendText = num+"s";
              if(!num){
                this.sendText = "发送到手机";
                clearInterval(timer);
                return false;
              }
            },1000);
        }).catch(function (error) {
            this.showAlert = true;
        this.alertText = error.body.msg||"请求失败了";
        });
    },
    remainingTime(item){
        clearInterval(item.timer);        
        item.timer = setInterval(() => {           
            if(item.remainingTime != 0) {              
              item.remainingTime = parseInt(item.remainingTime)-60;
              if (item.remainingTime <=0) {
                  clearInterval(item.timer);
                  item.status=6;
                  item.state='已取消';
              }
              this.countNum=item.remainingTime;
              item.remaining=this.remaining;  
            }
        }, 60000);
    } ,   
    fillData(){
        var order_num=this.$route.params.id;
        var dataToken = sessionStorage.token;
        var data = {
            token:dataToken,
            order_num:order_num
        }
        this.$http({
            url:"order/full/detail",
            method:"GET",
            params:data
        }).then(function (response) {
            if(this.getQuery()){
              this.setAddress(this.getQuery()); 
            }else{
              this.address=response.body.data.address;
            }
            this.bankInfo=response.body.data.bankInfo;
            for(var i in response.body.data.capitalInfo){
              response.body.data.capitalInfo[i]=Number(response.body.data.capitalInfo[i]).toLocaleString();
              var arr=response.body.data.capitalInfo[i].split('.');
              if(arr[1]){
                if(arr[1].length==2){
                  arr[1]=arr[1];
                }else if(arr[1].length==1){
                  arr[1]=arr[1]+'0';
                }else{
                  arr[1]=arr[1].substring(0,2);
                }
              }else{
                arr[1]='00';
              }
              response.body.data.capitalInfo[i]=arr.join('.');
            } 
            this.capitalInfo=response.body.data.capitalInfo;
            var orderInfo=response.body.data.orderInfo;
            this.stateAdd(orderInfo);  
            this.orderInfo=orderInfo;
            this.countTime=this.orderInfo.orderTime;
            
        }).catch(function (error) {
            this.showAlert = true;
        this.alertText = error.body.msg||"请求失败了";
        }); 
    },
    stateAdd(obj){
        switch (obj.status){
          case '7' : 
              obj.state='等待付款';
              if (obj.remainingTime=='0' || obj.remainingTime==''){
                  //obj.status=6;
                  //obj.state='已取消';
              }else{
                  this.countNum=obj.remainingTime;
                  obj.remaining=this.remaining;
                  this.remainingTime(obj);
              }
          break;
          case '27' : 
              obj.state='请重新提交';
              if (obj.remainingTime=='0' || obj.remainingTime==''){
                  //obj.status=6;
                  //obj.state='已取消';
              }else{
                  this.countNum=obj.remainingTime;
                  obj.remaining=this.remaining;
                  this.remainingTime(obj);
              }        
          break;
          case '8' : 
              obj.state='付款审核中,请耐心等待';
          break; 
          case '6' : 
              obj.state='已取消';
          break; 
          case '5' : 
              obj.state='交易完成';
              this.vinActive="已收货";
          break;
          case '3' : 
              obj.state='车辆出库中';
              this.vinActive="出库中";
          break;
          case '4' : 
              obj.state='车辆在途';
              this.vinActive="已发货";
              if (obj.remainingTime=='0' || obj.remainingTime==''){
                  //obj.status=5;
                  //obj.state='交易完成';
              }else{
                  this.countNum=obj.remainingTime;
                  obj.remaining=this.remaining;
              }
          break;
        }
          
    },   
    // 返回顶部
    backTop(){
      document.body.scrollTop=0;
    },
    setAddress(id){
      var id=id;
      var token=sessionStorage.getItem('token');
          var data = {
            token:token,
            id:id
        }
        this.$http({
            url:"dealer/detailById",
            method:"GET",
            params:data
        }).then(function (response) {
            var data={
              id:response.body.data.id,
              address:response.body.data.address,
              name:response.body.data.name,
              phone:response.body.data.phone,
            }
            this.address=data;
        }).catch(function (error) {
            this.showAlert = true;
        this.alertText = error.body.msg||"请求失败了";
        });
    },
      toDouble(num){
        if(num>9){
          return num;
        }else{
          return '0'+num;
        }
      }
  },
  mounted(){
    //组件初始完成需要做什么
    this.fillData();
    this.backTop();  
    
  },
  watch:{ 
    $route(){
        this.fillData();   
    }
  },
  computed: {
      //转换时间成小时,分
      remaining: function (){
          let days = parseInt(this.countNum/60/60/24);
          let hours = parseInt((this.countNum-days*3600*24)/60/60);
          let minutes = parseInt((this.countNum-hours*3600)/60);
          if (hours < 10) {
              days = '0' + days;
          }
          if (hours < 10) {
              hours = '0' + hours;
          }
          if (minutes < 10) {
              minutes = '0' + minutes;
          }

          if(days){
            return days + '天' + hours + '小时';
          }else{
            return hours + '小时' + minutes + '分钟';
          }
          
      },
      time:function(){
        var that=this;
        Date.prototype.toLocaleString = function() {
            return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " +that.toDouble( this.getHours()) + ":" +that.toDouble( this.getMinutes());
        };
        var time=new Date(parseInt(this.countTime)*1000).toLocaleString();
        return  time;
      }

  },
  beforeRouteLeave(to, from, next){
    next(vm => {
      /*if(to.name=='paymentSubmit'){
        to.query={
          'price':vm.orderInfo.price,
          'remark':vm.orderInfo.remark
         }
         console.log(to);
      }*/
    });
  }

}
</script>

<style>
.fixed_box{
  position:fixed;
  width:10rem;
  height:110%;
  top:0;
  bottom:0;
}
.brand-header-out {
    position: relative;
    z-index: 3;
}
.brand-list-header {
    overflow: hidden;
    height: 1.1733rem;
    text-align: center;
    line-height: 1.1733rem;
    font-size: .5333rem;
    color: #fff;
    background-color: #27282f;
}
.brand-left-cion {
    float: left;
    margin-left: .4666rem;
    margin-top: .4rem;
}
.no-auto p span {
    color: #d6ab55;
    border-bottom: 1px solid #d6ab55;
}
.no-auto{background-color: #fff;
    text-align: center;
    font-size: 0.453333rem;
    padding: 4.0rem 0;
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}
.details-addres .out.white-rt{
  top:0.62rem;
}
.details-wrap p{
  max-height: 99999px;
}
.pending p{
  text-align:center;
  font-size:0.453333rem;
  color:#999;
  margin-top:6.666667rem;
}
.details-tit{
  padding:0.533333rem 0.4rem;
  background:#d5aa5c;
}
.details-tit h4{
  font-size:0.506667rem;
  color:#fff;
  line-height:0.533333rem;
}
.details-tit h4 span{
  float:right;
  font-size:0.346667rem;
}
.details-tit p{
  font-size:0.346667rem;
  color:#fff;
  margin-top:0.533333rem;
}
.details-addres{
  padding:0.533333rem 1.066667rem 0.533333rem 0.4rem;
  background:#fff;
  margin-bottom:0.4rem;
  font-size:0.4rem;
  color:#2c2c2c;
  position:relative;
}
.details-user span{
  float:right;
}
.details-addres p{
  margin-top:0.533333rem;
}
.details-addres .white-rt{
  position:absolute;
  right:0.4rem;
  top:1.306667rem;
}
.order-ct{
  padding:0.533333rem 0.4rem;
  background:#fff;
}
.order-number{
  font-size:0.373333rem;
  color:#999;
  overflow:hidden;
  padding-bottom:0.533333rem;
  border-bottom:1px solid #e0e0e0;
}
.order-number span{
  float:right;
}
.leave{
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;
    padding: 0.533333rem 0;
}
.order-full h3 {
    font-size: 0.426667rem;
    padding: 0.3rem 0;
}
.order-full .interior {
    color: #999;
    font-size: 0.346667rem;
}
.order-full .payment {
    border-bottom: 1px solid #e0e0e0;
    color: #2c2c2c;
    font-size: 0.373333rem;
    padding: 0.533333rem 0;
}
.order-full .payment span{
    color: #fc3036;
}
.order-full .payment em{
  float:right;
}
.leave{
  font-size:0.32rem;
  color:#999;
}
.leave span{
  color:#2c2c2c;
}
.settlement{
  padding:0.533333rem 0;
  overflow:hidden;
}
.settlement p{
  font-size:0.373333rem;
  color:#999;
  margin-bottom:0.533333rem;
  overflow:hidden;
}
.settlement p span{
  float:right;
}
.settlement p:last-child{
  margin-bottom:0;
}
.settlement p:last-child{
  color:#2c2c2c;
}
.settlement p:last-child span{
  color:#fc3036;
}
.request-ct{
  padding:0.533333rem 0.4rem;
  background:#fff;
  margin-top:0.4rem;
}
.remit-tit{
  font-size:0.453333rem;
  padding-bottom:0.533333rem;
  border-bottom:1px solid #e0e0e0;
}
.send-to{
  border:1px solid #d5aa5c;
  margin:0.533333rem auto;
}
.send-to p{
  overflow:hidden;
  font-size:0.4rem;
  color:#2c2c2c;
  margin-top:0.533333rem;
}
.send-to p label,.send-to span{
  display:block;
  float:left;
}
.send-to p label{
  color:#999;
  width:2.266667rem;
  text-align:right;
}
.send-to span{
  width:6.333333rem;
  line-height: 0.65rem;
}
.send-to p.send-phone{
  font-size:0.453333rem;
  color:#fff;
  text-align:center;
  height:1.173333rem;
  line-height:1.173333rem;
  background: #dbdbdb;
}
.nstructions{
  color:#999;
  font-size:0.32rem;
  padding-bottom:0.4rem;
  border-bottom:1px solid #e0e0e0;
  line-height:0.6rem;
}
.nstructions span,.nstructions em{
  display:block;
}
.nstructions em{
  padding-left:0.266667rem;
}
.cancel{
  text-align:center;
  padding-top:0.4rem;
  font-size:0.453333rem;
  color:#2c2c2c;
  text-decoration:underline;
}
.mask{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.8);
  position:fixed;
  left:0;
  top:0;
}
.cancel-car{
  position:fixed;
  width:7.2rem;
  height:3.733333rem;
  background:#fff;
  border-radius:0.133333rem;
  overflow:hidden;
  left:50%;
  top:50%;
  margin-top:-1.866667rem;
  margin-left:-3.6rem;
}
.prompt-tit{
  text-align:center;
  font-size:0.453333rem;
  color:#2c2c2c;
  margin:0.986667rem 0;
}
.prompt-btn{
  background:#f5f5f5;
  overflow:hidden;
  height:1.173333rem;
  line-height:1.173333rem;
}
.prompt-btn span{
  display:block;
  width:50%;
  float:left;
  text-align:center;
  font-size:0.453333rem;
}
.prompt-btn span.confirm{
  background:#d6ab55;
  color:#fff;
}


.mask-receipt{
  width:100%;
  height:100%;
  position:fixed;
  left:0;
  top:0;
  background:rgba(0,0,0,0.8);
}
.receipt{
  width:7.2rem;
  position:fixed;
  left:50%;
  margin-left:-3.6rem;
  top:25%;
  background:#fff;
  border-radius:0.133333rem;
  overflow:hidden;
}
.receipt-tit{
  width:5.026667rem;
  height:2.053333rem;
  border-bottom:1px solid #2c2c2c;
  margin:0.533333rem auto;
  text-align:center;
}
.receipt-tit b{
  display:block;
  font-size:0.453333rem;
  color:#2c2c2c;
}
.receipt-tit span{
  display:block;
  font-size:0.32rem;
  color:#999;
  padding:0.133333rem 0;
}
.receipt-code{
  font-size:0.453333rem;
  color:#d6ab55;
  text-align:center;
  margin-bottom:0.533333rem;
}
.options{
  padding:0 0.533333rem;
  font-size:0.346667rem;
  color:#2c2c2c;
  padding-bottom:0.533333rem;
}
.options b{
  display:block;
  
}
.receipt-btn{
  font-size:0.453333rem;
  color:#fff;
  text-align:center;
  line-height:1.173333rem;
  background:#d6ab55;
}
.remits-fixed a{
  color:white;
}
.car-vin{
    border-bottom: 1px solid #e0e0e0;
    color: #2c2c2c;
    overflow:hidden;
    font-size:0.373333rem;
    padding: 0.533333rem 0;
}
.car-vin span{
  color:#999;
  float:right;
}
</style>
