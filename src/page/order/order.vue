<template>
    <div v-if="loading">
        <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>全部订单
        </header>
        <!--全部订单-->
        <section v-if="orderList.length">
          <div class="full-wrap" v-load-more="loaderMore" v-infinite-scroll="loaderMore" infinite-scroll-disabled="preventRepeatReuqest" infinite-scroll-distance="10">
              <div class="full-item" v-for="(item,index) in orderList">
                <router-link :to="{name:'orderDetail',params:{id:item.orderNum}}">
                  <h3>{{item.name}}</h3>
                  <p class="interior">{{item.color}}</p>
                  <p class="payment" v-if="item.status=='7'||item.status=='27'||item.status=='6'">
                   需付款：
                    <span>{{priceG(item.price)}}元</span>
                  </p>  
                  <p class="payment" v-else>
                    已付款：
                    <span>{{priceG(item.price)}}元</span>
                  </p>                 
                </router-link>
                <div class="full-state">
                      <div class="state-lt" :class="{'wait-active':item.status=='7'||item.status=='27'}">
                          <p class="state-wait">{{item.state}}</p>
                          <p class="state-time">剩余：{{item.remaining}}自动取消</p>
                      </div>
                      
                      <div class="state-rt" v-if="item.status=='7'||item.status=='27'" @click="paymentSubmit(item)">
                        提交汇款凭证
                      </div>
                      <!--
                      <div class="state-rt active" v-if="item.status=='8'" @click="paymentSubmit">
                        提交汇款凭证
                      </div>
                      -->

                      <div class="state-rt" v-if="item.status=='4'" @click="confirmCar(item)">
                        确认收货
                      </div>
                  </div>
              </div>
          </div>
          <transition name="loading">
            <div v-show="showLoading">正在加载中</div>
          </transition>
          <p v-if="touchend" class="empty_data">没有更多了</p>
        </section>

        <section class="no-auto server-no-response" v-if="!orderList.length">
            <img src="../../assets/no-order.png" alt="">
            <p>暂无此类订单</p>
        </section>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        
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
        orderList:[],
        currentPage:'1',
        lastPage:'0',
        perPage:'10',
        touchend: false,
        preventRepeatReuqest: false,
        showLoading: true,
        countNum:0,
        showAlert: false, //弹出框
          alertText: null, //弹出信息
          receiptData:{},
        receiptShow:false,
        success:false,
        loading:false

    }
  },     components:{
        alertTip
      },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.push({name:'profile'});
    },
    hide_success(){
      this.success=false;
      this.fillData();
    },
    hidePop(){
      this.receiptShow=false;
    },
    paymentSubmit(item){
      this.$router.push({name:'paymentSubmit'});
      this.$store.dispatch("RETURN_DATA", // 通过store传值
        {
            orderNum:item.orderNum,
            orderId:item.id
        }
      );
    },
    priceG(price){
        price=Number(price).toLocaleString();
        var arr=price.split('.');
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
        price=arr.join('.');
        return price;
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
    confirmCar(item){ //确认收货弹框信息
      this.receiptShow = !this.receiptShow;
      var data = {
          token:sessionStorage.token,
          orderNum:item.orderNum
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
          token:sessionStorage.token,
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
    fillData(){
        var dataToken =sessionStorage.token;
        var data = {
            token:dataToken,
            perPage:this.perPage,
            page:this.currentPage,            
        }
        this.$http({
            url:"order/full/index",
            method:"GET",
            params:data
        }).then(function (response) {
            this.loading=true;
            var orderList=response.body.data.list;
            this.stateAdd(orderList);
            this.orderList=this.orderList.concat(orderList);
            this.currentPage=response.body.data.page.currentPage;
            this.lastPage=response.body.data.page.lastPage;
            this.perPage=response.body.data.page.perPage;
            this.hideLoading();
            this.preventRepeatReuqest = false;
            if (this.currentPage === this.lastPage) {
              this.touchend = true;
              return
            }
        }).catch(function (error) {
             this.showAlert = true;
           this.alertText = error.body.msg||"请求失败了";
        });
    },
    stateAdd(arr){
      for(var i=0;i<arr.length;i++){
          switch (arr[i].status){
            case '7' : 
                arr[i].state='待付款';
                if (arr[i].remainingTime=='0' || arr[i].remainingTime=='') {
                    //arr[i].status=6;
                    //arr[i].state='已取消';
                }else{
                    this.countNum=arr[i].remainingTime;
                    arr[i].remaining=this.remaining;
                    this.remainingTime(arr[i]);
                }
            break;
            case '27' : 
                arr[i].state='请重新提交';
                if (arr[i].remainingTime=='0' || arr[i].remainingTime=='') {
                    //arr[i].status=6;
                    //arr[i].state='已取消';
                }else{
                    this.countNum=arr[i].remainingTime;
                    arr[i].remaining=this.remaining;  
                    this.remainingTime(arr[i]); 
                }         
            break;
            case '8' : 
                arr[i].state='付款审核中';
            break; 
            case '6' : 
                arr[i].state='已取消';
            break; 
            case '5' : 
                arr[i].state='交易完成';
            break;
            case '3' : 
                arr[i].state='车辆出库中';
            break;
            case '4' : 
                arr[i].state='车辆在途';
            break;
          }
          
      }
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
    },   
    // 返回顶部
    backTop(){
      animate(document.body, {scrollTop: '0'}, 400,'ease-out');
    },
    hideLoading(){
      this.showLoading = false;
    },
    loaderMore(){
      if (this.touchend) {
        return
      }
      //防止重复请求
      if (this.preventRepeatReuqest) {
        return 
      }
      this.showLoading = true;
      this.preventRepeatReuqest = true;

      this.currentPage=parseInt(this.currentPage)+1;
      this.fillData();   
    }
  },
  mounted(){
    //组件初始完成需要做什么
    this.fillData();
  },
  computed: {
      //转换时间成小时,分
      remaining: function (){          
          let hours = parseInt(this.countNum/60/60);
          let minutes = parseInt((this.countNum-hours*3600)/60);
          if (hours < 10) {
              hours = '0' + hours;
          }
          if (minutes < 10) {
              minutes = '0' + minutes;
          }
          return hours + '小时' + minutes + '分钟';
      }        
  },
  watch:{ 
    $route(){
        this.fillData();
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      if(from.name=='declare'){
        vm.success=true;
      }
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
  z-index: 300;
}
.brand-header-out {
    position: relative;
    z-index: 3;
}
.no-auto p span {
    color: #d6ab55;
    border-bottom: 1px solid #d6ab55;
}
.full-wrap{
  height: 100%;
}
.no-auto{
    text-align: center;
    font-size: 0.453333rem;
    padding: 4.0rem 0;
    position: absolute;
    width: 100%;
    left: 0;
    }
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}
.full-wrap{
  height: 100%;
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

/*全部订单*/
.full-item{
  padding:0.533333rem 0.4rem;
  border-bottom:1px solid #2c2c2c;
  overflow:hidden;
  background:#fff;
}
.full-item:last-child{
  border-bottom:none;
}
.full-item p{
  max-height:9999px;
}
.full-item h3{
  font-size:0.426667rem;
}
.full-item .interior{
  font-size:0.346667rem;
  color:#999;
  margin-top:0.266667rem;
}
.full-item .payment{
  font-size:0.373333rem;
  color:#2c2c2c;
  /*border-bottom:1px solid #e0e0e0*/
    padding:0.533333rem 0;
}
.full-item .payment span,.state-wait{
  color:#fc3036;
}
.full-state{
  height:1.066667rem;
  overflow:hidden;
  /*margin-top:0.533333rem;*/
}
.state-lt{
  float:left;
  width:6.266667rem;
  line-height:0.533333rem;
  font-size:0.373333rem;
}
.state-time{
  font-size:0.32rem;
  color:#999;
}
.state-rt{
  float:left;
  width:2.773333rem;
  height:1.066667rem;
  line-height:1.066667rem;
  text-align:center;
  color:#fff;
  font-size:0.373333rem;
  background:#d5aa5c;
  border-radius:0.533333rem;
}
.state-rt a{
  color:#fff;
}
.state-wait{
  line-height: 1.4rem;
}
.state-rt.active{
  background:#cccccc;
}
.wait-active .state-wait{
  line-height: 0.68888888rem;
}
.loading-enter-active, .loading-leave-active {
    transition: opacity 1s
  }
  .loading-enter, .loading-leave-active {
    opacity: 0
  }
.empty_data{
    color:#666;
    text-align: center;
    line-height: 2rem;
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
.prompt-btn{
  background:#f5f5f5;
  overflow:hidden;
  height:1.173333rem;
  line-height:1.173333rem;
} 
</style>
