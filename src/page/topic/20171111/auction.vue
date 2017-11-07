<template>
  <div class="auction-Wrap">
    <header class="auction-header"></header>
    <div class="auction-banner"></div>
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
                <span v-else>当前价：<em>{{item.auction_data.length?item.auction_data[0]["auction_price"]:item.start_price}}</em>万</span>
                <span>指导价：{{item.guide_price}}万</span>
              </div>
              <div class="ac-t3-btn" v-if="item.auction_status == 3">
                <input type="button" @click="showAuction(item.id)" value="我要出价"/>
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
                <dd>{{e.link_name}}</dd>
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
        <div class="dialog-t3" @click="auctionData">立即出价</div>
      </div>
      <div class="dialog-close" @click.stop="auctionDialog = !auctionDialog"><span>×</span></div>
    </div>

    <!-- 弹窗2---->
    <div class="auction-dialog" v-show="tipsDialog">
      <div class="auction-dialog-con">
        <div class="dialog-t1">很抱歉，当前价有更新请重新出价</div>
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
        <div class="dialog-t3">好的</div>
      </div>
      <div class="dialog-close"  @click.stop="sucessDialog = !sucessDialog"><span>×</span></div>
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
        startTime:"2017-11-11",
        endTime:"2017-11-14",
        curIndex:null, //当前日期索引
        curDate:"2017-11-06", //当前日期
        subData:{}, //提交竞价接口数据
        selectAucitonData:100, //竞价默认初始值
        selectAuciton:[100,500,1000], // 竞价区间
        newPrice:null
      }
   },
   methods:{
     getData(strTime){  //获取页面初始数据
       this.$http({
         url:"auction/index",
         method:"GET",
         params:{
           token:sessionStorage.token,
           date:strTime
         }
       }).then(function(res){
         var ajaxData = res.body.data;
         var that = this;
         ajaxData.forEach(function(ele,index){
           ele.timer = null;
           if(ele.auction_status == 3){
             //求最新价，如果已经有竞拍数据，就取第一条，没有的话，就取起拍价
             that.newPrice = ele.auction_data.length?ele.auction_data[0]["auction_price"]:ele.start_price;
             var timeEnd = new Date(ele.auction_end_at).getTime();
             ele.timer = window.setInterval(()=>{
                 var str = "";
                 var curDateTime = new Date().getTime();
                 var counts = timeEnd - curDateTime;
                 if(counts<=0){
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
             },1000)
           }
         })
         this.carData = ajaxData;
       })
     },
     auctionData(){  //提交竞价数据
        var that = this;
        this.subData["auctionPrice"] = (+this.newPrice) + this.selectAucitonData/10000;
        //this.subData["auctionPrice"] = 8.2;
        this.$http({
          url:"auction/enterAuction",
          params:this.subData,
          method:"GET"
        }).then(function(res){
          console.log(res);
          this.auctionDialog = false;
          if(res.body.code == 200){
            this.newPrice = res.body.msg;
            this.tipsDialog = true;
            return false;
          }
          this.liveData(tagIndex);

        },function(error){
           console.log(error);
        })
     },
     liveData(tagIndex){ //实时数据
       this.$http({
         url:"auction/realTimeDetail",
         params:{
          token:this.subData["token"],
          auctionId:this.subData["id"],
          date:this.curDate
         },
         method:"GET"
       }).then(function(res){
         console.log(res);
         this.carData[tagIndex]["auction_data"] = res.body.data["real_time_detail"];
       })
     },
     getTimeData(index,str){
         this.curentDate.forEach(function(ele,index){
           ele.flag = false;
         });
         this.curentDate[index].flag = true;
        this.getData(str);
     },
     showAuction(id,price){
       this.subData["id"] = id;
       this.subData["token"] = sessionStorage.token;
       this.auctionDialog = true;
     },
    againPrice(){
        this.tipsDialog = false;
        this.auctionDialog = true;
    }
   },
   filters:{
      phoneFormat:function(phone){
        return phone;
        //return phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
      },
      nameFormat:function(name){

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
     var date = new Date();
     var startTime = new Date(this.startTime).getTime();
     var endTime = new Date(this.endTime).getTime();
     var currentTime = date.getTime();
     if(currentTime<startTime){
       console.log("竞拍还没开始呢");
     }else if(currentTime>endTime){
       console.log("竞拍结束了");
     }else{
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
       }
       this.curentDate.forEach(function(ele,index){
         ele.flag = false;
       });
       this.curentDate[this.curIndex].flag = true;
       this.getData(curentYear+"-"+curentMonth+"-"+curentDate);
     }
     var curentYear = date.getFullYear();
     var curentMonth = date.getMonth() + 1;
     var curentDate = date.getDate()<10?"0"+date.getDate():date.getDate();
     this.curDate = curentYear+"-"+curentMonth+"-"+curentDate;
     this.getData(this.curDate);
   }
 }
