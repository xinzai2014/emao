<template>
<!--注册认证-->
<div v-if="ajaxLoading" class="fixed-con">
    <header class="brand-list-header header-fixed">
        <i class="white-lt brand-left-cion" @click="showLoginDialog"></i>
        <strong class="brand-list-title">注册认证</strong>
        <a class="auth-tel" href="tel:400-825-2368"></a>
    </header>
    <section class="authen">
        <div class="authen-tit">
            <em>{{welcomeMessage}}</em>
            <span>{{authMessage}}</span>
            <i></i>
        </div>
        <div class="authen-info">
            <p>
                <label>公司名称：</label>
                <input type="text"  v-model="companyName" ref="companyName" placeholder="请输入公司名称" maxlength="40">
            </p>
            <p>
                <label>负责人姓名：</label>
                <input type="text"  v-model="username" ref="username" placeholder="可输入一猫对接人姓名" maxlength="40">
            </p>
            <p>
                <label>联系人电话：</label>
                <input type="text"  v-model="telephone" ref="telephone" placeholder="注册时填写的手机号" maxlength="11">
            </p>
            <p>
                <label>总经理姓名：</label>
                <input type="text"  v-model="managerName" ref="managerName" placeholder="请输入姓名" maxlength="40">
            </p>
            <p>
                <label>总经理电话：</label>
                <input type="text"  v-model="managerTelephone" ref="managerTelephone" placeholder="请输入手机号" maxlength="11">
            </p>
        </div>
        <div class="clear20"></div>
        <div class="authen-info">
            <p @click="getDialogCity">
                <i class="yellow-rt"></i><label>所在区域：</label>
                <em  v-text="location"></em>
            </p>
            <p>
                <label>详细地址：</label>
                <input type="text"  v-model="address" ref="address" placeholder="请输入详细地址" maxlength="40">
            </p>
        </div>
        <div class="clear20"></div>
        <div class="authen-info">
            <!--<p>-->
                <!--<label>主营类型：</label>-->
                <!--<span @click="setActive(item)"  :class="{active:item['flag']}" v-for="(item,index) in manageType">{{item.name}}</span>-->
            <!--</p>-->
            <p>
                <label>感兴趣的产品定位：</label>
            </p>
            <div class="product-positioning">
                <div @click="setActive(item)"  :class="{active:item['flag']}" v-for="(item,index) in manageType" :key="index">
                    <i>{{item.name}}</i>
                    <i>{{item.value}}</i>
                </div>
            </div>



            <div class="authen-limts">
                <span>是否经过厂家品牌授权</span>
                <div class="authen-limts-con">
                    <em v-for="(item,index) in authTag" :class='{active:item.tag}' @click="checkAuthTag(item,index)" :key="index"><i ></i>{{item.text}}</em>
                </div>
            </div>
            <div class="authen-limts-list clearfix" v-if="showAuthBrandList&&authBrandList.length" @click="showBrand = true">
                <dl>
                    <dt>授权品牌</dt>
                    <dt>品牌级别</dt>
                </dl>
                <dl v-for="(item,index) in authBrandList" :key="index">
                    <dd>{{item.name}}</dd>
                    <dd>{{item.text}}</dd>
                </dl>
            </div>
        </div>
        <div class="authen-condition">
            <span>是否具备维修条件</span>
            <div class="authen-condition-nav clearfix">
                <ul>
                    <li v-for="(item,index) in conditions" @click="chooseConditions(item,index)" :class='{"active":item.flag}' :key="index">{{item.text}}</li>
                </ul>
            </div>
            <div class="authen-condition-con clearfix">
                <div class="authen-condition-item" v-show="conditionsIndex === 0">
                    <div class="authen-condition-text">道路经营许可证</div>
                    <uploader :uploadData="uploadData3" @getUpload="getUpload"></uploader>
                </div>
                <div class="authen-condition-item" v-show="conditionsIndex === 1">
                    <div class="authen-condition-text">维修场地</div>
                    <uploader :uploadData="uploadData4" @getUpload="getUpload"></uploader>
                </div>
            </div>
        </div>
        <div class="authen-img">
            <div class="user-info">
                <p class="user-info-tit">展厅门头</p>
                <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
            </div>
            <div class="user-info">
                <p class="user-info-tit">展厅内部</p>
                <uploader :uploadData="uploadData2" @getUpload="getUpload"></uploader>
            </div>
        </div>
        <div class="bth-auth" @click="checkFormData">下一步</div>
        <keep-alive>
        <city  v-show="showCity" @closeCity="closeDialogCity" :defaultCityData="defaultCityData" :showCity="showCity"></city>
        </keep-alive>
        <car :showBrand="showBrand" @subBrandList = "subBrandList"></car>

        <div class="dialog" v-if="showDialog" @click="closeDialog">
            <div class="dialog-con">
                <p>确定退出注册认证</p>
                <div class="dialog-btn">
                    <span>点错了</span>
                    <span @click.stop="loginOut">确定退出</span>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
