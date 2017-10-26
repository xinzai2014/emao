<template>
<!--注册认证-->
<div>
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion" @click="goback"></i>
        <strong class="brand-list-title">公司资质信息</strong>
        <a class="auth-tel" href="tel:400-825-2368"></a>
    </header>
    <section class="authen">
        <div class="authen-info">
            <p>
                <label>法人姓名：</label>
                <input type="text"  v-model="username" ref="username" placeholder="请输入法人姓名" >
            </p>
            <p>
                <label>企业开户行：</label>
                <input type="text"  v-model="bank" ref="bank" placeholder="请输入企业开户银行" >
            </p>
            <p>
                <label>企业银行账号：</label>
                <input type="tel"  v-model="account" ref="account" placeholder="请输入开户银行账号" maxlength="20">
            </p>
            <p>
                <label>纳税识别号：</label>
                <input type="text"  v-model="revenue" ref="revenue" placeholder="请输入纳税识别号" maxlength="20">
            </p>
        </div>
        <div class="clear20"></div>
        <div class="authen-info">
            <div class="authen-limts">
                <span>是否为一般纳税人</span>
                <div class="authen-limts-con">
                    <em v-for="(item,index) in authTag" :class='{active:item.tag}' @click="checkAuthTag(item,index)"><i ></i>{{item.text}}</em>
                </div>
            </div>
        </div>
        <div class="authen-condition" v-if="showRevenue">
            <div class="authen-condition-con clearfix">
                <div class="authen-condition-item">
                    <div class="authen-condition-text">一般纳税人证明<span>(需加盖公章)</span></div>
                    <uploader :uploadData="uploadData5" @getUpload="getUpload"></uploader>
                </div>
                <div class="authen-condition-item">
                    <div class="authen-condition-text">开票信息<span>(需加盖公章)</span></div>
                    <uploader :uploadData="uploadData6" @getUpload="getUpload"></uploader>
                </div>
            </div>
        </div>
        <div class="authen-img">
            <div class="user-info">
                <p class="user-info-tit">营业执照<span>(需加盖公章)</span></p>
                <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
            </div>
            <div class="user-info">
                <p class="user-info-tit">开户许可证<span>(非必填)</span></p>
                <uploader :uploadData="uploadData2" @getUpload="getUpload"></uploader>
            </div>
            <div class="user-info">
                <p class="user-info-tit">法人身份证正面照片</p>
                <uploader :uploadData="uploadData3" @getUpload="getUpload"></uploader>
            </div>
            <div class="user-info">
                <p class="user-info-tit">法人身份证反面照片</p>
                <uploader :uploadData="uploadData4" @getUpload="getUpload"></uploader>
            </div>
        </div>
        <p class="visib-98"></p>
        <div class="bth-auth" @click="checkFormData">提交</div>

        <section class="buy-agreement-pupop" v-if="showAgreement">
            <div class="buy-agreement-in">
                <div class="buy-agreement-info">
                    <p class="buy-agreement-con">
                       <iframe :srcdoc="iframeCon" class="agreemenIframe"></iframe>
                    </p>
                </div>
                <ul class="buy-agreement-choose clearfix">
                    <li class="" @click="showAgreement = false">不同意</li>
                    <li class="active" @click="submitFormData">同意</li>
                </ul>
            </div>
        </section>

    </section>
