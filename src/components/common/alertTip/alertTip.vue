<template>
    <div class="alet_container fadeIn">
        <section class="tip_text_container">
            <p class="tip_text">{{alertTextState}}</p>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props: ['alertText'],
        mounted(){
            var that = this;
            setTimeout(function(){
                that.$store.dispatch("ALERT", // 通过store传值
                  {
                    flag:false,
                    text:""
                  }
                );
                that.$emit("closeTip");
            },2000);
        },
        methods: {
        },
        computed:{
            alertTextState(){
                return this.$store.state.alert.text||this.alertText;
            }
        }
    }
</script>

<style>
.alet_container{
    position:fixed;
    z-index:250; 
}

.tip_text{
    background: #666;
    color: white;
    padding: 0.2rem 0.5rem;
    position: fixed;
    left:50%;
    transform:translateX(-50%);
    bottom: 3rem;
    font-size: 0.35rem;
    background:rgba(0,0,0,0.75);
    white-space:nowrap;
    border-radius: .12rem
}
</style>
