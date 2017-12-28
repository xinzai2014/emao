<template>
  <div>
        <section>
            <!--公司认证-->
            <section class="company">
                    <div class="news">
                        <router-link to="/message">
                        <i class="news-icon"></i>
                        <span class="process-in" v-if="messageNum">{{messageNum}}</span>
                        </router-link>
                    </div>

                <div class="company-ct">
                    <div>
                      <router-link to="/profile/info">
                        <span class="white-rt" ></span>
                        <h3>{{name}}<!--<i class="company-icon" v-show="auth_status=='已完成认证'"></i>--></h3>
                        <p :class="type == 2 ? 'active':''">
                          <i></i><b v-if="type == 1">加盟店</b><b v-else>授权店</b>
                          <span class="auth_status" v-if="data_status">{{data_status}}</span>
                        </p>
                      </router-link>
                      <div v-if="showFlag && type == 1" class="empower-sata">
                          <router-link :to="routerLink">{{grantText}}<i></i><em></em></router-link>
                      </div>
                    </div>
                    <div class="company-bt">
                          <div class="item">
                            <router-link to="/rebate">
                              <b>{{rebate}}</b>
                              <span>返利</span>
                            </router-link>
                          </div>
                      <div class="item">
                          <router-link to="/marketing">
                            <b>{{capital}}</b>
                            <span>营销支持费</span>
                          </router-link>
                      </div>
                      <div class="item">
                        <router-link to="/coupon">
                           <b>{{coupon_num}}</b>
                           <span>优惠券</span>
                        </router-link>
                      </div>
                    </div>
                </div>
            </section>
            <!--我的订单-->
            <section class="order">
                    <div class="tit">
                      <router-link to="/order">
                        <h3><span href="javascript:;">全部订单<i class="yellow-rt"></i></span>全款购车</h3>
                      </router-link>
                    </div>
                    <div class="item">
                       <router-link to="/obliga">
                              <i class="payment-icon"><span class="process-in" v-if="payment_num!='0'">{{payment_num}}</span></i>
                              <span>待付款</span>

                      </router-link>
                    </div>
                    <div class="item">
                      <router-link to="/sending">
                        <i class="send-icon"><span class="process-in" v-if="delivered_num!='0'">{{delivered_num}}</span></i>
                        <span>待发货</span>
                      </router-link>
                    </div>
                    <div class="item">
                      <router-link to="/receiving">
                        <i class="receipt-icon"><span class="process-in" v-if="received_num!='0'">{{received_num}}</span></i>
                        <span>待收货</span>
                      </router-link>
                    </div>

            </section>
            <section class="order mar-pd">
                    <div class="item">
                      <router-link to="/display">
                        <i class="show-icon"></i>
                        <span>我的展车</span>
                      </router-link>
                    </div>
                <div class="item">
                  <router-link to="/declare">
                    <i class="car-icon"></i>
                    <span>售车申报</span>
                  </router-link>
                </div>
                <div class="item" v-show="is_transtor=='1'">
                  <router-link to="/storage" >
                    <i class="transfer-icon"></i>
                    <span>中转库管理</span>
                  </router-link>
                </div>

            </section>
        </section>

        <!--首页底部留白-->
        <p class="footer-bt"></p>
        <!--首页底部-->
        <footer class="index-fooer">
            <ul class="clearfix">
                <router-link to="/index" tag="li" class="index-order-car">
                        <i></i>
                        <span>订车</span>
                </router-link>
                <router-link to="/profile" tag="li" class="index-my active">
                        <i></i>
                        <span>我的</span>
                </router-link>
            </ul>
        </footer>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

        <transition name="router-slid">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import alertTip from '../../components/common/alertTip/alertTip'
