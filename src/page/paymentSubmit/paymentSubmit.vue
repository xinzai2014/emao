<template>
    <div>
         <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>提交汇款凭证
        </header>
        <section class="voucher-ct">
            <div v-if="!showRemit">
              <div class="voucher-title">请先添加汇款账户</div>
              <div class="voucher-item">
                  <router-link to="/profile/info/remit">
                    <p><i class="yellow-rt"></i>添加汇款账户：</p>
                  </router-link>
              </div>
            </div>
            <router-link to="/profile/info/remit" v-else>  
              <div class="voucher-item item-bor" v-if="type == 1">
                  <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
                  <p><span>{{editData.pay_company}}<i class="white-rt"></i></span>汇款单位：</p>
                  <p><span>{{editData.account}}</span>汇款账户：</p>
              </div>
              <div class="voucher-item item-bor" v-else>
                  <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
                  <p><span>{{editData.name}}</span>姓名：</p>
                  <p><span>{{editData.bank_name}}<i class="white-rt"></i></span>银行：</p>
                  <p><span>{{editData.account}}</span>汇款账户：</p>
              </div>
            </router-link>
            <div class="voucher-item voucher-gray">
                <p><span>汇款金额：<input type="number" name="" v-model="price" placeholder=""><i>元</i></span></p>
                <p><span>备注：<input type="text" name="" v-model="remark" placeholder=""></span></p>
            </div>

            <div class="voucher-item">
                <p>汇款回执单</p>
                <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
            </div>
            <button class="close-bt" @click="submit">提交</button>
        </section>
        <transition name="slide">
          <section class="no-auto submit-succeed" v-if="success">
              <img src="../../assets/submit-succeed.png" alt="">
              <p>提交成功,请等待审核</p>
          </section>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import alertTip from '../../components/common/alertTip/alertTip'
import uploader from '../../components/common/uploader/uploader'
export default {
  data () {
    return {
      infoData:[],//账户列表
      editData:{},//选择账户
      showRemit:false,//是否有汇款账户
      returnData:{},//订单页面返回
      type:null,//账户类型
      uploadData1:{
          url:"https://tcmapi.emao.com/upload",
          count:2,
          flag:"payment"
      },
      dataURL:{},//图片地址
      submitFlag:true,
      price:'',
      remark:'',
      showAlert: false, //弹出框
      alertText: null, //弹出信息
      success:''
    }
  },
  components:{
    uploader,
    alertTip
  },
  created:function(){
      //初始化
      this.mountedData();
      //this.acountEdit();
  },
  methods:{
      //组件方法
      resetIndex(){
          this.$router.go(-1);
      },
      getUpload(data,flag){
          this.dataURL[flag] = data;
      },
      acountEdit(){ //保存并使用公司
        var data = {
            token:sessionStorage.getItem('token'),
            id:this.$route.query.id||151,
        }
       this.$http({
            url:"dealerBank/detailById",
            method:"GET",
            params:data
        }).then(function (response) {
            this.editData = response.body.data;
            this.type = response.body.data.account_type;
            this.showType();
        }).catch(function (error) {
           this.showAlert = true;
          this.alertText = error.body.msg||"请求失败了";    
        });
      },
      showType(){
        if(this.type == 1){
          this.editData.account_type = '公司账户'
        }else{
          this.editData.account_type = '个人账户'
        }
      },
      mountedData(){
        //账户列表
        var Token = sessionStorage.getItem('token');
        var data = {
            token:Token,
        }
        this.$http({
            url:"dealerBank/listByDealerId",
            method:"GET",
            params:data
        }).then(function (response) {
          console.log(response);
            this.infoData = response.body.data;
            this.dataLength();
            this.returnDataF();
        }).catch(function (error) {
            this.showAlert = true;
          this.alertText = error.body.msg||"请求失败了"; 
        });
     
      },
      dataLength(){
        //是否添加账户，默认账户
        if(this.infoData.length > 0){ 
          this.showRemit = true;
          if(this.$route.query.id){
            this.acountEdit();
          }else{
            this.editData=this.infoData[0];
            this.type = this.editData.account_type;
            this.showType();
          }
        }else{
          this.showRemit = false
        }
      },
      returnDataF(){
        //订单页数据
        this.returnData=this.$route.query;
      },
      submit(){
         //提交
        if(!this.editData.id){
            this.showAlert = true;
            this.alertText = '请选择汇款账户！';
            return;
        }
        if(!this.price){
          this.showAlert = true;
          this.alertText = '请填写汇款金额！';
          return;
        }
        if(!this.dataURL.payment){
          this.showAlert = true;
          this.alertText = '请上传汇款凭证！';
          return;
        }else{
          var length=this.dataURL.payment.length;
        }
        var data = {
            token:sessionStorage.getItem('token'),
            price:this.price,
            order_id:this.returnData.orderId,
            order_num:this.returnData.orderNum,
            message:this.remark,
            bank_id:this.editData.id,
            anotherpay:this.editData.explan_path,
        }
        for(var i=0;i<length;i++){
            if(i==0){
                data['payimg']=this.dataURL.payment[i];
            }else{
              data['payimg'+(i+1)]=this.dataURL.payment[i];
            }   
        }
        if(this.submitFlag){
          this.$http.post("order/full/payment",data)
            .then(function (response) {
                this.success=true;
            }).catch(function (error) {
                this.showAlert = true;
          this.alertText = error.body.msg||"请求失败了"; 
            });
          }else{
            this.$http.post("order/show/payment",data)
            .then(function (response) {
                this.success=true;
            }).catch(function (error) {
                this.showAlert = true;
          this.alertText = error.body.msg||"请求失败了"; 
            });
          }   
      }
  },
  watch:{
    $route(){
      this.mountedData();
    },
    success(){
      //this.$router.push({name:''});
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      if(from.name=='orderDetail'){
          vm.submitFlag=true;
        }
      if(from.name=='displayDetail'){
          vm.submitFlag=false;
      }
    });
  }
}
</script>

