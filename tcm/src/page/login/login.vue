<template>
  <div class="login-bg">
    <section class="login-in">
        <p class="login-logo">
            <i></i>
            <span>淘车猫</span>
        </p>
          <div class="login-info">
              <div class="login-phone">
                  <input type="text" name="telep" v-validate.initial="'required'" v-model="telephone" placeholder="手机号"  >
                  <span class="login-errror" style="display:none;" v-show="errors.has('telep')">请输入手机号</span>
              </div>
              <transition name="fade">
                  <router-view></router-view>
              </transition>
             <!--  <div class="login-code clearfix">
                  <input type="text" >
                  <i>获取验证码</i>
              </div> -->
              
             
          </div>
    </section>
    <section class="login-popup">
        <!--登录成功-->
        <div class="login-success" style="display:none;">登录成功</div>
        <!--密码多次输入错误-->
        <div class="login-failure">
            <div class="login-failure-in">
                <p class="login-tip">密码多次输入错误</p>
                <p class="login-by-code">您可以先用验证码登录</p>
                <p class="login-set-password">登录重新设置密码</p>
            </div>
            <p class="login-choose clearfix">
                <span>我再试试</span>
                <span class="active">验证码登录</span>
            </p>
        </div>
    </section>
</div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      telephone:"13391529348"
    }
  },
  methods:{
    login(){
         let options = {};
         var data = {
            phone:this.telephone,
            password:this.pass
         };
        this.$http({
            url:"test/mockLogin",
            method:"GET",
            params:data
        }).then(function (response) {
            console.log("登录成功了");
            console.log(response);
            sessionStorage.dataToken = response.body.data.dataToken;
            sessionStorage.phone = response.body.data.phone;
          }).catch(function (error) {
            console.log("登录失败了");
          });
    }
  },
  mounted(){
    //this.login();
   console.log(this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

/*登录-注册样式*/
.login-bg{width:10rem;height:100%;background:url("../../assets/login-bg.jpg") no-repeat;background-size:100% 100%;}
.login-in{padding-top:1.2rem;}
.login-logo-wrap{height:}
.login-logo{height:.6113rem;line-height:.6113rem;margin:1.133rem auto 0;text-align:center;font-size:.6133rem;color:#fff;}
.login-logo i{display:inline-block;width:.96rem;height:.6113rem;background:url("../../assets/login-logo.png") no-repeat;background-size:.96rem .6113rem;}
.login-logo span{display:inline-block;}
.login-info{margin-left:1.333rem;margin-right:1.333rem;}
.login-phone{position:relative;width:7.333rem;height:.933rem;margin:.797rem auto 0;border-bottom:1px solid #fff;}
.login-phone input{display:block;width:7.333rem;height:.933rem;font-size: .453rem;border:none;background-color:transparent;}
.login-errror{display:block;position:absolute;bottom:-.8rem;left:0;width:7.333rem;height:.8rem;line-height:.8rem;text-align:center;font-size:.373rem;color:#fff;background-color:#e94545;}
.login-code{height:.933rem;margin:.797rem auto 0;font-size:.6133rem;color:#fff;border-bottom:1px solid #fff;}
.login-code input{display:block;float:left;width:4.8rem;height:.933rem;font-size: .453rem;border:none;background-color:transparent;}
.login-code i{display:block;float:right;font-size:.453rem;color:#ffdb7d;}
.login-btn{display:block;width:5.867rem;height:1.1733rem;margin:.93rem auto 0;text-align:center;font-size:.453rem;color:#fff;line-height:1.17333rem;border:none;Border-radius:.667rem;background-color:#d5aa5c;}
.login-another{margin-top:.667rem;text-align:center;}
.login-another span{font-size:.4rem;color:#fff;border-bottom:1px solid #fff;}
.login-popup{display:none;position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.6);}
/*登录成功*/
.login-success{position:absolute;width:3.067rem;height:2.133rem;top:50%;left:50%;transform:translate(-50%,-50%);line-height:2.133rem;text-align:center;font-size:.453rem;color:#fff;background:rgba(0,0,0,0.8);}

/*密码多次输入错误*/
.login-failure{position:absolute;top:50%;left:50%;overflow:hidden;width:7.2rem;padding-bottom:1.173rem;transform:translate(-50%,-50%);border-radius:.1333rem;background-color:#fff;}
.login-failure-in{padding:.9333rem 1.067rem;color:#2c2c2c;text-align:center;}
.login-tip{padding-bottom:.467rem;font-size:.453rem;text-align:center;line-height:.48rem;border-bottom:1px solid #2c2c2c;}
.login-by-code{margin-top:.533rem;font-size:.3467rem;}
.login-set-password{font-size:.3467rem;}
.login-choose{position:absolute;bottom:0;}
.login-choose span{display:block;float:left;width:3.6rem;height:1.173rem;line-height:1.173rem;text-align:center;color:#2c2c2c;font-size:.453rem;background-color:#f5f5f5;}
.login-choose span.active{color:#fff;background-color:#d6ab55;}

</style>
