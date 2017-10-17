<template>
    <div>
        <!--头部-->
        <header class="user-tit declare-head">
            <a href="javascript:;" class="white-lt" @click="resetIndex"></a>已售车辆
        </header>
        <!--已售车申报列表-->
        <section v-if="declareList.length">
            <div class="sales-wrap" v-load-more="loaderMore" v-infinite-scroll="loaderMore" infinite-scroll-disabled="preventRepeatReuqest" infinite-scroll-distance="10">
                <div class="sales-item" v-for="(item,index) in declareList" @click="goDetail(item.id)">
                    <h3>{{item.auto_name}}</h3>
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
            <p>暂无已售车辆信息</p>
        </section>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    </div>
</template>
<script>
    import alertTip from '../../components/common/alertTip/alertTip';
    export default{
        name:'soldCar',
        data(){
        return{
            declareList:[],                 //已售车量信息
            touchend:false,                 //是否是加载到底部
            perPage:'10',                   //每页10条数据
            currentPage:'1',                //当前页
            lastPage:'0',                   //最后一页
            showLoading: true,              //是否显示加载
            preventRepeatReuqest:false,     //是否阻止重复请求
            showNoDataVal:false,            //是否显示没有数据
            showAlert:false,                //是否显示提示弹窗
            alertText:null                  //错误内容提示
        }
    },
    methods:{
        //组件方法
        resetIndex(){
            this.$router.push({name:'declare'});
        },

        //组件方法
        goDetail(id){
            //this.$router.push('/soldCarDetail/'+ id);//已售车申报资料详情页跳转
            //this.$router.push('/soldCarDetail/'+ id);
            //this.$router.push({path:'/soldCarDetail/'+ id });
            //this.$router.push({path:~/soldCarDetail/$(id)~})

            //router.push({ path: '/xxxxxx/' + id })

            //this.$router.push({ name: 'soldCarDetail', params: { id: id }})

            this.$router.push('/soldCarDetail/'+ id);
        },

        //隐藏加载状态
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
        //获得已售车辆信息
        getSoldCarData(){
            var dataToken = sessionStorage.token;
            var data = {
                token:dataToken,
                perPage:this.perPage,
                page:this.currentPage
            };
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
                this.showAlert = true;
                this.alertText = error.body.msg;
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
    },
    components:{
        alertTip
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
    .no-auto{position: absolute;width: 100%;padding: 4.0rem 0; text-align: center;font-size: 0.453333rem;left: 0;}
    .no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
    .no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
</style>