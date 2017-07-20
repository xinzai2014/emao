<template>
    <div>
        23
    </div>
</template>

<script>
export default {
  data () {
    return {
        
    }
  },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.push({name:''});
    },
    fillData(){
        var dataToken = sessionStorage.token;
        var data = {
            token:dataToken,
        }
        this.$http({
            url:"dealer/coupon",
            method:"GET",
            params:data
        }).then(function (response) {

            
        }).catch(function (error) {
            console.log("请求失败了");
        });
    }
  },
  mounted(){
    //组件初始完成需要做什么
    this.fillData();
    
  },
  watch:{ 
    $route(){
        this.fillData();
    }
  }

}
</script>

<style>

</style>
