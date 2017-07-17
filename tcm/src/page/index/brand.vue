<template>
  <div>
    
  <div class="brand" v-show="brand" :class="{brandActive:brand}">
    <!--首页-选择车型-头部-->
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion"></i>
        <strong class="brand-list-title">选择车型</strong>
    </header>

    <div class="brand-list-in">
        <!--首页-选择车型-车型按字母排序-->
        <section class="brand-content-list">
            <ul>
                <li>A</li>
                <li @click="getBrand(item.id,item.brandName)" v-for="(item,index) in brandList">
                    
                        <div class="brand-content-img active">
                             <img v-bind:src="src">
                        </div>
                        <span>{{item.brandName}}</span>
                    
                </li>
            </ul>
            <ul>
                <li>B</li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
            </ul>
            <ul>
                <li>C</li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
            </ul>
            <ul>
                <li>D</li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>阿斯顿·马丁</span>
                    
                </li>
                <li>
                    
                        <div class="brand-content-img">
                            <img src="../../assets/brand-logo.png" alt="">
                        </div>
                        <span>奥迪</span>
                    
                </li>
            </ul>
        </section>
        <!--首页-选择车型-首字母-->
        <section class="brand-list-letters">
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
                <li>I</li>
                <li>J</li>
                <li>K</li>
                <li>L</li>
                <li>M</li>
                <li>N</li>
                <li>O</li>
                <li>P</li>
                <li>Q</li>
                <li>R</li>
                <li>S</li>
                <li>T</li>
                <li>U</li>
                <li>V</li>
                <li>W</li>
                <li>X</li>
                <li>Y</li>
                <li>Z</li>
            </ul>
        </section>
        <!--首页-选择车型-车型列表页-->
        <section class="brand-models" style="display:none;">
            <ul>
                <li>一汽大众奥迪</li>
                <li>奥迪Q3</li>
                <li>奥迪A3</li>
                <li>奥迪Q3</li>
                <li>奥迪A3</li>
            </ul>
            <ul>
                <li>一汽大众奥迪</li>
                <li>奥迪Q3</li>
                <li>奥迪A3</li>
                <li>奥迪Q3</li>
                <li>奥迪A3</li>
            </ul>
            <ul>
                <li>一汽大众奥迪</li>
                <li>奥迪Q3</li>
                <li>奥迪A3</li>
                <li>奥迪Q3</li>
                <li>奥迪A3</li>
            </ul>
        </section>
        <!--首页-选择车型-车型详情页-->
        <section class="brand-models brand-details" style="display:none;">
            <ul>
                <li>1.8L涡轮增压 140KW</li>
                <li>2016款1.6T COOPER ALL4 Excitement装备控</li>
                <li>2017款Sportback 40 TFSI 风尚型</li>
                <li>2016款1.6T COOPER ALL4 Excitement装备控</li>
                <li>2017款Sportback 40 TFSI 风尚型</li>
            </ul>
            <ul>
                <li>1.8L涡轮增压 140KW</li>
                <li>2016款1.6T COOPER ALL4 Excitement装备控</li>
                <li>2017款Sportback 40 TFSI 风尚型</li>
                <li>2016款1.6T COOPER ALL4 Excitement装备控</li>
                <li>2017款Sportback 40 TFSI 风尚型</li>
            </ul>
            <ul>
                <li>1.8L涡轮增压 140KW</li>
                <li>2016款1.6T COOPER ALL4 Excitement装备控</li>
                <li>2017款Sportback 40 TFSI 风尚型</li>
                <li>2016款1.6T COOPER ALL4 Excitement装备控</li>
                <li>2017款Sportback 40 TFSI 风尚型</li>
            </ul>
        </section>
    </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'brand',
  props:["showBrand"],
  data () {
    return {
      brand:false,
      src:"http://img.emao.net/car/logo/nd/bah/nech.png/120",
      brandList:[
        {
            id:1,
            brandName:"阿斯顿·马丁",
            img:"http://img.emao.net/car/logo/nd/bah/nech.png/120"
        },
        {
            id:2,
            brandName:"奥迪",
            img:"http://img.emao.net/car/logo/nd/bah/nech.png/120"
        },
        {
            id:3,
            brandName:"阿斯顿·马丁",
            img:"http://img.emao.net/car/logo/nd/bah/nech.png/120"
        },
        {
            id:4,
            brandName:"奥迪",
            img:"http://img.emao.net/car/logo/nd/bah/nech.png/120"
        }
      ]
    }
  },
  methods:{
    //组件方法
    getBrand(index,brandName){
        this.brand = false;
        console.log(index);
        this.$emit('getBrandChild',index,brandName);
    },
  },
  mounted(){

  },
  watch:{
    showBrand(){
        this.brand = true;
        console.log(this.brand+"----------dddddddddddddddd");
    }
  }
}
</script>

<style>
.brand{
    position: fixed;
    top:0;
    left:100%;
    width: 100%;
}


.brandActive {
    animation: myfirst 0.8s;
    animation-iteration-count:1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}


@keyframes myfirst
{
0% {left: 100%;opacity: 0}
100% {left: 0;opacity: 1}
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
.brand-list-in{position:relative;}
.brand-content-list{background-color:#fff;}
.brand-content-list ul{}
.brand-content-list ul li:first-of-type{height:.8rem;padding-left:.4rem;font-size:.2933rem;color:#999;line-height:.8rem;background-color:#f5f5f5;}
.brand-content-list ul li{height:1.4133rem;font-size:.4rem;line-height:1.4133rem;}
.brand-content-list ul li a{display:block;height:100%;margin-left:.8rem;margin-right:.8rem;border-bottom:1px solid #f0f0f0;}
.brand-content-img{position:relative;float:left;width:1.1733rem;height:1.0667rem;margin-top:.2rem;}
.brand-content-img.active{background-color:#f5f5f5;}
.brand-content-img img{position:absolute;top:50%;left:50%;height:.88rem;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);}
.brand-content-list ul li span{display:block;margin-left: 1.2rem;}

/*首页-选择车型-首字母*/
.brand-list-letters{position:fixed;top:50%;right:0;padding: .15rem 0;z-index:2;transform:translateY(-50%);-webkit-transform:translateY(-50%);}
.brand-list-letters ul li{line-height:.5rem;font-size:.34667rem;text-align:center;padding:0 .3333rem;}


/*首页-选择车型-车型列表页*/
.brand-models{position:absolute;top:0;right:0;z-index:5;background-color:#fff;}
.brand-models ul{}
.brand-models ul li{height:1.3867rem;line-height:1.3867rem;margin-left:.4rem;font-size:.3733rem;border-bottom:1px solid #e0e0e0;}
.brand-models ul li:first-of-type{width:8.42667rem;height:1.44rem;margin-left:0;padding-left:.4rem;line-height:1.44rem;font-size:.4rem;font-weight:bold;color:#333;background-color:#f5f5f5;}


</style>
