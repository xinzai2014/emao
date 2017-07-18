<template>
  <div>
        <!--首页头部-->
        <header class="index-header">
            <strong class="index-title">淘车猫</strong>
            <div class="index-news news-icon" v-show="message">
                <span>6</span>
            </div>
        </header>
        <!--首页图片滚动-->
        <section class="index-slider">

            <brand :showBrand="mybrand"  @getBrandChild="brandStatus"></brand>

            <ul>
                <li v-for="(item,index) in circular" :circuid=item.id >
                    <img :src=item.imgUrl >
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
        <!--首页品牌-->
        <section class="index-brand">
            <div class="index-brand-in">
                <ul class="clearfix" :class='{"index-brand-info":lookAll}'>
                    <li v-for="(item,index) in brands" :brand=item.id @click="goBrand(item.id)">
                        <img :src=item.logoUrl >
                        <span>{{item.name}}</span>
                    </li>
                </ul>
                <p class="index-more-brand" @click="seeMore" v-show="lookAll">更多品牌 <i class="yellow-bt"></i></p>
            </div>
        </section>
        <!--本地车源-->
        <section class="index-car-source">
            <p class="index-car-title">本地车源</p>
            <ul class="index-car-con">
                <li v-for="(item,index) in serieList" :serieID = item.id  @click="goSerie(item.id)">
                    <img :src= item.imgUrl alt="">
                    <p class="index-car-name">{{item.name}}</p>
                    <p class="index-car-price"><span>{{item.minPrice}}</span>万起</p>
                    <p class="index-car-count">共<i>{{item.saleCars}}</i>个车型在售</p>
                    <p class="index-car-sale">最高下降 <strong>{{item.maxFall}}万</strong></p>
                </li>
            </ul>
            <p class="index-more-brand">查看更多 <i class="yellow-bt"></i></p>
        </section>
        <!--查询表单-->
        <section class="index-search">
            <div class="index-search-in">
                <p class="index-search-title">急需要什么车型？告诉我</p>
                <div class="index-search-condition">
                    <div class="index-serach-type" @click="chooseCar">
                        <label for="" :brandID="brandId">{{brandName}}</label>
                        <p></p>
                        <i class="white-rt"></i>
                    </div>
                    <div class="index-search-price">
                        <label for="">期望价格：</label>
                        <input type="text">
                        <span>万元</span>
                    </div>
                </div>
                <input type="submit" name="提交" value="提交">
            </div>
        </section>
        
        <!-- 自定义组件 -->
        <brand :showBrand="mybrand"  @getBrandChild="brandStatus"></brand>


        <!--首页底部留白-->
        <p class="footer-bt"></p>
        <!--首页底部-->
        <footer class="index-fooer">
            <ul class="clearfix">
                <li class="index-order-car active">
                    <i></i>
                    <span>订车</span>
                </li>
                <li class="index-my">
                    <i></i>
                    <span>我的</span>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
import brand from './brand'
// import swiper from '../components/common/swiper/swiper'

