<template>
    <div>
        <!--首页-品牌列表-头部-->
        <div class="brand-header-out">
            <header class="brand-list-header">
                <i class="white-lt brand-left-cion"></i>
                <strong class="brand-list-title">中转库管理</strong>
            </header>
        </div>

        <!--车辆信息-->
        <section class="transit-depot-info">
            <p class="transit-depot-address">{{dealer_name}}</p>
            <ul class="transit-depot-top clearfix">
                <li>
                    <span>{{auto_wait_in}}</span>
                </li>
                <li>
                    <span>{{auto_wait_out}}</span>
                </li>
                <li>
                    <span>{{auto_in_warehouse}}</span>
                </li>
            </ul>
        </section>

        <!--中转库的不同状态-->
        <section class="transit-depot-con">
            <ul>
                <li>
                    <p class="transit-depot-status">等待入库</p>
                    <div class="transit-depot-in">
                        <ul class="transit-depot-list">
                            <li v-for="item in waitIn">
                                <p class="transit-depot-vin">VIN <span>{{item.vin_num}}</span></p>
                                <div class="transit-depot-txt">
                                    <p class="transit-depot-message">{{item.brand_name}}{{item.serie_name}}{{item.year}}款{{item.auto_name}} </p>
                                    <p class="transit-depot-color">{{item.ext_color}}/{{item.int_color}}</p>
                                    <div class="transit-depot-state">
                                        <input class="transit-depot-storage transit-depot-btn" type="button" name="" value="确认入库">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <p class="transit-depot-status">等待出库</p>
                    <div class="transit-depot-in">
                        <ul class="transit-depot-list">
                            <li v-for="item in waitOut">
                                <p class="transit-depot-vin">VIN <span>{{item.vin_num}}</span></p>
                                <div class="transit-depot-txt">
                                    <p class="transit-depot-message">{{item.brand_name}}{{item.serie_name}}{{item.year}}款{{item.auto_name}}</p>
                                    <p class="transit-depot-color">{{item.ext_color}}/{{item.int_color}}</p>
                                    <div class="transit-depot-state">
                                        <input class="transit-depot-stock-removal transit-depot-btn" type="text" name="" value="确认出库">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <p class="transit-depot-status">在库</p>
                    <div class="transit-depot-in">
                        <ul class="transit-depot-list">
                            <li v-for="item in inWarehouse">
                                <p class="transit-depot-vin">VIN <span>{{item.vin_num}}</span></p>
                                <div class="transit-depot-txt">
                                    <p class="transit-depot-message">{{item.brand_name}}{{item.serie_name}}{{item.year}}款{{item.auto_name}}</p>
                                    <p class="transit-depot-color">{{item.ext_color}}/{{item.int_color}}</p>
                                    <div class="transit-depot-state">
                                        <p>{{item.add_warehouse_time}}</p>
                                        <p class="transit-depot-txt">入库</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>

        <!--中转库弹窗-->
        <section class="transit-depot-popup" style="display:none;">
            <!--入库弹窗-->
            <div class="storage-popup-out" style="display:none;">
                <div class="storage-popup-info">
                    <div class="storage-popup-txt">
                        <p class="storage-popup-name">奇瑞 艾瑞泽</p>
                        <p class="storage-popup-color">闪光黑/黑色内饰</p>
                    </div>
                    <p class="storage-popup-vin">LBGK42E05GY271805</p>
                </div>
                <p class="storage-popup-choose">
                    <span>取消</span>
                    <span class="active">确认入库</span>
                </p>
            </div>
            <!--出库弹窗-->
            <div class="stock-removal-popup-out">
                <div class="stock-removal-popup-title">
                    <p>出库确认</p>
                    <p>输入接车员提供的提车码</p>
                </div>
                <div class="stock-removal-popup-info">
                    <p class="stock-removal-popup-vin">LBGK42E05GY271805</p>
                    <p>奇瑞 艾瑞泽3</p>
                    <p>闪光黑、黑色内饰</p>
                    <input type="text" placeholder="请输入提车码">
                </div>
                <p class="stock-removal-popup-choose">
                    <span>取消</span>
                    <span class="active">确认入库</span>
                </p>
            </div>
        </section>
    </div>
</template>
<script>
    export default{
        name:"storage",
        data(){
            return {
                dealer_name:'',
                auto_wait_in:'',
                auto_wait_out:'',
                auto_in_warehouse:'',
                waitIn:[],
                waitOut:[],
                inWarehouse:[]
            }
        },
        methods:{

        },
        mounted(){
            // dataToken = "b0009324e411c37e6a717a6a7b89b452";
             var dataToken = "bbe214ab570d81dc8b1b6589d86e13d9";
            //var dataToken = sessionStorage.token;
            var data = {
                token:dataToken
            }

            //把时间戳换成时间格式
            function getLocalTime(timestamp) {
                return new Date(parseInt(timestamp) * 1000).toLocaleString().substr(0,17)
            }

            //中转库接口
            this.$http({
                url:"dealer/warehouse/index",
                methods:"GET",
                params:data
            }).then(function(response){
                console.log(response);
                this.dealer_name = response.body.data.base.name;
                this.auto_wait_in = response.body.data.base.list[0];
                this.auto_wait_out = response.body.data.base.list[1];
                this.auto_in_warehouse = response.body.data.base.list[2];
                this.waitIn = response.body.data.waitIn;
                this.waitOut = response.body.data.waitOut;
                this.inWarehouse = response.body.data.inWarehouse;
                for (var i = 0; i < this.inWarehouse.length;i++) {
                    this.inWarehouse[i].add_warehouse_time =  getLocalTime(this.inWarehouse[i].add_time)
                }
            })
        }
    }
