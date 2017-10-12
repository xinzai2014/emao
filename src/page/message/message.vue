<template>
    <div>
        <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>消息
        </header>
        <section class="news-wrap" v-if="showRemit">
            <div class="news-item" v-for="(item,index) in mesList">
              <router-link :to="'/message/'+item.url">
                <div class="news-lt">
                    <i class="envelope"></i>
                    <span v-if="item.num">{{item.num}}</span>
                </div>
                <div class="news-rt">
                    <p class="news-remind">{{item.typeName}}</p>
                    <p class="news-infos">{{item.content}}</p>
                    <p class="news-time">{{item.time}}</p>
                </div>
              </router-link>
            </div>
        </section>
        <section v-else class="no-auto server-no-response">
            <img src="../../assets/no-news.png" alt="">
            <p>暂无消息</p>
        </section>
        <transition name="router-slid">
            <router-view></router-view>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import alertTip from '../../components/common/alertTip/alertTip'
export default {
  data () {
    return {
      mesList:{},
      showRemit:false, //有没有数据
      showAlert: false, //弹出框
      alertText: null, //弹出信息
      url:''
    }
  },
        components:{
        alertTip
      },
  methods:{
    //组件方法
    resetIndex(){
      this.$router.push({ name: this.$store.state.messageFlag});              
    },
    fillData(){
        var dataToken =sessionStorage.token;
        var data = {
            token:dataToken,           
        }
        this.$http({
            url:"dealerMessage/messageList",
            method:"GET",
            params:data
        }).then(function (response) {
            var mesList=response.body.data;
            this.addUrl(mesList);
            this.mesList=mesList;
            this.dataLength();
        }).catch(function (error) {
             this.showAlert = true;
          this.alertText = error.body.msg||"请求失败了"; 
        });
    },
    dataLength(){
      if(this.mesList.length > 0){
        this.showRemit = true
      }else{
        this.showRemit = false
      }
    },
    addUrl(arr){
        for(var i=0;i<arr.length;i++){
          switch (arr[i].typeId){
            case '2' : 
                arr[i].url='display';  
            break;
            case '5' : 
                arr[i].url='storage';     
            break;
            case '1' : 
                arr[i].url='order';
            break; 
            case '3' : 
                arr[i].url='coupon';
            break; 
            case '4' : 
                arr[i].url='rebate';
            break;
            case '6' : 
                arr[i].url='inform';
            break;
          }
          
      }
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
  },

    beforeRouteEnter(to, from, next){
      next(vm => {
        if(from.name=="index"||from.name=="profile"){
            vm.$store.dispatch("MESSAGE_FLAG",from.name );
        } 
      });
    }

}
</script>

<style>
.rating_page{
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f5f5f5;
    width:10.0rem;
    z-index: 203;
   
}
.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}

/*消息*/
.news-wrap{
  background:#fff;
  padding:0 0.4rem;
}
.news-item{
  overflow:hidden;
  padding:0.533333rem 0;
  border-bottom:1px solid #2c2c2c;
}
.news-item:last-child{
  border-bottom:none;
}
.news-lt{
  float:left;
  width:2.0rem;
  position:relative;
}
.news-lt .envelope{
  width:1.066667rem;
  height:1.066667rem;
  display:inline-block;
  background:url(../../assets/envelope.png) no-repeat;
  background-size:contain;
  margin:0.2rem 0 0 0.2rem;
}
.news-lt span{
  color:#fff;
  font-size:0.293333rem;
  position:absolute;
  background:#ff0048;
  border-radius:100%;
  padding:0.04rem 0.133333rem;
  left:1.0rem;
  top:0.133333rem;
}
.news-rt{
  float:left;
  width: 7rem;
}
.news-remind{
  font-size:0.426667rem;
  color:#2c2c2c;
}
.news-infos{
  font-size:0.4rem;
  margin:0.266667rem 0;
}
.news-time{
  color:#999;
  font-size:0.346667rem;
}
.no-auto{padding-top:3.867rem;}
.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;}
.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;}
.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;}

.server-no-response .reflash{color:#d6ab55;}
.no-auto p span{color:#d6ab55;border-bottom:1px solid #d6ab55;}

</style>
