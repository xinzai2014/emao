<template>
  <div>
        <!--头部-->
        <header class="user-tit">
            <a href="javascript:;" class="white-lt" @click="resetIndex"></a>我的优惠券
        </header>
        <!--我的优惠券-->
        <section class="coupon-wrap">
            <ul class="coupon-li">
                <li :class="{active:categoryType === 'use'}" @click="categoryType = 'use'">
                    可用({{useNum}})
                </li>
                <li :class="{active:categoryType === 'used'}" @click="categoryType = 'used'">
                    已使用({{usedNum}})
                </li>
                <li :class="{active:categoryType === 'choosed'}" @click="categoryType = 'choosed'" >
                    已失效({{disableNum}})
                </li>
            </ul>
            <div class="coupon-ct">
                <!-- 可用 -->
                <transition name="router-fade">
                    <div class="coupon-info" v-if="categoryType === 'use'">
                        <div class="coupon-item available" v-for="(item,index) in use" v-if="useNum">
                            <dl>
                                <dt>¥ {{item.price}}</dt>
                                <dd>
                                    <h4>{{item.name}}</h4>
                                    <p>{{item.note}}</p>
                                    <p>有效期：{{item.startDate}} - {{item.endDate}}</p>
                                </dd>
                            </dl>
                            <div class="coupon-prompt" :class="{active:item.active}">
                                <span @click="slideDown(item)">展开详情<i class="white-rt"></i></span>
                                <p>
                                    <b>适用车型</b>
                                    <em v-for="(item_apply,index_apply) in item.apply">{{item_apply.name}}</em>
                                </p>
                            </div>
                        </div>
                        <section class="no-auto server-no-response" v-if="!useNum">
                            <img src="../../assets/no-coupon.png" alt="">
                            <p>暂无此类优惠券</p>
                        </section>
                    </div>
                    
                </transition>
                <!--已使用 -->
                <transition name="router-fade">
                    <div class="coupon-info" v-if="categoryType === 'used'">
                        <div class="coupon-item" v-for="(item,index) in used" v-if="usedNum">
                            <i class="use-icon"></i>
                            <dl>
                                <dt>¥ {{item.price}}</dt>
                                <dd>
                                    <h4>已使用</h4>
                                    <p>{{item.note}}</p>
                                    <p>有效期：{{item.startDate}} - {{item.endDate}}</p>
                                </dd>
                            </dl>
                            <div class="coupon-prompt" :class="{active:item.active}">
                                <span @click="slideDown(item)">展开详情<i class="white-rt"></i></span>
                                <p>
                                    <b>适用车型</b>
                                    <em v-for="(item_apply,index_apply) in item.apply">{{item_apply.name}}</em>
                                </p>
                            </div>
                        </div>
                        <section class="no-auto server-no-response" v-if="!usedNum">
                            <img src="../../assets/no-coupon.png" alt="">
                            <p>暂无此类优惠券</p>
                        </section>
                    </div>
                    
                </transition>
                <!--已失效 -->
                <transition name="router-fade">
                    <div class="coupon-info" v-if="categoryType === 'choosed'">
                        <div class="coupon-item" v-for="(item,index) in disable" v-if="disableNum">
                            <dl>
                                <dt>¥ {{item.price}}</dt>
                                <dd>
                                    <h4>已失效</h4>
                                    <p>{{item.note}}</p>
                                    <p>有效期：{{item.startDate}} - {{item.endDate}}</p>
                                </dd>
                            </dl>
                            <div class="coupon-prompt" :class="{active:item.active}">
                                <span @click="slideDown(item)">展开详情<i class="white-rt"></i></span>
                                <p>
                                    <b>适用车型</b>
                                    <em v-for="(item_apply,index_apply) in item.apply">{{item_apply.name}}</em>
                                </p>
                            </div>
                        </div>
                        <section class="no-auto server-no-response" v-if="!disableNum">
                            <img src="../../assets/no-coupon.png" alt="">
                            <p>暂无此类优惠券</p>
                        </section>
                    </div>
                    
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
        use:[],
        useNum:0,
        disable:[],
        disableNum:0,
        used:[],
        usedNum:0,
        categoryType:'use'
    }
  },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.go(-1);
    },
    fillData(){
        var dataToken = sessionStorage.token;
        var data = {
            token:dataToken,
            autoId:'',
            type:''
        }
        this.$http({
            url:"dealer/coupon",
            method:"GET",
            params:data
        }).then(function (response) {

            let use = response.body.data.use; 
            this.use=this.bActive(use);
            this.useNum = this.use.length; 

            let disable = response.body.data.use;
            this.disable=this.bActive(disable); 
            this.disableNum= this.disable.length;  

            let used = response.body.data.used;
            this.used=this.bActive(used);   
            this.usedNum = this.used.length;   

        }).catch(function (error) {
            console.log("请求失败了");
        });
    },
    bActive(arr){
        for(var i=0;i<arr.length;i++){
            arr[i].active=false;
        }
        return arr;
    },
    slideDown(item){
        item.active = !item.active;
    }
  },
  mounted(){
    //组件初始完成需要做什么
    this.fillData();
    
  },
  watch:{ 
    $route(){
        this.fillData();
    }
  }

}
</script>