</script>
<style>
    /*我的-中转库-头部*/
    .brand-header-out{position:relative;z-index:3;}
    .brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;}
    .brand-left-cion{float:left;margin-left:.4666rem;margin-top:.4rem;}

    /*中转库-信息*/
    .transit-depot-info{padding:.533rem .4rem 0 .4rem;background-color:#fff;}
    .transit-depot-address{margin-bottom:.1333rem;font-size:.4rem;color:#2c2c2c;}
    .transit-depot-top{padding-bottom:.5333rem;}
    .transit-depot-top li{float:left;margin-right:.53333rem;font-size:.3467rem;color:#999;}
    .transit-depot-top li span{margin-right:.1333rem;}
    .transit-depot-con{margin-top:.4rem;background-color:#fff;}
    .transit-depot-status{height:1.1733rem;padding-left:.4rem;line-height:1.1733rem;font-size:.4rem;font-weight:600;color:#2c2c2c;border-bottom:1px solid #2c2c2c;}
    .transit-depot-list{padding:0 .4rem .533rem .4rem;}
    .transit-depot-list li{position:relative;margin-top:.533rem;border-bottom:1px solid #e6e6e6;}
    .transit-depot-vin{margin-bottom:.4rem;font-size:.4rem;font-weight:600;color:#2c2c2c;}
    .transit-depot-txt p{width:5.867rem;font-size:.3733rem;color:#999;}
    .transit-depot-txt .transit-depot-color{margin-top:.4rem;margin-bottom:.5333rem;font-size:.3467rem;color:#999;}
    .transit-depot-message{height:.9067rem;line-height:.5333rem;}
    .transit-depot-state{position:absolute;bottom:.53rem;right:0;}
    .transit-depot-state input{width: 2.6666rem;  height: 1.0667rem;font-size:.3733rem;line-height:1.067rem;text-align:center;border-radius:.5333rem;background-color:white;}
    .transit-depot-storage{color:#bb8800;border:1px solid #bb8800;}
    .transit-depot-stock-removal{color:#6aa3e4;border:1px solid #6aa3e4;}
    .transit-depot-state p{display:block;padding-right:.4rem;text-align:right;color:#999;font-size:.3467rem;}
    .transit-depot-txt{margin-top:.1333rem;}

    /*中转库遮罩*/
    .transit-depot-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}


    /*入库弹窗*/
    .storage-popup-out{position:absolute;top:50%;left:50%;overflow:hidden;width:7.2rem;padding-top: .533rem;border-radius: .2666rem;transform: translate(-50%,-50%);background-color:#fff;}
    .storage-popup-info{padding: 0 1.067rem 1.067rem 1.067rem;}
    .storage-popup-txt{padding-bottom:.4rem;border-bottom:1px solid #2c2c2c;}
    .storage-popup-name{font-size:.4267rem;color:#2c2c2c;text-align:center;}
    .storage-popup-color{margin-top:.267rem;font-size:.32rem;color:#999;text-align:center;}
    .storage-popup-vin{margin-top:.4rem;font-size:.3467rem;color:#d6ab55;text-align:center;}
    .storage-popup-choose{width: 100%;  height: 1.173rem;}
    .storage-popup-choose span{display: block;  float: left;  width: 50%;  text-align: center;  line-height: 1.173rem;  font-size: .4533rem;  color: #2c2c2c;  background-color: #f5f5f5;}
    .storage-popup-choose span.active{color: #fff;background-color: #d5aa5c;}

    /*出库弹窗*/
    .stock-removal-popup-out{position:absolute;top:50%;left:50%;overflow:hidden;width:7.2rem;padding-top: .533rem;border-radius: .2666rem;transform: translate(-50%,-50%);background-color:#fff;}
    .stock-removal-popup-title{padding-left:.533rem;padding-bottom:.533rem;border-bottom:#e6e6e6;}
    .stock-removal-popup-title p:first-child{font-size:.4533rem;color:#2c2c2c;}
    .stock-removal-popup-title p:nth-child(2){margin-top:.2rem;font-size:.3467rem;color:#2c2c2c;}
    .stock-removal-popup-info{text-align:center;padding-top:1.067rem;}
    .stock-removal-popup-info p:first-child{font-size:.4533rem;color:#d5aa5c;}
    .stock-removal-popup-info p:nth-child(2){margin-top:.4rem;font-size:.4267rem;color:#2c2c2c;}
    .stock-removal-popup-info p:nth-child(3){margin-top:.2rem;font-size:.32rem;color:#999;}
    .stock-removal-popup-info input{display:block;width:5.867rem;height:1.067rem;padding-left:.2667rem;margin:1.0667rem auto 0;background-color:none;border:1px solid #e6e6e6;}
    .stock-removal-popup-choose{margin-top:.4rem;width: 100%;  height: 1.173rem;}
    .stock-removal-popup-choose span{display: block;  float: left;  width: 50%;  text-align: center;  line-height: 1.173rem;  font-size: .4533rem;  color: #2c2c2c;  background-color: #f5f5f5;}
    .stock-removal-popup-choose span.active{color: #fff;background-color: #d5aa5c;}
</style>