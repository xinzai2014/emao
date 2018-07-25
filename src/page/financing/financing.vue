<template>
    <div id="financing">
        <div id="scrollbox" @touchmove="cancelkey" class="form-scroll-box">
            <keep-alive>
                <city  v-show="showCity" @closeCity="closeDialogCity" :defaultCityData="defaultCityData" :showCity="showCity"></city>
            </keep-alive>
            <div class="tip">
                <p class="tip-p">申请融资购车、完善以下信息</p>
                <span>带*为必填项</span>
            </div>
            <div class="form-box">
                <p class="form-box-title">联系人</p>
                <div class="form-box-item">
                    <p class="item-name">
                        <span :style="{'color':financingInfo.name.trim() ? '#000':'red'}">*</span>
                        <span>姓名：</span>
                    </p>
                    <input type="text" placeholder="请填写姓名" v-model="financingInfo.name">
                </div>
                <div class="form-box-item">
                    <p>
                        <span :style="{'color':financingInfo.phone.trim() ? '#000':'red'}">*</span>
                        <span>联系方式：</span>
                    </p>
                    <input type="text" placeholder="请填写联系方式" v-model="financingInfo.phone">
                </div>
            </div>
            <div class="form-box">
                <p class="form-box-title">车源方</p>
                <div class="form-box-item">
                    <p class="item-name">
                        <span :style="{'color':financingInfo.carname.trim() ? '#000':'red'}">*</span>
                        <span>姓名：</span>
                    </p>
                    <input type="text" placeholder="请填写姓名" v-model="financingInfo.carname">
                </div>
                <div class="form-box-item">
                    <p>
                        <span :style="{'color':financingInfo.carphone.trim() ? '#000':'red'}">*</span>
                        <span>联系方式：</span>
                    </p>
                    <input type="text" placeholder="请填写联系方式" v-model="financingInfo.carphone">
                </div>
                <div class="form-box-item">
                    <p>
                        <span :style="{'color':financingInfo.city.trim() ? '#000':'red'}">*</span>
                        <span>城市：</span>
                    </p>
                    <p class="input" @click="getDialogCity"><span style="color: #b7b7b7;" v-if="!financingInfo.city">请选择城市</span>{{financingInfo.city}}</p>
                </div>
                <div class="shopname-item">
                    <p>
                        <span :style="{'color':financingInfo.shopname.trim() ? '#000':'red'}">*</span>
                        <span>店名：</span>
                    </p>
                    <textarea @click="getPage" type="text" placeholder="请填写提供车源的店名" v-model="financingInfo.shopname"></textarea>
                </div>
            </div>
            <div class="form-box">
                <p class="form-box-title">车型信息</p>
                <div class="shopname-item">
                    <p class="item-name">
                        <span :style="{'color':financingInfo.car.trim() ? '#000':'red'}">*</span>
                        <span>车型：</span>
                    </p>
                    <textarea type="text" placeholder="如：帕萨特 2017款 280TSI DSG 尊荣版" v-model="financingInfo.car"></textarea>
                </div>
                <div class="shopname-item">
                    <p>
                        <span :style="{'color':financingInfo.color.trim() ? '#000':'red'}">*</span>
                        <span>颜色：</span>
                    </p>
                    <textarea type="text" placeholder="如：金黑/深色内饰" v-model="financingInfo.color"></textarea>
                </div>
                <div class="form-box-item">
                    <p>
                        <span :style="{'color':financingInfo.num.trim() ? '#000':'red'}">*</span>
                        <span>台数：</span>
                    </p>
                    <input type="text" placeholder="请填写台数" v-model="financingInfo.num">台
                </div>
                <div class="form-box-item">
                    <p>
                        <span :style="{'color':financingInfo.money.trim() ? '#000':'red'}">*</span>
                        <span>金额：</span>
                    </p>
                    <input type="text" placeholder="请填写所需金额" v-model="financingInfo.money">元
                </div>
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
</template>

