<template>
    <div>
        <header class="user-tit declare-head" v-if="this.showHeadStatus">
            <span class="white-lt"></span>
            我的预售
        </header>
        <section class="car-reserve-list">

            <ul class="car-reserve-con sales-wrap"  v-load-more="loaderMore" v-infinite-scroll="loaderMore" infinite-scroll-disabled="preventRepeatReuqest" infinite-scroll-distance="10">
                <li class="car-reserve-txt" v-for="(item,index) in presellList">
                    <p class="car-reserve-state">{{item.description}}</p>
                    <div class="car-presell-in">
                        <p class="car-presell-name">{{item.autoName}}</p>
                         <ul class="car-presell-facade">
                              <li v-for="(appearanceItem,appearanceIndex) in item.preOrder">
                                  <p><span>{{appearanceItem.color}}</span></p>
                                  <p>X <span>1</span></p>
                              </li>
                        </ul>
                        <div class="car-presell-aigin-wrap" v-if="item.timeOut == '0' && item.state== '2' ">
                            <input class="car-presell-aigin" type="button" name="重新预定" value="重新预定" @click="rebook(item.preSaleId)">
                        </div>
                    </div>
                </li>

            </ul>

            <p class="visib-109"></p>

            <transition name="loading">
                <div v-show="showLoading">正在加载中</div>
            </transition>

            <p v-if="touchend" class="empty_data">没有更多了</p>

        </section>


        <section class="no-auto server-no-response" v-if=showNoDataVal>
            <img src="../../assets/no-vehicles-sold-news.png" alt="">
            <p>暂无预售车辆信息</p>
        </section>

        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    </div>
</template>

<script>
    import alertTip from '../../components/common/alertTip/alertTip';
    export default{
        name:'presellList',
        data(){
            return {
                presellList:[],
                touchend:false,
                perPage:'10',
                currentPage:'1',
                lastPage:'0',
                showLoading:true,
                preventRepeatRequest:false,
                showNoDataVal:false,
                showAlert:false,
                alertText:null,
                showHeadStatus:false
            }
        },
        methods:{

            /*向App传值*/
            tcmApp(obj){
                //emaoAppObject 是 native 向 WebView 注册的用来响应 JS 消息的对象
                //向 native 发送消息（TODO:具体使用中可根据 navigator.userAgent 中的信息来判断系统类型，在不同的系统中分别调用下面对应的代码）
                //或者由服务器判断响应不同的平台脚本
                if (navigator.userAgent.indexOf("iPhone") > 0) {
                    window.webkit.messageHandlers.tcmAppObject.postMessage(obj);//向 iOS 发送消息，Android 无效
                }
                else {
                    window.tcmAppObject.postMessage(JSON.stringify(obj));//向 Android 发送消息，iOS 无效
                }

            },

            /*判断是否是App*/
            isTcmApp(){
                // return navigator.userAgent.indexOf("tcm") !== -1;
                if (typeof(this.$route.query.token) == 'undefined' || this.$route.query.token == '') {
                    return false;
                } else {
                    return true;
                }
            },

            /*区分app与wap做不同的渲染*/
            renderDom(){
                if (this.isTcmApp()){
                    document.title = "我的预售";
                    this.showHeadStatus = false;
                }else{
                    this.showHeadStatus = true;
                }
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
                if (this.preventRepeatRequest) {
                    return
                }
                this.showLoading = true;
                this.preventRepeatRequest = true;
                this.currentPage = parseInt(this.currentPage) + 1;
                this.getPresellListData();
            },

            //获得我的预售列表
            getPresellListData(){
                var dataToken = sessionStorage.token;
                var data = {
                    token : dataToken,
                    perPage:this.perPage,
                    page:this.currentPage
                };
                this.$http({
                    url:'order/preSale/index',
                    method:'GET',
                    params:data
                }).then(function(response){
                    var presellList = response.body.data.list;
                    this.presellList = this.presellList.concat(presellList);

                    if (!this.presellList.length) {
                        this.showNoDataVal = true;
                    }else{
                        this.showNoDataVal = false;
                    }

                    this.currentPage = response.body.data.page.currentPage;
                    this.lastPage = response.body.data.page.lastPage;
                    this.hideLoading();
                    this.preventRepeatRequest = false;
                    if (this.currentPage == this.lastPage) {
                        this.touchend = true;
                        return;
                    }
                }).catch(function(){
                    this.showAlert = true;
                    this.alertText = error.body.msg;
                })
            },

            /*重新预定*/
            rebook(id){
                this.$store.dispatch("PRESELL_FLAG",
                        {
                            tag:'presellList'
                        }
                );
                if (this.isTcmApp()) {
                    this.$router.push('/presell/presellReserve/' + id +'?token=' + sessionStorage.token)
                }else{
                    this.$router.push('/presell/presellReserve/' + id )
                }




            }

        },
        mounted(){
            if (!sessionStorage.token) {
                sessionStorage.token = this.$route.query.token;
            }
            this.getPresellListData();
            this.renderDom();
        },
        components:{
            alertTip
        }
    }
</script>



<style>
    .user-tit{font-weight:normal;}
    .user-tit .white-lt {  position: absolute;  left: 0.48rem;  top: 0.4rem;  }
    .car-reserve-list{}
    .car-reserve-list{} .car-reserve-con .car-reserve-txt{margin-bottom:.4rem;padding:.4rem;background-color:#fff;}
    .car-reserve-state{margin-bottom:.4rem;color:#fc3036;font-size:.3467rem;}
    .car-presell-in{padding-top:.4rem;border-top:1px solid #e0e0e0;}
    .car-presell-name{line-height:.6rem;font-size:.4rem;font-weight:bold;color:#000;}
    .car-presell-facade{}
    .car-presell-facade li{clear:both;overflow:hidden;font-size:.32rem;color:#999;}
    .car-presell-facade li p{line-height:.6rem;}
    .car-presell-facade li p:nth-of-type(1){float:left;}
    .car-presell-facade li p:nth-of-type(2){float:right;}
    .car-presell-aigin-wrap{text-align:right;}
    .car-presell-aigin{display:inline-block;width:2.4rem;height:.8rem;margin-top:.4rem;border:none;border-radius:.4rem;font-size:.373rem;color:#fff;background-color:#d6ab55;}
    .no-auto{position: absolute;width: 100%;padding: 4.0rem 0; text-align: center;font-size: 0.453333rem;left: 0;}
    .no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
    .no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
</style>