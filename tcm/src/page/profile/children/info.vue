<template>
    <div class="rating_page">
       <!--头部-->
        <header class="user-tit">
            <a href="javascript:;" class="white-lt" @click="resetIndex"></a>账户信息
        </header>
        <!--内容-->
        <section class="user-ct">
            <router-link to="/profile/info/setusername">
                <div class="user-bt"><span>{{infoData.link_name}}</span>姓名：</div>
            </router-link>
            <div class="user-bt"><span>{{infoData.link_phone}}</span>手机号：</div>
            <div><span>{{infoData.city_name}}</span>所在城市：</div>
            <div class="user-bt"><span><b class="company-icon"></b>{{infoData.name}}</span>公司名称：</div>
            <div class="user-bt"><span>{{infoData.address}}</span>公司地址：</div>
            <div><span>{{infoData.activities}}</span>经营类型：</div>
            <div><i class="yellow-rt"></i>汇款账户管理</div>
            <div><i class="yellow-rt"></i>收货地址管理</div>
            <div><i class="yellow-rt"></i>设置密码</div>
            <div><i class="yellow-rt"></i>设置</div>
            <button class="close-bt">退出登录</button>
        </section>
        <transition name="fade">
          <router-view></router-view>
      </transition>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              //初始数据结构
              infoData:{}
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.go(-1);
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
                console.log("请求成功了");
            }).catch(function (error) {
                console.log("请求失败了");
            });

        }
    }   
</script>

<style>
.rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    width:10.0rem;
    z-index: 203;
}
.fade-enter-active {
  transition: opacity 2.5s
}
.fade-leave-active{
  transition: opacity 0
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0 
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
