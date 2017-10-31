<template>
  <div class="book-car-out" v-if="ajaxLoading">
    <!--首页-订车-详情页-头部-->
    <header class="book-car-header" v-if="circular.length">
        <i class="white-lt brand-left-cion" @click="goBack"></i>
    </header>
    <!--首页-订车-详情页-图片滚动-->
     <swiper :circular="circular" v-if="circular.length"></swiper>

    <!--首页-订车-详情页-车型信息-->
    <section class="book-car-count" v-if="serieData.length>0">
        <p>{{serieTitle}}</p>
    </section>
   <section class="book-car-info" v-if="serieData.length>0">
       <ul>
           <li v-for="(item,index) in serieData">
               <p class="book-car-name">{{item.name}}</p>
               <div class="book-car-price-info clearfix">
                   <div class="book-car-price">
                       <strong>{{item.emaoPrice}}万</strong>
                   </div>
                    <div class="book-guide-price clearfix">
                        <span>指导价：</span>
                        <em>{{item.guidePrice}}万</em>
                        <strong v-if="item.fallPrice>0">( 下 <i>{{item.fallPrice}}万</i> )</strong>
                    </div>
               </div>
               <div class="book-car-action clearfix">
                   <router-link :to="'/configuration?id=' + item.id" tag="span">配置参数</router-link>
                   <input class="book-car-buy" @click="showFullpay(item.id,index)" type="button" name="" value="全款购车" v-if="item.sale==1">
                   <input class="book-car-apply" @click="showExhibpay(item.id,index)" type="button" name="" value="申请展车" v-if="item.show==1">
                   <input class="book-car-remind" @click="showTipsDialog(item.id)" type="button" name="" value="到货提醒" v-if="(item.sale==2)&&(item.show==2)">
               </div>
           </li>
       </ul>
   </section>
    <!--首页-订车-详情页-车型对比-->
    <section class="book-car-contrast" v-if="serieData.length>1">
        <div @click="goContrast"><span>{{serieData.length}}</span>款车型对比</div>
        <i class="white-rt"></i>
    </section>

    <!--商品详情图片-->
      <section class="good-detail-pic-wrap">
          <p class="good-detail-pic-title">商品详情</p>
          <ul class="good-detail-pic-list">
              <li v-for="(item,index) in goodsPicData"  @click="showFullScreen(item)">
                  <img :src=item alt="">
              </li>
          </ul>

      </section>
    <!--首页-订车-详情页-订车保障-->
    <section class="book-car-guarantee">
        <p>下单流程</p>
        <div class="book-car-text">
          <div class="text-item clearfix">
            <i></i>
            <p>选择车辆下单</p>
            <p>线上选订新车或申请展车</p>
          </div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div class="text-item clearfix">
            <i></i>
            <p>上传凭证</p>
            <p>订车后上传汇款凭证</p>
          </div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div class="text-item clearfix">
            <i></i>
            <p>闪电发车</p>
            <p>付款确认后平台闪电发车</p>
          </div>

        </div>
    </section>
    <!--首页-订车-详情页-到货提醒-弹窗-->
    <section class="brand-list-popup" v-if="showTips" @click="closeTipsDialog">
        <div class="brand-popup-in">
            <div class="brand-search-tips">
                <p>车辆到货时我们将通知您</p>
            </div>
            <div class="brand-popup-ok">好的</div>
        </div>
    </section>
    <!-- 全款购车弹出层 -->
    <section class="book-car-popup" :class="{dialogBack:showMoney}" v-if="showMoney" @click="closeFullpay">
        <div class="book-order" :class="{dialogShow:showMoney}">
            <p class="book-order-title">
               <span>全款购车</span>
                <i @click.stop="closeFullpay"></i>
            </p>
            <div class="book-order-info">
                <p class="book-car-name">{{fullData.name}} </p>
                <div class="book-car-price-info clearfix">
                    <div class="book-car-price">
                        <strong>{{fullData.price}}万</strong>
                    </div>
                    <div class="book-guide-price clearfix">
                        <span>指导价：</span>
                        <em>{{fullData.guidePrice}}万</em>
                        <strong v-if="fullData.fallPrice>0">( 下 <i>{{fullData.fallPrice}}万</i> )</strong>
                    </div>
                </div>
                <p class="book-car-repertory" v-if="!fullCount">有库存</p>
                <p class="book-car-repertory" v-if="fullCount>10">库存充足</p>
                <p class="book-car-repertory" v-if="fullCount>0&&fullCount<=10">库存{{fullCount}}台</p>
            </div>
            <div class="book-order-colors">
                <p>可选颜色</p>
                <ul class="clearfix">
                    <li class="choosable" @click.stop="updateFullIndex(index,item.sum)" :class="{unavailable:disabledFullIndex == index,active:ActiveIndex == index}" v-for="(item,index) in fullData.stock">{{item.color}}/{{item.inColor}}</li>
                </ul>
            </div>
            <section class="book-buy-now">
                <input type="button" class="active" name="" @click.stop="fullBay" value="立即购买">
            </section>
        </div>
    </section>

    <!-- 申请展车-->
    <section class="book-car-popup" :class="{dialogBack:showExhib}" v-if="showExhib" @click.stop="closeExhibPay">
          <div class="book-order" :class="{dialogShow:showExhib}">
              <p class="book-order-title">
                  <span>申请展车</span>
                  <i @click.stop="closeExhibPay"></i>
              </p>
              <div class="book-order-info">
                  <p class="book-car-name">{{ExhibData.name}}</p>
                  <div class="book-car-price-info clearfix">
                      <div class="book-car-price">
                          <strong>{{ExhibData.price}}万</strong>
                      </div>
                      <div class="book-guide-price clearfix">
                          <span>指导价：</span>
                          <em>{{ExhibData.guidePrice}}万</em>
                      </div>
                  </div>
                  <p class="book-car-repertory" v-if="!exhibCount">有库存</p>
                  <p class="book-car-repertory" v-else>{{exhibCount}}</p>
              </div>
              <div class="book-order-colors">
                  <p>可选颜色</p>
                  <ul class="clearfix">
                      <li class="choosable" @click.stop="updateExhibIndex(index,item.sum)" v-for="(item,index) in ExhibData.stock" :class="{unavailable:disabledExhibIndex == index,active:ActiveExhibIndex == index}">{{item.color}}/{{item.inColor}}</li>
                  </ul>
              </div>
              <section class="book-buy-now">
                  <!--立即申请展车-->
                  <input type="button" class="active" @click.stop="applyExhib" v-if="ExhibData.apply>=0" name="" value="立即申请">
                  <!--您已申请此展车-->
                  <input type="button" class="unavailable" name="" v-else value="您已申请此展车">
              </section>
          </div>
      </section>
    <!--全屏显示商品图片-->
   <div class="good-pic-full-screen" v-if="showfullStatus" @click="closeFullScreen">
      <img :src="showFullData" alt="" >
   </div>
  <!--错误提示框-->
  <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
