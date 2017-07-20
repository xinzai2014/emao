<template>
  <div class="book-car-out">
    <!--首页-订车-详情页-头部-->
    <header class="book-car-header">
        <i class="white-lt brand-left-cion"></i>
    </header>
    <!--首页-订车-详情页-图片滚动-->
     <swiper :circular="circular"></swiper>

    <!--首页-订车--详情页-车型信息-->
    <section class="book-car-count">
        <p>{{serieTitle}}</p>
    </section>
   <section class="book-car-info">
       <ul>
           <li v-for="(item,index) in serieData">
               <p class="book-car-name">{{item.name}}</p>
               <div class="book-car-price-info clearfix">
                   <div class="book-car-price">
                       <strong>{{item.emaoPrice}}万</strong>
                   </div>
                    <div class="book-guide-price clearfix" v-if="item.fallPrice>0">
                        <span>指导价：</span>
                        <em>{{item.guidePrice}}万</em>
                        <strong>(下) <i>{{item.fallPrice}}万</i> </strong>
                    </div>
               </div>
               <div class="book-car-action clearfix">
                   <span>配置参数</span>
                   <input class="book-car-buy" @click="showFullpay(item.id)" type="text" name="" value="全款购车" v-if="item.sale==1">
                   <input class="book-car-apply" type="text" name="" value="申请展车" v-if="item.show==1">
                   <input class="book-car-remind" type="text" name="" value="到货提醒" v-if="(item.sale==2)&&(item.show==2)">
               </div>
           </li>
       </ul>
   </section>
    <!--首页-订车-详情页-车型对比-->
    <section class="book-car-contrast">
        <div><span>3</span>款车对比</div>
        <i class="white-rt"></i>
    </section>
    <!--首页-订车-详情页-订车保障-->
    <section class="book-car-guarantee">
        <p>订车保障</p>
    </section>
    <!--首页-订车-详情页-到货提醒-弹窗-->
    <section class="brand-list-popup" style="display:none">
        <div class="brand-popup-in">
            <div class="brand-search-tips">
                <p>车辆到货时将通知你</p>
            </div>
            <div class="brand-popup-ok">好的</div>
        </div>
    </section>
    <!-- 全款购车弹出层 -->
    <section class="book-car-popup" v-if="showMoney" >
        <div class="book-order">
            <p class="book-order-title">
               <span>全款购车</span>
                <i @click="closeFullpay"></i>
            </p>
            <div class="book-order-info">
                <p class="book-car-name">{{fullData.name}} </p>
                <div class="book-car-price-info clearfix">
                    <div class="book-car-price">
                        <strong>{{fullData.price}}万</strong>
                    </div>
                    <div class="book-guide-price clearfix" v-if="fullData.fallPrice>0">
                        <span>指导价：</span>
                        <em>{{fullData.guidePrice}}万</em>
                        <strong>(下) <i>{{fullData.fallPrice}}万</i> </strong>
                    </div>
                </div>
                <p class="book-car-repertory" v-if="fullCount>10">库存充足</p>
                <p class="book-car-repertory" v-else="fullCount>0">库存{{fullCount}}台</p>
            </div>
            <div class="book-order-colors" v-if="fullData.stock.length>0">
                <p>可选颜色</p>
                <ul class="clearfix">
                    <li class="choosable" @click="updateFullIndex(index,item.sum)" :class="{unavailable:disabledFullIndex == index,active:ActiveIndex == index}" v-for="(item,index) in fullData.stock">{{item.color}}/{{item.inColor}}</li>
                </ul>
            </div>
            <section class="book-buy-now">
                <input type="text" class="active" name="" value="立即购买">
            </section>
        </div>
    </section>
</div>
</template>

<script>

import swiper from '../../components/common/swiper/swiper'

export default {
  name: 'index',
  data () {
    return {
        serieId:null,
        serieTitle:null,
        serieData:[],
        fullData:{
          name:null,
          fallPrice:null,
          guidePrice:null,
          price:null,
          stock:[]
        },
        disabledFullIndex:null, //
        ActiveIndex:null,
        fullCount:null,
        circular:[    //轮播图数据
            
        ],
        showMoney:false
    }
  },
  methods:{
    showFullpay(id){
      this.getFullData(id);
    },
    closeFullpay(id){
      this.showMoney = !this.showMoney;
    },
    updateFullIndex(index,sum){
      if(this.disabledFullIndex == index){
        return false;
      }
      this.ActiveIndex = index;
      this.fullCount = sum;
    },
    getFullData(id){
      this.$http({
          url:"order/full/inventory",
          method:"GET",
          params:{
            token:sessionStorage.token,
            autoId:id
          }
      }).then(function (response) {
          this.fullData = response.body.data;
          this.showMoney = !this.showMoney;
          this.disabledFullIndex = this.fullData.stock.findIndex(function(value,index,arr){
              return value.sum <= 0
          });
          this.ActiveIndex = (this.disabledFullIndex!=0)?0:this.disabledFullIndex+1;
          this.fullCount = this.fullData.stock[this.ActiveIndex].sum;
          console.log("请求成功了");
        },function(){
           console.log("请求失败了");
        })
    },
    getData(){ //初始化拿数据
      var token = sessionStorage.token;
      console.log(this.serieId);
      this.$http({
          url:"goods/detail",
          method:"GET",
          params:{
            token:token,
            serieId:this.serieId
          }
      }).then(function (response) {
        console.log(response.body.data.circular.length);
          this.serieTitle = response.body.data.series.title;
          this.serieData = response.body.data.series.list;
          this.circular = response.body.data.circular;
          console.log("请求成功了");
        }).catch(function (error) {
          console.log("请求失败了");
        });
   }
  },
  mounted(){
    //组件初始完成需要做什么
    this.serieId = this.$route.params.id;
    this.getData();
  },
  components:{
    swiper
  },
  beforeRouteEnter (to, from, next) {
    console.log("来首页看看吧");
    console.log(to);
    next();
  },
  beforeRouteLeave (to, from, next) {
    console.log("你要离开吗");
    next();
  }
}
</script>

