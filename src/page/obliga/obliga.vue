<template>
    <div>
        <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>全部订单
        </header>
        
        <section v-if="orderList.length">
          <div class="full-wrap" v-load-more="loaderMore" v-infinite-scroll="loaderMore" infinite-scroll-disabled="preventRepeatReuqest" infinite-scroll-distance="10">
              <div class="full-item" v-for="(item,index) in orderList" v-if="item.status=='7'">
                <router-link :to="{name:'orderDetail',params:{id:item.orderNum}}">
                  <h3>{{item.name}}</h3>
                  <p class="interior">{{item.color}}</p>
                  <p class="payment">需付款：<span>{{item.price}}元</span></p>
                  <div class="full-state">
                      <div class="state-lt" :class="{'wait-active':item.status=='7'}">
                          <p class="state-wait">{{item.state}}</p>
                          <p class="state-time">剩余：{{item.remaining}}自动取消</p>
                      </div>
                      <div class="state-rt" v-if="item.status=='7'">
                        <router-link to="/paymentSubmit">提交汇款凭证</router-link>
                      </div>
                  </div>
                </router-link>
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
    }
  },
        components:{
        alertTip
      },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.push({name:'profile'});
    },
    fillData(){
        var dataToken =sessionStorage.token;
        var data = {
            token:dataToken,
            perPage:this.perPage,
            page:this.currentPage,            
        }
        this.$http({
            url:"order/full/pendingPayment",
            method:"GET",
            params:data
        }).then(function (response) {
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
                if (arr[i].remainingTime=='0' || arr[i].remainingTime==''){
                    //arr[i].status=6;
                    //arr[i].status='已取消';
                }else{
                    this.countNum=arr[i].remainingTime||0;
                    arr[i].remaining=this.remaining;
                    this.remainingTime(arr[i]);
                }     
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
    /*返回顶部
    backTop(){
      animate(document.body, {scrollTop: '0'}, 400,'ease-out');
    },*/
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
  }
}
</script>

<style>
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
  border-bottom:1px solid #e0e0e0;
  padding:0.533333rem 0;
}
.full-item .payment span,.state-wait{
  color:#fc3036;
}
.full-state{
  height:1.066667rem;
  overflow:hidden;
  margin-top:0.533333rem;
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
  line-height:1.066667rem;
}
.state-rt.active{
  background:#cccccc;
}
.wait-active .state-wait{
  line-height:0.533333rem;
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
</style>
