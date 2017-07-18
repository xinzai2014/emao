<template>
    <div class="rating_page">
       <!--头部-->
        <header class="user-tit">
            <a href="javascript:;" class="white-lt"></a>账户信息
        </header>
        <!--内容-->
        <section class="user-ct">
            <div class="user-bt"><span>王麻子</span>姓名：</div>
            <div class="user-bt"><span>1380398909</span>手机号：</div>
            <div><span>湖南</span>所在城市：</div>
            <div class="user-bt"><span><b class="company-icon"></b>北京一猫信息科技有限公司</span>公司名称：</div>
            <div class="user-bt"><span>北京市朝阳区来广营国创产业园6号楼4层东二区08号</span>公司地址：</div>
            <div><span>合资</span>经营类型：</div>
            <div><i class="yellow-rt"></i>汇款账户管理</div>
            <div><i class="yellow-rt"></i>收货地址管理</div>
            <div><i class="yellow-rt"></i>设置密码</div>
            <div><i class="yellow-rt"></i>设置</div>
            <button class="close-bt">退出登录</button>
        </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      //初始数据结构
    }
  },
  methods:{
    //组件方法
  },
  mounted(){
    //组件初始完成需要做什么
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
    background-color: #f2f2f2;
    z-index: 202;
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
