<template>
  <div class="auction-Wrap">
    <!--<header class="auction-header"></header>-->
    <div class="auction-banner">
      <div class="lookRule" @click.stop="ruleDialog = !ruleDialog"></div>
    </div>
    <div class="auction-content">
      <nav class="ac-nav">
         <dl>
          <dd v-for="(item,index)  in curentDate" :class="{active:item.flag}" @click="getTimeData(index,item.curTime)"><span>{{item.text}}</span></dd>
         </dl>
      </nav>
      <div class="ac-con">
        <div class="ac-item" v-for="(item,index) in carData">
          <div class="ac-top">
            <figcaption class="ac-t1">{{item.serie_name}}</figcaption>
            <div class="ac-t2">
              <span>外观/内饰： {{item.ext_color}} / {{item.ext_trim}}</span>
              <span v-if="item.auction_status == 1">已结束</span>
              <span v-if="item.auction_status == 2">开始时间：{{item.auction_start_at|timeFormat}}</span>
              <span v-if="item.auction_status == 3">距结束：{{item.auction_end_at}}</span>
            </div>
            <div class="ac-t3">
              <div class="ac-t3-price">
                <span v-if="item.auction_status == 2">起拍价：<em>{{item.start_price}}</em>万</span>
                <span v-else>当前价：<em>{{item.auction_data.length>0?item.auction_data[0]["auction_price"]:item.start_price}}</em>万</span>
                <span>指导价：{{item.guide_price}}万</span>
              </div>
              <div class="ac-t3-btn" v-if="item.auction_status == 3">
                <input type="button" @click="showAuction(index)" value="我要出价"/>
              </div>
              <div class="ac-t3-tips" v-if="item.auction_status == 1&&item.auction_data.length>0">
                <template>
                  <span>恭喜</span>
                  <span>{{item.auction_data[0].link_phone}}</span>
                  <span>竞拍成功！</span>
                </template>
              </div>
            </div>
          </div>
          <div class="ac-bottom">
            <div class="ac-t4" v-if="item.auction_data.length>0">
              <dl>
                <dt>竞拍人</dt>
                <dt>手机号</dt>
                <dt>竞拍价</dt>
              </dl>
              <dl v-for="(e,ind) in item.auction_data">
                <dd>{{e.link_name|nameFormat}}</dd>
                <dd>{{e.link_phone|phoneFormat}}</dd>
                <dd>{{e.auction_price}}万</dd>
              </dl>
            </div>
            <div class="ac-nodata" v-if="item.auction_status == 2">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="auction-tel">
        <span>活动咨询：400-825-2368</span>
      </div>
    </div>
    <!-- 弹窗1---->
    <div class="auction-dialog" v-show="auctionDialog">
      <div class="auction-dialog-con">
        <div class="dialog-t1">当前价：{{newPrice}}万</div>
        <div class="dialog-t2">加价幅度
          <select v-model="selectAucitonData">
            <option v-for="option in selectAuciton" :value="option">{{option}}</option>
          </select>
        </div>
        <div class="dialog-t3" @click="liveData(aitivityIndex,true)">立即出价</div>
      </div>
      <div class="dialog-close" @click.stop="auctionDialog = !auctionDialog"><span>×</span></div>
    </div>

    <!-- 弹窗2---->
    <div class="auction-dialog" v-show="tipsDialog">
      <div class="auction-dialog-con">
        <div class="dialog-t1">很抱歉，当前价有更新<br/>请重新出价</div>
        <div class="dialog-t4">当前价：{{newPrice}}万</div>
        <div class="dialog-t3" @click="againPrice">重新出价</div>
      </div>
      <div class="dialog-close" @click.stop="tipsDialog = !tipsDialog"><span>×</span></div>
    </div>

    <!-- 弹窗3---->
    <div class="auction-dialog" v-show="sucessDialog">
      <div class="auction-dialog-con">
        <div class="dialog-t5">恭喜您，出价成功</div>
        <div class="dialog-t4">温馨提示：请密切关注竞拍信息</div>
        <div class="dialog-t3" @click.stop="sucessDialog = !sucessDialog">好的</div>
      </div>
      <!--<div class="dialog-close"  @click.stop="sucessDialog = !sucessDialog"><span>×</span></div>-->
    </div>

    <div class="auction-dialog" v-if="sorryDialog">
      <div class="auction-dialog-con">
        <div class="dialog-t6">对不起，您还没有完成<br/>诚意金支付，暂无出价资格</div>
        <div class="dialog-t3" @click.stop="sorryDialog = !sorryDialog">知道了</div>
      </div>
      <!--<div class="dialog-close"  @click.stop="sorryDialog = !sorryDialog"><span>×</span></div>-->
    </div>

    <!-- 规则 -->
    <div class="auction-dialog" v-if="ruleDialog">
      <div class="auction-dialog-con2">
        <div class="auction-dialog-wrap"><span @click.stop="ruleDialog = !ruleDialog"></span></div>
      </div>
    </div>

  </div>
