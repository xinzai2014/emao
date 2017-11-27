<template>
<div>
    <!--首页-品牌列表-头部-->
    <header class="brand-list-header fixed-header">
        <i class="white-lt brand-left-cion" @click="goBack"></i>
        <strong class="brand-list-title" v-if="dataList">{{dataList.name}}</strong>
        <!-- <span class="brand-switch">全部配置</span> -->
    </header>
    <section class="configuration-wrap">
        <div class="config" ref="carWrap">
            <div class="config-left-con">
<!--                 <div class="config-nothing"></div> -->
                <div class="config-param-names" v-for = "(item,index) in dataList.param">
                    <div class="row-head row-heads">
                        <span class="cell-text" :class="{'head-fixed':scrollIndex == index}">{{item.name}}</span>
                    </div>
                    <div class="row" v-for="(e,i) in item.list">
                        <div class="cell">
                            <span class="cell-text">{{e.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="config-right-con">
                 <div class="config-param-list">
                    <template v-for = "(item,index) in dataList.param">
                        <div class="row_head">
                            <p :class="{'head-fixed':scrollIndex == index}">
                                <span>●标配</span><span>○选配</span><span>-无</span>
                            </p>
                        </div>
                        <div class="row" v-for="(e,i) in item.list">
                            <div class="cell">
                                <div class="cell-text">{{e.value}}</div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
          <div class="con-msg">注：以上仅供参考,请以实车为准</div>
        </div>

    </section>
</div>
</template>
<script>

    export default{
        name:'configuration',
        data(){
            return{
                autoId:null,
                dataList:{
                    name:""
                },
                scrollIndex:0,
                carScrollHeight:[]
            }
        },
        methods:{
            //获取数据
            goBack(){
                this.$router.go(-1);
            },
            getData(){
                this.$http({
                url:"car/param",
                type:"GET",
                params:{
                    token:sessionStorage.token,
                    autoId:this.autoId
                }
                }).then(function(reponse){
                    this.dataList = reponse.body.data.list[0];
                    setTimeout(()=>{
                        this.countHeight();
                    },100)
                },function(){

                })
            },
            countHeight(){ //记录初始楼层高度
                const carContainer = this.$refs.carWrap;
                const listArr = Array.from(carContainer.children[0].children);
                listArr.forEach((item, index) => {
                    this.carScrollHeight[index] = item.offsetTop;
                });
                var that = this;
                document.addEventListener('scroll',function(){
                    var scrollTop = document.body.scrollTop;
                    that.carScrollHeight.forEach((item,index) => {
                        if(scrollTop>item){
                            that.scrollIndex = index;
                        }
                    })
                })
            }, //滚动到指定位置
        },
        mounted(){
            var autoId = this.$router.currentRoute.query.id;
            //获取数据
            this.autoId = autoId;
            this.getData();

        },
        components:{

        },

    }
</script>
<style>
.configuration-wrap *{box-sizing:border-box;}
.fixed-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;position:fixed;width:100%;font-size:0.4rem}
.brand-switch{float:right;margin-right:.4666rem;font-size:.4rem;color:#d5aa5c;}

.config{padding-top:1.1733rem;}
.config-left-con{float: left;width: 2.133rem;border-top: 1px solid #ccc;border-left: 1px solid #ccc;}
.config-right-con{padding-left:2.133rem;border-top: 1px solid #ccc;vertical-align: top;border-right: 1px solid #ccc;}
.config-nothing{width:2.133rem;height:1.7333rem;background-color:#fff;}
/*.row-head{line-height: .52rem;height: auto;border-bottom: 1px solid #ccc;}*/
.config-param-head{height:1.1733rem;}

.config-param-names .row-head{height:1.4267rem;white-space:nowrap;}
.config-param-names .row-head .cell-text{display:block;height:1.4267rem;padding-right:.1867rem;line-height:1.4267rem;color:#2c2c2c;font-size:.4rem;text-align: left;font-weight: 700;width:6.133rem;padding-left:0.3rem;}
.config-left-con .config-param-names .row{width:2.1333rem;height:1.36rem;background-color:#fff;border-top:1px solid #ccc;border-right:1px solid #ccc;}
.config-left-con .config-param-names .row .cell{display:table-cell;height: 1.36rem;width:2.1333rem;vertical-align: middle;text-align: center;}
.config-left-con .config-param-names .row .cell-text{display:block;font-size:.32rem;color:#666;}

.config-param-head{height:1.733rem;background-color:#fff;}
.config-param-head .row-placeholder{height:1.733rem;}
.config-param-head .row-placeholder .row{height:1.733rem;}
.config-param-head .row-placeholder .row .cell{display:inline-block;width:3.2rem;height:1.733rem;color:#333;font-size:.32rem;padding-left:.24rem;padding-right:.24rem;border-left:1px solid #ccc;}

.config-param-list .row_head{height:1.4267rem;}
.config-param-list .row_head p{line-height: 1.4267rem;font-size:.4rem;width:100%;padding-left:4.5rem;}
.config-param-list .row_head p span{display:inline-block;padding-right:.2rem;}
.config-param-list .row{border-top:1px solid #ccc;background-color:#fff;height:1.36rem;}
.config-param-list .row .cell{display:inline-block;width:100%;}
.config-param-list .row .cell-text{height:1.36rem;font-size:.32rem;color:#666;line-height:1.36rem;text-align:center;}

.config-right-con .head-fixed{
    position:fixed;
    top:1.173rem;
    background:#f5f5f5;
    
}
.config-left-con .head-fixed{
    position:fixed;
    top:1.173rem;
    z-index:99;
    background:#f5f5f5;
}
.con-msg{
  line-height: 1.2rem;
  color:red;
  padding-left:0.25rem;;
  font-size:0.35rem;
}
</style>

