 <template>
    <div class="alet_container">
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
.tip_text{
    background: #666;
    color: white;
    padding: 0.15rem;
    position: fixed;
    right: 0.4rem;
    bottom: 3rem;
    font-size: 0.4rem;
}
</style>
