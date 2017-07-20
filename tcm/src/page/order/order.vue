<template>
    <div>
        <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>全部订单
        </header>
        <!--全部订单-->
          <section class="full-wrap">
              <div class="full-item">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment">需付款：<span>29,000.00元</span></p>
                  <div class="full-state">
                      <div class="state-lt wait-active">
                          <p class="state-wait">等待付款</p>
                          <p class="state-time">剩余：23小时21分钟自动取消</p>
                      </div>
                      <div class="state-rt">提交汇款凭证</div>
                  </div>
              </div>
              <div class="full-item">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment">需付款：<span>29,000.00元</span></p>
                  <div class="full-state">
                      <div class="state-lt">
                          <p class="state-wait">付款审核中</p>
                      </div>
                      <div class="state-rt active">提交汇款凭证</div>
                  </div>
              </div>
              <div class="full-item">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment">需付款：<span>29,000.00元</span></p>
                  <div class="full-state">
                      <div class="state-lt wait-active">
                          <p class="state-wait">请重新提交</p>
                          <p class="state-time">剩余：23小时21分钟自动取消</p>
                      </div>
                      <div class="state-rt">提交汇款凭证</div>
                  </div>
              </div>
              <div class="full-item">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment">需付款：<span>29,000.00元</span></p>
                  <div class="full-state">
                      <div class="state-lt">
                          <p class="state-wait">车辆出库中</p>
                      </div>
                  </div>
              </div>
              <div class="full-item">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment">需付款：<span>29,000.00元</span></p>
                  <div class="full-state">
                      <div class="state-lt">
                          <p class="state-wait">车辆在途</p>
                      </div>
                      <div class="state-rt">确认收货</div>
                  </div>
              </div>
              <div class="full-item">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment">需付款：<span>29,000.00元</span></p>
                  <div class="full-state">
                      <div class="state-lt">
                          <p class="state-wait">交易完成</p>
                      </div>
                  </div>
              </div>
              <div class="full-item">
                  <h3>奇瑞 艾瑞泽3 2015款 1.5L 自动够炫版</h3>
                  <p class="interior">闪光黑/黑色内饰</p>
                  <p class="payment">需付款：<span>29,000.00元</span></p>
                  <div class="full-state">
                      <div class="state-lt">
                          <p class="state-wait">已取消</p>
                      </div>
                  </div>
              </div>
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
        this.$router.push({name:'profile'});
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
.state-wait{
  line-height:1.066667rem;
}
.state-rt.active{
  background:#cccccc;
}
.wait-active .state-wait{
  line-height:0.533333rem;
}
</style>
