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
            <div class="user-bt"><span><!--<b class="company-icon"></b>-->{{infoData.name}}</span>公司名称：</div>
            <div class="user-bt"><span>{{infoData.address}}</span>公司地址：</div>
            <div><span>{{infoData.activities}}</span>经营类型：</div>
            <router-link to="/profile/info/remit">
                <div><i class="yellow-rt"></i>汇款账户管理</div>
            </router-link>
            <router-link to="/profile/info/address">
                <div><i class="yellow-rt"></i>收货地址管理</div>
            </router-link>
            <router-link to="/profile/info/password">
                <div><i class="yellow-rt"></i>设置密码</div>
            </router-link>
            <div><i class="yellow-rt"></i>设置</div>
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
              showDialog:false
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
            }
        },
        mounted(){
        //组件初始完成需要做什么
            var Token = sessionStorage.getItem('token');
            var data = {
                token:Token,
            }
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
.dialog{
    position:fixed;
    background:rgba(0,0,0,0.75);
    height:100%;
    width:100%;
    top:0;
    z-index: 10
}
.dialog-con{width:7rem;background:#FFF;position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);border-radius:0.1rem;}
.dialog-con p{line-height:2.2rem;text-align:center;font-size:0.42rem}
.dialog-btn{line-height:1.2rem;font-size:0.36rem;text-align:center;}
.dialog-btn span{display:block;width:50%;float:left;}
.dialog-btn span:nth-of-type(1){background:#f5f5f5;border-radius:0 0 0 0.1rem;}
.dialog-btn span:nth-of-type(2){background:#d5aa5c;color:#FFF;border-radius:0 0 0.1rem 0;}

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
