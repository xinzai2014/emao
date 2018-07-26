<template>
    <div>
        <!--头部-->
        <header class="user-tit user-fixed">
            <a href="javascript:;" class="white-lt" @click="goBack"></a>品牌车系
        </header>
        <!--内容-->
        <section>
            <div class="brand-wrap">
                <div class="brand-lt">
                    <ul id="brand-ul">
                        <li v-for="(item,index) in brandData" :key="index" :class="item.id== initData.brandId ? 'active':''" @click="changeBrand(item.id,item.name)"><em>{{item.name}}</em></li>
                    </ul>
                </div>
                <div class="brand-rt">
                    <h4>共{{serieLength}}款车系在售</h4>
                    <div class="brand-ct">
                        <div class="brand-item" v-for="(item,index) in serieData" :key="index" @click="goSerie(item.id)">
                            <img :src = item.imgUrl alt="">
                            <div class="brand-info">
                                <p class="brand-info-tit">{{item.name}}</p>
                                <p class="brand-price">{{item.minPrice}}<span>万起</span></p>
                                <p class="brand-num">共{{item.saleCars}}个车型在售</p>
                                <p v-if="item.maxFall>0" class="brand-sale">最高下{{item.maxFall}}万</p>
                            </div>
                            <em v-if="Number(item.soldOut)" class="sold-out"></em>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import search from '../index/search'
import car from '../index/car'
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
                brandData:[ //品牌数据

                ],
                serieData:[],
                serieLength:null,
                scrollIndex:0,
                showbrand:false //车型弹层
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
                    this.brandData = response.body.data;
                    setTimeout(()=>{
                        this.countHeight();
                    },100)
                  }).catch(function (error) {
                });
            },
            getDataByBrandID(){  //根据品牌获取车系
                this.$http({
                    url:"car/sale/serie",
                    method:"GET",
                    params:this.initData
                }).then(function (response) {
                    this.serieData = response.body.data;
                    this.serieLength = this.serieData.length;
                  }).catch(function (error) {
                  });
            },
            goBack(){
                this.$router.push({name:'index'});
            },
            countHeight(){ //记录初始楼层高度
                var ulHeight = document.getElementsByClassName('active')[0].offsetTop;
                var branUl = document.getElementById('brand-ul');
                branUl.scrollTop = ulHeight;
            }, //滚动到指定位置
            changeBrand(index,name){
                this.$store.dispatch("DEFAULT_BRAND",{ // 通过store传值
                  brandName: name,
                  brandId: index
                });
                this.initData.brandId = index;
                this.brandName = name;
                this.getDataByBrandID();
            },
            getCar(carBoolean){ //自组件选车型控制显示隐藏
              this.showbrand = carBoolean;
              this.showCar = !this.showCar;
            },
            brandStatus(brandId,serieId,carId,carName){
                if(arguments.length){
                   this.carMess.carName = carName;
                   this.carMess.brandId = brandId;
                   this.carMess.serieId = serieId;
                   this.carMess.carId = carId;
                };
                this.showbrand = false;
            },
            goSerie(index){ //点击车系跳转
                this.$store.dispatch("SERIE_URL", // 通过store传值
                  {
                    tag:"brand",
                    id:index
                  }
                )
                this.$router.push('/serie/'+index); //车系路由跳转
            },
        },
        mounted(){
           this.brandName = this.$store.getters.getDefaultBrand.brandName;
           this.initData.brandId = this.$store.getters.getDefaultBrand.brandId; //获取路由当前品牌ID
           this.getAllBrand();
           this.getDataByBrandID();
        },
        components:{
            search,
            car
        },
        computed:{
            showbrandTag(){
              return this.$store.state.chooseCar;
            }
        }
    }
</script>
<style>
.user-fixed{
    position:fixed;
    z-index:999;
    width:100%;
    left:0;
    top:0;
}
.brand-wrap{
    overflow:hidden;
}
.brand-lt{
    width:1.866667rem;
    float:left;
   
}
.brand-lt{
    background:#fff;
    width:1.866667rem;
    position:fixed;
    left:0;
    bottom:0;
    top:1.173333rem;
     -webkit-overflow-scrolling: touch;
}
.brand-lt ul{
    -webkit-overflow-scrolling: touch;
    overflow-y:auto;
    height:100%;
    width:100%;
}
.brand-lt ul li{
    height:1.333333rem;
    font-size:0.373333rem;
    color:#666;
    text-align:center;
    display:table;
    border-bottom:1px solid #f5f5f5;
}
.brand-lt ul li em{
    width:1.866667rem;
    display:table-cell;
    vertical-align:middle;
}
.brand-lt ul li.active{
    background:#f5f5f5;
    color:#2c2c2c;
    font-weight:bold;
}
.brand-rt{
    width:7.733333rem;
    float:right;
    margin-top:1.173333rem;
}
.brand-rt h4{
    font-size:0.506667rem;
    font-weight:bold;
    padding-left:0.4rem;
    color:#2c2c2c;
    line-height:1.6rem;
}
.brand-item{
    height:3.893333rem;
    width:7.333333rem;
    border-radius:0.266667rem;
    position:relative;
    overflow:hidden;
    margin-bottom:0.4rem;
}
.brand-item img{
    width:100%;
    height:100%;
    border-radius:0.266667rem;
}
.brand-info{
    position:absolute;
    height:3.893333rem;
    width:6.933333rem;
    left:0.4rem;
    top:0;
    color:#fff;
}
.brand-info-tit{
    margin-top:0.4rem;
    font-size:0.4rem;
    font-weight:bold;
    height:0.466667rem;
    overflow:hidden;
    line-height:0.466667rem;
}
.brand-price{
    font-size:0.506667rem;
    font-weight:bold;
    margin-top:0.8rem;
}
.brand-price span{
    font-weight:normal;
    font-size:0.373333rem;
    margin-left:0.133333rem;
}
.brand-num{
    font-size:0.373333rem;
    line-height:0.666667rem;
    margin-bottom:0.133333rem;
}
.brand-sale{
    height:0.4rem;
    padding:.0666rem .3333rem .0666rem .1333rem;
    border-radius:0 0.4rem 0.4rem 0;
    background:#d5aa5c;
    display:inline;
}
.sold-out{
    display:block;
    width:2.546667rem;
    height:1.866667rem;
    background:url(../../assets/sold-out.png) no-repeat;
    background-size:contain;
    position:absolute;
    right:0;
    bottom:0;
}
</style>