</div>
</template>

<script>
import { mapState } from 'vuex' //计算属性映射
import { mapMutations } from 'vuex' //方法映射
import swiper from '../../components/common/swiper/swiper'
import alertTip from '../../components/common/alertTip/alertTip';

export default {
  name: 'index',
  data () {
    return {
        serieId:null,
        serieTitle:null,
        serieData:[],
        fullData:{ //全款购车数据

        },
        showMoney:false,//全款购车弹出层
        disabledFullIndex:null, //全款购车颜色置灰索引
        ActiveIndex:null, //全款购车默认选中颜色索引
        fullCount:null, //各颜色对应库存
        ExhibData:{ //展车数据

        },
        showExhib:false,//申请展车弹出层
        disabledExhibIndex:null, //全款购车颜色置灰索引
        ActiveExhibIndex:null, //全款购车默认选中颜色索引
        exhibCount:null, //各颜色对应库存
        circular:[    //轮播图数据

        ],
        goodsPicData:[],//商品详情图片
        showTips:false,  //到货提醒
        showExhib:false, //申请展车弹出层
        ajaxLoading:false,
        showfullStatus:false,  //商品详情图片全屏默认不显示
        showFullData:'',  //显示全屏的商品详情图片默认为空
        showAlert:false, //提示框显示与否
        alertText:null //提示内容

    }
  },
  methods:{
    goContrast(){ //去对比页面
      var arrayID = [];
      this.serieData.forEach(function(item,index){
        arrayID.push(item.id)
      })
      this.$router.push("/contrast?id=" + arrayID.join(","));
    },
    goConfiguration(id){  //去参数配置页
      this.$router.push("/configuration?id=" + id);
    },
    goBack(){
      var leaveURL = this.$store.getters.getSerieURL;
      this.$router.push({
        path:"/" + leaveURL.tag + "/" + leaveURL.id
      });
    },
    showFullpay(id,index){
//      this.serieData.forEach(function(ele,ind){
//        if(index != ind){
//          ele.flag = false;
//        }
//      });
//      if(this.serieData[index].flag){ //避免重复请求
//        this.showMoney = !this.showMoney;
//        return false;
//      }
      this.getFullData(id,index);
    },
    closeFullpay(){
      this.showMoney = !this.showMoney;
      this.ActiveIndex = null;
      this.fullCount = null;
    },
    updateFullIndex(index,sum){
      if(this.disabledFullIndex == index){
        return false;
      }
      this.ActiveIndex = index;
      this.fullCount = sum;
    },
    showExhibpay(id,index){
//      this.serieData.forEach(function(ele,ind){
//        if(index != ind){
//          ele.exhibFlag = false;
//        }
//      });
//      if(this.serieData[index].exhibFlag){ //避免重复请求
//        this.showExhib = !this.showExhib;
//        return false;
//      }
      this.getExhibData(id,index);
    },
    closeExhibPay(){
      this.showExhib = !this.showExhib;
      this.ActiveExhibIndex = null;
      this.exhibCount = null;
    },
    updateExhibIndex(index,sum){
      if(this.disabledExhibIndex == index){
        return false;
      }
      this.ActiveExhibIndex = index;
      this.exhibCount = sum;
    },
    getFullData(id,index){ //全款购车
      var that = this;
      this.$http({
          url:"order/full/inventory",
          method:"GET",
          params:{
            token:sessionStorage.token,
            autoId:id
          }
      }).then(function (response) {
          var flag = this.serieData[index].flag
          this.serieData[index].flag = !flag;
          this.fullData = response.body.data;
          this.showMoney = !this.showMoney;
          var disabledFullIndex = this.fullData.stock.findIndex(function(value,index,arr){
              return value.sum <= 0
          });
          this.disabledFullIndex = (disabledFullIndex == -1)? null:disabledFullIndex
//          var ActiveIndex = this.fullData.stock.findIndex(function(value,index,arr){
//              return value.sum > 0
//          });
          //this.ActiveIndex = (ActiveIndex == -1)? null:ActiveIndex
          //this.fullCount = (ActiveIndex == -1)?null:this.fullData.stock[this.ActiveIndex].sum;
        },function(){

        })
    },
    getExhibData(id,index){ //申请展车
      this.$http({
          url:"order/show/inventory",
          method:"GET",
          params:{
            token:sessionStorage.token,
            autoId:id
          }
      }).then(function (response) {
           var exhibFlag = this.serieData[index].exhibFlag
           this.serieData[index].exhibFlag = !exhibFlag;
           this.ExhibData = response.body.data;
           this.showExhib = !this.showExhib;
           var disabledExhibIndex = this.ExhibData.stock.findIndex(function(value,index,arr){
              return !value.sum;
           });
           this.disabledExhibIndex = (disabledExhibIndex == -1)? null:disabledExhibIndex
//           var ActiveExhibIndex = this.ExhibData.stock.findIndex(function(value,index,arr){
//              return value.sum
//           });
//           this.ActiveExhibIndex = (ActiveExhibIndex == -1)? null:ActiveExhibIndex
//           this.exhibCount = (ActiveExhibIndex == -1)?null:this.ExhibData.stock[this.ActiveExhibIndex].sum
        },function(){

        })
    },
    getData(){ //初始化拿数据
      var token = sessionStorage.token;
      this.$http({
          url:"goods/detail",
          method:"GET",
          params:{
            token:token,
            serieId:this.serieId
          }
      }).then(function (response) {
          this.serieTitle = response.body.data.series.title;
          this.serieData = response.body.data.series.list;
          this.goodsPicData = response.body.data.series.serie_imgs;
          /*商品详情图片全屏显示*/
          this.serieData.forEach(function(ele,index){
            ele.flag = false;
            ele.exhibFlag = false;
          })

          this.circular = response.body.data.circular;
          this.ajaxLoading = true;
        },function (error) {

        });
   },
   fullBay(){ //提交全款购车
      if (this.ActiveIndex == null) {
          this.showAlert = true;
          this.alertText = '请选择颜色';
          return;
      }
      var activeData = this.fullData.stock[this.ActiveIndex];
      this.$store.dispatch("FULL_PAYMENT", // 通过store传值
        {
          autoId:activeData.autoId,
          colorId:activeData.colorId,
          inColorId:activeData.inColorId,
          serieId:this.serieId
        }
      );
      this.$router.push({name:"orderConfrim",params:{id:activeData.autoId}});
   },
   applyExhib(){
      if (this.ActiveExhibIndex == null) {
          this.showAlert = true;
          this.alertText = '请选择颜色';
         return ;
      }
      var activeData = this.ExhibData.stock[this.ActiveExhibIndex];
      this.$store.dispatch("DISPLAY_CAR", // 通过store传值
        {
          autoId:activeData.autoId,
          colorId:activeData.colorId,
          inColorId:activeData.inColorId,
          serieId:this.serieId
        }
      );

      this.$router.push({name:"displayConfrim",params:{id:activeData.autoId}});
   },
   getTipsData(id){
      this.$http.post(
            "goods/remind",
            {
              token:sessionStorage.token,
              autoId:id
            }
        ).then(function (response) {
          this.showTips = true;
          console.log(response);
        },function (error) {
          console.log(error);
        });
   },
   showTipsDialog(id){   //到货提醒
      this.getTipsData(id);
   },
   closeTipsDialog(){
      this.showTips = false;
   },
   /*获取图片地址，显示遮罩弹窗和图片*/
   showFullScreen(srcData){
      this.showFullData = srcData;
      this.showfullStatus = true;
  },
   /*关闭遮罩弹窗和图片*/
   closeFullScreen(){
          this.showfullStatus = false;
   }

  },
  mounted(){
    //组件初始完成需要做什么
    this.serieId = this.$route.params.id;
    this.$store.dispatch("SUCCESS_URL", // 通过store传值
      {
        tag:"serie",
        id:this.serieId
      }
    );
    this.getData();
  },
  components:{
    swiper,
    alertTip
  },
  beforeRouteEnter (to, from, next) {
    next();
  },
  beforeRouteLeave (to, from, next) {

    next();
  },
}
</script>

