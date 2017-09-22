<template>
<div>
   <div class="sample-ct">
        <div class="submit-lt">
            <div class="submit-img">
                <div class="pic-box" v-for="(item,index) in files" @click="lookBigImg(item.src)">
                    <img :src = item.src >
                    <div class="img-percent" v-if="item.showPercent"> 
                        <p>{{item.percent + "%"}}</p>
                    </div>
                    <div class="img-button">
                        <p class="up-btn" @click.stop="updatePic(index)" v-if="(item.percent != 100 )">上传</p>
                        <p class="up-btn" v-if="(item.percent == 100)&&(index == 0)" @click.stop="updatePic(index)">修改</p>
                        <p class="up-btn" v-if="index != 0" @click.stop="deletePic(index)">删除</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit-rt">
            <div class="submit-img" >
                <img :src = uploadData.image @click="lookBigImg(uploadData.image)">
            </div>
        </div>

        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple" class="upfile">
    </div>
    <p class="up-btn continue-btn" v-if="continueUp&&initData.count>1" @click="addBox">继续上传</p>
    <div class="bigImg-back" @click="closeImg" v-show="showBigImg">
        <img :src = bigImg>
    </div>
</div>
</template>
<script>
    export default{
        name:'uploader',
        props:["uploadData"],
        data(){
            return{
                files:[
                    0
                ],
                initData:{},
                activeIndex:0,
                continueUp:false,
                updateIndex:false,
                imgURL:[], //回传给父组件的图片绝对路径集合
                bigImg:null,
                showBigImg:false
            }
        },
        methods:{
            addBox(){   //增加图片框
                this.files.push(0);
                if(this.files.length == this.initData.count){
                    this.continueUp = false;
                }
            },
            deletePic(index){ //删除重新上传
                var that = this;
                var tagFile = [];
                this.files.forEach(function(ele,ind){
                    if(index != ind){
                        tagFile.push(ele);
                    }
                })
                this.files = tagFile;
                this.continueUp = true;
                this.imgURL.splice(index,1);
                this.sendData();
            },
            updatePic(index){ //修改图片
                this.updateIndex = index;
                this.$refs.file.click();
            },
            sendData(){ //向上发送数据
                var dataArr = [];
                this.imgURL.forEach(function(ele,index){
                    if(ele){
                       dataArr.push(ele); 
                    }
                });
                this.$emit("getUpload",dataArr,this.initData.flag);
            },
            fileChanged(){
                if(this.updateIndex === false){
                }else{
                    this.files[this.updateIndex] = 0
                }
                //return false;
                const list = this.$refs.file.files[0];
                // for (let i = 0; i < list.length; i++) {
                //     if (!this.isContain(list[i])) {
                        const item = {
                            name: list.name,
                            size: list.size,
                            file: list,
                            percent:0,
                            showPercent:true
                        }
                        this.html5Reader(list, item);
                        // var tagFile = [];
                        // this.files.forEach(function(ele,index){
                        //     if(ele){
                        //          tagFile.push(ele);
                        //     }
                        // });
                        // this.files = tagFile;
                        if(this.updateIndex === false){
                            this.files.push(item);               //新增
                            this.activeIndex = this.files.length - 1;
                        }else{
                            this.files.splice(this.updateIndex,1,item);
                            this.activeIndex = this.updateIndex;
                        };
                        this.submit(this.activeIndex);
                //     }
                // }
                this.$refs.file.value = ''
            },
            html5Reader(file, item){
                const reader = new FileReader()
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    //this.$set(item, 'src', e.target.result);
                    this.toCanvasClip(e.target.result,file.type,item);
                }
            },
            isContain(file) { //防止重复
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            submit(index) { //上传到服务器
                var that = this;
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                const formData = new FormData();
                formData.append("file", this.files[index].file);
                const xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', this.uploadProgress, false)
                xhr.open('POST', this.initData.url + "?token="+sessionStorage.token, true)
                xhr.setRequestHeader("Accept","application/json;version=1.0.0");
                xhr.setRequestHeader('X-Emao-TCM-Wap',1);
                this.uploading = true
                xhr.send(formData)
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        var ajaxResponse = eval('(' + xhr.responseText + ')');
                        that.imgURL[index] = ajaxResponse.data.url;
                        that.sendData();
                        this.status = 'finished'
                        //console.log('upload success!');
                    } else {
                        console.log(`error：error code ${xhr.status}`)
                    }
                }
            },
            uploadProgress(evt) {
                var that = this;
                if (evt.lengthComputable) {
                    const percentComplete = parseInt(Math.round((evt.loaded * 100) / evt.total))
                    this.files[this.activeIndex].percent = percentComplete;
                    if(percentComplete == 100){
                        setTimeout(function(){
                            that.files[that.activeIndex].showPercent = false;
                            if(that.files.length < 2){
                                that.continueUp = true;
                            }
                        },300)
                    }
                } else {
                    console.warn('upload progress unable to compute')
                }
                //console.log(tag.percent);
            },
            toCanvasClip(data,fileType,item){
                var that = this;
                var image = new Image();
                image.src = data;
                image.onload = function(){
                    var cvs = document.createElement('canvas');  
                    var scale = 1;    
                    //压缩规则还需要再调整
                    if(this.width > 1000 || this.height > 1000){ 
                        if(this.width > this.height){    
                            scale = 1000 / this.width;  
                        }else{    
                            scale = 1000 / this.height;    
                        }    
                    }
                    cvs.width = this.width*scale;    
                    cvs.height = this.height*scale; 
                    var ctx = cvs.getContext('2d');
                    ctx.drawImage(this, 0, 0, cvs.width, cvs.height);  
                    ctx.drawImage(this, 0, 0, cvs.width, cvs.height);   
                    var newImageData = cvs.toDataURL(fileType, 0.9);
                    that.$set(item, 'src', newImageData);
                }
            },
            lookBigImg(src){
                if(!src) return;
                this.bigImg = src;
                this.showBigImg = true;
            },
            closeImg(){ 
                this.showBigImg = false;
            },
            init(){
                this.initData = this.uploadData;
                if("imgArr" in this.uploadData){
                    var img = this.uploadData.imgArr;
                    if(img.length == 0) return;
                    this.files = [];
                    var that = this;
                    img.forEach(function(value,index){
                        var obj = {};
                        obj.src = value;
                        that.files.push(obj);
                    })
                }
            }
        },
        mounted(){
            this.init();
        },
        watch:{
            'uploadData.imgArr'(){
                this.init();
            }
        }
    }