</template>
<script>
 export default {
   name:"auction",
   data:function(){
      return {
        carData:null,
        curentDate:[
          {
            text:"11月11日",
            flag:false,
            curTime:"2017-11-11"
          },
          {
            text:"11月12日",
            flag:false,
            curTime:"2017-11-12"
          },
          {
            text:"11月13日",
            flag:false,
            curTime:"2017-11-13"
          }
        ],
        auctionDialog:false, //提交报价弹出窗
        sucessDialog:false, //报价成功弹出窗
        tipsDialog:false,    //报价更新提示
        sorryDialog:false, //还没完成诚意金支付
        ruleDialog:false, //规则弹窗
        startTime:"2017-11-11",
        endTime:"2017-11-14",
        curIndex:null, //当前日期索引
        curDate:"", //当前日期
        selectAucitonData:100, //竞价默认初始值
        selectAuciton:[100,500,1000], // 竞价区间
        newPrice:null,
        token:null,//保存token
        aitivityIndex:null,//活动索引，用于标识点击了哪个
        timeCount:null
      }
   },
   methods:{
     getData(strTime){  //获取页面初始数据
       if(this.carData){
         this.carData.forEach(function(ele,index){
           window.clearInterval(ele.timer);
           window.clearInterval(ele.realTimerData);
           window.clearTimeout(ele.timeoutData);
         })
       }
       this.$http({
         url:"auction/index",
         method:"GET",
         params:{
           token:this.token,
           date:strTime
         }
       }).then(function(res){
         var ajaxData = res.body.data;
         var that = this;
         var noStartData = []; //未开始数据
         var hasfinishData = []; //已结束
         var inhandData = [];  //进行中
         var tagData = [];
         ajaxData.forEach(function(ele,index){
           if(ele.auction_status == 1){
             hasfinishData.push(ele);
           }
           if(ele.auction_status == 2){
             noStartData.push(ele);
           }
           if(ele.auction_status == 3){
             inhandData.push(ele);
           }
         })
         tagData = inhandData.concat(noStartData).concat(hasfinishData);
         tagData.forEach(function(ele,index){
           ele.timer = null;
           if(ele.auction_status == 3){ //正在进行中的车需要倒计时并且一分钟刷一次竞拍数据
             //求最新价，如果已经有竞拍数据，就取第一条，没有的话，就取起拍价
             that.newPrice = ele.auction_data.length>0?ele.auction_data[0]["auction_price"]:ele.start_price;
             var timeEnd = new Date(ele.auction_end_at.replace(/\-/g,"/")).getTime();
             var serverTime = new Date(ele.now.replace(/\-/g,"/")).getTime();
             that.timeCount  = timeEnd - serverTime;
             ele.timer = window.setInterval(()=>{
                 var str = "";
                 var counts = that.timeCount;
                 if(counts<=0){
                   window.clearInterval(ele.timer);
                   ele.timer = null;
                   window.clearInterval(ele.realTimerData);
                   ele.realTimerData = null;
                   console.log("本次竞拍马上结束了");
                   that.getData(that.curDate);
                 }
                 var hours = Math.floor(counts/(60*60*1000));
                 var minute = Math.floor(counts%(60*60*1000)/(60*1000));
                 var second = Math.floor(counts%(60*60*1000)%(60*1000)/1000);
                 if(hours>0){
                   str += hours + "小时"
                 }
                 if(minute>0){
                   str += minute + "分钟"
                 }
                 if(second>0){
                   str += second + "秒"
                 }
                 ele.auction_end_at = str;
                 that.timeCount = that.timeCount - 1000;
             },1000)

             ele.realTimerData = window.setInterval(()=>{
                  that.liveData(index);
             },1000*60);
           }
           var timeRefresh = new Date(ele.auction_start_at.replace(/\-/g,"/")).getTime() - new Date(ele.now.replace(/\-/g,"/")).getTime() + 1000;
           if(timeRefresh>0){
             ele.timeoutData = window.setTimeout(()=>{
               that.getData(that.curDate);
             },timeRefresh)
           }
         })
         this.carData = tagData;
       })
     },
     auctionData(){  //提交竞价数据
        var that = this;
        var auctionPrice  = ((+this.newPrice*10000) + this.selectAucitonData)/10000;
        this.$http({
          url:"auction/enterAuction",
          params:{
            id:this.carData[this.aitivityIndex].id,
            auctionPrice:auctionPrice,
            token:this.token
          },
          method:"GET"
        }).then(function(res){
          this.auctionDialog = false;
          if(res.body.code == 200){
              this.sucessDialog = true;
              //this.liveData(this.aitivityIndex);
          }else if(res.body.code == 210){
            this.newPrice = res.body.msg;
            this.tipsDialog = true;
          }else{
            this.$store.dispatch("ALERT", // 通过store传值
              {
                flag:true,
                text:res.body.msg
              }
            );
          }
          this.liveData(this.aitivityIndex);
        })
     },
     liveData(tagIndex,flag){ //实时数据
       var auctionPrice  = this.newPrice;
       console.log(tagIndex);
       this.$http({
         url:"auction/realTimeDetail",
         params:{
          token:this.token,
          auctionId:this.carData[tagIndex]["id"],
          date:this.curDate
         },
         method:"GET"
       }).then(function(res){
         console.log(res);
         this.carData[tagIndex]["auction_data"] = res.body.data["real_time_detail"];
         console.log(this.carData[tagIndex]["auction_data"].length);
         var newPrice = this.carData[tagIndex]["auction_data"].length>0?this.carData[tagIndex]["auction_data"][0]["auction_price"]:this.carData[tagIndex]["start_price"];
         console.log("原始价" + auctionPrice);
         console.log("最新价" + newPrice);
         this.newPrice = newPrice;
         if(flag){
           if(auctionPrice != newPrice){
             this.auctionDialog = false;
             this.tipsDialog = true;
           }else{
             this.auctionData();
           }
         }
       })
     },
     getTimeData(index,str){
         this.curentDate.forEach(function(ele,index){
           ele.flag = false;
         });
         this.curentDate[index].flag = true;
        this.getData(str);
     },
     showAuction(index){
       this.aitivityIndex = index;
       this.auctionDialog = true;
//       this.$http({ //暂不控制权限
//         url:"auction/checkAuctionAuth",
//         params:{
//           token:this.token,
//         },
//         method:"GET"
//       }).then(function(res){
//          var authFlag = res.body.data.auction_auth;
//          if(authFlag){
//            this.aitivityIndex = index;
//            this.auctionDialog = true;
//          }else{
//            this.sorryDialog = true;
//          }
//       })
     },
    againPrice(){
        this.tipsDialog = false;
        this.auctionDialog = true;
    },
    getToken(){
        this.token =  this.$route.query.token||sessionStorage.token;
    }
   },
   filters:{
      phoneFormat:function(phone){
        return phone;
        //return phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
      },
      nameFormat:function(name){
        if(name.length<2){
          return name;
        }
        if(name.length == 2){
          return name.substr(0,1) + "*"
        }else{
          return name.substr(0,1) + "*" + name.substr(-1,1)
        }

      },
      timeFormat:function(time){
          var nullIndex = time.indexOf(" ");
          var semicolonIndex = time.lastIndexOf(":");
          return time.substring(nullIndex+1,semicolonIndex);
      },
      timeCutDown(time){
        var date = new Date(time);
     }
   },
   mounted(){
     //this.getData();
     this.getToken();
     var date = new Date();
     var startTime = new Date(this.startTime).getTime();
     var endTime = new Date(this.endTime).getTime();
     var currentTime = date.getTime();
     if(currentTime<startTime){
       console.log("竞拍还没开始呢");
     }else if(currentTime>endTime){
       console.log("竞拍结束了");
     }
     var curentYear = date.getFullYear();
     var curentMonth = date.getMonth() + 1;
     var curentDate = date.getDate();
     switch (curentDate){
       case 11:
             this.curIndex = 0;
             break;
       case 12:
             this.curIndex = 1;
             break;
       case 13:
             this.curIndex = 2;
             break;
       default:
             this.curIndex = null;
             break;
     }
     if(this.curIndex !== null){
       this.curentDate.forEach(function(ele,index){
         ele.flag = false;
       });
       this.curentDate[this.curIndex].flag = true;
     }
     curentDate = curentDate<10?"0"+curentDate:curentDate;
     this.curDate = curentYear+"-"+curentMonth+"-"+curentDate;
     this.getData(this.curDate);
   }
 }
