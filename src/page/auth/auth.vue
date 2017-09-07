<template>
<!--注册认证--> 
    <section class="authen">
        <div class="authen-tit">
            <em>欢迎加入淘车猫</em>
            <span>公司认证后才可以进入商城购买</span>
            <span>我们将对您提交的信息严格保密</span>
            <i></i>
        </div>
        <div class="authen-info">
            <p>
                <label>姓名：</label>
                <input type="text"  v-model="username" ref="username">
            </p>
            <p>
                <label>公司名称：</label>
                <input type="text"  v-model="companyName" ref="companyName">
            </p>
            <p @click="getDialogCity">
                <i class="yellow-rt"></i><label>所在区域：</label>
                <input type="text"  v-model="location" ref="location">
            </p>
            <p>
                <label>详细地址：</label>
                <input type="text"  v-model="address" ref="address">
            </p>
            <p>
                <label>主营类型：</label>
                <span @click="setActive(index)"  :class="{active:item['flag']}" v-for="(item,index) in manageType">{{item.name}}</span>
            </p>
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
            <div class="user-info">
                <p class="user-info-tit">手持身份证正面照</p>
                <uploader :uploadData="uploadData3" @getUpload="getUpload"></uploader>
            </div>
            <div class="user-info">
                <p class="user-info-tit">手持身份证反面照</p>
                <uploader :uploadData="uploadData4" @getUpload="getUpload"></uploader>
            </div>
            <div class="user-info">
                <p class="user-info-tit">营业执照</p>
                <uploader :uploadData="uploadData5" @getUpload="getUpload"></uploader>
            </div>
        </div>
        <p class="visib-98"></p>
        <div class="remits-fixed" @click="checkFormData">提交</div>
        <city :cityData="cityData" v-if="showCity" @closeCity="closeDialogCity"></city>
    </section>
</template>
<script>
    import uploader from '../../components/common/uploader/uploader'
    import city from '../../components/common/city/city'
    export default{
        name:'auth',
        data(){
            return{
                username:"",
                companyName:"",
                location:"",
                address:"",
                types:"",
                booth_out_img:null, //展厅门头图片地址
                booth_in_img:null, //展厅内部图片地址
                id_card_front:null, //手持身份证正面
                id_card_back:null, //手持身份证反面
                business:null, //营业执照图片
                uploadData1:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"signboard",
                    image:"static/sample5.png"
                },
                uploadData2:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"inside",
                    image:"static/sample6.png",
                    imgArr:[]
                },
                uploadData3:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"identity",
                    image:"static/sample7.jpg"
                },
                uploadData4:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"identityPos",
                    image:"static/sample8.jpg",
                    imgArr:[]
                },
                uploadData5:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"licenseRev",
                    image:"static/sample9.png",
                },
                dataURL:{},
                cityData:[],
                showCity:false,
                showAlert:false,  //错误弹出窗
                alertText:null, //错误提醒信息,
                postCityData:null, //城市提交数据
                manageType:[
                    {
                        flag:false,
                        name:"国产"
                    },
                    {
                        flag:false,
                        name:"合资"
                    },
                    {
                        flag:false,
                        name:"豪华"
                    }
                ]
            }
        },
        methods:{
            getDialogCity(){
                this.showCity = true;
            },
            closeDialogCity(postData){
                if(arguments.length == 0){ //无回传数据
                    this.showCity = false;
                }else{
                    this.postCityData = postData;
                    this.location = postData.provinceData["name"] + postData.cityData["name"]+postData.areaData["name"]
                };
            },
            setActive(index){ //主营类型
                var that = this;
                this.manageType[index]["flag"] = !this.manageType[index]["flag"];
                this.types = "";
                this.manageType.forEach(function(item,index){
                    if(item.flag == true){
                        that.types += index.toString() + ","
                    }
                })
            },
            getCity(){
                this.$http.get(
                    "area?token=" + sessionStorage.token
                    ).then(function(reponse){
                        this.cityData = reponse.body.data;
                    },function(error){

                    })
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
                        case "identity":
                            this.id_card_front = this.dataURL[flag][0] 
                            break;
                        case "identityPos":
                            this.id_card_back = this.dataURL[flag][0] 
                            break;
                        case "licenseRev":
                            this.business = this.dataURL[flag][0] 
                            break;
                    }
                }
            },
            checkFormData(){
                if((this.username == "")||(this.username == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有姓名信息没有填写"
                      }
                    );
                    this.$refs.username.focus();
                    return false
                }
                if((this.companyName == "")||(this.companyName == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您有公司公司名称没有填写"
                      }
                    );
                    this.$refs.companyName.focus();
                    return false
                }
                if((this.location == "")||(this.location == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"您还没有选择所在区域"
                      }
                    );
                    this.$refs.location.focus();
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
                if((this.id_card_front == "")||(this.id_card_front == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传手持身份证正面照"
                      }
                    );
                    return false
                }
                if((this.id_card_back == "")||(this.id_card_back == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传手持身份证反面照"
                      }
                    );
                    return false
                }
                if((this.business == "")||(this.business == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传营业执照"
                      }
                    );
                    return false
                }
                this.submitFormData();
            },
            submitFormData(){
                this.$http.post(
                    "dealer/auth?token=" + sessionStorage.token,
                    {
                        link_name:this.username, 
                        name:this.companyName,
                        province_id:this.postCityData.provinceData.id,
                        city_id:this.postCityData.cityData.id,
                        district_id:this.postCityData.areaData.id,
                        address:this.address,
                        activities:this.types,
                        booth_out_img:this.booth_out_img,
                        booth_in_img:this.booth_in_img,
                        id_card_front:this.id_card_front,
                        id_card_back:this.id_card_back,
                        business:this.business
                    }
                ).then(function(reponse){
                    if(reponse.body.code == 200){
                        this.$router.push('/authResult');
                    }
                },function(err){
                    console.log(err);
                })
            }
        },
        mounted(){
            //提交注册认证
            this.getCity();
            
        },
        components:{
            uploader,
            city
        }
    }
</script>
<style>

/*注册认证*/
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
    padding:0.7rem 0 0.25rem 0;
    color:#fff;
}
.authen-tit span{
    display:block;
    font-size:0.373333rem;
    color:#fff;
    padding-top:0.133333rem;
}

.authen-tit i{
    display:block;
    width:1.87rem;
    height:1.47rem;
    background:url("../../assets/icon-s1.png") no-repeat;
    background-size:100%;
    position:absolute;
    top:0;
    bottom:0;
    left:auto;
    right:0.8rem;
    margin:auto;
}

.authen-info{
    background:#fff;
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
    width:2.133333rem;
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
    color:#666;
    font-size:0.373333rem;
    border:1px solid #999;
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

/*资料*/
.authen-img{
    background:#fff;
    margin-top:0.4rem;
}
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

</style>