export default {
  name: 'index',
  data () {
    return {
        brandName:"选择车型", //选中的车型名字
        brandId:null, //选中的品牌ID
        mybrand:false, //车型弹层
        lookAll:true,
        message:2,
        circular:[
             {
                 "id":"1", // id不为0时，URL为空，id为0时，URL不为空
                 "imgUrl":"http://img.emao.net/car/material/nc/bbk/eclo-1080x380.jpg/176",
                "url":"http://mall.emao.com/car/4584.html"
             },
             {
                 "id":"2", // id不为0时，URL为空，id为0时，URL不为空
                 "imgUrl":"http://img.emao.net/car/material/nc/bbk/eclo-1080x380.jpg/176",
                 "url":"http://mall.emao.com/car/4584.html"
             },
             {
                 "id":"3", // id不为0时，URL为空，id为0时，URL不为空
                 "imgUrl":"http://img.emao.net/car/material/nc/bbk/eclo-1080x380.jpg/176",
                 "url":"http://mall.emao.com/car/4584.html"
             }
        ],
        brands:[
            {
                "id":"1", // 品牌id
                "name":"宝马", // 品牌名称
                "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            },
            {
                "id":"2", // 品牌id
                "name":"标致", // 品牌名称
                "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            },
            {
                "id":"3", // 品牌id
                "name":"奥迪", // 品牌名称
                "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            },
            {
                "id":"1", // 品牌id
                "name":"宝马", // 品牌名称
                "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            },
            {
                "id":"2", // 品牌id
                "name":"标致", // 品牌名称
                "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            },
            {
                "id":"3", // 品牌id
                "name":"奥迪", // 品牌名称
                "logoUrl":"http://img.emao.net/car/logo/nd/nd/dkni-100x100.png/177" // 品牌logo地址
            }
        ],
        serieList:[]
    }
  },
  methods:{
    //组件方法
    seeMore(){
        this.lookAll = false;
    },
    chooseCar(){
        this.mybrand = !this.mybrand;
    },
    brandStatus(index,brandName){
        console.log(index+"---"+brandName);
        this.brandName = brandName;
        this.brandId = index;
    },
    goBrand(brandID){
        this.$router.push('/brand/'+brandID); //品牌路由跳转
    },
    goSerie(index){
        console.log(index);
        this.$router.push('/serieList/'+index); //车系路由跳转
    }
  },
  mounted(){
    //组件初始完成需要做什么
        var token = sessionStorage.token;
        var data = {
            token:token,
            ltime:0,
            offset:1,
            len:10
        };
        this.$http({
            url:"index",
            method:"GET",
            params:data
        }).then(function (response) {
            console.log(response);
            this.serieList = response.body.data.series;
            this.message = response.body.data.msg;
            console.log(this.serieList);
            console.log("请求成功了");
          }).catch(function (error) {
            console.log("请求失败了");
          });

  },
  components:{
    "brand":brand
  }
  // },
  // beforeRouteEnter (to, from, next) {
  //       console.log("来首页看看吧");
  //       next();
  //   },
  //   beforeRouteLeave (to, from, next) {
  //       console.log("你要离开吗");
  //       next();
  // }
}
</script>

<style>

/*首页*/
/*首页头部*/
.index-header{position:relative;height:1.1733rem;text-align:center;line-height:1.1733rem;background-color:#27282f;}
.index-title{font-size:.5333rem;color:#d5aa5c;}
.index-news{position:absolute;right:.4rem;top:.333rem;}
.index-news span{position:absolute;top:-.2rem;left:.2666rem;display:block;width:.4rem;height:.4rem;line-height:.4rem;color:#fff;border-radius:.2666rem;background-color:#ff0043;}



/*首页图片滚动*/
.index-slider{position:relative;height:4.5333rem;}
.index-slider ul li img{width:100%;height:4.5333rem;}
.index-icon{position:absolute;left:.4rem;bottom:.24rem;}
.index-icon li{float:left;width:.1333rem;height:.1333rem;background-color:#fff;margin-right:.1333rem;border-radius:0.0666rem;}
.index-icon li.active{width:.2666rem;background-color:#d6ab55;}


/*首页品牌*/
.index-brand{padding:.5333rem;}
.index-brand-in{padding-bottom:.5333rem;background-color:#fff;}
.index-brand-info{height:1.8266rem;overflow:hidden;}
.index-brand-in li{float:left;width:20%;margin-bottom:0.1333rem;text-align:center;}
.index-brand-in li img{display:block;width:.5333rem;height:.5333rem;margin:.666rem auto 0;margin-bottom:.1333rem;}
.index-brand-in li span{color:#2c2c2c;font-size:0.3733rem;}
.index-more-brand{margin-top:.8rem;text-align:center;}
.index-more-brand i{margin-left:.1333rem;}

/*首页本地车源*/
.index-car-source{padding-top:.5333rem;padding-bottom:.5333rem;background-color:#fff;}
.index-car-title{padding-left:.4rem;margin:0 0 .5333rem .4rem;font-size:.5066rem;color:#2c2c2c;border-left:2px solid #2c2c2c;}
.index-car-con{}
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
.index-serach-type{height:.9327rem;padding-top:.5333rem;border-bottom:1px solid #e0e0e0;}
.index-serach-type p{display:inline-block;width:5.1333rem;height:.5333rem;}
.index-serach-type i{margin-left:.833rem;}
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
