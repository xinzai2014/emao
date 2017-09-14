<template>
	<div class="rating_page bg_w">
		<header class="user-tit">
			<a href="javascript:;" class="white-lt" @click="goback"></a>
			<span class="brand-switch" @click="showPop">发送到邮箱</span>
		</header>
		<iframe :srcdoc="iframe"></iframe>
		<!--<section>
			<div class="news_title">一猫特约经销商合作协议</div>
			<p class="text-p">特别提示：</p>
			<p class="text-p">在您点击同意本一猫特约经销商合作协议（“本协议”）之前，您应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、争议解决和法律适用条款。免除或者限制责任的条款可能将以加粗字体显示，您应重点阅读。如您对协议有任何疑问的，应向淘车猫平台客服咨询。</p>
			<p class="text-p">特别提示：</p>
			<p class="text-p">当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，或您按照激活页面提示填写信息、阅读并同意本协议且完成全部激活程序后，或您以其他淘车猫平台允许的方式实际使用淘车猫平台服务时，即表示您已充分阅读、理解并接受本协议的全部内容，并与一猫达成本协议。您承诺接受并遵守本协议的约定，届时您不应以未阅读本协议的内容或者未获得淘车猫平台对您问询的解答等理由，主张本协议无效，或要求撤销本协议。</p>
		</section>-->
		<div class="mask" v-show="pop">
	        <div class="cancel-car">
	            <input type="text" placeholder="请输入您的邮箱" v-model="email">
	            <p class="prompt-btn"><span @click="hidePop">取消</span><span class="confirm" @click="send">发送</span></p>
	        </div>
	     </div>
	     <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
import alertTip from '../../../../../components/common/alertTip/alertTip'
    export default {
        data () {
            return {
            	iframe:'',
            	pop:false,
            	email:'',
            	showAlert:false,
            	alertText:'',
            }
        },components:{
        alertTip
      },
        methods:{
        	goback(){
        		this.$router.go(-1);
        	},
        	showPop:function(){
        		this.pop=true;
        	},
        	hidePop:function(){
        		this.pop=false;
        	},
        	send:function(){
        		if(!this.email){
        			this.showAlert = true;
			        this.alertText = '请填写邮箱';
			        return;
        		}
        		var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        		if(!emailRE.test(this.email)){
        			this.showAlert = true;
			        this.alertText = '请填写正确的邮箱';
			        return;
        		}
        		var dataToken = sessionStorage.token;
			    var data = {
			        token:dataToken,
			        email:this.email
			    }
			    this.$http.post("dealer/agreement/email",data)
			      .then(function (response) {
			         this.showAlert = true;
			        this.alertText = '已发往您的邮箱，请注意查收';
			        setTimeout(function(){
			        	this.hidePop();
			        },500);
			        
			      }).catch(function (error) {
			          this.showAlert = true;
			        this.alertText = error.body.msg||"发送失败,请检查网络";
			      });
			    }
        },
        mounted(){
        	var dataToken = sessionStorage.token;
		    var data = {
		        token:dataToken
		    }
		    this.$http({
		        url:"dealer/agreement",
		        method:"GET",
		        params:data
		     }).then(function (response) {
		        this.iframe=response.bodyText;
		      }).catch(function (error) {
		        //this.showAlert = true;
		        //this.alertText = error.body.msg||"请求失败了";
		      });

        }
    }   
</script>

<style>
iframe{
	width:10rem;
	height:100%;
	border:0;
}
.brand-switch {
    float: right;
    margin-right: .4666rem;
    font-size: .4rem;
    color: #d5aa5c;
}
.news_title{
	font-size:0.43rem;
	font-weight: bold;
	text-align: center;
	padding:1.13rem 0 0.7rem;
}
.bg_w{
	background: white;
}
.text-p{
	padding:0 0.53rem;
	font-size:0.4rem;
	color:#666666;
	line-height: 0.65rem;
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
input{display:block;height:1.067rem;padding-left:.2667rem;background-color:none;border:none;border-bottom:1px solid #e6e6e6;margin:0.73rem 0.4rem;width:6rem;text-align: center;}
</style>