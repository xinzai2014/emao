<template>
  <div>
    
  <div class="brand"  :class="{anmiteStatus:this.$store.state.chooseCar}">
    <!--首页-选择车型-头部-->
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion" @click="closebrand"></i>
        <strong class="brand-list-title">选择车型</strong>
    </header>

    <div class="brand-list-in" >
        <!--首页-选择车型-车型按字母排序-->
        <section class="brand-content-list" id="brandWrap"  ref="brandWrapper">
            <ul>
                <li v-for="(item,index) in brandList">
                    <p>{{item.name}}</p>
                    <div class="brand-wrap" @click="getSerieById(e.id)" v-for="(e,i) in item.list">
                            <div class="brand-content-img">
                                 <img v-bind:src=e.logoUrl >
                            </div>
                            <span>{{e.name}}</span>
                    </div>
                </li>
            </ul>
        </section>
        <section class="brand-list-letters">
             <ul>
                <li v-for="(item,index) in brandList" @click.stop="srcllToIndex(index)">{{item.name}}</li>
            </ul>
        </section>
        <!--首页-选择车型-车系-->
        <section class="brand-models" id="serieWrap" v-if="showSerie" :class="{anmiteStatus:showSerie}">
            <ul>
                <li v-for="(item,index) in serieData">
                    <p>{{item.name}}</p>
                    <div class="serie-wrap" @click="getCarById(e.id)" v-for="(e,i) in item.list">
                        {{e.name}}
                    </div>
                </li>
            </ul>
        </section>
        <!--首页-选择车型-车型-->
        <section class="brand-models brand-details"  id="carWrap" v-show="showCar" :class="{anmiteStatus:showCar}">
            <ul>
                <li v-for="(item,index) in carData">
                    <p>{{item.groupName}}</p>
                    <div class="serie-wrap" v-for="(e,i) in item.list" @click="submitCar(e.id,e.name)">{{e.name}}</div>
                </li>
            </ul>
        </section>
    </div>
    </div>
</div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
      name: 'brand',
      props:["showBrand"],
      data () {
        return {
          brand:false,
          src:"http://img.emao.net/car/logo/nd/bah/nech.png/120",
          brandList:null,
          brandHeight:[],
          brandScroll:null,
          showSerie:false,
          serieData:null,
          serieScroll:null,
          showCar:false,
          globalBrandID:null,
          globalSerieID:null,
          carData:null,
          carScroll:null
        }
      },
      methods:{
        //获取素有品牌
        getAllBrand(){
            var that = this;
            var token = sessionStorage.token;
            this.$http({
                url:"car/choose/brand?token=" + token,
                method:"GET"
            }).then(function (response) {
                console.log(response);
                this.brandList = response.body.data;
                this.initIscroll("brandWrap");
                setTimeout(function(){
                    that.countHeight();
                },1000)
              }).catch(function (error) {
                console.log("请求失败了");
              });
        },
        //组件方法
        submitCar(carId,carName){ //回调
           this.showSerie = false;
           this.showCar = false;
           this.$store.dispatch("CHOOSE_CAR", // 通过store传值
            false
           );
           //this.$emit('getBrandChild',this.globalBrandID,this.globalSerieID,carId,carName); //通过组件传值
           this.$store.dispatch("CAR_DATA", // 通过store传值
              {
                globalBrandID:this.globalBrandID,
                globalSerieID:this.globalSerieID,
                carId:carId,
                carName:carName
              }
            );
        },
        initIscroll(id,scrollWrap){ //初始化滚动容器
            var that = this;
            setTimeout(function(){
                 that.brandScroll = new BScroll(document.getElementById(id),{
                   probeType: 3,
                   click:true
                });
            },1000) 
        },
        countHeight(){ //记录初始楼层高度
            const brandContainer = this.$refs.brandWrapper;
            const listArr = Array.from(brandContainer.children[0].children);
            listArr.forEach((item, index) => {
                this.brandHeight[index] = item.offsetTop;
            });
        }, //滚动到指定位置
        srcllToIndex(index){
            this.brandScroll.scrollTo(0, -this.brandHeight[index],500);
        },
        getSerieById(id){ //根据品牌获取车系
             this.showSerie = true;
             this.$http({
                url:"car/choose/serie?token=" + sessionStorage.token,
                method:"GET",
                params:{
                    brandId:id
                }
            }).then(function (response) {
                this.serieData = response.body.data.list;
                this.initIscroll("serieWrap",this.serieScroll);
                this.globalBrandID = response.body.data.id;
              }).catch(function (error) {
                console.log("请求失败了");
            });
        },
        getCarById(id){ //根据车系获取
             this.showCar = true;
             this.$http({
                url:"car/choose/model?token=" + sessionStorage.token,
                method:"GET",
                params:{
                    brandId:this.globalBrandID,
                    serieId:id
                }
            }).then(function (response) {
                this.carData = response.body.data.list;
                this.initIscroll("carWrap",this.carScroll); 
                this.globalSerieID = response.body.data.id;
              }).catch(function (error) {
                console.log("请求失败了");
            });
        },
        closebrand(){
          //this.$emit('getBrandChild'); //父子传值
          this.$store.dispatch("CHOOSE_CAR", // 通过store传值
            false
          );
        }
      },
      mounted(){
        this.getAllBrand();
      }
    }
