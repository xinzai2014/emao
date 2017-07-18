<template>
  <div>
        <section>
            <!--公司认证-->
            <section class="company">
                <router-link to="/message">
                    <div class="news">
                        <i class="news-icon"></i>
                        <span class="process-in">{{messageNum}}</span>
                    </div>
                </router-link>
                <div class="company-ct">
                    <router-link to="/profile/info">
                        <a class="white-rt" href="javascript:;"></a>
                        <h3>{{name}}<i class="company-icon" v-show="auth_status=='已完成认证'"></i></h3>
                        <p>
                            认证级别
                            <i v-for="n in level"></i>
                        </p>
                    </router-link>                   
                    <div class="company-bt">
                        <router-link to="/rebate">
                            <div class="item">
                                <b>{{rebate}}</b>
                                <span>返利</span>
                            </div>
                        </router-link>
                        <router-link to="/marketing">
                            <div class="item">
                                <b>{{capital}}</b>
                                <span>营销支持费</span>
                            </div>
                        </router-link>
                        <router-link to="/coupon">
                            <div class="item">
                                <b>{{coupon_num}}</b>
                                <span>优惠券</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </section>
            <!--我的订单-->
            <section class="order">
                <router-link to="/order">
                    <div class="tit"><h3><a href="javascript:;">查看全部<i class="yellow-rt"></i></a>我的订单</h3></div>
                </router-link>
                 <router-link to="/obliga">
                    <div class="item">
                        <i class="payment-icon"><span class="process-in">{{payment_num}}</span></i>
                        <span>待付款</span>
                    </div>
                </router-link>
                <router-link to="/sending">
                    <div class="item">
                        <i class="send-icon"><span class="process-in">{{delivered_num}}</span></i>
                        <span>待发货</span>
                    </div>
                </router-link>
                <router-link to="/receiving">
                    <div class="item">
                        <i class="receipt-icon"><span class="process-in">{{received_num}}</span></i>
                        <span>待收货</span>
                    </div>
                </router-link>
            </section>
            <section class="order mar-pd" v-show="is_transtor=='1'">
                <router-link to="/display">
                    <div class="item">
                        <i class="show-icon"></i>
                        <span>我的展车</span>
                    </div>
                </router-link>
                <router-link to="/declare">
                <div class="item">
                    <i class="car-icon"></i>
                    <span>售车申报</span>
                </div>
                </router-link>
                <router-link to="/storage">
                <div class="item">
                    <i class="transfer-icon"></i>
                    <span>中转库管理</span>
                </div>
                </router-link>
            </section>
            <p class="footer-bt"></p>
        </section>
        <transition name="router-slid">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      //初始数据结构
      messageNum:0, //消息数
      name:'',  //公司名称
      auth_status:'',   //认证状态
      level:'', //等级
      rebate:'', //返利金额
      capital:'',    //营销支持费
      coupon_num:'', //优惠券
      payment_num:'',    //待付款
      delivered_num:'',  //待发货
      received_num:'',   //待收货
      is_transtor:''    //是否是中转库管理员
    }
  },
  methods:{
    //组件方法
  },
  mounted(){
    //组件初始完成需要做什么
    var dataToken = sessionStorage.token;
    var data = {
        token:dataToken
    }
    //用户信息
    this.$http({
        url:"dealerInfo/index",
        method:"GET",
        params:data
    }).then(function (response) {
        this.name = response.body.data.name;     //公司名称
        this.auth_status = response.body.data.auth_status;   //认证状态
        this.level = response.body.data.level;    //等级
        this.rebate = response.body.data.rebate;    //返利金额
        this.capital = response.body.data.capital;    //营销支持费
        this.coupon_num = response.body.data.coupon_num;   //优惠券
        this.payment_num = response.body.data.payment_num;   //待付款
        this.delivered_num = response.body.data.delivered_num;   //待发货
        this.received_num = response.body.data.received_num;    //待收货
        this.is_transtor = response.body.data.is_transtor;   //是否是中转库管理员
      }).catch(function (error) {
        console.log("请求失败了");
      });
    //消息数
      this.$http({
        url:"dealerMessage/messageList",
        method:"GET",
        params:data
     }).then(function (response) {
        this.messageNum = response.body.data.length;    
      }).catch(function (error) {
        console.log("请求失败了");
      });
  }
}
</script>

