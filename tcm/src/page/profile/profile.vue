<template>
  <div>
        <!--公司认证-->
        <section class="company">
            <div class="news">
                <i class="news-icon"></i>
                <span class="process-in">6</span>
            </div>
            <div class="company-ct">
                <a class="white-rt" href="javascript:;"></a>
                <h3>北京一猫信息科技有限公司<i class="company-icon"></i></h3>
                <p>认证级别<i></i><i></i><i></i></p>
                <div class="company-bt">
                    <div class="item">
                        <b>0.00</b>
                        <span>返利</span>
                    </div>
                    <div class="item">
                        <b>1,000.00</b>
                        <span>营销支持费</span>
                    </div>
                    <div class="item">
                        <b>1</b>
                        <span>优惠券</span>
                    </div>
                </div>
            </div>
        </section>
        <!--我的订单-->
        <section class="order">
            <div class="tit"><h3><a href="javascript:;">查看全部<i class="yellow-rt"></i></a>我的订单</h3></div>
            <div class="item">
                <i class="payment-icon"><span class="process-in">12</span></i>
                <span>待付款</span>
            </div>
            <div class="item">
                <i class="send-icon"><span class="process-in">8</span></i>
                <span>待发货</span>
            </div>
            <div class="item">
                <i class="receipt-icon"><span class="process-in">3</span></i>
                <span>待收货</span>
            </div>
        </section>
        <section class="order mar-pd">
            <div class="item">
                <i class="show-icon"></i>
                <span>我的展车</span>
            </div>
            <div class="item">
                <i class="car-icon"></i>
                <span>售车申报</span>
            </div>
            <div class="item">
                <i class="transfer-icon"></i>
                <span>中转库管理</span>
            </div>
        </section>
        <p class="footer-bt"></p>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      //初始数据结构
    }
  },
  methods:{
    //组件方法
  },
  mounted(){
    //组件初始完成需要做什么
  }
}
</script>

<style>

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
