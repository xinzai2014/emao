<template>
<div>
    <keep-alive>
        <city  v-show="showCity" @closeCity="closeDialogCity" :token="tokenData" :defaultCityData="defaultCityData" :showCity="showCity"></city>
    </keep-alive>
    <div id="financing" @touchmove="cancelkey">
        <div class="tip">
            <p class="tip-p">申请融资购车，完善以下信息</p>
            <span>带<span class="red">*</span>为必填项</span>
        </div>
        <div class="form-box">
            <p class="form-box-title">申请人</p>
            <div class="form-box-item">
                <p class="item-name">
                    <span class="red">*</span>
                    <span>姓名：</span>
                </p>
                <input type="text" placeholder="请填写姓名" v-model="financingInfo.name">
            </div>
            <div class="form-box-item">
                <p class="item-name">
                    <span class="red">*</span>
                    <span>联系方式：</span>
                </p>
                <input type="tel" maxlength="11" placeholder="请填写联系方式" v-model="financingInfo.phone">
            </div>
        </div>
        <div class="form-box">
            <p class="form-box-title">车源方</p>
            <div class="form-box-item">
                <p class="item-name">
                    <span class="red">*</span>
                    <span>姓名：</span>
                </p>
                <input type="text" placeholder="请填写姓名" v-model="financingInfo.carname">
            </div>
            <div class="form-box-item">
                <p class="item-name">
                    <span class="red">*</span>
                    <span>联系方式：</span>
                </p>
                <input type="tel" maxlength="11" @blur="blur" placeholder="请填写联系方式" v-model="financingInfo.carphone">
            </div>
            <div class="form-box-item">
                <p class="item-name">
                    <span class="red">*</span>
                    <span>城市：</span>
                </p>
                <p class="input" @click="getDialogCity"><span style="color: #b7b7b7;" v-if="!financingInfo.city">请选择城市</span>{{financingInfo.city}}</p>
            </div>
            <div class="shopname-item">
                <p class="shop-name">
                    <span class="red">*</span>
                    <span>店名：</span>
                </p>
                <textarea type="text" @click="focus" @blur="blur" placeholder="请填写提供车源的店名" v-model="financingInfo.shopname"></textarea>
            </div>
        </div>
        <div class="form-box">
            <p class="form-box-title">车型信息</p>
            <div class="shopname-item">
                <p class="shop-name">
                    <span class="red">*</span>
                    <span>车型：</span>
                </p>
                <textarea type="text" @click="focus" @blur="blur" placeholder="如：帕萨特 2017款 280TSI DSG 尊荣版" v-model="financingInfo.car"></textarea>
            </div>
            <div class="shopname-item">
                <p class="shop-name">
                    <span class="red">*</span>
                    <span>颜色：</span>
                </p>
                <textarea type="text" @click="focus" @blur="blur" placeholder="如：金黑/深色内饰" v-model="financingInfo.color"></textarea>
            </div>
            <div class="form-box-item">
                <p class="item-name">
                    <span class="red">*</span>
                    <span>台数：</span>
                </p>
                <input type="number" @click="focus" @blur="blur" placeholder="请填写台数" v-model="financingInfo.num">台
            </div>
            <div class="form-box-item">
                <p class="item-name">
                    <span class="red">*</span>
                    <span>金额：</span>
                </p>
                <input @click="focus" @blur="blur" type="number" placeholder="请填写所需金额，单位元，如：129800" v-model="financingInfo.money">元
            </div>
        </div>
        <div class="pos-bottom">
            <div class="surebtn" @click="suresub('6')">确认提交</div>
            <p class="telephone">
                <span>客服电话:</span>
                <a style="color:#d5aa5c" href="tel:4000133918" @click="addFn('7')">400-013-3918</a>
            </p>
        </div>
    </div>
</div>
    
</template>