<style>


/*首页-订车-商品详情页*/
.book-car-out{position:relative;}
.book-car-header{overflow: hidden;height: 1.1733rem;text-align: center;line-height: 1.1733rem;font-size: .5333rem;position: absolute;z-index: 3;}
.book-car-detail .index-icon{left:0;right:.4rem;}
.book-car-detail .index-icon li{float:right;}
.book-car-count{height:1.0667rem;padding-left:.4rem;padding-top:.5333rem;background-color:#fff;}
.book-car-count p{padding-left:.4rem;font-size:0.5067rem;color:#000;border-left:1px solid #000;}
.book-car-info{background-color:#fff;margin-bottom:.4rem;}
.book-car-info ul li{padding:.5333rem .4rem;border-top:1px solid #2c2c2c;}
.book-car-name{margin-bottom:.4rem;font-size:.42667rem;color:#2c2c2c;}
.book-car-price{float:left;width:2.4rem;margin-right:.4rem;font-size:.4533rem;font-weight:bold;color:#fc3d36;}
.book-guide-price{float:left;margin-top:.0667rem;font-size:.3467rem;color:#999;}
.book-guide-price span{display:block;float:left;}
.book-guide-price strong{display:block;float:left;margin-left:.2667rem;font-weight:normal;}
.book-guide-price em{display:block;float:left;width:1.6667rem;}
.book-car-action{margin-top:.5333rem;font-size:.3733rem;}
.book-car-action span{display:block;float:left;padding-bottom:1px;margin-top:0.333rem;text-decoration:underline;}
.book-car-action input{width:2.6666rem;height:1.0667rem;float:right;text-align:center;line-height:1.0667rem;border-radius:.5333rem;}
.book-car-apply{margin-right:.4rem;border:1px solid #666;}
.book-car-buy{border:1px solid #d5aa5c;}
.book-car-remind{font-size:.3733rem;color:#6aa3e4;border:1px solid #6aa3e4;}
.book-car-contrast{position:relative;height:1.4667rem;padding-left:.4rem;margin-bottom:.4rem;line-height:1.4667rem;font-size:.4266rem;background-color:#fff;}
.book-car-contrast i{position:absolute;top:.533rem;right:.4666rem;}
.book-car-guarantee{padding-left:.4rem;padding-top:.5333rem;background-color:#fff;}
.book-car-guarantee p{padding-left:.4rem;font-size:0.5067rem;color:#000;border-left:1px solid #000;}


/*首页-订车-详情页-订车弹窗*/
.book-car-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.book-order{position:fixed;bottom:0;z-index:6;width:10rem;background-color:#fff;}
.book-order-title{position:relative;height:1.5333rem;line-height:1.5333rem;padding-left:.4rem;font-size:.50667rem;color:#2c2c2c;}
.book-order-title i{position:absolute;top:.5333rem;right:.4667rem;width:.3733rem;height:.3733rem;background:url("../../assets/close.png") no-repeat;background-size:100% 100%;border-bottom:1px solid #eee;}
.book-order-info{margin-left:.4rem;margin-right:.4rem;padding:.5333rem 0;border-bottom:1px solid #2c2c2c;}
.book-car-repertory{margin-top:.4rem;color:#999;font-size:.4rem;}
.book-order-colors{margin:0 .4rem 2.667rem .4rem;padding:.5333rem 0;border-bottom:1px solid #2c2c2c;}
.book-order-colors p{color:#2c2c2c;font-size:.4rem;margin-bottom:.4rem;}
.book-order-colors ul{}
.book-order-colors li{float:left;height:.8533rem;margin-right:.4rem;margin-bottom:.4rem;padding:0 .2667rem;line-height:.8533rem;font-size:.3733rem;border-radius:.1333rem;}
.book-order-colors li.choosable{background-color:#f5f5f5;color:#2c2c2c;}
.book-order-colors li.active{background-color:#d5aa5c;color:#fff;}
.book-order-colors li.unavailable{background-color:#f5f5f5;color:#b7b7b7;}
.book-buy-now input{width:100%;height:1.28rem;font-size:.4533rem;color:#fff;line-height:1.28rem;text-align:center;border:none;background-color:#d5aa5c;}
.book-buy-now .active{background-color:#d5aa5c;color:#fff;}
.book-buy-now .unavailable{background-color:#f5f5f5;color:#b7b7b7;}

</style>