</script>
<style>
  .auction-Wrap{height:100%;background:#372563;}
  .auction-header{height:1.2rem;background:#27282f;line-height:1.2rem;text-align:center;position:relative}
  .auction-header::before{display:block;content:"";width:0.186rem;height:0.347rem;background:url(../../../assets/lt-icon.png) no-repeat 0 0;background-size:100%;position:absolute;top:50%;left:0.333rem;transform:translateY(-50%);}
  .auction-banner{background:url(../../../assets/topic-banner1.png) no-repeat 0 0;background-size:100%;height:17.73rem;}
  .ac-nav{background:#fff003;text-align:center;font-size:0.4267rem;padding:0.16rem 0;}
  .ac-nav::after{clear:both;display:block;content:""}
  .ac-nav dd{width:33.33%;float:left;line-height:0.853rem;}
  .ac-nav dd.active{color:#FFF;}
  .ac-nav dd.active span{border-radius:0.5rem;line-height:1;padding:0.12rem 0.533rem;background: -webkit-linear-gradient(left, #f7286c , #f9d210); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #f7286c, #f9d210); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #f7286c, #f9d210); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #f7286c , #f9d210); /* 标准的语法 */}
  .ac-con{padding:0.467rem 0.333rem}
  .ac-item{background:#9205cb;color:#FFF;border-radius:0.133rem;margin-bottom:0.4rem;}
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
  .ac-item .ac-t4 dl dt:nth-child(1),.ac-item .ac-t4 dl dd:nth-child(1){width:25%;}
  .ac-item .ac-t4 dl dt:nth-child(2),.ac-item .ac-t4 dl dd:nth-child(2){width:50%;}
  .ac-item .ac-t4 dl dt:nth-child(3),.ac-item .ac-t4 dl dd:nth-child(3){width:25%;}
  .ac-nodata{padding:1.5rem 0;position:relative}
  .ac-nodata span{position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;background:url(../../../assets/topic-pic1.png) no-repeat 0 0;width:4.8rem;height:1.4rem;background-size:100%;}
  .auction-dialog{position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.75)}
  .auction-dialog-con{color:#FFF;position:fixed;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);width:7.853rem;height:6.49rem;background:url(../../../assets/topic-banner2.png) no-repeat 0 0;background-size:100%;}
  .auction-dialog-con .dialog-t1{font-size:0.48rem;padding:1.9rem 1.5rem 0;text-align:center;}
  .auction-dialog-con .dialog-t2{text-align:center;padding-top:0.77rem;font-size:0.4rem;position:relative;}
  .auction-dialog-con .dialog-t2 select{display:inline-block;-webkit-appearance:none;border:none;background:#FFF;width:4.18rem;height:1rem;border-radius:0.25rem;color:#d300fc;margin-left:0.13rem;text-indent:0.4rem;}
  .auction-dialog-con .dialog-t2::after{position:absolute;top:1.05rem;right:1.2rem;content:"";display:block;width:0;height:0;border-left:0.2rem solid transparent;border-right:0.2rem solid transparent;border-top:0.3rem solid #9008fa;}
  .auction-dialog-con .dialog-t3{padding-top:1rem;text-align:center;font-size:0.427rem;text-indent:0.4267rem;}
  .auction-dialog-con .dialog-t4{text-align:center;font-size:0.4rem;padding-top:0.6rem}
  .auction-dialog-con .dialog-t5{font-size:0.48rem;padding:2.5rem 1.5rem 0;text-align:center;}
  .dialog-close{position:fixed;top:72%;left:50%;font-size:0.85rem;color:#FFF;}
  .dialog-close span{border:1px solid #FFF;display:inline-block;width:1.067rem;height:1.067rem;transform:translateX(-35%);line-height:1.067rem;text-align:center;border-radius:50%;}
</style>