<script>
import city from '../../components/common/city/city'
import alertTip from '../../components/common/alertTip/alertTip'
export default {
    name: 'financing',
    data () {
        return {
            showCity: false,
            defaultCityData: [], //初始化城市默认数据
            postCityData: null, //城市提交数据
            citydata: {
                province_id: '',
                province_name: '',
                city_id: '',
                city_name: '',
                district_id: '',
                district_name: '',
            },
            financingInfo: {
                id: '0', // 经销商id
                name: '', // 姓名
                phone: '', // 联系方式
                carname: '',
                carphone: '',
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
        cancelkey () {
            // var screenHeight = document.getElementById("financing").offsetHeight;
            // var scrollbox = document.getElementById("scrollbox")
            // var height = scrollbox.scrollTop
            // console.log("screenHeight", screenHeight)
            // console.log("height", height)
            // if (height > screenHeight) {
            //     console.log('取消键盘')
            //     console.log('a')
            // }
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
        // 获取用户点击input的位置
        getPage (e) {
            var halfHeight = window.screen.height / 2;
            var screenPos = e.screenY;
            console.log(halfHeight)
            console.log(e.screenY)
            if (screenPos > halfHeight) {
                console.log('盒子上移')
            }
        },
        // 判断用户当前操作系统是否为Android
        isAndroid () {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                return true
            }
        },
        // token获取，页面初始化数据
        getData () {
            var token = this.$route.query.token;
            this.$http({
                url:"dealerInfo/info",
                method:"GET",
                params:{
                    token: token,
                }
            }).then(function (response) {
                this.financingInfo.id = response.data.data.id
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
            };
        },
        // 提交表单并校验
        suresub (buttonType) {
            console.log("提交表单")
            // 按钮监测
            this.addFn(buttonType)
            var flag = false;
            for (var key in this.financingInfo) {
                if (this.financingInfo[key].trim() === '') {
                    if (key == 'name') {
                        this.toast("请填写姓名")
                        return false
                    } else if (key == 'phone') {
                        this.toast("请填写联系方式")
                        return false
                    }
                     else if (key == 'carname') {
                        this.toast("请填写姓名")
                        return false
                    }
                     else if (key == 'carphone') {
                        this.toast("请填写联系方式")
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
                    else if (key == 'num') {
                        this.toast("请填写台数，只允许填写大于0的正整数")
                        return false
                    }
                    else if (key == 'money') {
                        this.toast("请填写所需金额，只允许填写大于0的数")
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
                    this.toast("请填写正确的手机号或电话号码")
                    return false
                } else if (!numreg.test(this.financingInfo.num)) {
                    this.toast('请填写台数，只允许填写大于0的正整数')
                    return false
                } else if (!moneyreg.test(this.financingInfo.money)) {
                    this.toast('请填写所需金额，只允许填写大于0的数')
                    return false
                } else {
                    console.log('数据校验正确，走接口提交数据')
                    this.postFormInfo()
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
            var token = this.$route.query.token;
            var params = {
                token: token,
                openPage: '1',
                extendType: '5',
                projectType: buttonType
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
        postFormInfo () {
            console.log(this.financingInfo)
            var params = {
                zt_id: "246",
                name: this.financingInfo.name,
                phone: this.financingInfo.phone,
                auto_name: this.financingInfo.car,
                other: {
                    "dealer_id": this.financingInfo.id,
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
            }
            this.$http({
                url:"https://zt.m.emao.com/manage/addapply",
                method:"POST",
                params: params
            }).then(function (response) {
                console.log(response.data.submitStatus)
                if (response.data.submitStatus == 0) {
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
        this.cancelkey()
    },
    mounted () {
        // sessionStorage.token = 'c9ed53c8ad5487d7aa69fd836fb43727';
        sessionStorage.token = this.$route.query.token;
        this.cancelkey()
    },
    components:{
        city,
        alertTip
    }
}
</script>

<style scoped>
#financing {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: auto;
}
.pos-bottom {
    position: absolute;
    bottom: 0;
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
    line-height: 1.44rem;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
}
.shopname-item {
    height: 1.44rem;
    width: 100%;
    display: flex;
    padding-top: 0.5rem;
    box-sizing: border-box;
}
.shopname-item textarea {
    flex: 1;
    border: none;
    outline: none;
    resize:none;
    /* background: pink; */
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-bottom: 0.2rem;
    box-sizing: border-box;
    color: #000;
}
.form-box-item>input, .input {
    line-height: 1.4rem;
    flex: 1;
    border: none;
    outline: none;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    color: #000;
}
.form-box-item ::-webkit-input-placeholder { /* WebKit browsers */
    color: #b7b7b7;
}
.form-box-item:last-child {
    border-bottom: 0;
}
.item-name {
    display: inline-block;
}
</style>

