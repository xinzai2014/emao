<template>
<!--注册认证-->
    <section class="authen">
        <div class="authen-tit">
            <em>欢迎加入淘车猫</em>
            <span>公司认证后才可以进入商城购买哟</span>
            <span>我们将对您提交的信息严格保密</span>
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
            <p>
                <i class="yellow-rt"></i><label>所在区域：</label>
                <input type="text"  v-model="location" ref="location">
            </p>
            <p>
                <label>主营类型：</label>
                <span>自主</span>
                <span>合资</span>
                <span>豪华</span>
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
                <uploader :uploadData="uploadData3" @getUpload="getUpload"></uploader>
            </div>
            <div class="user-info">
                <p class="user-info-tit">营业执照</p>
                <uploader :uploadData="uploadData5" @getUpload="getUpload"></uploader>
            </div>
        </div>
        <p class="visib-98"></p>
        <div class="remits-fixed" @click="checkFormData">提交</div>
        <alert-tip v-if="showAlert" @closeTip = "showAlert = false" :alertText="alertText"></alert-tip>
        <city :cityData="cityData" v-if="cityData.length>0"></city>
    </section>
</template>
<script>
    import uploader from '../../components/common/uploader/uploader'
    import alertTip from '../../components/common/alertTip/alertTip'
    import city from '../../components/common/city/city'
    export default{
        name:'auth',
        data(){
            return{
                username:"",
                companyName:"",
                location:"",
                types:[],
                uploadData1:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"signboard",
                    image:"static/sample5.jpg"
                },
                uploadData2:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"inside",
                    image:"static/sample6.jpg"
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
                    image:"static/sample7.jpg"
                },
                uploadData5:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"licenseRev",
                    image:"static/sample8.jpg"
                },
                dataURL:{},
                cityData:[],
                showAlert:false,  //错误弹出窗
                alertText:null //错误提醒信息
            }
        },
        methods:{
            getCity(){
                this.$http.get(
                    "area?token=" + sessionStorage.token
                    ).then(function(reponse){
                        this.cityData = reponse.body.data;
                        console.log(this.cityData);
                        console.log(reponse);
                    },function(error){

                    })
            },
            getUpload(data,flag){
                this.dataURL[flag] = data;
            },
            checkFormData(){
                if((this.username == "")||(this.username = null)){
                    this.showError("请填写用户名");
                    this.$refs.username.focus();
                    return false
                }
                if((this.companyName == "")||(this.companyName = null)){
                    this.showError("请填写公司名称");
                    this.$refs.companyName.focus();
                    return false
                }
                if((this.location == "")||(this.location = null)){
                    this.showError("请填写所在区域");
                    this.$refs.location.focus();
                    return false
                }
            },
            showError(errorMsg){
                this.showAlert = true;
                this.alertText = errorMsg;
            },
            submitFormData(){
                this.$http.post(
                    "dealer/auth",
                    {
                        link_name:"", 
                        name:"",
                        province_id:"",
                        city_id:"",
                        district_id:"",
                        address:"",
                        activities:"",
                        booth_out_img:"",
                        booth_in_img:"",
                        id_card_front:"",
                        id_card_back:"",
                        business:"",
                    }
                ).then(function(reponse){

                },function(){

                })
            }
        },
        mounted(){
            //提交注册认证
            this.getCity();
            
        },
        components:{
            uploader,
            alertTip,
            city
        }
    }
</script>
<style>

/*注册认证*/
.authen-tit{
    height:3.466667rem;
    background:#6f4c00;
    text-align:center;
}
.authen-tit em{
    display:block;
    font-size:0.453333rem;
    padding:0.8rem 0 0.066667rem 0;
    color:#fff;
}
.authen-tit span{
    display:block;
    font-size:0.373333rem;
    color:#fff;
    padding-top:0.133333rem;
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
}
.authen-info p span.active{
    color:#d6ab55;
    border:1px solid #d6ab55;
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

