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
            this.$emit('subAlert',"请选择一款车型");
            return false;
          }
          // if(!this.carPrice){
          //   this.$emit('subAlert',"请输入期望价格");
          //   return false;
          // }
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

/*表单查询*/
.index-search{padding:.5333rem;}
.index-search-in{padding-top:.5333rem;box-shadow: 0 0 3px rgba(204, 192, 0, 0.5);background-color:#fff;}
.index-search-title{padding-left:.4rem;margin:0 0 .5333rem 0;font-size:.5066rem;color:#2c2c2c;border-left:2px solid #2c2c2c;}
.index-search-condition{padding-left:.4rem;padding-right:.4rem;font-size:.4266rem;color:#2c2c2c;}
.index-serach-type{height:.9327rem;padding-top:.5333rem;border-bottom:1px solid #e0e0e0;position:relative;}
.index-serach-type p{display:inline-block;width:5.1333rem;height:.5333rem;}
.index-serach-type i{position:absolute;top:50%;right:0;}
.index-search-price{height:.9327rem;padding-top:.5333rem;border-bottom:1px solid #e0e0e0;}
.index-search-price input{display:inline-block;width:4.8333rem;height:.5333rem;border:none;}
.index-search-in input[type="submit"]{width:100%;height:1.1733rem;margin-top:.5333rem;font-size:.3733rem;text-align:center;line-height:1.17333rem;color:#fff;border:none; background-color:#d6ab55;}


  .brand-list-popup{position:fixed;z-index:5;top:0;left:0;width:10rem;height:100%;background:rgba(0,0,0,0.8);}
.brand-popup-in{position:fixed;top:50%;left:50%;width:7.2rem;height:4.4rem;margin-left:-3.6rem;margin-top:-2.2rem;font-size:.4533rem;border-radius:.1333rem;overflow:hidden;}
.brand-search-tips{height:2.1334rem;padding:1.0666rem 1.0rem 0 1.0rem;background-color:#fff;}
.brand-popup-ok{height:1.2rem;line-height:1.2rem;color:#fff;text-align:center;background-color:#d5aa5c;}
</style>