<template>
    <div>
        <!--头部-->
        <header class="user-tit declare-head">
            <a href="javascript:;" class="white-lt" @click="resetIndex"></a>已售车辆
        </header>
        <!--售车申报-->
        <section class="sales-wrap">
            <div class="sales-item" v-for="(item,index) in declareList">
                <h3>{{item.serie_name}} {{item.auto_name}}</h3>
                <p class="sales-color">{{item.ext_color}}/{{item.int_color}}</p>
                <p class="sales-number">VIN：{{item.vin_num}}</p>
                <p class="sales-time">{{item.created_at}}售出</p>
            </div>

        </section>
        <p class="visib-109"></p>
    </div>
</template>
<script>
    export default{
        name:'soldCar',
        data(){
        return{
            declareList:[],
            add_order_time:''
        }
    },
    methods:{
        //组件方法
        resetIndex(){
            this.$router.push({name:'declare'});
        }
    },
    mounted(){
        //组件初始化完成需要做点什么
        var dataToken = "bbe214ab570d81dc8b1b6589d86e13d9";
        //var dataToken = sessionStorage.token;
        var data = {
            token:dataToken,
            perPage:10,
            page:1
        }

        //把时间戳换成时间格式
        function getLocalTime(timestamp) {
            return new Date(parseInt(timestamp) * 1000).toLocaleString().substr(0,17)
        }


        //售车申报
        this.$http({
            url:"order/sale/done",
            method:"GET",
            params:data
        }).then(function(response){
            console.log(response);
            this.declareList = response.body.data.list;
        }).catch(function(error){
            console.log("请求失败");
            console.log(error);
        })
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
</style>