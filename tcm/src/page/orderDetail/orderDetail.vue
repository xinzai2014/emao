<template>
    <div>
        <section class="details-wrap">
          <div class="details-tit">
              <h4><span>剩余：23小时21分钟自动取消</span>等待付款</h4>
              <p>原因：谁知道为什么呢，反正提交的不合格，被驳回了，重新提交吧！</p>
          </div>
          <div class="details-addres">
              <i class="white-rt"></i>
              <div class="details-user">
                  <span>13822334455</span>收货人：张二狗
              </div>
              <p>地址：内蒙古自治区呼和浩特北四环西路52号方正国际08号</p>
          </div>
          <div class="order-ct">
              <p class="order-number">
                  <span>2016-10-20 20:31</span>订单号：123456789099888
              </p>
              <div class="order-full">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment"><em> ×1</em>全款购买：<span>29,000.00元</span></p>
              </div>
              <p class="leave">
                  <span>买家留言：</span>梅赛德斯-AMG销量最高的45系列AMG，售价由49.8万至63.4万，但准备开始在中国市场进行预售的43系列，虽然车万至63.4万，但准备开始在中国市场进行预售的43系列，虽然车
              </p>
              <div class="settlement">
                  <p><span>￥20,000.00</span>商品总价：</p>
                  <p><span>-￥3,000.00</span>已付保证金：</p>
                  <p><span>-￥3,000.00</span>优惠券抵扣：</p>
                  <p><span>-￥5,000.00</span>营销支持费抵扣：</p>
                  <p><span>-￥3,000.00</span>返利资金抵扣（不可开票）：</p>
                  <p><span>￥20,000.00</span>需付款：</p>
              </div>
          </div>
          <div class="request-ct">
              <p class="remit-tit">汇款信息</p>
              <div class="send-to">
                  <p>
                      <label>汇款银行：</label>
                      <span>中国银行股份有限公司成都天府大道支行</span>
                  </p>
                  <p>
                      <label>公司名称：</label>
                      <span>成都一猫电子商务有限公司</span>
                  </p>
                  <p>
                      <label>汇款银行：</label>
                      <span>9558 1909 2938 10098</span>
                  </p>
                  <p class="send-phone">发送到手机</p>
              </div>
              <div class="nstructions">
                  <span>汇款说明：</span>
                  <em>1.汇款后请上传汇款凭证</em>
                  <em>2.未按时间付款的订单系统将自动取消</em>
              </div>
              <p class="cancel">取消申请</p>
          </div>
          <p class="visib-98"></p>
          <div class="remits-fixed">提交汇款凭证</div>
      </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
        
    }
  },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.push({name:''});
    },
    fillData(){
        var dataToken = sessionStorage.token;
        var data = {
            token:dataToken,
        }
        this.$http({
            url:"dealer/coupon",
            method:"GET",
            params:data
        }).then(function (response) {

            
        }).catch(function (error) {
            console.log("请求失败了");
        });
    }
  },
  mounted(){
    //组件初始完成需要做什么
    this.fillData();
    
  },
  watch:{ 
    $route(){
        this.fillData();
    }
  }

}
</script>

<style>
/*è®¢å•è¯¦æƒ…*/
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
}
.send-to p.send-phone{
  font-size:0.453333rem;
  color:#fff;
  text-align:center;
  height:1.173333rem;
  line-height:1.173333rem;
  background:#d5aa5c;
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

</style>
