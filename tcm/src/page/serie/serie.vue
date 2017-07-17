<template>
  <div class="book-car-out">
    <!--首页-订车-详情页-头部-->
    <header class="book-car-header">
        <i class="white-lt brand-left-cion"></i>
    </header>
    <!--首页-订车-详情页-图片滚动-->
    <section class="index-slider book-car-detail">
        <ul>
            <li>
                <img src="../../assets/banner.jpg" alt="">
            </li>
        </ul>
        <ul class="index-icon">
            <li></li>
            <li class="active"></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </section>
    <!--首页-订车--详情页-车型信息-->
    <section class="book-car-count">
        <p>3款东风标致308车型在售</p>
    </section>
   <section class="book-car-info">
       <ul>
           <li>
               <p class="book-car-name">2014款 经典版 1.6L 自由手动优 </p>
               <div class="book-car-price-info clearfix">
                   <div class="book-car-price">
                       <strong>328.59万</strong>
                   </div>
                    <div class="book-guide-price clearfix">
                        <span>指导价：</span>
                        <em>333.39万</em>
                        <strong>(下降) <i>1.78万</i> </strong>
                    </div>
               </div>
               <div class="book-car-action clearfix">
                   <span>配置参数</span>
                   <input class="book-car-buy" type="text" name="" value="全款购车">
                   <input class="book-car-apply" type="text" name="" value="申请展车">
               </div>
           </li>
           <li>
               <p class="book-car-name">2014款 经典版 1.6L 自由手动优 </p>
               <div class="book-car-price-info clearfix">
                   <div class="book-car-price">
                       <strong>328.59万</strong>
                   </div>
                   <div class="book-guide-price clearfix">
                       <span>指导价：</span>
                       <em>333.39万</em>
                       <strong>(下降) <i>1.78万</i> </strong>
                   </div>
               </div>
               <div class="book-car-action clearfix">
                   <span>配置参数</span>
                   <input class="book-car-buy" type="text" name="" value="全款购车">
               </div>
           </li>
           <li>
               <p class="book-car-name">2014款 经典版 1.6L 自由手动优 </p>
               <div class="book-car-price-info clearfix">
                   <div class="book-car-price">
                       <strong>328.59万</strong>
                   </div>
                   <div class="book-guide-price clearfix">
                       <span>指导价：</span>
                       <em>333.39万</em>
                       <strong>(下降) <i>1.78万</i> </strong>
                   </div>
               </div>
               <div class="book-car-action clearfix">
                   <span>配置参数</span>
                   <input class="book-car-remind" type="text" name="" value="到货提醒">
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
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
        brandName:"选择车型", //选中的车型名字
        brandId:null, //选中的品牌ID
        mybrand:false, //车型弹层
        serieList:[]
    }
  },
  methods:{
    //组件方法
   
  },
  mounted(){
    //组件初始完成需要做什么
    console.log(this.$route.params.serieID);
    console.log("拿到参数可以查询了");
  },
  watch: {
    '$route' (to, from) {
      console.log(to);
      console.log(this.$route.params);
      console.log(from);
    }
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

</style>
