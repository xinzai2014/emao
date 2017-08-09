<template>
    <div>
        <!--头部-->
        <header class="user-tit declare-head">
            <a href="javascript:;" class="white-lt" @click="resetIndex"></a>已售车辆
        </header>
        <!--已售车申报列表-->
        <section v-if="declareList.length">
            <div class="sales-wrap" v-load-more="loaderMore" v-infinite-scroll="loaderMore" infinite-scroll-disabled="preventRepeatReuqest" infinite-scroll-distance="10">
                <div class="sales-item" v-for="(item,index) in declareList">
                    <h3>{{item.serie_name}} {{item.auto_name}}</h3>
                    <p class="sales-color">{{item.ext_color}}/{{item.int_color}}</p>
                    <p class="sales-number">VIN：{{item.vin_num}}</p>
                    <p class="sales-time">{{item.created_at}}售出</p>
                </div>
            </div>
            <p class="visib-109"></p>

            <transition name="loading">
                <div v-show="showLoading">正在加载中</div>
            </transition>

            <p v-if="touchend" class="empty_data">没有更多了</p>
        </section>

        <section class="no-auto server-no-response" v-if=showNoDataVal>
            <img src="../../assets/no-vehicles-sold-news.png" alt="">
            <p>暂无已售申报车辆信息</p>
        </section>
    </div>
</template>
<script>
    export default{
        name:'soldCar',
        data(){
        return{
            declareList:[],
            touchend:false,
            perPage:'10',
            currentPage:'1',
            lastPage:'0',
            perPage:'10',
            showLoading: true,
            preventRepeatReuqest:false,
            showNoDataVal:false
        }
    },
    methods:{
        //组件方法
        resetIndex(){
            this.$router.push({name:'declare'});
        },
        hideLoading(){
            this.showLoading = false;
        },

        //加载更多
        loaderMore(){
            //到底了
            if (this.touchend) {
                return
            }

            //防止重复请求
            if (this.preventRepeatReuqest) {
                return
            }
            this.showLoading = true;
            this.preventRepeatReuqest = true;
            this.currentPage = parseInt(this.currentPage) + 1;
            this.getSoldCarData();
        },
        getSoldCarData(){
            var dataToken = sessionStorage.token;
            var data = {
                token:dataToken,
                perPage:this.perPage,
                page:this.currentPage
            }
            this.$http({
                url:"order/sale/done",
                method:"GET",
                params:data
            }).then(function(response){
               var declareList = response.body.data.list;
               this.declareList = this.declareList.concat(declareList);

                if (!this.declareList.length) {
                    this.showNoDataVal = true;
                }else{
                    this.showNoDataVal = false;
                }

                this.currentPage = response.body.data.page.currentPage;
                this.lastPage = response.body.data.page.lastPage;
                this.hideLoading();
                this.preventRepeatReuqest = false;
                if (this.currentPage == this.lastPage) {
                    this.touchend = true;
                    return;
                }
            }).catch(function(error){
                console.log("请求失败");
                console.log(error);
            })
        }


    },
    mounted(){
        //组件初始化完成需要做点什么
        this.getSoldCarData();
    },

    watch:{
        $route(){
            this.getSoldCarData();
        }
    }

    }
</script>
<style>
    /*售车申报*/
    .declare-head{position:relative;}
    .declare-head span{position:absolute;right:.4rem;color:#d5aa5c;}
    .sales-item{
        padding:0.533333rem 0.4rem;
        overflow:hidden;
        background:#fff;
        margin-bottom:0.4rem;
        max-height:99999px;
    }
    .sales-item h3{
        font-size:0.426667rem;
        line-height:0.466667rem;
    }
    .sales-color{
        font-size:0.346667rem;
        color:#999;
        margin-top:0.266667rem;
    }
    .sales-number{
        font-size:0.373333rem;
        color:#2c2c2c;
        margin:0.533333rem 0;
    }
    .sales-time{
        font-size:0.32rem;
        color:#fc3036;
        line-height:0.8rem;
    }
    .sales-time span{
        float:right;
        font-size:0.373333rem;
        color:#fff;
        padding:0 0.266667rem;
        background:#d5aa5c;
        border-radius:0.4rem;
        height:0.8rem;
    }
    .sales-fixed{
        background:#fff;
        width:9.2rem;
        height:1.453333rem;
        line-height:1.453333rem;
        padding:0 0.4rem;
        font-size:0.4rem;
        color:#2c2c2c;
        position:fixed;
        left:0;
        bottom:0;
    }
    .sales-fixed i{
        float:right;
        margin-top:0.533333rem;
    }
    .visib-109{
        height:1.453333rem;
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity 1s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    .empty_data{
        color:#666;
        text-align: center;
        line-height: 2rem;
    }
    /*.no-auto{padding-top:3.867rem;background-color:#fff;height:100%;}*/
    .no-auto{position: absolute;width: 100%;padding: 4.0rem 0; background-color: #fff;text-align: center;font-size: 0.453333rem;left: 0;height: 100%;}
    .no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
    .no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
</style>