</script>

<style>
.brand{
    position: fixed;
    top:0;
    transform:translateX(100%);
    width: 100%;
    z-index:100;
    height:100%;
}


.anmiteStatus {
    animation: myfirst 0.8s;
    animation-iteration-count:1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}


@keyframes myfirst
{
0% {transform:translateX(100%);opacity: 0}
100% {transform:translateX(0);opacity: 1}
}



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


/*品牌列表页-车源-展开*/
.brand-open-popup{z-index:2;}

/*选择车型*/
/*首页-选择车型-车型按字母排序*/
.brand-list-in{position:relative;height:100%;}
.brand-content-list{background-color:#fff;height:100%;overflow:hidden;}
.brand-content-list ul{}
.brand-content-list ul li p{height:.8rem;padding-left:.4rem;font-size:.2933rem;color:#999;line-height:.8rem;background-color:#f5f5f5;}
.brand-content-list ul li .brand-wrap{height:1.4133rem;font-size:.4rem;line-height:1.4133rem;}
.brand-content-list ul li .brand-wrap{display:block;height:100%;margin-left:.8rem;margin-right:.8rem;border-bottom:1px solid #f0f0f0;}
.brand-content-img{position:relative;float:left;width:1.1733rem;height:1.0667rem;margin-top:.2rem;}
.brand-content-img.active{background-color:#f5f5f5;}
.brand-content-img img{position:absolute;top:50%;left:50%;height:.88rem;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);}
.brand-content-list ul li span{display:block;margin-left: 1.2rem;}

/*首页-选择车型-首字母*/
.brand-list-letters{position:fixed;top:50%;right:0;padding: .15rem 0;z-index:2;transform:translateY(-50%);-webkit-transform:translateY(-50%);}
.brand-list-letters ul li{line-height:.5rem;font-size:.34667rem;text-align:center;padding:0 .3333rem;}


/*首页-选择车型-车型列表页*/
.brand-models{transform:translateX(100%);width:8.42667rem;position:absolute;top:0;right:0;z-index:5;background-color:#fff;height:100%;overflow:hidden;}
.brand-models ul{}
.brand-models ul .serie-wrap{height:1.3867rem;line-height:1.3867rem;margin-left:.4rem;font-size:.3733rem;border-bottom:1px solid #e0e0e0;}
.brand-models ul li p{height:1.44rem;margin-left:0;padding-left:.4rem;line-height:1.44rem;font-size:.4rem;font-weight:bold;color:#333;background-color:#f5f5f5;}

.brand-details{
    width:100%;
}
</style>