<script>
import city from '../../components/common/city/city'
import alertTip from '../../components/common/alertTip/alertTip'
export default {
    name: 'financing',
    data () {
        return {
            tokenData: '',
            showCity: false,
            defaultCityData: [], //初始化城市默认数据
            postCityData: null, //城市提交数据
            id: '0', // 经销商id
            dealername: '', // 经销商姓名
            cityname: '', // 经销商城市
            autoId: '', // 车型id
            citydata: {
                province_id: '',
                province_name: '',
                city_id: '',
                city_name: '',
                district_id: '',
                district_name: '',
            },
            financingInfo: {
                name: '', // 姓名
                phone: '', // 联系方式
                carname: '', // 车源方姓名
                carphone: '', // 车源方电话
                city: '', // 选择城市
                shopname: '', // 店铺名字
                car: '', // 车型
                color: '', // 颜色
                num: '', // 台数
                money: '' // 金额
            }
        }
    },
    methods: {
        /*向App传值*/
        tcmApp(obj) {
            //emaoAppObject 是 native 向 WebView 注册的用来响应 JS 消息的对象
            //向 native 发送消息（TODO:具体使用中可根据 navigator.userAgent 中的信息来判断系统类型，在不同的系统中分别调用下面对应的代码）
            //或者由服务器判断响应不同的平台脚本
            if (navigator.userAgent.indexOf("iPhone") > 0) {
                window.webkit.messageHandlers.tcmAppObject.postMessage(obj); //向 iOS 发送消息，Android 无效
            } else {
                window.tcmAppObject.postMessage(JSON.stringify(obj)); //向 Android 发送消息，iOS 无效
            }
        },
        // 页面加载时取消右上角分享按钮
        hideShareButton() {
            var obj = {
                actionname:"hideShareButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
                actionid:"",//回调 ID：可选参数，与回调函数配套使用
                callback:""//回调函数：可选参数，native 处理完该消息之后回调 JS 的函数
            };
            this.tcmApp(obj);
        },
        // 手指滑动dom时，键盘抬起取消
        cancelkey () {
            // console.log('手指滑动屏幕了')
            var input = document.getElementsByTagName("input")
            for (var i = 0; i < input.length; i++) {
                input[i].blur()
                // console.log('键盘抬起消失')
            }
            var textarea = document.getElementsByTagName("textarea")
            for (var i = 0; i < textarea.length; i++) {
                textarea[i].blur()
                // console.log('键盘抬起消失')
            }
        },
        focus (e) {
            // 判断用户操作是否为Android
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                let halfHeight = e.pageY / 2;
                let domHeight = e.y;
                let transformHeight = domHeight > halfHeight ? domHeight - halfHeight : 0;
                var financing = document.getElementById("financing");
                console.log(domHeight > halfHeight)
                if (domHeight > halfHeight) {
                    financing.style.transform = `translateY(-${transformHeight + 60}px)`
                }
            }
        },
        blur (e) {
            var financing = document.getElementById("financing");
            financing.style.transform = `translateY(0px)`
        },
        // token获取，页面初始化数据
        getData () {
            var token = this.$route.query.token;
            console.log('url颜色', this.$route.query.color)
            if (this.$route.query.color == '') {
                this.financingInfo.color = ''
            } else if (this.$route.query.color) {
                this.financingInfo.color = this.$route.query.color;
            }
            this.autoId = this.$route.query.autoId;
            console.log('url车型id', this.autoId)
            console.log('url车型', this.$route.query.autoName)
            if (this.$route.query.autoName == '') {
                this.financingInfo.car = ''
            }
            this.financingInfo.car = this.$route.query.autoName;
            console.log('url市名', this.$route.query.cityName)
            var cityname = this.$route.query.cityName;
            console.log('url省名', this.$route.query.provinceName)
            var provincename = this.$route.query.provinceName;
            console.log(typeof cityname)
            if (cityname == '' && provincename == '' ) {
                this.financingInfo.city = ''
            } else if (cityname && provincename) {
                this.financingInfo.city = provincename + '/' + cityname
            }
            this.$http({
                url:"dealerInfo/info",
                method:"GET",
                params:{
                    token: token,
                }
            }).then(function (response) {
                this.id = response.data.data.id
                this.dealername = response.data.data.name
                this.cityname = response.data.data.city_name
                this.financingInfo.name = response.data.data.link_name
                this.financingInfo.phone = response.data.data.link_phone
            }).catch(function (error) {
                console.log(error)
            });
        },
        // 展示城市控件
        getDialogCity(){
            this.showCity = true;
        },
        // 关闭城市控件
        closeDialogCity(postData){
            if(arguments.length == 0){ //无回传数据
                this.showCity = false;
            }else{
                this.postCityData = postData;
                // 获取省id、名称并赋值
                this.citydata.province_id = postData.provinceData["id"]
                this.citydata.province_name = postData.provinceData["name"]
                // 获取市id、名称并赋值
                this.citydata.city_id = postData.cityData["id"]
                this.citydata.city_name = postData.cityData["name"]
                // 获取县id、名称并赋值
                this.citydata.district_id = postData.areaData["id"]
                this.citydata.district_name = postData.areaData["name"]
                // 表单选择区域展示文字
                this.financingInfo.city = postData.provinceData["name"] + '/' + postData.cityData["name"] + '/' + postData.areaData["name"]
                console.log(this.financingInfo.city)
            };
        },
        // 提交表单并校验
        suresub (buttonType) {
            // 按钮监测
            var flag = false;
            for (var key in this.financingInfo) {
                console.log('台数')
                console.log(this.financingInfo.num)
                if (this.financingInfo[key].trim() === '') {
                    console.log(key + '没填')
                    if (key == 'name') {
                        this.toast("请填写申请人的姓名")
                        return false
                    } else if (key == 'phone') {
                        this.toast("请填写申请人的联系方式")
                        return false
                    }
                     else if (key == 'carname') {
                        this.toast("请填写车源方的姓名")
                        return false
                    }
                     else if (key == 'carphone') {
                        this.toast("请填写车源方的联系方式")
                        return false
                    }
                     else if (key == 'city') {
                        this.toast("请选择城市")
                        return false
                    }
                    else if (key == 'shopname') {
                        this.toast("请填写提供车源的店名")
                        return false
                    }
                    else if (key == 'car') {
                        this.toast("请填写车型")
                        return false
                    }
                    else if (key == 'color') {
                        this.toast("请填写颜色")
                        return false
                    }
                    else if (key == 'num') {
                        this.toast("请填写正确的台数")
                        return false
                    }
                    else if (key == 'money') {
                        this.toast("请填写正确的金额")
                        return false
                    }
                    flag = true
                }
            }
            if (!flag) {
                var phonereg = /^1[3|4|5|7|8][0-9]{9}$/;
                var numreg = /^[1-9]\d*$/;
                var moneyreg = /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;
                if (!phonereg.test(this.financingInfo.phone)) {
                    this.toast("请填写正确的申请人手机号")
                    return false
                } else if (!phonereg.test(this.financingInfo.carphone)) {
                    this.toast("请填写正确的车源方手机号")
                    return false
                } else if (!numreg.test(this.financingInfo.num)) {
                    console.log('请填写正确的台数')
                    this.toast('请填写正确的台数')
                    return false
                } else if (!moneyreg.test(this.financingInfo.money)) {
                    this.toast('请填写正确的金额')
                    return false
                } else if (this.financingInfo.money < 50000) {
                    this.toast('申请金额不能小于50000元')
                    return false
                } else {
                    console.log('数据校验正确，走接口提交数据')
                    this.postFormInfo(buttonType)
                }
            }
        },
        // 校验提示
        toast (content) {
            this.$store.dispatch("ALERT", // 通过store传值
                {
                    flag: true,
                    text: content
                }
            )
        },
        // 添加监测
        addFn (buttonType) {
            console.log('统计')
            var token = this.$route.query.token;
            var extendType = this.$route.query.extendType; // 来源
            var autoId = this.$route.query.autoId; // 车型id
            var autoSourceId = this.$route.query.autoSourceId; // 车源id
            var activityId = this.$route.query.activityId; // 活动id
            var extend;
            console.log("autoSourceId", autoSourceId)
            console.log("activityId", activityId)
            if (autoSourceId) {
                extend = autoSourceId
            } else if (activityId) {
                extend = activityId
            }
            console.log('extend', extend)
            var params = {
                token: token,
                openPage: '1',
                autoId: autoId,
                extend: extend,
                extendType: extendType,  
                projectType: buttonType,
                noLoading: true
            }
            this.$http({
                url:"finance/appBrowseBlog",
                method:"POST",
                params: params
            }).then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            });
        },
        // 提交数据
        postFormInfo (buttonType) {
            // console.log(this.financingInfo)
            var other = {
                "dealer_id": this.id,
                "dealer_name": this.dealername,
                "dealer_city_name": this.cityname,
                "source_name": this.financingInfo.carname,
                "source_phone": this.financingInfo.carphone,
                "province_id": this.citydata.province_id,
                "province_name": this.citydata.province_name,
                "city_id": this.citydata.city_id,
                "city_name": this.citydata.city_name,
                "district_id": this.citydata.district_id,
                "district_name": this.citydata.district_name,
                "shop_name": this.financingInfo.shopname,
                "color": this.financingInfo.color,
                "number": this.financingInfo.num,
                "price": this.financingInfo.money
            }
            var params = {
                zt_name: "融资购车",
                zt_id: "246",
                name: this.financingInfo.name,
                phone: this.financingInfo.phone,
                auto_id: this.autoId,
                auto_name: this.financingInfo.car,
                other: JSON.stringify(other)
            }
            this.$http({
                url:"https://zt.m.emao.com/manage/addapply",
                method:"POST",
                params: params
            }).then(function (response) {
                console.log('成功！！！')
                console.log(response.data.submitStatus)
                if (response.data.submitStatus == 0) {
                    this.addFn(buttonType)
                    this.$router.push({path: '/financing/subsuccess', query: {token: this.$route.query.token}}); //跳转提交成功页面
                }
            }).catch(function (error) {
                console.log(error)
            });
        }
    },
    created () {
        document.title = "融资购车"
        this.getData()
        this.hideShareButton()
        this.addFn('5')
        this.tokenData = this.$route.query.token;
    },
    mounted () {
        sessionStorage.token = this.$route.query.token;
        console.log('页面', sessionStorage.token)
    },
    components:{
        city,
        alertTip
    }
}
</script>

