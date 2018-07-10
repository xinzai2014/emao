<template>
    <div class="biding">
        <!-- 轮播图部分 -->
        <section>
             <swiper :circular="circular" v-if="circular.length"></swiper>
        </section>
        <!-- 车辆信息 -->
        <section class="infom">
            <div class="infom-left">
                <div class="infom-up">
                    <div class="type">2014新款 东风标致 经典版 1.6L 手动优尚型</div>
                </div>
                <div class="infom-mid">
                    <span class="b-price">起拍价：7.6万</span> 
                    <span class="g-price">指导价：10.05万</span>
                </div>            
                <div class="infom-down">
                    <span class="apply">15人报名</span>
                    <span>   |   </span>
                    <span class="remind">18人设置提醒</span>
                </div>
              </div>
               <div class="infom-right">
                   <img src="./images/clock.png" alt="设置提醒">
                   <span class="clock">设置提醒</span>
                   </div> 
                      
        </section>
        <!-- 具体参数 -->
        <section class="car-data">
            <ul>
                <li class="car-num">
                    <span class="left">台数</span>
                    <span class="right">1</span>  
                </li>
                <li class="car-money">
                    <span class="left">保证金</span>
                    <span class="right">2000</span>
                </li>
                <li class="car-range">
                    <span class="left">可售范围</span>
                    <span class="right">全国</span>
                </li>
                <li class="car-place">
                    <span class="left" >提车地点</span>
                    <span class="right">广州</span>
                </li>
                <li class="car-date" >
                    <span class="left">生产日期</span>
                    <span class="right">2018-7</span>
                </li>
                <li>
                    <span class="left">车身颜色</span>
                    <span class="right">红色</span>
                </li>
            </ul>
        </section>
        <!-- 竞拍流程 -->
        <section class="process">
            <div class="process-text">
            <span>|</span>
            <span >竞拍流程</span>
            </div>
            
            <img src="./images/record.png" alt="">
        </section>
        <!-- 商品介绍 -->
        <section class="product">
            <div class="product-text">
            <span>|</span>
            <span >商品介绍</span>
            </div>
            <ul>
                <li>
                    <img src="http://img.zcool.cn/community/01f09e577b85450000012e7e182cf0.jpg@1280w_1l_2o_100sh.jpg" alt="">
                </li>
                <li>
                    <img src="./images/text.png" alt="">
                </li>
            </ul>
        </section>

        
    </div>
</template>
<script>
import swiper from "../../components/common/swiper/swiper";
export default {
    name:'biding',
    data(){
        return{
        sowingMap:[],    
        autoName:'',//车型全称
        currentPrice:'',//当前价格
        guidePrice:'',//指导价格
        enrolment:'', //报名人数
        settingRemind:'', //设置闹钟人数
        platformNum:'',//台数
        deposit:'',//定金
        increasePrice:'',//加价幅度
        saleArea:'', //可售范围
        packUpPlace:'',//提车地点
        produceTime:'',//生产日期
        carColor:'', //车型颜色
        shopInfo:[],//商品详情
         circular: [
             {
             id: 2,
             imgUrl:'http://img.zcool.cn/community/01f09e577b85450000012e7e182cf0.jpg@1280w_1l_2o_100sh.jpg'
             }
          
         ], //轮播图数据

        }
    },
    computed:{

    },
    methods:{
        //获取数据
        getdata(){
            const params={
                bidderId:this.$route.query.bidderId
            }
            this.$http({
            url: "https://tcmapi.emao.com/bidder/bidderDetail",
            method: "GET",
            params: params
        }).then(function(response) {
            const data = response.body.data;
            this.sowingMap=data.sowingMap;//轮播图
            

            
            
        })
        }
    },
    created(){

    },

    components:{
        swiper
    }
}
</script>
<style>
.biding{
    width: 100%; 
    
}
.infom{
    padding: .13333rem .3rem .3rem; 
    background: #fff;
    overflow: hidden;
}


.infom-left{
    float: left;
   
}
.infom-right{
    height: 3rem;
    padding: .3rem .2rem .3rem .35rem;
    float:right;
    border-left:#999999 solid .01333rem;
}
.infom-right img{
    display: block;
    margin-top: .4rem;
    margin-left: .2rem;
}
.infom-right .clock{
    display: block;
    text-align: center;
    margin-top: .5rem
}
.infom-up{
    margin-top: .2rem;
    overflow: hidden;
}
.infom-up .type{
    float: left;
    font-size: .42667rem;
    width: 6.93333rem;
    height: 1.33333rem;
    font-weight: 700;
    line-height: .66667rem
}

.infom-mid{
    margin-top: .33333rem;
    margin-bottom: .2rem
}
.infom-mid span{
    display: inline-block;
    margin-right: .3rem;
}
.infom-mid .b-price{
    font-size: .6rem;
    color: #E51C23 ;
    font-weight: 700;

}
.infom-mid .g-price{
    font-size: .34667rem;
    color:#999999;
    text-decoration:line-through;
    margin-left: .26667rem;

}
.infom-down{

}
.infom-down span{
    display: inline-block;
    margin-right: .3rem;
    font-size: .34667rem;
    color:#999999;
}
.infom-down .apply{


}
.infom-down .remind{
    color:#999999;
}
.car-data::before{
 content: ""; 
 width: 95%;  
 height: 1px;
 margin: 0 auto;
 display: block;
 background: #999; 
}
.car-data{
background: #fff;
margin-bottom: .3rem;
}
.car-data ul{
 padding-bottom: .3rem;
}
.car-data ul li{
    overflow: hidden;
    padding: .133rem;
}
.car-data ul li span{
  width: 45%;
  float: left;
  font-size:.34667rem;
  
  margin-left: 5%;
}
.car-data ul li .left{
  color:#999;
}
.car-data ul li .right{
    color:#000;
}
.process,.product{
    background: #fff;
    padding: .3rem .25rem;
    margin-bottom: .3rem;
}
.process-text,.product-text{
font-size: .50667rem;
font-weight: 700;
margin: .3rem;

}
.process img{
    width: 100%;
    margin: .3rem auto 0;
    border-bottom: #999 solid .01333rem;
    padding-bottom: .5rem;
}
.product ul li img{
width: 100%;
margin: 0 auto .2rem;
}
</style>