<script>
    import uploader from '../../components/common/uploader/uploader'
    import city from '../../components/common/city/city'
    import car from './car'
    export default{
        name:'auth',
        data(){
            return{
                authMessage:"",
                welcomeMessage:"",
                companyName:"",
                username:"",
                telephone:"",
                managerName:"",
                managerTelephone:"",
                location:"",
                address:"",
                types:"",
                authTag:[
                    {
                        tag:false,
                        text:"是"
                    },
                    {
                        tag:false,
                        text:"否"
                    }
                ],
                conditions:[
                    {
                        id:1,
                        flag:true,
                        text:"具备经营许可"
                    },
                    {
                        id:2,
                        flag:false,
                        text:"具备维修场地"
                    },
                    {
                        id:3,
                        flag:false,
                        text:"不具备"
                    }
                ],
                conditionsIndex:0,
                authBrandList:[
                ],
                showAuthBrandList:false,
                showBrand:false,
                booth_out_img:null, //展厅门头图片地址
                booth_in_img:null, //展厅内部图片地址
                road_license:null, //道路维修经营许可证
                repair_place:null, //维修场地
                uploadData1:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"signboard",
                    image:"static/sample19.png"
                },
                uploadData2:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"inside",
                    image:"static/sample18.png",
                    imgArr:[]
                },
                uploadData3:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"road",
                    image:"static/sample10.jpg"
                },
                uploadData4:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"repair",
                    image:"static/sample11.jpg",
                    imgArr:[]
                },
                dataURL:{},
                showCity:false,
                defaultCityData:[], //初始化城市默认数据
                postCityData:null, //城市提交数据
                manageType:[
                    {
                        sort:1,
                        flag:false,
                        name:"普通档产品",
                        value:"（16万以内）"
                    },
                    {
                        sort:2,
                        flag:false,
                        name:"高档产品",
                        value:"（16万以上）"
                    },
                    {
                        sort:3,
                        flag:false,
                        name:"平行进口车",
                        value:""
                    }
                ],
                showDialog:false,
                ajaxLoading:false
            }
        },
        methods:{
            closeDialog(){
                this.showDialog = false;
            },
            showLoginDialog(){
                this.showDialog = !this.showDialog;
            },
            loginOut(){
                this.$router.go(-1);
            },
            getDialogCity(){
                this.showCity = true;
            },
            checkAuthTag(item,index){
                var tag = item.tag;
                this.authTag.forEach((ele,index)=>{
                    ele.tag = false;
                })
                if(tag){
                    item.tag = tag;
                    return false;
                }
                item.tag = !tag;
                if(index == 0 && item.tag){
                    this.showBrand = true;
                }
                if(index == 1 && item.tag){
                    this.showAuthBrandList = false;
                    this.authBrandList = [];
                }
            },
            closeDialogCity(postData){
                if(arguments.length == 0){ //无回传数据
                    this.showCity = false;
                }else{
                    this.postCityData = postData;
                    this.location = postData.provinceData["name"] + postData.cityData["name"]+postData.areaData["name"]
                };
            },
            setActive(item){ //主营类型
                var that = this;
                item["flag"] = !item["flag"];
                var type = [];
                this.manageType.forEach(function(item,index){
                    if(item.flag == true){
                        type.push(item.sort);
                    }
                })
                this.types = type.join(",");
            },
            chooseConditions(item,index){
                var flag = item.flag;
                this.conditions.forEach((ele,index)=>{
                    ele.flag = false;
                })
                if(flag){
                    item.flag = flag;
                    return false;
                }
                if(!flag && (index==2)){
                    this.road_license = null;
                    this.repair_place = null;
                }
                item.flag = !flag;
                this.conditionsIndex = index;
            },
            getUpload(data,flag){
                this.dataURL[flag] = data;
                for(flag in this.dataURL){
                    switch (flag)
                    {
                        case "signboard":
                            this.booth_out_img = this.dataURL[flag][0];
                            break;
                        case "inside":
                            this.booth_in_img = this.dataURL[flag][0]
                            break;
                        case "road":
                            this.road_license = this.dataURL[flag][0]
                            break;
                        case "repair":
                            this.repair_place = this.dataURL[flag][0]
                            break;
                    }
                }
            },
            checkFormData(){
                if((this.companyName == "")||(this.companyName == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有公司名称信息没有填写"
                      }
                    );
                    this.$refs.companyName.focus();
                    return false
                }
                if((this.username == "")||(this.username == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有对接人姓名信息没有填写"
                      }
                    );
                    this.$refs.username.focus();
                    return false
                }
                if((this.telephone == "")||(this.telephone == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有联系电话信息没有填写"
                      }
                    );
                    this.$refs.telephone.focus();
                    return false
                }
                var telExp = /^(1(3|4|5|7|8)[0-9]{1}\d{8})$/;
                if(!telExp.test(this.telephone)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请填写正确格式的联系电话"
                      }
                    );
                    this.$refs.telephone.focus();
                    return false
                }
                if((this.managerName == "")||(this.managerName == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有总经理姓名信息没有填写"
                      }
                    );
                    this.$refs.managerName.focus();
                    return false
                }
                if(this.managerName.length<2){
                  this.$store.dispatch("ALERT", // 通过store传值
                    {
                      flag:true,
                      text:"请输入真实姓名"
                    }
                  );
                  this.$refs.managerName.focus();
                  return false
                }
                if((this.managerTelephone == "")||(this.managerTelephone == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有总经理电话信息没有填写"
                      }
                    );
                    this.$refs.managerTelephone.focus();
                    return false
                }
                if(!telExp.test(this.managerTelephone)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请填写正确格式的总经理电话"
                      }
                    );
                    this.$refs.managerTelephone.focus();
                    return false
                }
                if((this.location == null)||(this.location == "")){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请选择所在区域"
                      }
                    );
                    this.$refs.address.focus();
                    return false
                }
                if((this.address == "")||(this.address == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有详细地址信息没有填写"
                      }
                    );
                    this.$refs.address.focus();
                    return false
                }
                if((this.types == "")||(this.types == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请选择经营类型"
                      }
                    );
                    return false
                }

                var activeIndex = this.authTag.findIndex(function(ele,index,arr){
                  return ele.tag;
                });

                if(activeIndex < 0){
                  this.$store.dispatch("ALERT", // 通过store传值
                    {
                      flag:true,
                      text:"请选择是否经过厂家品牌授权"
                    }
                  );
                  return false
                }

                if(this.conditionsIndex == 0){
                  if((this.road_license == "")||(this.road_license == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传道路经营许可证"
                      }
                    );
                    return false
                  }
                }else if(this.conditionsIndex == 1){
                  if((this.repair_place == "")||(this.repair_place == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传维修场地"
                      }
                    );
                    return false
                  }
                }

                if((this.booth_out_img == "")||(this.booth_out_img == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传展厅门头"
                      }
                    );
                    return false
                }
                if((this.booth_in_img == "")||(this.booth_in_img == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传展厅内部"
                      }
                    );
                    return false
                }
                this.submitFormData();
            },
            submitFormData(){
                var activeIndex = this.authTag.findIndex(function(ele,index,arr){
                    return ele.tag;
                })
                var authList = [];
                if(activeIndex == 0){ //选择
                    this.authBrandList.forEach(function(ele,index){
                        var obj = {};
                        obj["brand_id"] = ele["brand_id"];
                        obj["level"] = ele["level"];
                        authList.push(obj);
                    })
                }
                authList = JSON.stringify(authList);
                var conditionIndex = this.conditions.findIndex(function(ele,index){
                    return ele.flag;
                });
                if(conditionIndex == 0){
                    this.repair_place = null;
                }
                if(conditionIndex == 1){
                    this.road_license = null;
                }
                if(conditionIndex == 2){
                    this.road_license = null;
                    this.repair_place = null;
                }
                this.$http.post(
                    "dealer/auth?token=" + sessionStorage.token,
                    {
                        name:this.companyName,
                        link_name:this.username,
                        contact_phone:this.telephone,
                        manager_name:this.managerName,
                        manager_phone:this.managerTelephone,
                        province_id:this.postCityData.provinceData.id,
                        city_id:this.postCityData.cityData.id,
                        district_id:this.postCityData.areaData.id,
                        address:this.address,
                        //activities:this.types,
                        brand_auth:authList,
                        booth_out_img:this.booth_out_img,
                        booth_in_img:this.booth_in_img,
                        road_license:this.road_license,
                        repair_place:this.repair_place,
                        authorizeGrade:this.types
                    }
                ).then(function(reponse){
                    if(reponse.body.code == 200){
                       sessionStorage.mangerName = this.managerName;
                       this.$router.push('/aptitude');
                    }
                },function(err){
                   
                })
            },
            closeCar(){
                this.showBrand = false;
                this.checkAuthTag(this.authTag[1],1);
            },
            subBrandList(brandList){
                if(arguments.length>0){
                  this.authBrandList = brandList;
                  this.showAuthBrandList = true;
                }else{
                  this.authTag.forEach(function(item){
                    item.tag = false;
                  });
                  this.authTag[1].tag = true;
                  this.authBrandList =  [];
                }
                this.showBrand = false;
            },
            getAuth(){
                this.$http({
                    url:"dealerInfo/dataStatus?token=" + sessionStorage.token,
                    method:"GET"
                }).then(function (response) {
                    var data_status=response.body.data.data_status;
                    if((sessionStorage.idCardAuth === 0)&& (data_status == 2)){ //新用户
                        this.welcomeMessage = "欢迎加入淘车猫";
                        this.authMessage = "您的账户需要经过公司认证后才可以进入商城购买哟!请务必填写真实有效信息，我们将对您提交的信息严格保密。";
                    }else{
                        this.welcomeMessage = "请完善以下资料";
                        this.authMessage = "完善资料有助于我们更好的为您服务，请务必填写真实有效信息，我们将对您提交的信息严格保密。";
                    }
                }).catch(function (error) {
                    //this.showAlert = true;
                    //this.alertText = error.body.msg||"请求失败了";
                });
            },
            passportMessage(){ //获取注册信息
                this.$http({
                    url:"dealerInfo/idCardAuth?token="+sessionStorage.token,
                    method:"GET"
                }).then(function (response) {
                   sessionStorage.authMessage = response.bodyText;
                   var data = response.body.data.auth_data;
                    var data_status = response.body.data["auth_status"];
                    if(data_status == 1){ //认证通过
                        this.welcomeMessage = "请完善以下资料";
                        this.authMessage = "完善资料有助于我们更好的为您服务，请务必填写真实有效信息，我们将对您提交的信息严格保密。";
                    }else if(data_status == 2){
                        this.welcomeMessage = "欢迎加入淘车猫";
                        this.authMessage = "您的账户需要经过公司认证后才可以进入商城购买哟!请务必填写真实有效信息，我们将对您提交的信息严格保密。";
                    }else{
                       this.welcomeMessage = "审核未通过";
                       this.authMessage = data["reject_info"];
                    }

                   this.companyName = data.name;
                   this.username = data.link_name;
                   this.telephone = data.contact_phone;
                   this.managerName = data.manager_name;
                   this.managerTelephone = data.manager_phone;
                   if(data.province_id&&data.city_id&&data.district_id){
                     this.defaultCityData = [data.province_id,data.city_id,data.district_id]
                   }
                   //省市区
                   // this.cityData = postData:{
                   //      provinceData:null,
                   //      cityData:null,
                   //      areaData:null
                   //  }
                   this.types = data.authorizeGrade;
                   this.address = data.address;
                   if(data.authorizeGrade){
                       var manageTypeList = data.authorizeGrade.split(",");

                       manageTypeList.forEach((ele,index) => {
                            var index =  this.manageType.findIndex(function(va,ind,arr){
                                return va.sort == ele;
                            })
                            this.manageType[index].flag = true;
                       });
                   }

                   if(data.brand_auth.length>0){
                        this.authTag[0].tag = true;
                        //this.authBrandList = data.brand_auth;
                        data.brand_auth.forEach((ele,index) =>{
                            this.authBrandList[index] = {
                                "name":ele.brand_name,
                                "brand_id":ele.brand_id,
                                "level":ele.level
                            }
                            switch(parseInt(ele.level)){
                                case (1) :
                                    this.authBrandList[index]["text"] = "一级代理";
                                    break;
                                case (2) :
                                    this.authBrandList[index]["text"] = "二级代理";
                                    break;
                            }
                        })
                        this.showAuthBrandList = true;
                   }else{
                     this.authTag[1].tag = true;
                   }
                   this.conditions.forEach((ele,index)=>{
                        ele.flag = false;
                   });
                   if(data.repair_place){
                        this.conditions[1].flag = true;
                        this.conditionsIndex = 1;
                   }else{
                        this.conditions[0].flag = true;
                        this.conditionsIndex = 0;
                   }

                   if(data.road_license){
                        this.$set(this.uploadData3,"imgArr",[data.road_license])
                        this.road_license = data.road_license;
                   }

                   if(data.repair_place){
                        this.$set(this.uploadData4,"imgArr",[data.repair_place])
                        this.repair_place = data.repair_place;
                   }

                   if(data.auth_data.length > 0){
                       this.$set(this.uploadData1,"imgArr",[data.auth_data[0].imgsrc])
                       this.booth_out_img = data.auth_data[0].imgsrc;

                       this.$set(this.uploadData2,"imgArr",[data.auth_data[1].imgsrc])
                       this.booth_in_img = data.auth_data[1].imgsrc;
                   }
                   this.ajaxLoading = true; //图片插件必须要整理了，先这样吧
                },function(){

                });
            },
        },
        mounted(){
            //提交注册认证
            document.documentElement.scrollTop = 0;
            this.passportMessage();
            //this.getAuth();
        },
        components:{
            uploader,
            city,
            car
        }
    }
