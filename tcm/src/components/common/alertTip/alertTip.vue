<template>
    <div class="alet_container fadeIn">
        <section class="tip_text_container">

            <p class="tip_text">{{alertText}}</p>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        mounted(){
            var that=this;
            setTimeout(function(){
                that.closeTip();
            },2000);
        },
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip');
            }
        }
    }
</script>

<style>
.alet_container{
    position:fixed;
    z-index:25;
}

.tip_text{
    background: #666;
    color: white;
    padding: 0.25rem 0.5rem;
    position: fixed;
    left:50%;
    transform:translateX(-50%);
    bottom: 3rem;
    font-size: 0.35rem;
    background:rgba(0,0,0,0.75)
}
</style>