</script>
<style>
  .auction-Wrap{height:100%;background:#372563;}
  .auction-header{height:1.2rem;background:#27282f;line-height:1.2rem;text-align:center;position:relative}
  .auction-header::before{display:block;content:"";width:0.186rem;height:0.347rem;background:url(../../../assets/lt-icon.png) no-repeat 0 0;background-size:100%;position:absolute;top:50%;left:0.333rem;transform:translateY(-50%);}
  .auction-banner{background:url(../../../assets/topic-banner1.png) no-repeat 0 0;background-size:100%;height:18.1rem;position:relative;}
  .lookRule{height:1rem;position:absolute;left:50%;bottom:0.8rem;width:61%;transform:translateX(-50%)}
  .ac-nav{background:#fff003;text-align:center;font-size:0.4267rem;padding:0.16rem 0;}
  .ac-nav::after{clear:both;display:block;content:""}
  .ac-nav dd{width:33.33%;float:left;line-height:0.853rem;}
  .ac-nav dd.active{color:#FFF;}
  .ac-nav dd.active span{border-radius:0.5rem;line-height:1;padding:0.12rem 0.533rem;background: -webkit-linear-gradient(left, #f7286c , #f9d210); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #f7286c, #f9d210); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #f7286c, #f9d210); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #f7286c , #f9d210); /* 标准的语法 */}
  .auction-tel{text-align:center;font-size:0.4rem;}
  .auction-tel span{color:#7779ff;}
  .ac-con{padding:0.467rem 0.333rem}
  .auction-content{padding-bottom:0.4rem;}
  .ac-item{background:#9205cb;color:#FFF;border-radius:0.133rem;margin-bottom:0.4rem;}
  .ac-item:last-of-type{margin-bottom:0;}
  .ac-item .ac-top{background:#b506fb;padding:0.433rem 0.367rem;border-radius:0.133rem;}
  .ac-item .ac-bottom{padding:0.333rem 0;}
  .ac-item .ac-t1{font-size:0.48rem;line-height:1.5;}
  .ac-item .ac-t2{margin-top:0.2rem;font-size:0.32rem;}
  .ac-item .ac-t2 span:last-child{float:right;}
  .ac-item .ac-t3{margin-top:0.667rem;position:relative;}
  .ac-item .ac-t3 .ac-t3-price span{display:block;}
  .ac-item .ac-t3 .ac-t3-price span em{font-size:0.8rem;color:#fff003;margin:0 0.05rem;}
  .ac-item .ac-t3 .ac-t3-price span:nth-of-type(2){margin-top:0.1rem;}
  .ac-item .ac-t3 .ac-t3-btn input{position:absolute;right:0;bottom:0;border:none;color:#FFF;border-radius:0.5rem;letter-spacing:0.05rem;-webkit-appearance:none;height:1rem;padding:0 0.8rem;font-size:0.427rem;background: -webkit-linear-gradient(left, #f7286c , #f9d210); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #f7286c, #f9d210); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #f7286c, #f9d210); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #f7286c , #f9d210); /* 标准的语法 */}
  .ac-item .ac-t3 .ac-t3-tips{
    width:2.32rem;height:2.32rem;
    position:absolute;
    text-align:center;
    right:1rem;
    font-size:0.32rem;
    bottom:-1rem;
    line-height:1.5;
    border-radius:50%;
    background: -webkit-linear-gradient(bottom, #f7286c , #f9d210); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(top, #f7286c, #f9d210); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(top, #f7286c, #f9d210); /* Firefox 3.6 - 15 */
    background: linear-gradient(to top, #f7286c , #f9d210); /* 标准的语法 */
  }
  .ac-item .ac-t3 .ac-t3-tips span{display:block;}
  .ac-item .ac-t3 .ac-t3-tips span:nth-of-type(1){padding-top:0.45rem}
  .ac-item .ac-t4{text-align:center;font-size:0.373rem;line-height:0.667rem;}
  .ac-item .ac-t4 dl:after{display:block;clear:both;content:"";}
  .ac-item .ac-t4 dl dt,.ac-item .ac-t4 dl dd{float:left;}
  .ac-item .ac-t4 dl:first-of-type{}
  .ac-item .ac-t4 dl dt:nth-child(1),.ac-item .ac-t4 dl dd:nth-child(1){width:25%;text-align:left;text-indent:8%}
  .ac-item .ac-t4 dl dt:nth-child(2),.ac-item .ac-t4 dl dd:nth-child(2){width:50%;}
  .ac-item .ac-t4 dl dt:nth-child(3),.ac-item .ac-t4 dl dd:nth-child(3){width:25%;}
  .ac-nodata{padding:1.5rem 0;position:relative}
  .ac-nodata span{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;background:url(../../../assets/topic-pic1.png) no-repeat 0 0;width:4.8rem;height:1.4rem;background-size:100%;}
  .auction-dialog{position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.75)}
  .auction-dialog-con{color:#FFF;position:fixed;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);width:7.853rem;height:6.49rem;background:url(../../../assets/topic-banner2.png) no-repeat 0 0;background-size:100%;}
  .auction-dialog-con2{color:#FFF;position:fixed;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);width:7.853rem;height:13.53rem;background:url(../../../assets/topic-banner3.png) no-repeat 0 0;background-size:100%;}
  .auction-dialog-wrap{height:100%;position:relative;}
  .auction-dialog-wrap span{position:absolute;bottom:0.4rem;left:0;width:100%;height:1rem;}
  .auction-dialog-con .dialog-t1{font-size:0.48rem;padding:1.9rem 1.5rem 0;text-align:center;line-height:1.4;}
  .auction-dialog-con .dialog-t2{text-align:center;padding-top:0.77rem;font-size:0.4rem;position:relative;}
  .auction-dialog-con .dialog-t2 select{display:inline-block;-webkit-appearance:none;border:none;background:#FFF;width:4.18rem;height:1rem;border-radius:0.25rem;color:#d300fc;margin-left:0.13rem;text-indent:0.4rem;}
  .auction-dialog-con .dialog-t2::after{position:absolute;top:1.05rem;right:1.2rem;content:"";display:block;width:0;height:0;border-left:0.2rem solid transparent;border-right:0.2rem solid transparent;border-top:0.3rem solid #9008fa;}
  .auction-dialog-con .dialog-t3{padding-top:1.05rem;text-align:center;font-size:0.427rem;text-indent:0.4267rem;}
  .auction-dialog-con .dialog-t4{text-align:center;font-size:0.4rem;padding-top:0.6rem}
  .auction-dialog-con .dialog-t5{font-size:0.48rem;padding:2.5rem 1.5rem 0;text-align:center;}
  .auction-dialog-con .dialog-t6{font-size:0.48rem;padding:2.5rem 0 0.5rem;text-align:center;}
  .dialog-close{position:fixed;top:72%;left:50%;font-size:0.85rem;color:#FFF;}
  .dialog-close span{border:1px solid #FFF;display:inline-block;width:1.067rem;height:1.067rem;transform:translateX(-35%);line-height:1.067rem;text-align:center;border-radius:50%;}
</style>


