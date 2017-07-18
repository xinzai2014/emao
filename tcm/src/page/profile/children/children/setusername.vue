<template>
    <div class="rating_page">
       <!--头部-->
    <header class="user-tit">
        <a href="javascript:;" @click="resetIndex" class="white-lt"></a>姓名
    </header>
    <!--编辑姓名-->
    <section class="user-wrap">
        <div class="edit-name">
            <input type="text" name="name" placeholder="编辑姓名">
            <i v-show="cloneIcon" class="close-icon"></i>
        </div>
        <button class="close-bt">完成</button>
    </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {
              //初始数据结构
              cloneIcon:false
            }
        },
        methods:{
            //组件方法
            resetIndex(){
                this.$router.go(-1);
            }
        },
        mounted(){
        //组件初始完成需要做什么
            var Token = sessionStorage.getItem('token');
            var data = {
                token:Token,
            }
            this.$http({
                url:"dealerInfo/info",
                method:"GET",
                params:data
            }).then(function (response) {
                this.infoData = response.body.data;
                console.log("请求成功了");
            }).catch(function (error) {
                console.log("请求失败了");
            });

        }
    }   
</script>

<style>
.rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    width:10.0rem;
    z-index: 202;
}
/*编辑姓名*/
.edit-name{
    background:#fff;
    padding:0.4rem;
    font-size:0.4rem;
    color:#2c2c2c;
    position:relative;
}
.edit-name input{
    height:0.4rem;
    line-height:0.4rem;
    border:none;
    width:8.4rem;
}
.edit-name .close-icon{
    position:absolute;
    top:0.506667rem;
    right:0.533333rem;
}
.user-wrap .close-bt{
    margin-top:1.066667rem;
}
</style>
