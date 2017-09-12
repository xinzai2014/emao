<template>
    <div>
        <!--首页-品牌列表-头部-->
        <div class="brand-header-out">
            <header class="brand-list-header">
                <div @click="resetIndex">
                    <i class="white-lt brand-left-cion"></i>
                    <strong class="brand-list-title">中转库管理</strong>
                </div>
            </header>
        </div>

        <div v-if="waitIn.length || waitOut.length || inWarehouse.length">
            <!--车辆信息-->
            <section class="transit-depot-info">
                <p class="transit-depot-address">{{dealer_name}}</p>
                <ul class="transit-depot-top clearfix">
                    <li>
                        <span>{{waitIn.length}}台等待入库</span>
                    </li>
                    <li>
                        <span>{{waitOut.length}}台等待出库</span>
                    </li>
                    <li>
                        <span>{{inWarehouse.length}}台在库</span>
                    </li>
                </ul>
            </section>

            <!--中转库的不同状态-->
            <section class="transit-depot-con">
                <ul>
                    <li v-if="waitIn.length">
                        <p class="transit-depot-status">等待入库</p>
                        <div class="transit-depot-in">
                            <ul class="transit-depot-list">
                                <li v-for="(item,index) in waitIn">
                                    <p class="transit-depot-vin">VIN: <span>{{item.vin_num}}</span></p>
                                    <div class="transit-depot-txt">
                                        <p class="transit-depot-message">{{item.brand_name}}{{item.serie_name}}{{item.year}}款{{item.auto_name}} </p>
                                        <p class="transit-depot-color">{{item.ext_color}}/{{item.int_color}}</p>
                                        <div class="transit-depot-state">
                                            <input class="transit-depot-storage transit-depot-btn" type="button" name="" value="确认入库"  @click="showInPopup(item.vin_num,index)">
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li v-if="waitOut.length">
                        <p class="transit-depot-status">等待出库</p>
                        <div class="transit-depot-in">
                            <ul class="transit-depot-list">
                                <li v-for="(item,index) in waitOut">
                                    <p class="transit-depot-vin">VIN: <span>{{item.vin_num}}</span></p>
                                    <div class="transit-depot-txt">
                                        <p class="transit-depot-message">{{item.brand_name}}{{item.serie_name}}{{item.year}}款{{item.auto_name}}</p>
                                        <p class="transit-depot-color">{{item.ext_color}}/{{item.int_color}}</p>
                                        <div class="transit-depot-state">
                                            <input class="transit-depot-stock-removal transit-depot-btn" type="button" name="" value="确认出库" @click="showOutPopup(item.vin_num,index)">
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li v-if="inWarehouse.length">
                        <p class="transit-depot-status">在库</p>
                        <div class="transit-depot-in">
                            <ul class="transit-depot-list">
                                <li v-for="item in inWarehouse">
                                    <p class="transit-depot-vin">VIN: <span>{{item.vin_num}}</span></p>
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

            <!--中转库入库弹窗-->
            <section class="transit-depot-popup" :class="{dialogBack:showInPopupStatus}" v-if="showInPopupStatus">
                <!--入库弹窗-->
                <div class="storage-popup-out" :class="{dialogShow:showInPopupStatus}">
                    <div class="storage-popup-info">
                        <div class="storage-popup-txt">
                            <p class="storage-popup-name">{{inPopupData.brand_name}}&nbsp {{inPopupData.serie_name}}</p>
                            <p class="storage-popup-color">{{inPopupData.ext_color}}/{{inPopupData.int_color}}</p>
                        </div>
                        <p class="storage-popup-vin">{{inPopupData.vin_num}}</p>
                    </div>
                    <div class="storage-popup-vehicle-accessories">
                        <p>请确认随车附件：</p>
                        <div>{{inPopupData.part_text}}</div>
                    </div>
                    <div class="error-tips">{{inErrorTips}}</div>
                    <p class="storage-popup-choose">
                        <span @click="closeInPopup">取消</span>
                        <span class="active" @click="confirmIn()">确认入库</span>
                    </p>
                </div>
            </section>

            <!--中转库出库弹窗-->
            <section class="transit-depot-popup" :class="{dialogBack:showOutPopupStatus}" v-if="showOutPopupStatus">
                <!--出库弹窗-->
                <div class="stock-removal-popup-out" :class="{dialogShow:showOutPopupStatus}">
                    <div class="stock-removal-popup-title">
                        <p>出库确认</p>
                        <p>输入接车员提供的提车码</p>
                    </div>
                    <div class="stock-removal-popup-info">
                        <div class="stock-removal-con">
                            <p class="stock-removal-popup-vin">{{outPopupData.vin_num}}</p>
                            <p>{{outPopupData.brand_name}}&nbsp{{outPopupData.serie_name}}</p>
                            <p>{{outPopupData.ext_color}}/{{outPopupData.int_color}}</p>
                        </div>
                        <div class="vehicle-accessories-popup-info">
                            <p>请确认随车附件：</p>
                            <div>{{outPopupData.part_text}}</div>
                        </div>
                        <!--<input type="text" placeholder="请输入提车码" v-model="outCode">-->
                    </div>

                    <div class="error-tips">{{outErrorTips}}</div>
                    <p class="stock-removal-popup-choose">
                        <span @click="closeOutPopup">取消</span>
                        <span class="active" @click="confirmOut()"><!--验证-->确认出库</span>
                    </p>
                </div>
            </section>
        </div>

        <div class="no-auto server-no-response" v-else="">
            <img src="../../assets/no-vehicles-sold-news.png" alt="">
            <p>暂无车辆</p>
        </div>


        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>

    </div>
