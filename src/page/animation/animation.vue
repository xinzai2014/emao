<template>
<div class="animation">
  <img src="./images/animation.png" alt="" class="background">
  <div class="alert">
    <img src="./images/height.png" alt="" class="height">
    <img src="./images/quick.png" alt="" class="quick">
    <img src="./images/low.png" alt="" class="low">
    <img src="./images/smart.png" alt="" class="smart">
    <img src="./images/gold.png" alt="" class="gold">
    <img src="./images/light.png" alt="" class="light">
    <img src="./images/air.png" alt="" class="air">
  </div>
  
  <div class="button">
    <div class="left" @click="call">咨询客服</div>
    <div class="right" @click="apply">立即申请</div>
  </div>
  
</div>
</template>
<script>
export default {
  name: "animation",
  data() {
    return{

    }
  },
  computed:{
      
    },
    methods:{
       /*向App传值*/
        tcmApp(obj) {
            //emaoAppObject 是 native 向 WebView 注册的用来响应 JS 消息的对象
            //向 native 发送消息（TODO:具体使用中可根据 navigator.userAgent 中的信息来判断系统类型，在不同的系统中分别调用下面对应的代码）
            //或者由服务器判断响应不同的平台脚本
            if (navigator.userAgent.indexOf("iPhone") > 0) {
                window.webkit.messageHandlers.tcmAppObject.postMessage(obj); //向 iOS 发送消息，Android 无效
            } else {
                window.tcmAppObject.postMessage(JSON.stringify(obj)); //向 Android 发送消息，iOS 无效
            }
        },
         windowOpen() {
            var obj = {
                actionname: "windowOpen", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                url: 'emaotaochemao://push/Customer?userName=""&phone=""&nickName=""&headImage=""&autoSourceId=""&hint=""' // 要打开的链接
            };
            this.tcmApp(obj);
        },
      call(){
       this.windowOpen()
      },
      apply(){
        this.$router.push({path: "/financing"})
      }

    },
    created(){
      document.title="融资购车";

    }
}
</script>
<style>
.animation{
  width:100%;
  position: relative;
}
.animation .background{
  width: 100%
}
.animation .people1{
  width: .53333rem;
  height: 1.32rem;
  position: absolute;
  top:8.37333rem;
  left: 3.2rem;
  
}

.alert img{
  position: absolute;
}
.height{
width:3.62667rem;
height: 1.97333rem;
top: 4.4rem;
left:.77333rem;
animation:height 1s linear;
}
@keyframes height {
  0%{  
   top:6.8rem;
   left:4rem;
   width:0;
   height: 0;
  }
100% {
  width:3.62667rem;
  height: 1.97333rem;
  top: 4.4rem;
  left:.77333rem;
  }
  }
.quick{
width: 4.17333rem;
height: 1.76rem;
top:9.93333rem;
right:.18667rem;
animation:quick 1.5s linear;
}
@keyframes quick {
  0%{  
   top:11rem;
   right:1rem;
   width:0;
   height:0;
  }
100% {
  top:9.93333rem;
  right:.18667rem;
  width: 4.17333rem;
  height: 1.76rem;
  }
  }

.low{
width: 3.05333rem;
height: 1.57333rem;
left: .70667rem;
top:15.12rem;
animation:low 2s linear;
}
@keyframes low {
  0%{  
   width:0;
   height:0;
  }
 
100% {
   width: 3.05333rem;
  height: 1.57333rem;
  left: .70667rem;
  top:15.12rem;
  }
}
.smart{
width: 3.33333rem;
height: 2.12rem;
right: .66667rem;
top:16.88rem;
animation:smart 2s linear;
}
@keyframes smart {
  0%{  
   width:0;
   height:0;
  }
 
100% {
  width: 3.33333rem;
  height: 2.12rem;
  right: .66667rem;
  top:16.88rem;
  }
}
.gold{
  width: 1.29333rem;
  height: 1.38667rem;
  position: absolute;
  left:4.9rem;
  top:4.6rem;
  animation:gold 3s linear infinite;
}
@keyframes gold {
  0%{  
   opacity: 1;
  }
 
 50%{
  opacity:0.5;
 }
 
100% {
   opacity: 1;
  }
}
.light{
 width: .76rem;
 height: 1.01333rem;
 position: absolute;
 left: 4.3rem;
 top:9.55rem;
 animation:light 3s linear infinite;
}
@keyframes light {
  0%{  
   opacity: 1;
  }
 
 50%{
  opacity:0.5;
 }
 
100% {
   opacity: 1;
  }
}
.air{
 position: absolute;
 width:.88rem;
 height: 1.38667rem;
 left:2.13333rem;
 top:22.50667rem;
 animation:air 4s linear infinite;
}
@keyframes air {
  0%{  
   top:22.50667rem;
  }
 
 50%{
 top:21.6rem;
 }
 
100% {
   top:22.50667rem;
  }
}
.button{
  display: flex;
  height: 1.06667rem;


}
.left{
  display: flex;
width: 3.73333rem;
background: #fff;
align-items: center;
justify-content: center;
color:#225cd5;
}
.right{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #ffe222;
  color: #235bd4;
}
</style>