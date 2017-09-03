<template>
<div>
    <!--首页-品牌列表-头部-->
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion" @click="goBack"></i>
        <strong class="brand-list-title" v-if="dataList">{{dataList.name}}</strong>
        <!-- <span class="brand-switch">全部配置</span> -->
    </header>
    <section>
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
*{box-sizing:border-box;}
.brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;position:fixed;width:100%;font-size:0.4rem}
.brand-left-cion{float:left;margin-left:.4666rem;margin-top:.4rem;}
.brand-switch{float:right;margin-right:.4666rem;font-size:.4rem;color:#d5aa5c;}

.config{overflow-x:auto;padding-top:1.1733rem;}
.config-left-con{float: left;width: 2.133rem;border-top: 1px solid #ccc;border-left: 1px solid #ccc;}
.config-right-con{display:inline-block;border-top: 1px solid #ccc;vertical-align: top;border-right: 1px solid #ccc;}
.config-nothing{width:2.133rem;height:1.7333rem;background-color:#fff;}
/*.row-head{line-height: .52rem;height: auto;border-bottom: 1px solid #ccc;}*/
.config-param-head{height:1.1733rem;}

.config-param-names .row-head{height:1.4267rem;white-space:nowrap;}
.config-param-names .row-head .cell-text{display:block;height:1.4267rem;padding-right:.1867rem;line-height:1.4267rem;color:#2c2c2c;font-size:.4rem;text-align: center;font-weight: 700;width:2.133rem;}
.config-left-con .config-param-names .row{height:1.36rem;background-color:#fff;border-top:1px solid #ccc;border-right:1px solid #ccc;}

.config-left-con .config-param-names .row .cell-text{display:block;font-size:.32rem;color:#666;line-height:1.36rem;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}

.config-param-head{height:1.733rem;background-color:#fff;}
.config-param-head .row-placeholder{height:1.733rem;}
.config-param-head .row-placeholder .row{height:1.733rem;}
.config-param-head .row-placeholder .row .cell{display:inline-block;width:3.2rem;height:1.733rem;color:#333;font-size:.32rem;padding-left:.24rem;padding-right:.24rem;border-left:1px solid #ccc;}

.config-param-list .row_head{height:1.4267rem;}
.config-param-list .row_head p{line-height: 1.4267rem;font-size:.4rem;padding-left:3.6rem;}
.config-param-list .row_head p span{display:inline-block;padding-right:.5333rem;}
.config-param-list .row{border-top:1px solid #ccc;background-color:#fff;height:1.36rem;}
.config-param-list .row .cell{display:inline-block;width:100%;border-right:1px solid #ccc;}
.config-param-list .row .cell-text{height:1.36rem;font-size:.32rem;color:#666;line-height:1.36rem;text-align:center;}

.config-right-con .head-fixed,.config-left-con .head-fixed{
    position:fixed;
    top:1.173rem;
    background:#f5f5f5
}
</style>