<style scoped>

#financing {
    transition: all .5s;
}
.pos-bottom {
    width: 100%;
    height: 3rem;
    background: #fff;
    padding: 0.42667rem 0.53333rem 0.53333rem 0.53333rem;
    box-sizing: border-box;
}
.surebtn {
    width: 100%;
    height: 1.17333rem;
    background: #ffc900;
    line-height: 1.17333rem;
    border-radius: 0.54333rem;
    text-align: center;
    font-size: 0.41333rem;
    color: #000;
}
.telephone {
    padding-top: 0.65333rem;
    text-align: center;
    font-size: 0.29333rem;
}
.telephone span {
    color: #999;
}
.form-scroll-box {
    position: absolute;
    top: 0;
    bottom: 3rem;
    width: 100%;
    overflow: scroll;
}
.tip {
    width: 100%;
    height: 1.6rem;
    background: #f2e1c4;
    text-align: center;
    padding: 0.33333rem;
    box-sizing: border-box;
}
.tip p {
    font-size: 0.4rem;
    padding-bottom: 0.06777rem;
}
.tip span {
    font-size: 0.33333rem;
}

.form-box {
    margin-bottom: 0.26667rem;
    padding: 0 0.53333rem;
    box-sizing: border-box;
    background: #fff;
}
.form-box-title {
    line-height: 1.30666rem;
    font-size: 0.4rem;
    font-weight: 700;
}