export default {
  data () {
    return {
      //初始数据结构
      messageNum:0, //消息数
      name:'',  //公司名称
      auth_status:'',   //认证状态
      showFlag:2, //按钮是否显示 
      grantStatus:0, //授权审核状态
      type:1, //店铺类型 1加盟店 2授权店
      grantText:'',//授权状态文字
      rebate:'', //返利金额
      capital:'',    //营销支持费
      coupon_num:'', //优惠券
      payment_num:'',    //待付款
      delivered_num:'',  //待发货
      received_num:'',   //待收货
      is_transtor:'',  //是否是中转库管理员
      showAlert: false, //弹出框
      alertText: null, //弹出信息
      data_status:'',
      routerLink:''
    }
  },
  components:{
        alertTip
      },
  methods:{
    //组件方法
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
    }
  },
  mounted(){
    //组件初始完成需要做什么
    var dataToken = sessionStorage.token;
    var data = {
        token:dataToken
    }
    //资料是否齐全
    this.$http({
        url:"dealerInfo/dataStatus",
        method:"GET",
        params:data
     }).then(function (response) {
        if(response.body.data.data_status=="1"){
            // this.data_status='信息已完善';
            this.data_status='';
        }
        if(response.body.data.data_status=="2"){
            this.data_status='信息待完善';
        }
        if(response.body.data.data_status=="3"){
            // this.data_status='信息审核中';
            this.data_status='';
        }
        if(response.body.data.data_status=="4"){
            // this.data_status='信息驳回';
            this.data_status='信息未过审';
        }

      }).catch(function (error) {
        //this.showAlert = true;
        //this.alertText = error.body.msg||"请求失败了";
      });
    //用户信息
    this.$http({
        url:"dealerInfo/index",
        method:"GET",
        params:data
    }).then(function (response) {
        this.name = response.body.data.name;     //公司名称
        this.auth_status = response.body.data.auth_status;   //认证状态
        this.rebate = this.priceG(response.body.data.rebate);    //返利金额
        this.capital = this.priceG(response.body.data.capital);    //营销支持费
        this.coupon_num = response.body.data.coupon_num;   //优惠券
        this.payment_num = response.body.data.payment_num;   //待付款
        this.delivered_num = response.body.data.delivered_num;   //待发货
        this.received_num = response.body.data.received_num;    //待收货
        this.is_transtor = response.body.data.is_transtor;   //是否是中转库管理员
        //this.showFlag = Number(response.body.data.showFlag);    //按钮是否显示
        //this.grantStatus = Number(response.body.data.grantStatus);    //授权审核状态
        //this.type = Number(response.body.data.type);    //授权审核状态
        if(this.grantStatus == 0){
            this.grantText = '升级';
            this.routerLink = '/empowerGuide'
        }else if(this.grantStatus == 1){
            this.grantText = '授权店审核中';
            this.routerLink = '/empowerAudit'
        }else if(this.grantStatus == 2){
            this.grantText = '审核成功';
            this.routerLink = ''
        }else if(this.grantStatus == 3){
            this.grantText = '升级失败';
            this.routerLink = '/empower'
        }
      }).catch(function (error) {
        this.showAlert = true;
        this.alertText = error.body.msg||"请求失败了";
      });
    //消息数
      this.$http({
        url:"dealerMessage/messageList",
        method:"GET",
        params:data
     }).then(function (response) {
        var n=0;
        for(var i in response.body.data){
            n+=Number(response.body.data[i].num);
        }
        this.messageNum = n;
      }).catch(function (error) {
        this.showAlert = true;
        this.alertText = error.body.msg||"请求失败了";
      });
  }
}
</script>

<style>
.auth_status{
    padding:0.05rem 0.13rem ;
    background: #fe2c2d;
    color:white;
    border-radius:0.1rem;
    font-size: 0.32rem;
}
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
    min-height:6.893333rem;
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
    margin:0.2rem 0;
    font-size:0.32rem;
    line-height:0.346667rem;
    color:#999;
    padding:0 0.4rem;
}
.company-ct p b{
  font-weight:normal;
}
.company-ct p i{
    display:inline-block;
    width:0.24rem;
    height:0.29rem;
    background:url(../../assets/icon-s9.png) no-repeat;
    background-size:contain;
    margin-right:0.1rem;
    vertical-align:bottom;
}
.company-ct p.active{
  color:#d5aa5c;
}
.company-ct p.active i{
    background:url(../../assets/icon-s12.png) no-repeat;
    background-size:contain;
}
.empower-sata{
  display:inline-block;
  background:#dbaf61;
  border-radius:0.4rem;
  padding:0 0.6rem;
  font-size:0.32rem;
  height:0.66rem;
  line-height:0.666667rem;
  margin-left:0.4rem;
  margin-bottom:0.266667rem;
  position:relative;
}
.empower-sata a{
  display:block;
  color:#fff;
}
.empower-sata i{
  position:absolute;
  display:inline-block;
  width:0.4rem;
  height:0.146667rem;
  background:url(../../assets/icon-s11.png) no-repeat;
  background-size:contain;
  left:0.6rem;
  top:-0.1rem;
}
.company-ct em{
    display:inline-block;
    width:0.133333rem;
    height:0.226667rem;
    background:url(../../assets/icon-s10.png) no-repeat;
    background-size:contain;
    margin-left:0.133333rem;
    vertical-align:inherit;
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
.order .tit h3 span{
    float:right;
    font-size:0.373333rem;
    color:#f6b32e;
}
.order .tit h3 span i{
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
    background-size: 100%;
    width: 0.506667rem;
    height: 0.56rem;
}
.transfer-icon{
    background:url(../../assets/transfer-icon.png) center center no-repeat;
    background-size:100%;
    width: 0.506667rem;
    height: 0.56rem;
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


/*首页底部定位*/
.index-fooer{position:fixed;bottom:0;width:10rem;height:1.3066rem;background-color:#fff;}
.index-fooer ul li{float:left;width:50%;padding-top:.2666rem;text-align:center;cursor:pointer;}
.index-order-car{color:#2c2c2c;font-size:.2666rem;}
.index-order-car i{display:inline-block;width:.56rem;height:.4rem;margin:0 auto;background:url("../../assets/car-cion.png") no-repeat;background-size:contain;}
.index-order-car span{display:block;margin-top:.1333rem;}
.index-order-car.active i{background:url("../../assets/car-active-cion.png") no-repeat;background-size:contain;}
.index-order-car.active{color:#d5aa5c;}
.index-my{color:#2c2c2c;font-size:.2666rem;}
.index-my i{display:block;width:.4266rem;height:.4533rem;margin:0 auto;background:url("../../assets/my-cion.png") no-repeat;background-size:contain;}
.index-my span{display:block;margin-top:.1333rem;}
.index-my.active i{background:url("../../assets/my-active-cion.png") no-repeat;background-size:contain;}
.index-my.active{color:#d5aa5c;}

  .company a,.order a{
    display:block;
    width:100%;
    height:100%;
  }
</style>
