<template>
<div class="animation" v-show="show">
  <img src="./images/animation.png" alt="" class="background">
  <img src="./images/background.png" alt="" class="backg">
  <div class="alert">
    <div class="height">
      <p style="font-weight:900;font-size:0.3733rem">额度高</p>
      <p style="font-size:0.32rem">额度最高可破亿</p>
      <p style="font-size:0.32rem">资金稳定有保障</p>
    </div>
    <!-- <img src="./images/height.png" alt="" class="height"> -->
    <!-- <img src="./images/quick.png" alt="" class="quick"> -->
    <div class="quick">
      <p style="font-weight:900;font-size:0.3733rem">放款快</p>
      <p style="font-size:0.32rem">车辆入库后</p>
      <p style="font-size:0.32rem">最快30分钟即可放款</p>
    </div>
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
      timer:"",
      show:false
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
      
         let financing=window.location.href.replace(/animation/,function(){
            return "financing"
          })
          financing=financing.replace(/token=\w+/,function(){
            return ""
          })
         
            var obj = {
                actionname: "windowOpen", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                url:financing // 要打开的链接  
            };
            this.tcmApp(obj);
        },
      call(){
       
       if(this.timer){clearTimeout(this.timer) 
        
       return 
       }
        this.$http({
        url: "https://tcmapi.emao.com/statistics/service/online",
        method: "POST",
        params: {
          token:this.$route.query.token,
          place:"animation",
          extra:JSON.stringify(this.$route.query)
        }
      })
        .then(function(res) {
        this.timer=setTimeout(()=>{
          window.location.href='emaotaochemao://push/Customer?userName=&phone=&nickName=&headImage=&autoSourceId=&hint='
                   
        },0)
         setTimeout(()=>{
           this.timer="";
         },1000)
      
        })
        .catch(error => {
         console.log(error)
        });
       
      },
      apply(){
        // this.$router.push({path: "/financing",query:{...this.$route.query}})
        this.windowOpen()
      }

    },
    created(){
      document.title="融资采车";

    },
    mounted(){
      setTimeout(()=>{
        this.show=true;
      },1000)
    }
}
</script>
<style>
.animation{
  width:100%;
  position: relative;
  padding-bottom:  1.06667rem;
}
.animation .background{
  width: 100%
}
.animation .backg{
  width: 100%;
  position:absolute;
  top: 0 ;
  left: 0;
  animation:backg 3s linear infinite;
  opacity: 0;
}
@keyframes backg {
  0%{  
   opacity: 0.3;
  }
  25%{
   opacity: 0.5; 
  }
50%{
  opacity: 0.8;
}
75%{
  opacity: 1;
}
100% {
   opacity: 0.5;
  }
}
.alert img{
  position: absolute;
}
.height{
position: absolute;
width:3.62667rem;
height: 1.97333rem;
top: 4.4rem;
left:.77333rem;
color: black;
padding: .15rem 0 .13333rem .3rem;
background: url("./images/height.png") no-repeat ;
background-size: 3.62667rem 1.97333rem;
background-origin:border-box;
animation:height 1s linear;
}
@keyframes height {
  0%{  
   top:6.8rem;
   left:4rem;
   width:0;
   height: 0;
   color: transparent;
   background-size:0 0;
  }
  98%{
    color: transparent;
  }
100% {
  width:3.62667rem;
  height: 1.97333rem;
  top: 4.4rem;
  left:.77333rem;
  color: black;
  background-size: 3.62667rem 1.97333rem;
  }
  }
  .quick p{
    padding-left: .8rem; 
  }
.quick{
width: 4.17333rem;
height: 1.76rem;
top:9.93333rem;
right:.18667rem;
position: absolute;
padding-top: .15333rem;
color: black;
background: url("./images/quick.png") no-repeat ;
background-size: 4.17333rem  1.76rem;
background-origin:border-box;
animation:quick 1s linear;
}
@keyframes quick {
  0%{  
   top:11rem;
   right:5rem;
   width:0;
   height:0;
   color: transparent;
   background-size:0 0;
  }
  98%{
    color: transparent;
  }
100% {
  top:9.93333rem;
  right:.18667rem;
  width: 4.17333rem;
  height: 1.76rem;
  background-size: 4.17333rem  1.76rem;
  }
  }

.low{
width: 3.05333rem;
height: 1.57333rem;
left: .70667rem;
top:15.12rem;
animation:low 1s linear;
}
@keyframes low {
  0%{  
   width:0;
   height:0;
   left: 3.5rem;
   top:16.3rem;
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
animation:smart 1s linear;
}
@keyframes smart {
  0%{  
   width:0;
   height:0;
   right: 3rem;
   top:19rem;
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
    top:4.6rem;
  }
 
 50%{
   top:4.3rem;
 }
 
100% {
    top:4.6rem;
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
   top:9.55rem;
  }
 
 50%{
  top:9.3rem;
 }
 
100% {
  top:9.55rem;
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
 top:22rem;
 }
 
100% {
   top:22.50667rem;
  }
}
.button{
  width: 100%;
  display: flex;
  height: 1.06667rem;
  position: fixed;
  bottom: 0;
  font-size: .4rem

}
.left{
  display: flex;
width: 3.73333rem;
background: #fff;
align-items: center;
justify-content: center;
color:black;
}
.right{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #ffe222;
  color: black;
}
</style>