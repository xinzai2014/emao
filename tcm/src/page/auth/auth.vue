<template>
<!--注册认证-->
    <section class="authen">
<!--         <div class="authen-tit">
            <em>欢迎加入淘车猫</em>
            <span>公司认证后才可以进入商城购买哟</span>
            <span>我们将对您提交的信息严格保密</span>
        </div>
        <div class="authen-info">
            <p>
                <label>姓名：</label>张全蛋
            </p>
            <p>
                <label>公司名称：</label>北京中汽汽车有限公司
            </p>
            <p>
                <i class="yellow-rt"></i><label>所在区域：</label>北京北京市东城区
            </p>
            <p>
                <label>主营类型：</label><span>自主</span><span>合资</span><span>豪华</span>
            </p>
        </div> -->
        <div class="authen-img">
            <div class="user-info">
                <p class="user-info-tit">展厅门头</p>
                <uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
                
            </div>
            <div class="user-info">
                <p class="user-info-tit">展厅内部</p>
                <uploader :uploadData="uploadData2" @getUpload="getUpload"></uploader>
            </div>
            <!-- 
            <div class="user-info">
                <p class="user-info-tit">手持身份证正面照片</p>
                <div class="sample-ct">
                    <div class="submit-lt">
                        <div class="submit-img"><img src="../../assets/sample.jpg"></div>
                        <p class="up-btn">上传</p>
                    </div>
                    <div class="submit-rt">
                        <div class="submit-img"><img src="../../assets/sample7.jpg"></div>
                    </div>
                </div>
            </div>
            <div class="user-info">
                <p class="user-info-tit">营业执照</p>
                <div class="sample-ct">
                    <div class="submit-lt">
                        <div class="submit-img"><img src="../../assets/sample.jpg"></div>
                        <p class="up-btn">上传</p>
                    </div>
                    <div class="submit-rt">
                        <div class="submit-img"><img src="../../assets/sample8.jpg"></div>
                    </div>
                </div>
            </div> -->
        </div>
        <p class="visib-98"></p>
        <div class="remits-fixed">提交</div>
    </section>
</template>
<script>
    import uploader from '../../components/common/uploader/uploader'
    export default{
        name:'auth',
        data(){
            return{
                uploadData1:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"door"
                },
                uploadData2:{
                    url:"https://tcmapi.emao.com/upload",
                    count:3,
                    flag:"inside"
                },
                dataURL:{}
            }
        },
        methods:{
            getUpload(data,flag){
                this.dataURL[flag] = data;
            }
        },
        mounted(){

            
        },
        components:{
            uploader
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
    padding:0.533333rem 0;
    font-size:0.4rem;
    color:#2c2c2c;
    border-bottom:1px solid #eee;
}
.authen-info p label,.authen-info p span{
    display:inline-block;
}
.authen-info p label{
    width:2.133333rem;
}
.authen-info p i{
    float:right;
}
.authen-info p span{
    width:1.786667rem;
    height:0.8rem;
    color:#d6ab55;
    font-size:0.373333rem;
    border:1px solid #d6ab55;
    margin-right:0.4rem;
    text-align:center;
    line-height:0.8rem;
    border-radius:0.133333rem;
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