<style>
.router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
.no-auto{background-color: #fff;
    text-align: center;
    font-size: 0.453333rem;
    padding: 4.0rem 0;
    position: absolute;
    width: 100%;
    left: 0;
    top: 3rem;
    height: 100%;}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}
/*优惠券*/
.coupon-li{
    height:1.066667rem;
    line-height:1.066667rem;
    background:#fff;
    margin-bottom: 0.4rem;
}
.coupon-li li{
    width: 2rem;
    text-align: center;
    border-bottom: 2px solid #fff;
    margin: 0 0.633333rem;
    float: left;
    font-size: 0.4rem;
}
.coupon-li li.active{
    color:#d5aa5c;
    border-color:#d5aa5c;
}
.coupon-ct{
    padding:0 0.533333rem;
}
.coupon-item{
    position:relative;
}
.coupon-item dl{
    padding:0.4rem;
    margin-top:0.533333rem;
    background:#fff;
    box-shadow:0 0.3px 6px 0.3px #f6b32e;
    overflow:hidden;
}
.coupon-item dt{
    height: 2.6rem;
    width: 2.5rem;
    text-align: center;
    line-height: 2.6rem;
    border-right: 1px dashed #efeff4;
    font-size: 0.54rem;
    /* padding-right: 0.1rem; */
    color: #d7d7d7;
    position: relative;
    float: left;
}
.coupon-item dt:before,.coupon-item dt:after{
    content: "";   
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #f5f4f3;
    border-radius: 0 0 0.4rem 0.4rem;
    position:absolute;
    left:2.2rem;
}
.coupon-item dt:before{
    top:-0.533333rem;
}
.coupon-item dt:after{
    border-radius: 0.4rem 0.4rem 0 0;
    bottom:-0.533333rem;
}
.coupon-item dd{
    float:right;
    width:5.44rem;
    height:2.2rem;
    border-bottom:1px solid #eee;
}
.coupon-item dd h4{
    font-size:0.373333rem;
    line-height:0.4rem;
}
.coupon-item dd p{
    font-size:0.32rem;
    color:#999;
    margin-top:0.2rem;
}
.coupon-prompt{
    background:#eee;
    position:relative;
}
.coupon-prompt span{
    font-size:0.32rem;
    color:#999;
    position:absolute;
    right:2.16rem;
    top:-0.666667rem;
}
.coupon-prompt span i{
    margin-left:0.266667rem;
    vertical-align:middle;
    -webkit-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    -o-transform: rotateZ(90deg);
    -ms-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}
.coupon-prompt.active span i{
    -webkit-transform: rotateZ(-90deg);
    -moz-transform: rotateZ(-90deg);
    -o-transform: rotateZ(-90deg);
    -ms-transform: rotateZ(-90deg);
    transform: rotateZ(-90deg);
}
.coupon-prompt p{
    padding:0 0.4rem;
    line-height:1.066667rem;
    font-size:0.373333rem;
    color:#2c2c2c;
    display:none
}
.coupon-prompt.active p{
    display:block;
}
.coupon-prompt p{
    overflow:hidden;
    padding-bottom:0.373333rem;
}
.coupon-prompt p b{
    display:block;
    float:left;
    width:1.866667rem;
}
.coupon-prompt p em{
    float:right;
    display:block;
    width:6.133333rem;
    text-align:right;
    margin-top:0.346667rem;
    line-height:0.373333rem; 
}
.available dt{
    color:#d5aa5c;
}
.use-icon{
    position:absolute;
    top:0;
    right:0;
    background:url(../../assets/use-icon.png) no-repeat;
    background-size:contain;
    width:1.306667rem;
    height:1.386667rem;
    display:inline-block;
}
.rebate-no {
    text-align: center;
    font-size: 0.453333rem;
    padding: 4.0rem 0;
    position: absolute;
    width: 100%;
    left: 0;
    top: 3rem;
}

</style>