</div>
</template>
<script>
    import uploader from '../../components/common/uploader/uploader'
    export default{
        name:'auth',
        data(){
            return{
                username:"",
                bank:"",
                account:"",
                revenue:"",
                showRevenue:false,
                iframeCon:null,
                showAgreement:false,
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
                businessLicense:null, //营业执照
                openingPermit:null, //开户许可证
                legalPersonIDCard:null, //法人身份证正面照片
                legalPersonIDCardBack:null, //法人身份证反面照片
                generalTaxpayer:"", //一般纳税人证明
                billingInfomation:"",//开票信息
                uploadData1:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"license",
                    image:"static/sample5.png",
                    imgArr:[]
                },
                uploadData2:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"account",
                    image:"static/sample6.jpg",
                    imgArr:[]
                },
                uploadData3:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"identityFull",
                    image:"static/sample7.jpg",
                    imgArr:[]
                },
                uploadData4:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"identityReverse",
                    image:"static/sample8.jpg",
                    imgArr:[]
                },
                uploadData5:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"revenueProve",
                    image:"static/sample12.jpg",
                    imgArr:[]
                },
                uploadData6:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"revenueMake",
                    image:"static/sample14.jpg",
                    imgArr:[]
                },
                dataURL:{}
            }
        },
        methods:{
            goback(){
                this.$router.go(-1);
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
                    this.showRevenue = true;
                }
                if(index == 1 && item.tag){
                   this.dataURL["revenueProve"] = [];
                   this.dataURL["revenueMake"] = [];
                   this.generalTaxpayer = "";
                   this.billingInfomation = "";
                   this.showRevenue = false;
                }
            },
            getUpload(data,flag){
                this.dataURL[flag] = data;
                for(flag in this.dataURL){
                    switch (flag)
                    {
                        case "license":
                            this.businessLicense = this.dataURL[flag][0];
                            break;
                        case "account":
                            this.openingPermit = this.dataURL[flag][0]
                            break;
                        case "identityFull":
                            this.legalPersonIDCard = this.dataURL[flag][0]
                            break;
                        case "identityReverse":
                            this.legalPersonIDCardBack = this.dataURL[flag][0]
                            break;
                        case "revenueProve":
                            this.generalTaxpayer = this.dataURL[flag][0]
                            break;
                        case "revenueMake":
                            this.billingInfomation = this.dataURL[flag][0]
                            break;
                    }
                }
            },
            getAgreement(){
                this.$http.get("dealer/agreement?token=" + sessionStorage.token)
                  .then(function (response) {
                    console.log(response);
                    this.iframeCon = response.bodyText;
                    this.showAgreement = true;
                  }).catch(function (error) {

                  });
            },
            checkFormData(){
                if((this.username == "")||(this.username == null)||(this.username.length<2)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请输入真实姓名"
                      }
                    );
                    this.$refs.username.focus();
                    return false
                }
                if((this.bank == "")||(this.bank == null)){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请输入真实开户行"
                      }
                    );
                    this.$refs.bank.focus();
                    return false
                }
                var numRepExp = /^[a-zA-Z0-9]{1,20}$/; //企业账号以及纳税号规则
                if((this.account == "")||(this.account == null)||(!numRepExp.test(this.account))){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请输入开户银行账号"
                      }
                    );
                    this.$refs.account.focus();
                    return false
                }
                if((this.revenue == "")||(this.revenue == null)||(!numRepExp.test(this.revenue))){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请输入纳税识别号"
                      }
                    );
                    this.$refs.revenue.focus();
                    return false
                }

                var activeIndex = this.authTag.findIndex(function(ele,index,arr){
                    return ele.tag;
                })
                if(activeIndex<0){
                  this.$store.dispatch("ALERT", // 通过store传值
                    {
                      flag:true,
                      text:"请勾选是否为一般纳税人"
                    }
                  );
                  return false;
                }
                if(activeIndex == 0){
                    if(!this.generalTaxpayer){
                        this.$store.dispatch("ALERT", // 通过store传值
                          {
                            flag:true,
                            text:"请上传一般纳税人证明"
                          }
                        );
                        return false
                    }
                    if(!this.billingInfomation){
                        this.$store.dispatch("ALERT", // 通过store传值
                          {
                            flag:true,
                            text:"请上传开票信息"
                          }
                        );
                        return false
                    }
                }
                if(this.businessLicense == null){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传营业执照"
                      }
                    );
                    return false
                }