<style>


/*首页-订车-商品详情页*/
.book-car-header{height: 1.1733rem;text-align: center;line-height: 1.1733rem;font-size: .5333rem;position: absolute;z-index: 3;left:0;width:100%;background:-webkit-linear-gradient(left, rgba(0,0,0,0.5) , rgba(0,0,0,0))}
.book-car-out{position:relative;}
.book-car-detail .index-icon{left:0;right:.4rem;}
.book-car-detail .index-icon li{float:right;}
.book-car-count{padding:.3rem 0;padding-left:.4rem;background-color:#fff;}
.book-car-count p{padding-left:.4rem;font-size:0.5067rem;color:#000;border-left:1px solid #000;}
.book-car-info{background-color:#fff;margin-bottom:.4rem;overflow:hidden;}
.book-car-info ul li{padding:.5333rem .4rem;border-top:1px solid #2c2c2c;overflow:hidden;}
.book-car-name{margin-bottom:.4rem;font-size:.42667rem;font-weight:600;color:#333;}
.book-car-price{float:left;margin-right:.5rem;font-size:.4533rem;font-weight:bold;color:#fc3d36;}
.book-guide-price{float:left;margin-top:.0667rem;font-size:.3467rem;color:#999;}
.book-guide-price span{display:block;float:left;}
.book-guide-price strong{display:block;float:left;margin-left:.1rem;font-weight:normal;}
.book-guide-price em{display:block;float:left;}
.book-car-action{margin-top:.5333rem;font-size:.3733rem;}
.book-car-action span{display:block;float:left;margin-top:0.333rem;border-bottom:1px solid #000;cursor:pointer;}
.book-car-action input{width:2.6666rem;height:1.0667rem;float:right;text-align:center;line-height:1.0667rem;border-radius:.5333rem;background:none;}
.book-car-apply{margin-right:.4rem;border:1px solid #666;}
.book-car-buy{border:1px solid #d5aa5c;color:#d5aa5c;}
.book-car-remind{font-size:.3733rem;color:#6aa3e4;border:1px solid #6aa3e4;}
.book-car-contrast{position:relative;height:1.4667rem;padding-left:.4rem;margin-bottom:.4rem;line-height:1.4667rem;font-size:.4266rem;background-color:#fff;overflow:hidden;}
.book-car-contrast i{position:absolute;top:.533rem;right:.4666rem;}
.book-car-guarantee{padding-left:.4rem;padding-top:.5333rem;background-color:#fff;}
.book-car-guarantee>p{padding-left:.4rem;font-size:0.5067rem;color:#000;border-left:1px solid #000;}
.book-car-guarantee .book-car-pic{width:9.2rem;height:11.7467rem;background:url("../../assets/book-car.jpg") no-repeat;background-size:100% 100%;}


/*商品详情图片*/
.good-detail-pic-wrap{margin-bottom:.4rem;}
.good-detail-pic-title{height: 1.4667rem;padding-left: .4rem;line-height: 1.4667rem;font-size: .4266rem;background-color: #fff;}
.good-detail-pic-list{}
.good-detail-pic-list li{width:100%;}
.good-detail-pic-list li img{width:100%;}
/*全屏展示*/
.good-pic-full-screen{position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.95);}
.good-pic-full-screen img{position:fixed;transform:translateY(50%);width:100%;height:auto;}


/*首页-订车-详情页-订车弹窗*/
.book-car-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.book-order{position:fixed;bottom:0;z-index:6;width:10rem;background-color:#fff;transform:translateY(100%)}
.book-order-title{position:relative;height:1.5333rem;line-height:1.5333rem;padding-left:.4rem;font-size:.50667rem;color:#000;border-bottom:1px solid #ccc;}
.book-order-title i{position:absolute;top:.5333rem;right:.4667rem;width:.3733rem;height:.3733rem;background:url("../../assets/close.png") no-repeat;background-size:100% 100%;border-bottom:1px solid #eee;}
.book-order-info{margin-left:.4rem;margin-right:.4rem;padding:.5333rem 0;border-bottom:1px solid #ccc;}
.book-car-repertory{margin-top:.4rem;color:#999;font-size:.4rem;}
.book-order-colors{margin:0 .4rem 2.667rem .4rem;padding:.5333rem 0;border-bottom:1px solid #ccc;}
.book-order-colors p{color:#2c2c2c;font-size:.4rem;margin-bottom:.4rem;}
.book-order-colors ul{}
.book-order-colors li{float:left;height:.8533rem;margin-right:.4rem;margin-bottom:.4rem;padding:0 .2667rem;line-height:.8533rem;font-size:.3733rem;border-radius:.1333rem;}
.book-order-colors li.choosable{background-color:#f5f5f5;color:#2c2c2c;}
.book-order-colors li.active{background-color:#d5aa5c;color:#fff;}
.book-order-colors li.unavailable{background-color:#f5f5f5;color:#b7b7b7;}
.book-buy-now input{width:100%;height:1.28rem;font-size:.4533rem;color:#fff;line-height:1.28rem;text-align:center;border:none;background-color:#d5aa5c;}
.book-buy-now .active{background-color:#d5aa5c;color:#fff;}
.book-buy-now .unavailable{background-color:#f5f5f5;color:#b7b7b7;}

.brand-list-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.brand-popup-in{position:fixed;top:50%;left:50%;width:7.2rem;height:4.4rem;margin-left:-3.6rem;margin-top:-2.2rem;font-size:.4533rem;border-radius:.1333rem;overflow:hidden;}
.brand-search-tips{height:2.1334rem;padding:1.0666rem 1.0rem 0 1.0rem;background-color:#fff;}
.brand-popup-ok{height:1.2rem;line-height:1.2rem;color:#fff;text-align:center;background-color:#d5aa5c;}

.book-car-text{padding:1.2rem 0.4rem;}
.book-car-text i{width:1.6rem;height:1.6rem;display:block;float:left;background-size: 100%;}
.text-item p{margin-left:2rem;}
.text-item p:nth-of-type(1){font-size:0.45rem;color:#000;padding-top:0.1rem;}
.text-item p:nth-of-type(2){font-size:0.35rem;color:#999;padding-top:0.15rem;}

.text-item:nth-of-type(1) i{
  background-image:url("../../assets/icon-m1.png");
}
.text-item:nth-of-type(2) i{
  background-image:url("../../assets/icon-m2.png");
}
.text-item:nth-of-type(3) i{
  background-image:url("../../assets/icon-m3.png");
}
.book-car-text ul{padding-left:0.8rem;padding-bottom:0.267rem;}
.book-car-text li{display:block;width:0.08rem;height:0.08rem;border-radius:50%;background:#d6d6d6;margin-top:0.267rem;}
</style>