<style>
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
/*公司认证*/
.company{
    background:url(../../assets/me-bg.jpg) no-repeat;
    background-size:contain;
    height:6.893333rem;
    width:10.0rem;
}
.news{
    height:1.173333rem;
    position:relative;
}
.news-icon{
    position:absolute;
    right:0.4rem;
    top:0.333333rem;
}
.process-in{
    color: #fff;
    background: red;
    position: absolute;
    top: 0.186667rem;
    right: 0.146667rem;
    padding:0.016667rem 0.133333rem;
    line-height: 0.346667rem;
    border-radius: 0.266667rem;
    font-size: 0.34rem;
}
.company-ct{
    background:#fff;
    width:9.2rem;
    overflow:hidden;
    margin:1.466667rem auto 0 auto;
    padding:0.533333rem 0;
    box-shadow:0 0.3px 6px 0.3px #f6b32e;
    position:relative;
}
.company-ct .white-rt{
    position:absolute;
    right:0.4rem;
    top:1.4rem;
}
.company-ct h3{
    font-size:0.506667rem;
    line-height:0.666667rem;
    font-weight:bold;
    color:#2c2c2c;
    padding:0 0.4rem;
}
.company-icon{
    display:inline-block;
    background:url(../../assets/company-icon.png) no-repeat;
    background-size:contain;
    width:1.28rem;
    height:0.533333rem;
    vertical-align:middle;
    margin-left:0.4rem;
}
.company-ct p{
    height:0.346667rem;
    margin:0.533333rem 0;
    font-size:0.346667rem;
    line-height:0.346667rem;
    color:#2c2c2c;
    padding:0 0.4rem;
}
.company-ct p i{
    display:inline-block;
    width:0.346667rem;
    height:0.346667rem;
    background:url(../../assets/stars-icon.png) no-repeat;
    background-size:contain;
    margin-right:14px;
    vertical-align:bottom;
}
.company-ct p i:first-child{
    margin-left:0.32rem;
}
.company-bt .item{
    width:3.066667rem;
    float:left;
    text-align:center;
}
.company-bt .item b,.company-bt .item span{
    display:block;
    line-height:0.426667rem;
}
.company-bt .item b{
    font-size:0.4rem;
    color:#666;
}
.company-bt .item span{
    font-size:0.346667rem;
    color:#999;
    margin-top:0.266667rem;
}

/*我的订单*/
.order{
    overflow:hidden;
    background:#fff;
    width:9.2rem;
    overflow:hidden;
    margin:0.4rem auto;
    box-shadow:0 0.3px 6px 0.3px #f6b32e;
}
.order .tit{
    font-size:0.506667rem;
    height:1.493333rem;
    border-bottom:1px solid #eeeeee;
    overflow:hidden;
}
.order .tit h3{
    height:0.533333rem;
    border-left:0.066667rem solid #000;
    line-height:0.533333rem;;
    padding:0 0.4rem;
    margin-top:0.466667rem;
}
.order .tit h3 a{
    float:right;
    font-size:0.373333rem;
    color:#f6b32e;
}
.order .tit h3 a i{
    margin-left:0.066667rem;
    vertical-align:middle;
}
.order .item{
    width:3.066667rem;
    float:left;
    text-align:center;
    position:relative;
    text-align:center;
    padding:0.533333rem 0;
}
.order .item span{
    display:block;
    font-size:0.346667rem;
    color:#999;
}
.order .item i{
    display:inline-block;
    margin-bottom:0.133333rem;
    position:relative;
}
.payment-icon{
    background:url(../../assets/payment-icon.png) no-repeat;
    background-size:contain;
    width:0.586667rem;
    height:0.48rem;
}
.send-icon{
    background:url(../../assets/send-icon.png) no-repeat;
    background-size:contain;
    width:0.586667rem;
    height:0.48rem;
}
.receipt-icon{
    background:url(../../assets/receipt-icon.png) no-repeat;
    background-size:contain;
    width:0.626667rem;
    height:0.48rem;
}
.show-icon{
    background:url(../../assets/show-icon.png) no-repeat;
    background-size:contain;
    width:0.506667rem;
    height:0.56rem;
}
.car-icon{
    background:url(../../assets/car-icon.png) no-repeat;
    background-size:contain;
    width:0.64rem;
    height:0.413333rem;
}
.transfer-icon{
    background:url(../../assets/transfer-icon.png) no-repeat;
    background-size:contain;
    width:0.56rem;
    height:0.48rem;
}
.order .item .process-in{
    color:#fff;
    border:0.053333rem solid #fff;
    right:-0.333333rem;
    top:-0.266667rem;
}
.mar-pd{
    padding:0.8rem 0;
}

</style>
