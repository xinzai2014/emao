<template>
<div class="animation" v-show="show">
  <img src="./images/animation.png" alt="" class="background">
  <img src="./images/background.png" alt="" class="backg">
  <div class="alert">
    <div id="height" >
      <div class="height opcity">
        <p class="title">额度高</p>
      <p class="content" >额度最高可破亿</p>
      <p class="content" >资金稳定有保障</p>
      </div>
    </div>
    <div id="quick">
      <div class="quick opcity">
      <p class="title" >放款快</p>
      <p class="content" >车辆入库后</p>
      <p class="content" >最快30分钟即可放款</p>
    </div>
    </div>
    <div id="low">
      <div class="low opcity" >
      <p  class="title" style="padding-top:.1433rem;">费率低</p>
      <p class="content">费率低至万三</p>
    </div>
    </div>
     <div id="smart">
       <div class="smart opcity">
      <p class="title" style="padding-top:.17rem">智能仓储</p>
      <p class="content" >24小时智能监管</p>
      <p class="content">车辆安全有保障</p>
    </div>
     </div>
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
      // windowOpen() {

      //  let financing=window.location.href.replace(/animation/,function(){
      //     return "financing"
      //   })
      //   financing=financing.replace(/token=\w+/,function(){
      //     return ""
      //   })

      //     var obj = {
      //         actionname: "windowOpen", //Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
      //         url:financing // 要打开的链接
      //     };
      //     this.tcmApp(obj);
      // },
      // 检测用户授信申请资格
      presaleBack(data) {
        console.log('data',data)
          var obj = {
              actionname:"checkScf",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
              data:data, //资金接口返回的json数据
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
        // this.windowOpen()
        console.log('token',this.$route.query.token)
        this.$http({
        url: "https://tcmapi.emao.com/scf/index",
        method: "GET",
        params: {
          token:this.$route.query.token,
        }
      })
      .then((res) =>{
        this.presaleBack(res.data)
      })
      }

    },
    created(){
      document.title="融资采车";

    },
    mounted(){
      setTimeout(()=>{
        this.show=true;
      },800)
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
.alert .title{
  font-weight:900;
  font-size:0.3733rem;
  color: #202020;
  margin-bottom: .05rem;
}
.alert .content{
  font-size:0.32rem;
  color: #4d4d4d;
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
#height{
position: absolute;
width:3.62667rem;
height: 1.97333rem;
line-height: .44rem;
top: 4.4rem;
left:.77333rem;
padding: .15rem 0 .14rem .3rem;
background: url("./images/height.png") no-repeat ;
background-size: 3.62667rem 1.97333rem;
background-origin:border-box;
animation:height .5s linear;
}
@keyframes height {
  0%{
   top:6.8rem;
   left:4rem;
   width:0;
   height: 0;
   background-size:0 0;
  }
100% {
  width:3.62667rem;
  height: 1.97333rem;
  top: 4.4rem;
  left:.77333rem;
  background-size: 3.62667rem 1.97333rem;
  }
  }

.opcity{
  animation:opcity 1s linear;
}
@keyframes opcity {
  0%{
  opacity: 0;
}
50%{
  opacity: 0;
}
75%{
  opacity: .5;
}
100%{
  opacity: 1;
}
}
  #quick .quick{
    padding-left: .8rem;
  }
#quick{
width: 4.17333rem;
height: 1.76rem;
top:9.93333rem;
right:.18667rem;
line-height: .44rem;
position: absolute;
padding-top: .1433rem;
background: url("./images/quick.png") no-repeat ;
background-size: 4.17333rem  1.76rem;
background-origin:border-box;
animation:quick .5s linear;
}
@keyframes quick {
  0%{
   top:11rem;
   right:5rem;
   width:0;
   height:0;
   background-size:0 0;
  }
100% {
  top:9.93333rem;
  right:.18667rem;
  width: 4.17333rem;
  height: 1.76rem;
  background-size: 4.17333rem  1.76rem;
  }
  }

#low{
width: 3.05333rem;
height: 1.57333rem;
left: .70667rem;
top:15.12rem;
line-height: .44rem;
position: absolute;
background: url("./images/low.png") no-repeat ;
background-size: 3.05333rem  1.57333rem;
background-origin:border-box;
animation:low .5s linear;
}
#low .low{
  padding-left:.15rem;
}
@keyframes low {
  0%{
   width:0;
   height:0;
   left: 3.5rem;
   top:16.3rem;
   background-size:0 0;
  }
100% {
   width: 3.05333rem;
  height: 1.57333rem;
  left: .70667rem;
  top:15.12rem;
  background-size: 3.05333rem  1.57333rem;
  }
}
#smart{
width: 3.33333rem;
height: 2.12rem;
right: .66667rem;
top:16.88rem;
line-height: .44rem;
position: absolute;
position: absolute;
background: url("./images/smart.png") no-repeat ;
background-size: 3.33333rem  2.12rem;
background-origin:border-box;
animation:smart .5s linear;

}
#smart .smart{
  padding-left:.19rem
}
@keyframes smart {
  0%{
   width:0;
   height:0;
   right: 3rem;
   top:19rem;
   background-size:0 0;
  }
100% {
  width: 3.33333rem;
  height: 2.12rem;
  right: .66667rem;
  top:16.88rem;
   background-size:  3.33333rem  2.12rem;
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
