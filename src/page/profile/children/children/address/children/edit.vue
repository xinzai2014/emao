<template>
    <div class="rating_page">
		<!--头部-->
		<header class="user-tit">
			<i class="white-lt brand-left-cion" @click="resetIndex"></i>
	        <strong class="brand-list-title">编辑收货地址</strong>
		</header>

		<section class="address-edit">
	        <div class="address-edit-out">
	            <ul class="address-edit-in">
	                <li class="clearfix">
	                    <span>收货人：</span>
	                    <input type="text" name="" v-model="name" ref="name">
	                </li>
	                <li class="clearfix">
	                    <span>联系电话：</span>
	                    <input type="text" name="" v-model="phone" ref="phone">
	                </li>
	                <li class="clearfix">
	                    <span>收货地址：</span>
	                    <input type="text" name="" v-model="address" ref="address">
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
            id:'',	//id
            dealer_id:'',	//经销商id
            is_default:'',	//是否是默认
            address:'',	//收货地址
            name:'',	//收货人姓名
            phone:'',	//收货人电话
            created_at:'',	//创建时间      
            deleted_at:'',	//删除时间
            updated_at:'',	//修改时间
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
            fillData(){
            	var id=this.$route.params.id;
	    		var token=sessionStorage.getItem('token');
            	var data = {
		            token:token,
		            id:id
		        }
		        this.$http({
		            url:"dealer/detailById",
		            method:"GET",
		            params:data
		        }).then(function (response) {
		            this.id = response.body.data.id;
		            this.dealer_id = response.body.data.dealer_id;
		            this.is_default = response.body.data.is_default;
		            this.address = response.body.data.address;
		            this.name = response.body.data.name;
		            this.phone = response.body.data.phone;
		            this.created_at = response.body.data.created_at;
		            this.deleted_at = response.body.data.deleted_at;
		            this.updated_at = response.body.data.updated_at;
		        }).catch(function (error) {
		            console.log("请求失败了");
		        });
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
		            id:this.id,
		            name:this.name,
		            address:this.address,
		            phone:this.phone,
		            is_default:this.is_default
		        }
            	this.$http.post(
            		"dealer/updateById?token="+token,
            		data
		        ).then(function (response) {
		        	alert('保存成功！');
		        	this.$router.push({ name: 'address'});
		        }).catch(function (error) {
		            console.log("请求失败了");		            
		        });
            }
        },
        mounted(){
        //组件初始完成需要做什么
        	this.fillData();

        }
    }   
</script>

<style>
.address-edit{}
.address-edit-out{padding:0 .4rem 0 .4rem;background-color:#fff;}
.address-edit-in{}
.address-edit-in li{font-size:.4rem;color:#2c2c2c;border-bottom:1px solid #eee;}
.address-edit-in li:last-child{border-bottom:none;}
.address-edit-in li span{display:block;float:left;width:2rem;height:1.333rem;line-height:1.333rem;}
.address-edit-in li input{display:block;margin-left:1.667rem;height:1.333rem;line-height:1.333rem;border:none;}
.address-save{display:block;margin:1.0667rem auto 0;padding:.36rem 1rem .36rem 1rem;font-size:.4533rem;color:#fff;text-align:center;border:none;border-radius:.8rem;background-color:#d5aa5c;}

</style>
