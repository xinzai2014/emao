<template>
<div>
    <!--首页-品牌列表-头部-->
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion" @click="goBack"></i>
        <strong class="brand-list-title">{{brandName}}</strong>
        <span class="brand-switch" @click="showBrandDialog">切换品牌</span>
        <div class="brand-list-open" v-if="showBrand">
            <ul class="index-brand-info clearfix">
                <li v-for="(item,index) in brandData" @click="changeBrand(index)">
                    <img :src = item.logoUrl >
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
    </header>

    <section class="index-car-source brand-list-source">
        <ul class="index-car-con">
            <li>
                <img src="../../assets/pic-1.jpg" alt="">
                <p class="index-car-name">上海大众-途昂</p>
                <p class="index-car-price"><span>9.99</span>万起</p>
                <p class="index-car-count">共<i>1</i>个车型在售</p>
                <p class="index-car-sale">最高下降 <strong>2.8万</strong></p>
            </li>
        </ul>
    </section>


</div>
</template>
<script>
    export default{
        name:'brand',
        data(){
            return{
                brandName:null,
                serieList:[],
                initData:{ // 获取车系所需要的接口
                    token:sessionStorage.token,
                    offset:0,
                    len:10
                },
                showBrand:false, //是否显示下拉框
                brandData:[ //品牌数据
                
                ],
                serieData:[]
            }
        },
        methods:{
            getAllBrand(){ //获取所有品牌
                this.$http({
                    url:"car/sale/brand",
                    method:"GET",
                    params:{
                        token:sessionStorage.token,
                    }
                }).then(function (response) {
                    console.log(response);
                    this.brandData = response.body.data;
                   
                  }).catch(function (error) {
                    console.log("请求失败了");
                  });
            },
            getDataByBrandID(){  //根据品牌获取车系
                this.$http({
                    url:"car/sale/serie",
                    method:"GET",
                    params:this.initData
                }).then(function (response) {
                    console.log(response);
                   
                  }).catch(function (error) {
                    console.log("请求失败了");
                  });
            },
            goBack(){
                this.$router.go(-1);
            },
            showBrandDialog(){
                this.showBrand = !this.showBrand;
            },
            changeBrand(index){
                this.showBrandDialog();
                this.initData.brandId = this.brandData[index].id;
                this.brandName = this.brandData[index].name;;
                this.getDataByBrandID();
            },
        },
        mounted(){
           this.brandName = this.$router.currentRoute.query.brandName;
           this.initData.brandId = this.$router.currentRoute.params.id; //获取路由当前品牌ID
           this.getAllBrand();
           this.getDataByBrandID();     
        },
        components:{

        }
    }
</script>
<style>
/*品牌列表页-头部*/
.brand-header-out{position:relative;z-index:3;}
.brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;}
.brand-left-cion{float:left;margin-left:.4666rem;margin-top:.4rem;}
.brand-switch{float:right;margin-right:.4666rem;font-size:.4rem;color:#d5aa5c;}
.brand-list-open{position:absolute;z-index:4;width:10rem;top:1.1733rem;left:0;background-color:#fff;}

/*品牌列表页-车源*/
.brand-list-source{padding-top:0;}

/*品牌列表页-车源-弹窗*/
.brand-list-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.brand-popup-in{position:fixed;top:50%;left:50%;width:7.2rem;height:4.4rem;margin-left:-3.6rem;margin-top:-2.2rem;font-size:.4533rem;border-radius:.1333rem;overflow:hidden;}
.brand-search-tips{height:2.1334rem;padding:1.0666rem 1.0rem 0 1.0rem;background-color:#fff;}
.brand-popup-ok{height:1.2rem;line-height:1.2rem;color:#fff;text-align:center;background-color:#d5aa5c;}

.index-brand{padding:.5333rem;}
.index-brand-in{padding-bottom:.5333rem;background-color:#fff;}
.index-brand-info{height:1.8266rem;}
.index-brand-info li{float:left;width:20%;margin-bottom:0.1333rem;text-align:center;}
.index-brand-info li img{display:block;width:.5333rem;height:.5333rem;margin:.666rem auto 0;margin-bottom:.1333rem;}
.index-brand-info li span{color:#2c2c2c;font-size:0.3733rem;}
.index-more-brand{margin-top:.8rem;text-align:center;}
.index-more-brand i{margin-left:.1333rem;}


/*品牌列表页-车源-展开*/
.brand-open-popup{z-index:2;}
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

</style>