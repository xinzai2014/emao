<template>
    <section class="index-search">
        <div class="index-search-in">
            <p class="index-search-title">急需要什么车型？告诉我</p>
            <div class="index-search-condition">
                <div class="index-serach-type" @click="chooseCar">
                    <label for="" :brandID=carMess.carId>{{carMess.carName}}</label>
                    <i class="white-rt"></i>
                </div>
                <div class="index-search-price">
                    <label for="">期望价格：</label>
                    <input type="tel" v-model="carPrice">
                    <span>万元</span>
                </div>
            </div>
            <input type="submit" name="提交" value="提交" @click="submitForm">
        </div>
        <section class="brand-list-popup" v-show="needCarDialog">
          <div class="brand-popup-in">
            <div class="brand-search-tips">
              <p>服务顾问正在为你查找</br>找到后会及时和你联系</p>
            </div> 
            <div class="brand-popup-ok" @click="subDialog">好的</div>
          </div>
      </section>
    </section>
</template>

<script>
export default {
      name: 'search',
      props:["carMess"],
      data () {
        return {
          carPrice:null,
          needCarDialog:false
        }
      },
      methods:{
        chooseCar(){
            this.$emit('getCar',true);
        },
        submitForm(){
          if(!this.carMess.carId){
            console.log("请选择车型");
            return false;
          }
          if(!this.carPrice){
            console.log("请填写期望价格");
            return false;
          }
          console.log(this.carMess);
          this.$http.post(
                "car/choose",
                 {
                  token:sessionStorage.token,
                  brandId:this.carMess.brandId,
                  serieId:this.carMess.serieId,
                  autoId:this.carMess.carId,
                  price:this.carPrice
                 }
            ).then(function (response) {
              this.subDialog();
            }).catch(function (error) {
              console.log("请求失败了");
            });
        },
        subDialog(){
          this.needCarDialog = !this.needCarDialog;
        }
      },
      mounted(){
        
      },
      watch:{
      }
}
</script>
<style>
  .brand-list-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.brand-popup-in{position:fixed;top:50%;left:50%;width:7.2rem;height:4.4rem;margin-left:-3.6rem;margin-top:-2.2rem;font-size:.4533rem;border-radius:.1333rem;overflow:hidden;}
.brand-search-tips{height:2.1334rem;padding:1.0666rem 1.0rem 0 1.0rem;background-color:#fff;}
.brand-popup-ok{height:1.2rem;line-height:1.2rem;color:#fff;text-align:center;background-color:#d5aa5c;}
</style>