//                if(this.openingPermit == null){  //许可证不用必填
//                    this.$store.dispatch("ALERT", // 通过store传值
//                      {
//                        flag:true,
//                        text:"请上传开户许可证"
//                      }
//                    );
//                    return false
//                }
                if(this.legalPersonIDCard == null){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传法人身份证正面照片"
                      }
                    );
                    return false
                }
                if(this.legalPersonIDCardBack == null){
                    this.$store.dispatch("ALERT", // 通过store传值
                      {
                        flag:true,
                        text:"请上传法人身份证反面照片"
                      }
                    );
                    return false
                }
                this.getAgreement();
            },
            submitFormData(){
                var subData = {
                  legalPerson:this.username,
                  bankName:this.bank,
                  bankNumber:this.account,
                  TIN:this.revenue,
                  businessLicense:this.businessLicense,
                  legalPersonIDCard:this.legalPersonIDCard,
                  legalPersonIDCardBack:this.legalPersonIDCardBack,
                  generalTaxpayer:this.generalTaxpayer,
                  billingInfomation:this.billingInfomation,
                }
                if(this.openingPermit){  //许可证不用必填
                      subData.openingPermit = this.openingPermit;
                  }
                this.$http.post(
                    "dealer/qualification?token=" + sessionStorage.token,
                    subData
                ).then(function(reponse){
                    if(reponse.body.code == 200){
                        this.$router.push('/authResult');
                    }
                },function(err){
                    console.log(err);
                }).finally(function(){
                    this.showAgreement = false;
                })
            },
            passportMessage(){ //获取注册信息
                this.$http({
                    url:"dealerInfo/idCardAuth?token="+sessionStorage.token,
                    method:"GET"
                }).then(function (response) {
                   sessionStorage.authMessage = response.bodyText;
                   var data = response.body.data.auth_data.qualification;
                   this.username = data.legalPerson?data.legalPerson:sessionStorage.mangerName;
                   this.bank = data.bankName;
                   this.account = data.bankNumber;
                   this.revenue = data.TIN;

                   if(data.businessLicense){
                        this.$set(this.uploadData1,"imgArr",[data.businessLicense])
                        this.businessLicense = data.businessLicense;
                   }
                   if(data.openingPermit){
                        this.uploadData2["imgArr"] = [data.openingPermit];
                        this.openingPermit = data.openingPermit;
                   }
                   if(data.legalPersonIDCard){
                        this.uploadData3["imgArr"] = [data.legalPersonIDCard];
                        this.legalPersonIDCard = data.legalPersonIDCard;
                   }
                   if(data.legalPersonIDCardBack){
                        this.uploadData4["imgArr"] = [data.legalPersonIDCardBack];
                        this.legalPersonIDCardBack = data.legalPersonIDCardBack;
                   }

                    if(data.generalTaxpayer&&data.billingInfomation){
                        this.authTag[0].tag = true;
                        this.showRevenue = true;
                        this.uploadData5["imgArr"] = [data.generalTaxpayer];
                        this.uploadData6["imgArr"] = [data.billingInfomation];
                        this.generalTaxpayer = data.generalTaxpayer;
                        this.billingInfomation = data.billingInfomation;
                    }
                   this.ajaxLoading = true; //图片插件必须要整理了，先这样吧
                },function(){

                });
            },
        },
        mounted(){
            //this.getAgreement();
            this.passportMessage();
        },
        components:{
            uploader
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

.user-info-tit span{
  color:#999;
  margin-left:0.1rem;
  font-size:0.38rem;
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
    padding-bottom:0.233rem;
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

.authen-condition-text span{
  color:#999;
  margin-left:0.1rem;
  font-size:0.38rem;
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

.aptitude{
    position:fixed;
    top:0;
    left:0;
    width:100%;
}

/*购车协议*/
.buy-agreement-pupop{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.buy-agreement-in{-webkit-overflow-scrolling:touch;position:relative;height:80%;margin:1.7067rem .5333rem 1.9333rem .5333rem;font-size:.4rem;border-radius:.1333rem;background-color:#fff;}
.buy-agreement-info{padding:.4rem .533rem .4rem .533rem;}
.buy-agreement-title{height:1.2rem;padding-left:.5333rem;color:#2c2c2c;line-height:1.2rem;border-bottom:1px solid #eee;}
.buy-agreement-con{color:#999;line-height:.6667rem;}
.buy-agreement-choose{position:absolute;bottom:0;width:100%;}
.buy-agreement-choose li{float:left;width:50%;height:1.173rem;text-align:center;line-height:1.173rem;font-size:.4267rem;color:#2c2c2c;background-color:#f5f5f5;}
.buy-agreement-choose li.active{color:#fff;background-color:#d5aa5c;}
.buy-agreement-con{
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    height:10rem;
}
.agreemenIframe{
    width:100%;
    border:none;
    height:100%;
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
}
</style>
