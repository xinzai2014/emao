<template>
  <div v-if="ajaxLoading">

    <!--首页头部-->
    <header-mess ></header-mess>
    <!--首页图片滚动-->
    <div class="auth-mess" v-if="showAuthMess" @click="goAuth">
      <div>
         {{authData}}
         <span @click.stop="closeAuthMess">×</span>
      </div>
    </div>
    <swiper :circular="circular" v-if="circular.length"></swiper>

    <!--首页品牌-->
    <brand :brandList="brands" v-if="brands.length"></brand>

    <!--本地车源-->
    <serie :serieList="serieList" :initData="initData" :serieMore="serieMore" @subSerieList="subSerieList" v-if="serieList.length"></serie>

    <!-- store传值 -->
    <search></search>

    <!-- store传值 -->
    <car v-if="showbrandTag"></car>

    <!--首页底部-->
    <footerTo></footerTo>

  </div>

</template>

<script>
import headerMess from '../../components/header/header'
import swiper from '../../components/common/swiper/swiperIndex'
import brand from './brand'
import serie from './serie'
import search from './search'
import car from './car'
import footer from './footer'


export default {
  name: 'index',
  data () {
    return {
        lookAll:true, //品牌查看更多
        serieMore:false,//车系查看更多
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
        showAuthMess:false, //是否展示授权信息
        authData:null,
        ajaxLoading:false
    }
  },
  methods:{
    goBrand(brandID){ //点击品牌跳转
        this.$router.push('/brand/'+brandID); //品牌路由跳转
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
            this.ajaxLoading = true;
          }).catch(function (error) {

          });
    },
    subSerieList(list){
        this.serieList = this.serieList.concat(list);
        if(list.length<this.initData.len){
            this.serieMore = !this.serieMore;
        }
    },
    closeAuthMess(){
        this.showAuthMess = false;
        sessionStorage.setItem("idCardAuth",null);
    },
    getAuth(){
      this.$http({
        url:"dealerInfo/dataStatus?token="+sessionStorage.token,
        method:"GET"
      }).then(function (response) {
          var data = response.body;
          if(data.data.data_status == 2){
            this.authData = "您还有部分信息待完善，立即完善";
            this.showAuthMess = true;
          }
          if(data.data.data_status == 1){
            this.authData = data.msg;
            this.showAuthMess = true;
          }
      },function(){

      });
    },
    goAuth(){
      this.$router.push("/auth")
    }
  },
  mounted(){
    //组件初始完成需要做什么
    this.getSerie();
    this.getAuth();
  },
  computed:{
    showbrandTag(){
      return this.$store.state.chooseCar;
    }
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

        next();
  }
}
</script>

<style>

/*首页*/

.auth-mess{line-height:1.2rem;background:#d5aa5c;padding-left:0.4rem;color:#FFF;font-size:0.38rem;letter-spacing:0.03rem;}
.auth-mess span{float:right;margin-right:0.5rem;font-size:0.5rem;}
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

