<template>
    <div>
         <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>提交汇款凭证
        </header>
        <section class="voucher-ct">
            <div class="voucher-title" v-if="!showRemit">请先添加汇款账户</div>
            <div class="voucher-item">
                <router-link to="/profile/info/remit"><p><i class="yellow-rt"></i>添加汇款账户：</p></router-link>
            </div>
            <div class="voucher-item" v-if="type == 1">
                <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
                <p><span>{{editData.pay_company}}<i class="white-rt"></i></span>汇款单位：</p>
                <p><span>{{editData.account}}</span>汇款账户：</p>
            </div>
            <div class="voucher-item" v-else>
                <p><span>{{editData.account_type}}</span>汇款账户类型：</p>
                <p><span>{{editData.name}}<i class="white-rt"></i></span>姓名：</p>
                <p><span>{{editData.bank_name}}<i class="white-rt"></i></span>银行：</p>
                <p><span>{{editData.account}}</span>汇款账户：</p>
            </div>
            <div class="voucher-item voucher-gray">
                <p><span>{{returnData.price}}</span>汇款金额：</p>
                <p><span>{{returnData.remark}}</span>备注：</p>
            </div>

            <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>

            <div class="voucher-item">
                <p>汇款回执单</p>
                <div class="voucher-img">
                    <div class="voucher-lt">
                        <em><img src="../../assets/up-bg.jpg"></em>
                        <b>上传</b>
                    </div>
                    <div class="voucher-lt">
                        <img src="../../assets/up-bg2.jpg">
                    </div>
                </div>
            </div>
            <button class="close-bt">提交</button>
        </section>
 
    </div>
</template>

<script>
import uploader from '../../components/common/uploader/uploader'
export default {
  data () {
    return {
      infoData:{},
      showRemit:false,
      returnData:{},
      type:null,
      editData:{},
      uploadData1:{
          url:"https://tcmapi.emao.com/upload",
          count:2,
          flag:"door"
      },
      dataURL:{}
    }
  },
  components:{
    uploader
  },
  created:function(){
      //初始化
      this.mountedData();
      this.returnDataF();
  },
  methods:{
      //组件方法
      resetIndex(){
          this.$router.go(-1);
      },
      getUpload(){
        

      },
      acountEdit(){ //保存并使用公司
        var data = {
            token:sessionStorage.getItem('token'),
            id:this.$route.query.id||149,
        }
       this.$http({
            url:"dealerBank/detailById",
            method:"GET",
            params:data
        }).then(function (response) {
            this.editData = response.body.data;
            this.type = response.body.data.account_type;
            if(this.editData.account_type == 1){
              this.editData.account_type = '公司账户'
            }else{
              this.editData.account_type = '个人账户'
            }
        }).catch(function (error) {
            console.log("请求失败了");
        });
      },
      mountedData(){
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
        }).catch(function (error) {
            console.log("请求失败了");
        });
     
      },
      dataLength(){
        if(this.infoData.length > 0){
          this.showRemit = true
        }else{
          this.showRemit = false
        }
      },
      returnDataF(){
        console.log(this.$router);
        this.returnData=this.$route.query;
      }
  },
  watch:{
    $route(){
      this.mountedData();
      this.dataLength();
    }
  },

}
</script>

<style>
/*æäº¤*/
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
</style>
