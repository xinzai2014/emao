<template>
  <div>
    <!--首页头部-->
    <header-mess :myMessage="message"></header-mess>
    <!--首页图片滚动-->
    <swiper :circular="circular"></swiper>

    <!--首页品牌-->
    <brand :brandList="brands"></brand>

    <!--本地车源-->
    <serie :serieList="serieList" :initData="initData" :serieMore="serieMore" ></serie>

    <!--查询表单--> 
    <search @getCar="getCar" :carMess="carMess"></search>
    
    <!-- 车型数据 -->
    <car :showBrand="showbrand"  @getBrandChild="brandStatus" v-if="showCar"></car>
  
    <!--首页底部-->
    <footerTo></footerTo>
  </div>
</template>

<script>
import headerMess from '../../components/header/header'
import swiper from '../../components/common/swiper/swiper'
import brand from './brand'
import serie from './serie'
import search from './search'
import car from './car'
import footer from './footer'


export default {
  name: 'index',
  data () {
    return {
        showbrand:false, //车型弹层
        lookAll:true, //品牌查看更多
        message:2,    //消息个数
        serieMore:false,//车系查看更多
        showCar:false, //初始的时候不加载选车弹出层
        carMess:{     //搜索车型的时的数据
          brandName:"选择车型",
          brandID:null
        },
        initData:{ //初始化接口数据
            token:null,
            ltime:0,
            offset:0,
            len:10
        },
        circular:[    //轮播图数据
             {
                "id":"1",
                "imgUrl":"http://img.emao.net/car/material/nc/bbk/eclo-1080x380.jpg/176",
                "url":"http://mall.emao.com/car/4584.html"
             },
             {
                 "id":"2", 
                 "imgUrl":"http://img.emao.net/car/material/nc/bbk/eclo-1080x380.jpg/176",
                 "url":"http://mall.emao.com/car/4584.html"
             },
             {
                 "id":"3", 
                 "imgUrl":"http://img.emao.net/car/material/nc/bbk/eclo-1080x380.jpg/176",
                 "url":"http://mall.emao.com/car/4584.html"
             }
        ],
        brands:[ //品牌数据
            // {
            //     "id":"1", // 品牌id
            //     "name":"宝马", // 品牌名称
            //     "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            // },
            // {
            //     "id":"2", // 品牌id
            //     "name":"标致", // 品牌名称
            //     "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            // },
            // {
            //     "id":"3", // 品牌id
            //     "name":"奥迪", // 品牌名称
            //     "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            // },
            // {
            //     "id":"1", // 品牌id
            //     "name":"宝马", // 品牌名称
            //     "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            // },
            // {
            //     "id":"2", // 品牌id
            //     "name":"标致", // 品牌名称
            //     "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            // },
            // {
            //     "id":"3", // 品牌id
            //     "name":"奥迪", // 品牌名称
            //     "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            // }
        ],
        serieList:[] //车系数据
    }
  },
  methods:{ //选取车型后回传
    brandStatus(index,brandName){
        this.carMess.brandName = brandName;
        this.carMess.brandID = index;
        this.showbrand = !this.showbrand;
    },
    goBrand(brandID){ //点击品牌跳转
        this.$router.push('/brand/'+brandID); //品牌路由跳转
    },
    getCar(carBoolean){ //自组件选车型控制显示隐藏
      this.showbrand = carBoolean;
      this.showCar = !this.showCar;
    },
    getSerie(){ //获取车系数据
       this.initData.token = sessionStorage.token
        this.$http({
            url:"index",
            method:"GET",
            params:this.initData
        }).then(function (response) {
            this.serieList = response.body.data.series;
            this.brands = response.body.data.brands;
            this.message = response.body.data.msg;
            if(response.body.data.series.length>=this.initData.len){
              this.serieMore = !this.serieMore;
            }
          }).catch(function (error) {
            console.log("请求失败了");
          });
    }
  },
  mounted(){
    //组件初始完成需要做什么
    this.getSerie();
  },
  components:{
    headerMess,
    swiper,
    brand,
    serie,
    search,
    car,
    footerTo:footer
  },
  beforeRouteEnter (to, from, next) {
        console.log("来首页看看吧");
        next();
    },
    beforeRouteLeave (to, from, next) {
        console.log("你要离开吗");
        next();
  }
}
</script>

<style>

