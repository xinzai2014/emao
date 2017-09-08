<template>
    <div class="bigImg-back" @click="closeImg">
        <img :src = bigImg>
    </div>
</template>

<script>
    export default {
        data(){
            return{
            }
        },
        props: ['bigImg'],
        mounted(){
            
        },
        methods: {
            closeImg(){ 
                this.$emit("closeTip");
            }
        }
    }
</script>

<style>
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
