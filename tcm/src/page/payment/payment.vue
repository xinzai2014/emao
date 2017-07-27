<template>
    <div>
        <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>汇款凭证
        </header>
        <section class="voucher-ct" v-if="editData.bank_info.account_type==1">
          <div class="voucher-item">
              <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
              <p><span>{{editData.bank_info.pay_company}}</span>汇款单位：</p>
              <p><span>{{editData.bank_info.bank_name}}</span>汇款银行：</p>
              <p><span>{{editData.bank_info.account}}</span>汇款账户：</p>
          </div>
          <div class="voucher-item">
              <p><span>{{editData.price}}</span>汇款金额：</p>
              <p><span>{{editData.message}}</span>备注：</p>
          </div>
          <div class="voucher-item">
              <p>汇款回执单</p>
              <div class="voucher-img">
                  <div class="voucher-lt">
                      <img :src="editData.payimg">
                  </div>
              </div>
          </div>
      </section>
      <section class="voucher-ct" v-if="editData.bank_info.account_type==2">
          <div class="voucher-item">
              <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
              <p><span>{{editData.bank_info.name}}</span>姓名：</p>
              <p><span>{{editData.bank_info.bank_name}}</span>银行：</p>
              <p><span>{{editData.bank_info.account}}</span>汇款账户：</p>
          </div>
          <div class="voucher-item">
              <p><span>{{editData.price}}</span>汇款金额：</p>
              <p><span>{{editData.message}}</span>备注：</p>
          </div>
          <div class="voucher-item">
              <p>汇款回执单<em>代付证明</em></p>
              <div class="voucher-img">
                  <div class="voucher-lt">
                      <img :src="editData.payimg">
                  </div>
                  <div class="voucher-lt">
                    <img src="../../assets/up-bg1.jpg">
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
      type:null,
      editData:{},
    }
  },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.go(-1);
    },
    fillData(){
        var order_num=this.$route.params.id;
        var dataToken =sessionStorage.token;
        var data = { 
            token:dataToken,
            order_num:order_num      
        }
        this.$http({
          url:"order/payment/detail",
          method:"GET",
          params:data
        })
        .then(function (response) {
            this.editData = response.body.data;
            this.type = response.body.data.bank_info.account_type;
            if(this.type == 1){
              this.editData.account_type = '公司账户'
            }else{
              this.editData.account_type = '个人账户'
            }
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
.voucher-item{
  margin-bottom:0.4rem;
  background:#fff;
  overflow:hidden;
}
.voucher-item p{
  max-height:9999px;
  padding:0.533333rem 0;
  margin:0 0.4rem;
  font-size:0.4rem;
  color:#2c2c2c;
  overflow:hidden;
  line-height:0.466667rem;
  border-bottom:1px solid #eee;
}
.voucher-item p span{
  float:right;
  font-size:0.346667rem;
  color:#999;
}
.voucher-item p em{
  margin-left:3.0rem;
}
.voucher-img{
  overflow:hidden;
  padding:0 0.4rem 0.533333rem 0.4rem;
}
.voucher-lt{
  width:3.666667rem;
  height:2.8rem;
  overflow:hidden;
  float:left;
  margin:0 0.466667rem;
}
.voucher-lt img{
  width:100%;
  height:100%;
}
</style>