<style>
/*æäº¤*/
.no-auto{
  top: 1.5rem;
}
.voucher-item.voucher-gray span{
  float: none;
  font-size: 0.4rem;
}
.voucher-item.voucher-gray i{
  float: right;
}
.voucher-item input{
  width: 6rem;
    border: 0;
}
.item-bor{
  padding:0.25rem 0;
}
.voucher-item.item-bor p{
border-bottom: 0;
padding: 0.15rem 0;
}
.voucher-item .up-btn{
  border: 1px solid #d6ab55;
    border-radius: 0.533333rem;
    color: #bb8800;
    font-size: 0.373333rem;
    height: 0.85333rem;
    line-height: 0.85333rem;
    margin: 0.4rem auto;
    text-align: center;
    width: 1.64rem;
    display: inline-block;
    padding: 0;
}
.voucher-item .continue-btn.up-btn{
    width: 9rem;
    border-color: #999;
    color: #666;
    margin-left:0.5rem;
}
.voucher-item{
  margin-bottom:0.4rem;
  background:#fff;
  overflow:hidden;
}
.voucher-item p{
  max-height:9999px;
  padding:0.533333rem 0;
  margin:0 0.4rem;
  font-size:0.32rem;
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
.voucher-gray p span{
  color:#2c2c2c;
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
  overflow:hidden;
  float:left;
  margin:0 0.466667rem;
}
.voucher-lt img{
  width:100%;
  height:100%;
}
.voucher-item .white-rt{
  margin-left:0.133333rem;
  vertical-align:text-top;
}
.voucher-lt b{
  display:block;
  font-weight:normal;
  width:2.626667rem;
  height:1.04rem;
  line-height:1.04rem;
  text-align:center;
  border-radius:0.533333rem;
  font-size:0.373333rem;
  color:#bb8800;
  border:1px solid #bb8800;
  margin:0.4rem auto;
}
.voucher-item .yellow-rt{
  float:right;
}
.voucher-title{
  padding:0.533333rem 0.4rem;
  background:#d4a962;
  font-size:0.346667rem;
  color:#fff;
}
.voucher-item .img-percent p {
  font-size:0.32rem;
  padding: 0;
    margin: 0;
    color: #fff;
    width:1.5rem;
    height:1.5rem;
    border:0.04rem solid #FFF;
    border-radius:50%;
    line-height:1.5rem;
    position:absolute;
    top:50%;
    left:50%;
    box-shadow:0 0 0.5rem #fff;
    -webkit-transform:translateX(-50%) translateY(-50%);
     transform:translateX(-50%) translateY(-50%);

}
.close-bt{
  cursor: pointer;
}
</style>