.form-box-item {
    height: 1.44rem;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}


.shopname-item {
    min-height: 1.8rem;
    padding-top: 0.4rem;
    padding-bottom: 0.2rem;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #e0e0e0;
}
.shopname-item textarea {
    caret-color:blue;
    padding: 0 .2rem;
    flex: 1;
    border: none;
    outline: none;
    resize:none;
    box-sizing: border-box;
    color: #000;
    font-size: .38rem;
    line-height: .53333rem;
}
.shop-name {
    font-size: .38rem
}


.item-name {
    display: inline-block;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: .38rem
}
.form-box-item>input, .input {
    caret-color:blue;
    height: .7rem;
    line-height: .7rem;
    flex: 1;
    border: none;
    outline: none;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    color: #000;
    font-size: 0.38rem;
}
.input  {
    font-size: 0.38rem;
}



.shopname-item ::-webkit-input-placeholder { /* WebKit browsers */
    color: #b7b7b7;
    font-size: .38rem;
    line-height: 0.5rem;
}
.form-box-item ::-webkit-input-placeholder { /* WebKit browsers */
    color: #b7b7b7;
    font-size: 0.38rem;
}
.form-box-item:last-child, .shopname-item:last-child {
    border-bottom: 0;
}

.red {
    color: red;
}
</style>