</script>
<style>

/*注册认证*/
.authen{
    background:#FFF;
    padding-bottom:0.5rem;
}
.authen-tit{
    height:3.466667rem;
    background:url("../../assets/back-m1.jpg") no-repeat;
    background-size:100%;
    padding-left:0.4rem;
    position:relative;
}
.authen-tit em{
    display:block;
    font-size:0.453333rem;
    padding:0.533rem 0 0.25rem;
    color:#fff;
}
.authen-tit span{
    display:block;
    font-size:0.32rem;
    color:#fff;
    line-height:1.5;
    width:6.6rem;
}

.authen-tit i{
    display:block;
    width:1.853rem;
    height:1.453rem;
    background:url("../../assets/icon-s2.png") no-repeat;
    background-size:100%;
    position:absolute;
    top:0;
    bottom:0;
    left:auto;
    right:0.8rem;
    margin:auto;
}

.authen-info{
    padding:0 0.4rem;
}
.authen-info p{
    padding:0.233333rem 0;
    font-size:0.4rem;
    color:#2c2c2c;
    border-bottom:1px solid #eee;
    position:relative;
}
.authen-info p label,.authen-info p span{
    display:inline-block;
}
.authen-info p label{
    height:0.85rem;
    line-height:0.85rem;
}

.authen-info p input{
    width:5.8rem;
    border:none;
    outline:none;
    height:0.85rem;
    line-height:0.85rem;
}

