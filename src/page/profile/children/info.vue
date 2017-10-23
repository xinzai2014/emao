<template>
    <div class="rating_page">
       <!--头部-->
        <header class="user-tit">
            <a href="javascript:;" class="white-lt" @click="resetIndex"></a>账户信息
        </header>
        <!--内容-->
        <section class="user-ct">
            <div class="user-bt"><span>{{infoData.link_name}}</span>姓名：</div>
            <div class="user-bt"><span>{{infoData.link_phone}}</span>手机号：</div>
            <div><span>{{infoData.city_name}}</span>所在城市：</div>
            <template v-if="data_status == 1">
              <router-link to="/profile/info/companyInfo">
                  <div><i class="yellow-rt"></i><span class="red">{{data_msg}}</span>公司信息</div>
              </router-link>
            </template>
            <template v-if="data_status == 2">
            <router-link to="/auth">
              <div><i class="yellow-rt"></i><span class="red">{{data_msg}}</span>公司信息</div>
            </router-link>
            </template>
            <router-link to="/profile/info/agreement">
                <div><i class="yellow-rt"></i>一猫特约经销商合作协议</div>
            </router-link>
            <router-link to="/profile/info/remit">
                <div><i class="yellow-rt"></i>汇款账户管理</div>
            </router-link>
            <router-link to="/profile/info/address" >
                <div @click="setDefaultAdress"><i class="yellow-rt"></i>收货地址管理</div>
            </router-link>
            <router-link to="/profile/info/password">
                <div><i class="yellow-rt"></i>设置密码</div>
            </router-link>
            <router-link to="/profile/info/setting">
                <div><i class="yellow-rt"></i>设置</div>
            </router-link>
            <button class="close-bt" @click="showTips">退出登录</button>
        </section>
        <transition name="router-slid">
            <router-view></router-view>
        </transition>
        <div class="dialog" v-if="showDialog" @click="closeDialog">
            <div class="dialog-con">
                <p>退出登录?</p>
                <div class="dialog-btn">
                    <span>取消</span>
                    <span @click.stop="loginOut">确认</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              infoData:{},
              showDialog:false,
              data_status:'',
              data_msg:""
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.push({name:'profile'});
            },
            showTips(){
                this.showDialog = !this.showDialog
            },
            closeDialog(){
                this.showDialog = !this.showDialog
            },
            loginOut(){
                this.$http.delete(
                    "passport/logout?token="+sessionStorage.token
                ).then(function (response) {
                     sessionStorage.clear();
                     this.$router.push("/");
                }).catch(function (error) {
                    console.log("请求失败了");
                });
            },
            setDefaultAdress(){
                this.$store.dispatch("ADDRESS_FLAG", // 通过store传值
                  {
                    tag:"profile/info",
                    serieId:""
                  }
                );
          }
        },
        mounted(){
                //组件初始完成需要做什么
            var Token = sessionStorage.getItem('token');
            var data = {
                token:Token,
            }
            //资料是否齐全
            this.$http({
                url:"dealerInfo/dataStatus",
                method:"GET",
                params:data
             }).then(function (response) {
                if(response.body.data.data_status=="1"){
                    // this.data_status='信息已完善';
                    this.data_msg='';
                }
                if(response.body.data.data_status=="2"){
                    this.data_msg='信息待完善';
                }
                if(response.body.data.data_status=="3"){
                    // this.data_status='信息审核中';
                    this.data_msg='';
                }
                if(response.body.data.data_status=="4"){
                    // this.data_status='信息驳回';
                    this.data_msg='';
                }
                this.data_status = response.body.data.data_status;

              }).catch(function (error) {
                //this.showAlert = true;
                //this.alertText = error.body.msg||"请求失败了";
              });

            this.$http({
                url:"dealerInfo/info",
                method:"GET",
                params:data
            }).then(function (response) {
                this.infoData = response.body.data;
            }).catch(function (error) {
                console.log("请求失败了");
            });

        }
    }
</script>

<style>
.user-ct div span.red{
    color:#fe2c2d;
}

.index-fooer{
    z-index: 1;
}
.rating_page{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    background-color: #f5f5f5;
    width:10.0rem;
    z-index: 203;
}
.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
/*内容*/
.user-ct div{
    background:#fff;
    padding:0.266667rem 0.4rem;
    font-size:0.4rem;
    color:#2c2c2c;
    overflow:hidden;
    margin-bottom:0.4rem;

}
.user-ct div span{
    float:right;
    display:inline-block;
    color:#999;
    font-size:0.346667rem;
    max-width:6.666667rem;
}
.user-ct div.user-bt{
    border-bottom:1px solid #eee;
    margin-bottom:0;
}
.company-icon{
    display:inline-block;
    background:url(../../../assets/company-icon.png) no-repeat;
    background-size:contain;
    width:1.28rem;
    height:0.533333rem;
    vertical-align:middle;
    margin-right:0.4rem;
}
.user-ct div i{
    float:right;
    margin-top:0.066667rem;
}
</style>
