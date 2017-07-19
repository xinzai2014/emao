<template>
  <div>
        <!--头部-->
        <header class="user-tit">
            <a href="javascript:;" class="white-lt"></a>我的优惠券
        </header>
        <!--我的优惠券-->
        <section class="coupon-wrap">
            <ul class="coupon-li">
                <li class="active">可用(1)</li>
                <li>已使用(1)</li>
                <li>已失效(1)</li>
            </ul>
            <div class="coupon-ct">
                <!-- 可用 -->
                <div class="coupon-info">
                    <div class="coupon-item available">
                        <dl>
                            <dt>¥ 3,000</dt>
                            <dd>
                                <h4>优惠券标题名称</h4>
                                <p>使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉</p>
                                <p>有效期：2017.03.02 - 2017.05.01</p>
                            </dd>
                        </dl>
                        <div class="coupon-prompt">
                            <span>展开详情<i class="white-rt"></i></span>
                            <p>
                                <b>适用车型</b>
                                <em>日产骊威2015款</em>
                                <em>日产骊威2015款</em>
                            </p>
                        </div>
                    </div>
                    <div class="coupon-item available">
                        <dl>
                            <dt>¥ 3,000</dt>
                            <dd>
                                <h4>优惠券标题名称</h4>
                                <p>使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉</p>
                                <p>有效期：2017.03.02 - 2017.05.01</p>
                            </dd>
                        </dl>
                        <div class="coupon-prompt active">
                            <span>展开详情<i class="white-rt"></i></span>
                            <p>
                                <b>适用车型</b>
                                <em>日产骊威2015款</em>
                                <em>日产骊威2015款</em>
                            </p>
                        </div>
                    </div>
                </div>
                <!--已使用 -->
                <div class="coupon-info">
                    <div class="coupon-item">
                        <i class="use-icon"></i>
                        <dl>
                            <dt>¥ 3,000</dt>
                            <dd>
                                <h4>已使用</h4>
                                <p>使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉</p>
                                <p>有效期：2017.03.02 - 2017.05.01</p>
                            </dd>
                        </dl>
                        <div class="coupon-prompt">
                            <span>展开详情<i class="white-rt"></i></span>
                            <p>
                                <b>适用车型</b>
                                <em>日产骊威2015款</em>
                                <em>日产骊威2015款</em>
                            </p>
                        </div>
                    </div>
                </div>
                <!--已失效 -->
                <div class="coupon-info">
                    <div class="coupon-item">
                        <dl>
                            <dt>¥ 3,000</dt>
                            <dd>
                                <h4>已失效</h4>
                                <p>使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉使用说明巴拉巴拉巴拉</p>
                                <p>有效期：2017.03.02 - 2017.05.01</p>
                            </dd>
                        </dl>
                        <div class="coupon-prompt">
                            <span>展开详情<i class="white-rt"></i></span>
                            <p>
                                <b>适用车型</b>
                                <em>日产骊威2015款</em>
                                <em>日产骊威2015款</em>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <transition name="router-slid">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
        use:[],
        disable:[],
        used:[]
    }
  },
  methods:{
    //组件方法
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
            this.use = response.body.data.use;   
            this.disable = response.body.data.use;  
            this.used = response.body.data.used;    
        }).catch(function (error) {
            console.log("请求失败了");
        });
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
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
/*优惠券*/
.coupon-li{
    height:1.066667rem;
    line-height:1.066667rem;
    background:#fff;
}
.coupon-li li{
    width:1.8rem;
    text-align:center;
    border-bottom:2px solid #fff;
    margin:0 0.733333rem;
    float:left;
    font-size:0.4rem;
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
    height:2.6rem;
    width:2.4rem;
    text-align:center;
    line-height:2.6rem;
    border-right:1px dashed #efeff4;
    font-size:0.586667rem;
    color:#d7d7d7;
    position:relative;
    float:left;
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

</style>