</script>

<style>
    .upfile{
        display: none;
    }
    .sample-ct{
        overflow:hidden;
        margin-top:0.533333rem;

    }
    .submit-lt{
        width:3.68rem;
        float:left;
        margin:0 1.066667rem 0 0.4rem;
    }
    .submit-img{
        width:3.666667rem;
        position:relative;
    }
    .up-btn {
        border: 1px solid #d6ab55;
        border-radius: 0.533333rem;
        color: #bb8800;
        font-size: 0.373333rem;
        height: 0.85333rem;
        line-height: 0.85333rem;
        margin: 0.4rem auto;
        text-align: center;
        width: 1.64rem;
        display:inline-block;
    }
    .img-percent{
        position:absolute;
        width:100%;
        height:2.773333rem;
        left:0;
        top:0;
        background:rgba(0,0,0,0.75);
        font-size:0.4rem;
        color:#fff;
        text-align:center;
    }
    .img-percent p {
        width:1.5rem;
        height:1.5rem;
        border:0.04rem solid #FFF;
        border-radius:50%;
        line-height:1.5rem;
        position:absolute;
        top:50%;
        left:50%;
        box-shadow:0 0 0.5rem #fff;
        transform:translateX(-50%) translateY(-50%);
    }
    .pic-box{
        width:100%;
        background:url("../../../assets/sample.jpg") no-repeat 0 0;
        background-size:100% 2.773333rem;
        position:relative;
    }
    .submit-rt{
        float:left;
    }
    .continue-btn{
        width:100%;
        border-color: #999;
        color:#666;
    }
    .submit-img img{
        width:100%;
        height:2.773333rem;
    }
    .img-button{
        text-align:center;
    }

    .bigImg-back{
        position:fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        background:rgba(0,0,0,0.85);
        z-index:10;
    }
    .bigImg-back img{
        width:100%;
        position:absolute;
        top:50%;
        transform:translateY(-50%);
    }
</style>