.authen-info p i{
    position:absolute;
    top:50%;
    right:0;
    transform:translateY(-50%);
}
.authen-info p span{
    width:1.786667rem;
    height:0.8rem;
    font-size:0.373333rem;
    margin-right:0.4rem;
    text-align:center;
    line-height:0.8rem;
    border-radius:0.133333rem;
    color:#d6ab55;
    border:1px solid #d6ab55;
}
.authen-info p span.active{
    background:#d6ab55;
    color:#fff;

}

/*感兴趣的产品定位*/
.product-positioning{margin-right:-.2rem;}

.authen-info .product-positioning div.active{
    background:#d6ab55;
    color:#fff;
}
.authen-info .product-positioning div{
    display:block;
    float:left;
    width:30%;
    height:1.063rem;
    padding-top:.1335rem;
    padding-bottom:.1335rem;
    font-size:0.373333rem;
    margin-right:0.2rem;
    text-align:center;
    border-radius:0.133333rem;
    color:#d6ab55;
    border:1px solid #d6ab55;
}
.authen-info .product-positioning div i{
    display:block;
    font-style:normal;
}
.authen-info .product-positioning div:nth-child(3){
    height:1.063rem;
}
.authen-info .product-positioning div:nth-child(3) i{
    display:block;
    font-style:normal;
    line-height:1.063rem;
}
/*资料*/
.user-info{
    padding:0.533333rem 0;
    margin:0 0.4rem;
    border-bottom:1px solid #eee;
    font-size:0.4rem;
    color:#2c2c2c;
}
.user-info-tit{
    font-size:0.453333rem;
}
.submit-tit{
    font-size:0.506667rem;
}