/*首页*/
/*首页头部*/
.index-header{position:relative;height:1.1733rem;text-align:center;line-height:1.1733rem;background-color:#27282f;}
.index-title{font-size:.5333rem;color:#d5aa5c;}
.index-news{position:absolute;right:.4rem;top:.333rem;}
.index-news span{position:absolute;top:-.2rem;left:.2666rem;display:block;width:.4rem;height:.4rem;line-height:.4rem;color:#fff;border-radius:.2666rem;background-color:#ff0043;}






/*首页品牌*/
.index-brand{padding:.5333rem;}
.index-brand-in{padding-bottom:.5333rem;background-color:#fff;}
.index-brand-info{height:1.8266rem;overflow:hidden;}
.index-brand-in li{float:left;width:20%;margin-bottom:0.1333rem;text-align:center;}
.index-brand-in li img{display:block;width:.5333rem;height:.5333rem;margin:.666rem auto 0;margin-bottom:.1333rem;}
.index-brand-in li span{color:#2c2c2c;font-size:0.3733rem;}
.index-more-brand{margin-top:.8rem;text-align:center;}
.index-more-brand i{margin-left:.1333rem;}
.brand-collect i{transform:rotateX(180deg)}
/*首页本地车源*/
.index-car-source{padding-top:.5333rem;padding-bottom:.5333rem;background-color:#fff;}
.index-car-title{padding-left:.4rem;margin:0 0 .5333rem .4rem;font-size:.5066rem;color:#2c2c2c;border-left:2px solid #2c2c2c;}
.index-car-con li{margin-bottom:.1333rem;color:#fff;}
.index-car-con li{display:block;position:relative;color:#fff;}
.index-car-con li img{display:block;width:10rem;height:5.333rem;}
.index-car-name{position:absolute;top:.5333rem;left:.5333rem;font-size:.5066rem;}
.index-car-price{position:absolute;top:2.333rem;left:.5333rem;font-size:.4rem;}
.index-car-price span{margin-left:.2rem;font-size:.5866rem;}
.index-car-count{position:absolute;top:3.0666rem;left:.5333rem;font-size:.4rem;}
.index-car-sale{position:absolute;top:3.7333rem;left:.5333rem;display:block;padding:.0666rem .3333rem .0666rem .1333rem;font-size:.5066rem;color:#fff;border-top-right-radius:.4rem;border-bottom-right-radius:.4rem;background-color:#d6ab55;}


/*表单查询*/
.index-search{padding:.5333rem;}
.index-search-in{padding-top:.5333rem;box-shadow: 0 0 3px rgba(204, 192, 0, 0.5);background-color:#fff;}
.index-search-title{padding-left:.4rem;margin:0 0 .5333rem 0;font-size:.5066rem;color:#2c2c2c;border-left:2px solid #2c2c2c;}
.index-search-condition{padding-left:.4rem;padding-right:.4rem;font-size:.4266rem;color:#2c2c2c;}
.index-serach-type{height:.9327rem;padding-top:.5333rem;border-bottom:1px solid #e0e0e0;position:relative;}
.index-serach-type p{display:inline-block;width:5.1333rem;height:.5333rem;}
.index-serach-type i{position:absolute;top:50%;right:0;}
.index-search-price{height:.9327rem;padding-top:.5333rem;border-bottom:1px solid #e0e0e0;}
.index-search-price input{display:inline-block;width:4.8333rem;height:.5333rem;border:none;}
.index-search-in input[type="submit"]{width:100%;height:1.1733rem;margin-top:.5333rem;font-size:.3733rem;text-align:center;line-height:1.17333rem;color:#fff;border:none; background-color:#d6ab55;}


/*首页底部定位*/
.index-fooer{position:fixed;bottom:0;width:10rem;height:1.3066rem;background-color:#fff;}
.index-fooer ul li{float:left;width:50%;padding-top:.2666rem;text-align:center;}
.index-order-car{color:#2c2c2c;font-size:.2666rem;}
.index-order-car i{display:inline-block;width:.56rem;height:.4rem;margin:0 auto;background:url("../../assets/car-cion.png") no-repeat;background-size:contain;}
.index-order-car span{display:block;margin-top:.1333rem;}
.index-order-car.active i{background:url("../../assets/car-active-cion.png") no-repeat;background-size:contain;}
.index-order-car.active{color:#d5aa5c;}
.index-my{color:#2c2c2c;font-size:.2666rem;}
.index-my i{display:block;width:.4266rem;height:.4533rem;margin:0 auto;background:url("../../assets/my-cion.png") no-repeat;background-size:contain;}
.index-my span{display:block;margin-top:.1333rem;}
.index-my.active i{background:url("../../assets/my-active-cion.png") no-repeat;background-size:contain;}
.index-my.active{color:#d5aa5c;}

</style>
