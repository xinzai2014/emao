<template>
    <section class="index-search">
        <div class="index-search-in">
            <p class="index-search-title">急需要什么车型？告诉我</p>
            <div class="index-search-condition">
                <div class="index-serach-type" @click="chooseCar">
                    <label for="" :brandID=carMess.brandID>{{carMess.brandName}}</label>
                    <i class="white-rt"></i>
                </div>
                <div class="index-search-price">
                    <label for="">期望价格：</label>
                    <input type="tel">
                    <span>万元</span>
                </div>
            </div>
            <input type="submit" name="提交" value="提交">
        </div>
    </section>
</template>

<script>
export default {
      name: 'search',
      props:["carMess"],
      data () {
        return {

        }
      },
      methods:{
        chooseCar(){
            this.$emit('getCar',true);
        }
      },
      mounted(){
        
      },
      watch:{
       
      }
}
</script>