.brand-list-header{font-size:0.4rem}

/*1.1版本*/
.auth-tel{
    display:block;
    width:0.546rem;
    height:0.546rem;
    background:url("../../assets/icon-s3.png") no-repeat;
    background-size:100%;
    position:absolute;
    top:0;
    bottom:0;
    left:auto;
    right:0.45rem;
    margin:auto;
}

.clear20{
    height:0.4rem;
    background:#f5f5f5;
}

.authen-limts{
    font-size:0.4rem;
    padding:0.233rem 0;
    line-height:0.85rem;
    border-bottom:1px solid #EEE;
}

.authen-limts-con{
    float:right;
}

.authen-limts-con em{
    margin-left:0.8rem;
    position:relative;
    padding-left:0.67rem
}

.authen-limts-con em i{
    width:0.4rem;
    height:0.4rem;
    display:block;
    position:absolute;
    top:0;
    left:0;
    right:auto;
    bottom:0;
    margin:auto;
    background:url("../../assets/icon-s4.png") no-repeat;
    background-size:100%;
}

.authen-limts-con .active{
    color:#d5aa5c;
}
.authen-limts-con .active i{
    background:url("../../assets/icon-s5.png") no-repeat;
    background-size:100%;
}

.authen-condition{
    font-size:0.4rem;
    padding:0.233rem 0 0;
    margin:0 0.4rem;
    border-bottom:1px solid #EEE;
}
.authen-condition-nav{
    padding-top:0.533rem;
}
.authen-condition li{
    float:left;
    padding:0.2rem 0.4rem;
    font-size:0.373rem;
    margin-right:0.267rem;
    border-radius:0.133333rem;
    border:1px solid #d5aa5c;
    color:#d5aa5c;
}

.authen-condition li.active{
    background:#d5aa5c;
    color:#FFF;
}

.authen-condition-item.active{
    display:block;
}
.authen-condition-text{
    padding-top:0.533rem;
    font-size:0.453rem;
}

.authen-limts-list{
    padding-bottom:0.533rem;
    border-bottom:1px solid #EEE;
}


.authen-limts-list dt,.authen-limts-list dd{
    width:50%;
    float:left;
    margin-top:0.533rem;
}

.authen-limts-list dt{
    font-size:0.4rem;
}

.authen-limts-list dd{
    font-size:0.38rem;
    color:#999;
}

.bth-auth{
    width: 5.333333rem;
    height: 1.173333rem;
    line-height: 1.173333rem;
    text-align: center;
    margin:0 auto;
    font-size: 0.453333rem;
    color: #fff;
    background: #d5aa5c;
    border-radius: 0.586667rem;
    border: none;
    display: block;
    margin-top:1rem;
}

.authen-info input:disabled{
  -webkit-appearance:none;
  background:none;
  color:#333;
}

</style>
