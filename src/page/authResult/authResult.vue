<template>
<!--注册认证-->
    <div>
        <div class="brand-header-out">
            <header class="brand-list-header">
                <i class="white-lt brand-left-cion" @click="goback"></i>
                <strong class="brand-list-title">提交成功</strong>
            </header>
        </div>
        <section class="no-auto submit-succeed">
            <img src="../../assets/submit-succeed.png" alt="">
            <p>认证资料已提交，请等待审核</p>
            <p class="tips">请保持您的电话畅通，会有区域经理与您联系</p>
            <div class="submit-succeed-tel"><i></i>400-000-1234</div>
        </section>
    </div>
</template>
<script>

    export default{
        name:'authResult',
        data(){
            return{

            }
        },
        mounted(){

        },
        methods:{
            goback(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style>

.brand-header-out{position:relative;z-index:3;}
.brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;}
.brand-left-cion{float:left;margin-left:.4666rem;margin-top:.4rem;}

.no-auto{padding-top:3.867rem;background-color:#fff;}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}

.server-no-response .reflash{color:#d6ab55;}
.no-auto p span{color:#d6ab55;border-bottom:1px solid #d6ab55;}
.submit-succeed .tips{color:#999;font-size:.373rem;}
.submit-succeed-tel{position:relative;margin:5.467rem auto 0;font-size:.32rem;color:#d6ab55;text-align:center;}
.submit-succeed-tel i{position:absolute;left:3.333rem;top:1px;display:block;width:.3067rem;height:.3607rem;background:url("../../assets/phone-active-icon.png") no-repeat;background-size:.3067rem .3067rem;}

.network-or-server-exceptions{position:absolute;top:1.1733rem;width:8.667rem;height:1.0667rem;padding-left:1.333rem;  line-height:1.0667rem;color:#fff;font-size:.353rem;background:rgba(0,0,0,0.8);}
.network-or-server-exceptions i{position:absolute;left:.6667rem;top:.3467rem;display:block;width:.4667rem;height:.3467rem;background:url("../../assets/electric-network-icon.png") no-repeat;background-size:.4667rem .3467rem;}



</style>