</template>
<script>
    import alertTip from '../../components/common/alertTip/alertTip';
    export default{
        name:"storage",
        data(){
            return {
                dealer_name:'',//经销商名称
                auto_wait_in:'',//等待入库数量
                auto_wait_out:'',//等待出库数量
                auto_in_warehouse:'',//在库数量
                outCode: '',//提车码
                code:'',
                vinNum:'',//车架号
                inErrorTips:'',//入库弹窗信息提示
                outErrorTips:'',//出库弹窗信息提示
                showInPopupStatus:false,//入库弹窗显示与否
                showOutPopupStatus:false,//出库弹窗显示与否
                showAlert:false,//错误提示显示与否
                alertText:null,//错误内容
                currentInIndex:null,  //当前的索引
                currentOutIndex:null,  //当前的索引
                waitIn:[],//等待入库车辆信息
                waitOut:[],//等待出库车辆信息
                inWarehouse:[],//在库车辆信息
                //确定入库接口参数
                itemIn:{
                    token:sessionStorage.token, //token
                    vin_num : '' //车架码
                },
                //确定出库参数接口
                itemOut:{
                    token:sessionStorage.token, //token
                    vin_num : '', //车架码
                    //code:'' //提车码
                },
                inPopupData:{},//入库弹窗信息
                outPopupData:{}//出库弹窗信息
            }
        },
        methods:{
            //回到上一级
            resetIndex(){
                this.$router.go(-1);
            },
            //中转库接口
            getStorageData(){
                var dataToken = sessionStorage.token;
                var data = {
                    token:dataToken
                };
                this.$http({
                    url:"dealer/warehouse/index",
                    methods:"GET",
                    params:data
                }).then(function(response){
                    this.dealer_name = response.body.data.base.name;
                    this.auto_wait_in = response.body.data.base.list[0];
                    this.auto_wait_out = response.body.data.base.list[1];
                    this.auto_in_warehouse = response.body.data.base.list[2];
                    this.waitIn = response.body.data.waitIn;
                    this.waitOut = response.body.data.waitOut;
                    this.inWarehouse = response.body.data.inWarehouse;

                    for (var i = 0; i < this.inWarehouse.length;i++) {
                        this.inWarehouse[i].add_warehouse_time =  this.getLocalTime(this.inWarehouse[i].add_time);
                    }
                }).catch(function(error){
                    this.showAlert = true;
                    this.alertText = error.body.msg;

                })
            },

            //显示入库弹窗
            showInPopup(vinNum,index){
                this.currentInIndex = index;
                this.showInPopupStatus = !this.showInPopupStatus;
                this.inPopupData = this.waitIn[index];
            },
            //隐藏入库弹窗
            closeInPopup(){
                this.showInPopupStatus = !this.showInPopupStatus;
                this.inErrorTips = "";
            },

            //显示出库弹窗
            showOutPopup(vinNum,index){
                this.showOutPopupStatus = !this.showOutPopupStatus;
                this.outPopupData = this.waitOut[index];
            },
            //关闭出库弹窗
            closeOutPopup(){
                this.showOutPopupStatus = !this.showOutPopupStatus;
                this.outErrorTips = "";
            },

            //刷新等待入库数据&&在库数据
            flushIndata(){
                this.waitIn[this.currentInIndex].add_time = Date.parse(new Date())/1000;
                this.waitIn[this.currentInIndex].add_warehouse_time =  this.getLocalTime(this.waitIn[this.currentInIndex].add_time);
                var This = this;
                var newIndex = this.inWarehouse.findIndex(function(currentValue,index,arr){
                    return currentValue.id > This.waitIn[This.currentInIndex].id
                });
                newIndex =  (newIndex == -1 ) ? this.inWarehouse.length : newIndex ;
                this.inWarehouse.splice( newIndex ,0, this.waitIn[this.currentInIndex]);
                this.waitIn.splice(this.currentInIndex,1);
            },

            //刷新等待出库数据
            flushOutData(){
                // this.$router.go(0);
                this.waitOut.splice(this.currentOutIndex,1);
            },

            //

            //点击出库弹窗确认按钮
            confirmOut(){
                this.confirmOutData(this.outCode);
            },
            //提交出库的相关信息
            confirmOutData(code){
                //this.itemOut.code = code;
                this.itemOut.vin_num = this.outPopupData.vin_num;
                this.$http.post("dealer/warehouse/confirmOut",this.itemOut).then(function(response){
                    this.showOutPopupStatus = !this.showOutPopupStatus;
                    this.showAlert = true;
                    this.alertText = '车辆出库成功';
                    setTimeout(this.flushOutData,3000);
                }).catch(function(error){
                    this.outErrorTips = error.body.msg;
                });
            },

            //点击入库弹窗确认按钮
            confirmIn(){
                this.confirmInData();
            },
            //提交入库的相关信息



            confirmInData(){
                this.itemIn.vin_num = this.inPopupData.vin_num;
                this.$http.post("dealer/warehouse/confirmIn",this.itemIn).then(function(response){
                    this.showInPopupStatus = !this.showInPopupStatus;
                    this.showAlert = true;
                    this.alertText = '车辆已入库';
                    setTimeout(this.flushIndata,3000);
                }).catch(function(error){
                    this.inErrorTips = error.body.msg;
                })

            },
            //把时间戳换成时间格式
            getLocalTime(timestamp) {
                var date = new Date(parseInt(timestamp) * 1000);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                var second = date.getSeconds();
                month = month < 10 ? ('0' + month) : month;
                day = day < 10 ? ('0' + day) : day;
                hour = hour < 10 ? ('0' + hour) : hour;
                minute = minute < 10 ? ('0' + minute) : minute;
                //return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                return year + '-' + month + '-' + day ;
            }


        },
        mounted(){
            this.getStorageData();
        },
        components:{
            alertTip
        }
    }
