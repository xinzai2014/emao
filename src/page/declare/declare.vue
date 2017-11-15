<template>
    <div>
        <!--头部-->
        <header class="user-tit declare-head">


            <!--<router-link to="/profile">-->
                <!--<a href="javascript:;" class="white-lt"></a>-->
            <!--</router-link>-->


            <span class="white-lt" @click="resetIndex"></span>
            售车申报
            <router-link to="/soldCar">
                <span>已售车辆</span>
            </router-link>
        </header>
        <!--售车申报-->
        <section class="sales-wrap" v-if="declareList.length">
            <div class="full-wrap" v-load-more="loaderMore" v-infinite-scroll="loaderMore"  infinite-scroll-disabled="preventRepeatReuqest" infinite-scroll-distance="10">
                <div class="sales-item" v-for="(item,index) in declareList">
                    <h3>{{item.brand_name}} {{item.auto_name}}</h3>
                    <p class="sales-color">{{item.ext_color}}/{{item.int_color}}</p>
                    <p class="sales-number">VIN：{{item.vin_num}}</p>
                    <!--<p class="sales-time">-->
                        <!--<span :vinNumValue = item.order_num @click="goEdit(item.order_num,item.goods_stock_id)">售车申报</span>-->
                        <!--<i v-if="item.is_sell==4">申报审核未通过，请重新提交</i>-->
                        <!--<i v-if="item.is_sell==1">申报审核中</i>-->
                        <!--<i v-if="item.is_sell==2">申报待提交</i>-->
                    <!--</p>-->
                    <p class="sales-time" v-if="item.is_sell==4">
                        <span :vinNumValue = item.order_num @click=goReject(item)>售车申报</span>
                        <i>申报审核未通过，请重新提交</i>
                    </p>
                    <p class="sales-time" v-if="item.is_sell==1">
                        <span :vinNumValue = item.order_num @click=goReject(item)>售车申报</span>
                        <i>申报审核中</i>
                    </p>
                    <p class="sales-time" v-if="item.is_sell==2">
                        <!--<span :vinNumValue = item.order_num @click="goEdit(item.id)">售车申报</span>-->
                        <span :vinNumValue = item.order_num @click=goReject(item)>售车申报</span>
                        <i>申报待提交</i>
                    </p>
                </div>
            </div>
            <p class="visib-109"></p>
            <transition name="loading">
                <div v-show="showLoading">正在加载中</div>
            </transition>
            <p v-if="touchend" class="empty_data">没有更多了</p>
        </section>


        <section class="no-auto server-no-response" v-if="showNoDataVal">
            <img src="../../assets/no-vehicles-sold-news.png" alt="">
            <p>暂无待申报车辆信息</p>
        </section>


        <transition name="fade">
            <router-view></router-view>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>

</template>
<script>
    import alertTip from '../../components/common/alertTip/alertTip';
    export default{
        data(){
            return{
                name:'declare',
                current_page :'1', //当前页
                last_page:'0', //上一页
                per_page:'10', //每页的数量
                touchend:false, //是否触摸到底部
                preventRepeatReuqest:false, //阻止重复请求
                showLoading: true, //正在加载
                declareList:[], //售车申报列表
                add_order_time:'', //售车申报入库时间
                showNoDataVal:false, //显示没有数据
                showAlert:false, //提示框显示与否
                alertText:null //提示内容
            }
        },
        components:{
            alertTip
        },
        methods:{
            //回到上一级
            resetIndex(){
                this.$router.push({"name":sessionStorage.getItem("prePath")})
            },
            //组件方法
//            //跳转到提交申报资料页
//            goEdit(orderNum,goodsStockId){
//                this.$router.push('/editDeclare/'+ orderNum + '?goods_stock_id=' + goodsStockId );//售车申报资料页跳转
//            },
            //跳转到申报资料审核页
//            goAudit(id){
//                this.$router.push('/auditDeclare/'+ id );//售车申报资料页跳转
//            },
//
//            //跳转到申报资料审核未通过页
//            goReject(id){
//                this.$router.push('/rejectDeclare/'+ id);//售车申报资料页跳转
//            },

            //跳转到申报资料审核未通过页
            goReject(item){
                if (item.id){
                    this.$router.push({
                        path:'rejectDeclare',
                        query:{
                            id:item.id,
                            is_sell:item.is_sell
                        }
                    })
                    //this.$router.push('/editDeclare/'+ orderNum + '?goods_stock_id=' + goodsStockId );
                }else{
                    this.$router.push({
                        path:'rejectDeclare',
                        query:{
                            is_sell:item.is_sell,
                            orderNum : item.order_num,
                            goods_stock_id : item.goods_stock_id
                        }
                    })
                }

            },


            //把时间戳换成时间格式
            getLocalTime(timestamp) {
                var date = new Date(parseInt(timestamp) * 1000);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                month = month < 10 ? ('0' + month) : month;
                day = day < 10 ? ('0' + day) : day;
                hour = hour < 10 ? ('0' + hour) : hour;
                minute = minute < 10 ? ('0' + minute) : minute;
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
            },
            //获取售车申报数据
            getDeclaerData(){
                var dataToken = sessionStorage.token;
                var data = {
                    token:dataToken,
                    perPage:this.per_page,
                    page:this.current_page
                };
                this.$http({
                    url:"order/sale/index",
                    method:"GET",
                    params:data
                }).then(function(response){
                    var declareList = response.body.data.list;
                    for(var i=0;i<declareList.length;i++){
                        declareList[i].add_order_time = this.getLocalTime(declareList[i].add_time);
                    };
                    this.declareList = this.declareList.concat(declareList);
                    if (!this.declareList.length) {
                        this.showNoDataVal = true;
                    }else{
                        this.showNoDataVal = false;
                    }
                    this.current_page = response.body.data.page.current_page;
                    this.last_page = response.body.data.page.last_page;
                    this.per_page = response.body.data.page.per_page;
                    this.hideLoading();
                    this.preventRepeatReuqest = false;
                    if (this.current_page == this.last_page || this.last_page == 1 ) {
                        this.touchend = true;
                        return
                    }
                }).catch(function(error){
                    this.showAlert = true;
                    this.alertText = error.body.msg;
                })
            },
            //隐藏加载状态
            hideLoading(){
                this.showLoading = false;
            },
            //加载更多
            loaderMore(){
                if (this.touchend){
                    return
                }
                //防止重复请求
                if (this.preventRepeatReuqest) {
                    return
                }

                this.showLoading = true;
                this.preventRepeatReuqest = true;
                this.currentPage = parseInt(this.currentPage) + 1;

            }
        },
        mounted(){
            //组件初始化完成需要做点什么
            this.getDeclaerData();
        },
        watch:{
            $route(){
                this.fillData();
            }
        },
        //路由判断
        beforeRouteEnter (to, from, next) {
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
            next();
            if (!(from.name == null || from.name == "soldCar" || from.name == "editDeclare" || from.name == "soldCarDetail")) {
                sessionStorage.setItem("prePath",from.name);
            }

        }
    }
</script>
<style>
    /*售车申报*/
    .declare-head{position:relative;}
    .declare-head span{position:absolute;right:.4rem;color:#d5aa5c;}
    .full-wrap{height:100%;}
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

    .no-auto{
        text-align: center;
        font-size: 0.453333rem;
        padding: 4.0rem 0;
        position: absolute;
        width: 100%;
        left: 0;}
    .no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
</style>