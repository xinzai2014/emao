<template>
    <div>
        <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>汇款凭证
        </header>
        <section class="voucher-ct" v-if="type==1">
          <div class="voucher-items">
              <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
              <p><span>{{editData.bank_info.pay_company}}</span>汇款单位：</p>
              <p><span>{{editData.bank_info.bank_name}}</span>汇款银行：</p>
              <p><span>{{editData.bank_info.account}}</span>汇款账户：</p>
          </div>
          <div class="voucher-items">
              <p><span>{{editData.price}}元</span>汇款金额：</p>
              <p><span>{{editData.message}}</span>备注：</p>
          </div>
          <div class="voucher-items  voucher-pay">
              <p class="no-border">汇款底单</p>
              <div class="voucher-img">
                  <div class="voucher-lt" v-for="(item,index) in imgs">
                      <img :src="item" @click="picView(item)">
                  </div>
              </div>
          </div>
      </section>
      <section class="voucher-ct" v-if="type==2">
          <div class="voucher-items">
              <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
              <p><span>{{editData.bank_info.name}}</span>姓名：</p>
              <p><span>{{editData.bank_info.bank_name}}</span>银行：</p>
              <p><span>{{editData.bank_info.account}}</span>汇款账户：</p>
          </div>
          <div class="voucher-items">
              <p><span>{{editData.price}}元</span>汇款金额：</p>
              <p><span>{{editData.message}}</span>备注：</p>
          </div>
          <div class="voucher-items voucher-pay">
              <p class="no-border">代付证明</p>
              <div class="voucher-img">
                   <div class="voucher-lt">
                    <img :src="editData.anotherpay" @click="picView(editData.anotherpay)">
                </div>
                 
              </div>
              <p class="no-border">汇款底单</p>
              <div class="voucher-img">
                  <div class="voucher-lt" v-for="(item,index) in imgs">
                      <img :src="item" @click="picView(item)">
                  </div>
              </div>
          </div>
      </section>
      <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
      <pic-view v-show="showBigImg" @closeTip="showBigImg = false" :bigImg="bigImg"></pic-view>

    </div>
</template>

<script>
import picView from '../../components/common/picView/picView'
import alertTip from '../../components/common/alertTip/alertTip'
export default {
  data () {
    return {
      editData:{},
      type:null,
      showAlert: false, //弹出框
      alertText: null, //弹出信息
      imgs:[],
      bigImg:'',
      showBigImg:false
    }
  },components:{
        alertTip,
        picView
      },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.go(-1);
    },
    picView(src){
      this.bigImg=src;
      this.showBigImg=true;
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
            var editData=response.body.data;
            this.imgs=editData.payimg;
            var type = response.body.data.bank_info.account_type;
            this.type=type;
            if(this.type == 1){
              editData.account_type = '公司账户'
            }else{
              editData.account_type = '个人账户'
            }
            this.editData = editData; 
        }).catch(function (error) {
            this.showAlert = true;
            this.alertText = error.body.msg||"请求失败了";     
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
.voucher-items{
  margin-bottom:0.4rem;
  background:#fff;
  overflow:hidden;
}
.voucher-items p{
  max-height:9999px;
  padding:0.533333rem 0;
  margin:0 0.4rem;
  font-size:0.4rem;
  color:#2c2c2c;
  overflow:hidden;
  line-height:0.466667rem;
  border-bottom:1px solid #eee;
}
.voucher-items p.no-border{
  border-bottom:0;
}
.voucher-items p span{
  float:right;
  font-size:0.346667rem;
  color:#999;
}
.voucher-items p em{
  margin-left:3.0rem;
}
.voucher-pay .voucher-img{
  overflow:hidden;
  padding:0 0.4rem 0.533333rem 0.4rem;
}
.voucher-pay .voucher-lt{

  width:3.666667rem;
  height:2.8rem;
  overflow:hidden;
  float:left;
  margin:0 0.466667rem;
  margin-bottom: 0.4rem;
}
.voucher-pay .voucher-lt img{
  width:100%;
  height:100%;
}
</style>