</script>
<style>
    /*我的-中转库-头部*/
    .brand-header-out{position:relative;z-index:3;}
    .brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;}

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
    .transit-depot-con .no-data{width:100%;height:100%;padding:4.0rem 0;font-size:.3733rem;text-align:center;background-color:#fff;}

    /*中转库遮罩*/
    .transit-depot-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}


    /*入库弹窗*/
    .storage-popup-out{position:absolute;top:50%;left:50%;overflow:hidden;width:7.2rem;padding-top: .533rem;border-radius: .2666rem;transform: translate(-50%,-50%);background-color:#fff;}
    .storage-popup-info{padding: 0 1.067rem 1.067rem 1.067rem;}
    .storage-popup-txt{padding-bottom:.4rem;border-bottom:1px solid #2c2c2c;}
    .storage-popup-name{font-size:.4267rem;color:#2c2c2c;text-align:center;}
    .storage-popup-color{margin-top:.267rem;font-size:.32rem;color:#999;text-align:center;}
    .storage-popup-vin{margin-top:.4rem;font-size:.3467rem;color:#d6ab55;text-align:center;}
    .storage-popup-vehicle-accessories{margin-top:.533rem;margin-bottom:.1067rem;padding-left: .533rem;}
    .storage-popup-vehicle-accessories p:first-child{font-size:.3467rem;font-weight:600;color:#2c2c2c;}
    .storage-popup-vehicle-accessories div{font-size:.3467rem;color:#2c2c2c;}
    .storage-popup-choose{width: 100%;  height: 1.173rem;}
    .storage-popup-choose span{display: block;  float: left;  width: 50%;  text-align: center;  line-height: 1.173rem;  font-size: .4533rem;  color: #2c2c2c;  background-color: #f5f5f5;}
    .storage-popup-choose span.active{color: #fff;background-color: #d5aa5c;}
    .stock-removal-popup-out .error-tips{text-align:center;font-size:.32rem;color:red;}

    /*出库弹窗*/
    .stock-removal-popup-out{position:absolute;top:50%;left:50%;overflow:hidden;width:7.2rem;padding-top: .533rem;border-radius: .2666rem;transform: translate(-50%,-50%);background-color:#fff;}
    .stock-removal-popup-title{padding-left:.533rem;padding-bottom:.533rem;border-bottom:1px solid #e6e6e6;}
    .stock-removal-popup-title p:first-child{font-size:.4533rem;color:#2c2c2c;}
    .stock-removal-popup-title p:nth-child(2){margin-top:.2rem;font-size:.3467rem;color:#2c2c2c;}
    .stock-removal-popup-info{padding-top:1.067rem;}
    .stock-removal-con p{text-align:center;}
    .stock-removal-popup-info p:first-child{font-size:.4533rem;color:#d5aa5c;}
    .stock-removal-popup-info p:nth-child(2){margin-top:.4rem;font-size:.4267rem;color:#2c2c2c;}
    .stock-removal-popup-info p:nth-child(3){margin-top:.2rem;font-size:.32rem;color:#999;}
    .vehicle-accessories-popup-info{margin-top:1.0667rem;padding-left: .533rem;}
    .vehicle-accessories-popup-info p:first-child{font-size:.3467rem;font-weight:600;color:#2c2c2c;}
    .vehicle-accessories-popup-info div{font-size:.3467rem;color:#2c2c2c;}
    .stock-removal-popup-info input{display:block;width:5.867rem;height:1.067rem;padding-left:.2667rem;margin:.4rem auto 0;background-color:none;border:1px solid #e6e6e6;}
    .stock-removal-popup-choose{margin-top:.4rem;width: 100%;  height: 1.173rem;}
    .stock-removal-popup-choose span{display: block;  float: left;  width: 50%;  text-align: center;  line-height: 1.173rem;  font-size: .4533rem;  color: #2c2c2c;  background-color: #f5f5f5;}
    .stock-removal-popup-choose span.active{color: #fff;background-color: #d5aa5c;}
    .storage-popup-out .error-tips{margin-bottom:.4rem;text-align:center;font-size:.32rem;color:red;}

    /*暂无车辆信息*/
    .no-auto{position: absolute;width: 100%;padding: 4.0rem 0; background-color: #fff;text-align: center;font-size: 0.453333rem;left: 0;height: 100%;}
    .no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
    .no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}

</style>