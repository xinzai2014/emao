<template>
    <div>
        <!--头部-->
        <header class="user-tit">
          <a href="javascript:;" class="white-lt" @click="resetIndex"></a>消息
        </header>
        <section class="news-wrap">
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
        <transition name="router-slid">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      mesList:{}
    }
  },
  methods:{
    //组件方法
    resetIndex(){
        this.$router.go(-1);
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
        }).catch(function (error) {
             console.log("请求失败了");
        });
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
    min-height:120%;
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
</style>
