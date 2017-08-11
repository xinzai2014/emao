<template>
  <div>

    <!--首页头部-->
    <header-mess ></header-mess>
    <!--首页图片滚动-->
    <swiper :circular="circular" v-if="circular.length"></swiper>

    <!--首页品牌-->
    <brand :brandList="brands"></brand>

    <!--本地车源-->
    <serie :serieList="serieList" :initData="initData" :serieMore="serieMore" ></serie>

    <!--查询表单--> 
    
    <search @getCar="getCar" :carMess="carMess" :title="title" @subAlert = "getAlert"></search>
    
    <!-- 车型数据 -->
    <car :showBrand="showbrand"  @getBrandChild="brandStatus" v-if="showbrand"></car>

    <alert-tip v-if="showAlert" @closeTip = "showAlert = false" :alertText="alertText"></alert-tip>

    <!--首页底部-->
    <footerTo></footerTo>
  </div>

</template>

<script>
import headerMess from '../../components/header/header'
import swiper from '../../components/common/swiper/swiperIndex'
import alertTip from '../../components/common/alertTip/alertTip'
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
        serieMore:false,//车系查看更多
        carMess:{     //搜索车型的时的数据
          carName:"选择车型",
          brandId:null,
          serieId:null,
          carId:null
        },
        title:"急需要什么车型？告诉我",
        initData:{ //初始化接口数据
            token:null,
            ltime:0,
            offset:0,
            len:10
        },
        circular:[    //轮播图数据

        ],
        brands:[

        ],
        serieList:[], //车系数据
        showAlert:false,
        alertText:null
    }
  },
  methods:{ //选取车型后回传
    brandStatus(brandId,serieId,carId,carName){
        if(arguments.length){
           this.carMess.carName = carName;
           this.carMess.brandId = brandId;
           this.carMess.serieId = serieId;
           this.carMess.carId = carId;
        };
        this.showbrand = false;
    },
    goBrand(brandID){ //点击品牌跳转
        this.$router.push('/brand/'+brandID); //品牌路由跳转
    },
    getAlert(msg){
      this.showAlert = true;
      this.alertText = msg;
    },
    getCar(carBoolean){ //自组件选车型控制显示隐藏
      this.showbrand = carBoolean;
    },
    getSerie(){ //获取车系数据
       this.initData.token = sessionStorage.token
        this.$http({
            url:"index",
            method:"GET",
            params:this.initData
        }).then(function (response) {
            this.circular = response.body.data.circular;
            this.serieList = response.body.data.series;
            this.brands = response.body.data.brands;
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
    alertTip,
    footerTo:footer
  },
  beforeRouteEnter (to, from, next) {
       
        next();
    },
    beforeRouteLeave (to, from, next) {
        
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
