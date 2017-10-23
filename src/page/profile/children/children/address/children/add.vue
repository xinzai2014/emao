<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<i class="white-lt" @click="resetIndex"></i>
	        <strong class="brand-list-title">新增收货地址</strong>
		</header>

		<section class="address-edit">
	        <div class="address-edit-out">
	            <ul class="address-edit-in">
	                <li class="clearfix">
	                    <span>收货人：</span>
	                    <input type="text" name="" v-model="name" placeholder="请填写收货人" ref='name'>
	                    <i class="wrong_txt"></i>
	                </li>
	                <li class="clearfix">
	                    <span>联系电话：</span>
	                    <input type="phone" name="" v-model="phone" placeholder="请填写手机号" ref='phone'>
	                    <i class="wrong_txt"></i>
	                </li>
	                <li class="clearfix">
	                    <span>收货地址：</span>
	                    <input type="text" name="" v-model="address" placeholder="请填写收货地址" ref='address'>
	                    <i class="wrong_txt"></i>
	                </li>
	            </ul>
	        </div>
	        <input class="address-save" type="button" name="" value="保存并使用" @click="saveEdit">
	    </section>
	    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    </div>
</template>

<script>
import alertTip from '../../../../../../components/common/alertTip/alertTip'
    export default {
        data () {
            return {
            //初始数据结构
            is_default:'1',	//是否是默认
            address:'',	//收货地址
            name:'',	//收货人姓名
            phone:'',	//收货人电话
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
                this.$router.push({ name: 'address'});
            },
            saveEdit(){
            	if(!this.name){
		            this.showAlert = true;
		            this.alertText = '请填写收货人';
		            this.$refs['name'].focus();
		            return;
		        }
		        if(!this.phone){
		          this.showAlert = true;
		          this.alertText = '请填写联系电话';
		          this.$refs['phone'].focus();
		          return;
		        }
		        var telExp = /^(1(3|4|5|7|8)[0-9]{1}\d{8})$/;
		        if(!telExp.test(this.phone)){
		            this.showAlert = true;
		            this.alertText = '手机号码格式不正确';
		            this.$refs['phone'].focus();
		            return;
		        }
		        if(!this.address){
		          this.showAlert = true;
		          this.alertText = '请填写收货地址';
		          this.$refs['address'].focus();
		          return;
		        }
	    		var token=sessionStorage.getItem('token');
            	var data = {
		            name:this.name,
		            address:this.address,
		            phone:this.phone,
		            is_default:this.is_default
		        }
            	this.$http.post(
            		"dealer/createAddress?token="+token,
            		data
            	).then(function (response) {
            		this.showAlert = true;
          			this.alertText = "添加成功！";

	            	this.$store.dispatch("DEFAULT_ADDRESS", // 通过store传值 如果有异步操作放到action里面
				        {
				          id:response.body.data.id,
				          address:data.address,
				          phone:data.phone,
				          name:data.name
				        }
				    );
				    if(this.$store.getters.getAddress!=""){
				    	var addressFlag=this.$store.getters.getAddress;
				    	this.$router.push({ path: "/" + addressFlag.tag + "/" + addressFlag.serieId });
				    }else{
				    	this.$router.push({ path: '/address'});
				    }

		        }).catch(function (error) {
		            this.showAlert = true;
           			this.alertText = error.body.msg||"请求失败了";
		        });
            }
        },
        mounted(){
        //组件初始完成需要做什么

        },
        beforeRouteEnter(to, from, next){
        	next(vm => {
			    if(from.name=='orderDetail'||from.name=='orderConfrim'||from.name=='displayConfrim'||from.name=='balanceConfrim'){

	        	}
			  });
        }
    }
</script>

<style>
.wrong_txt{position: absolute;left:7.2rem;color:red;font-size: 0.32rem;top:0.45rem;}
.address-edit{}
.address-edit-out{padding:0 .4rem 0 .4rem;background-color:#fff;}
.address-edit-in{}
.address-edit-in li{font-size:.4rem;color:#2c2c2c;border-bottom:1px solid #eee;position: relative;line-height:1.333rem;}
.address-edit-in li:last-child{border-bottom:none;}
.address-edit-in li span{display:block;float:left;width:2.3rem;height:1.333rem;}
.address-edit-in li input{display:block;margin-left:1.667rem;height:1.333rem;border:none;}
.address-save{display:block;margin:1.0667rem auto 0;padding:.36rem 1rem .36rem 1rem;font-size:.4533rem;color:#fff;text-align:center;border:none;border-radius:.8rem;background-color:#d5aa5c;}

</style>
