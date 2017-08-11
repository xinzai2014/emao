<template>
<div>
    <!--首页-品牌列表-头部-->
    <header class="brand-list-header">
        <i class="white-lt brand-left-cion" @click="goBack"></i>
        <strong class="brand-list-title" >{{serieName}}</strong>
        <span class="brand-switch">全部配置</span>
    </header>
    <section>
        <div class="config marb">
            <div class="config-left">
                <div class="config-nothing"></div>
            </div>
            <div class="config-right">
                <div class="config-param-list">
                    <div class="config-wrap">
                        <ul v-drag="drag" ref="dragCompare">
                            <li class="config-list" v-for = "(itemWrap,indexWrap) in dataList">
                                <p class="config-list-t1">{{itemWrap.name}}</P>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="config" ref="carWrap">         
            <div class="config-left">  
                <template  v-for = "(itemWrap,indexWrap) in dataList" v-if="indexWrap == 0">
                    <div class="config-param-names" v-for = "(item,index) in itemWrap.param">
                        <div class="row-head row-heads">
                            <span class="cell-text">{{item.name}}</span>
                        </div>
                        <div class="row" v-for="(e,i) in item.list">
                            <div class="cell">
                                <span class="cell-text" <!-- v-if = !e.diff -->{{e.name}}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="config-right">
                 <div class="config-param-list">
                    <div class="config-wrap">
                        <ul v-drag="drag" ref="dragContent">
                            <li class="config-list" v-for = "(itemWrap,indexWrap) in dataList">
                                <template v-for = "(item,index) in itemWrap.param">
                                    <div class="config-list-t2">
                                        <template v-if="indexWrap == 0">
                                            <span>●标配</span><span>○选配</span><span>-无</span>
                                        </template>
                                    </div>
                                    <div class="table-row" v-for="(e,i) in item.list">
                                     <em class="config-list-t3" >{{e.value}}</em>
                                    </div>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="row_head">
                        <p >
                            <span>●标配</span><span>○选配</span><span>-无</span>
                        </p>
                    </div>
                    <div class="row" v-for="(e,i) in item.list">
                        <div class="cell">
                            <div class="cell-text">{{e.value}}</div>
                        </div>
                    </div> -->
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
                serieName:null,
                dataList:[],
                scrollIndex:0,
                carScrollHeight:[],
                drags:[]
            }
        },
        created:function(){
            this.$nextTick(()=>{
                //console.log(this.$refs.drag);
            })
        },
        methods:{
            drag(style){
                this.$refs.dragCompare.style.left=style.left;
                this.$refs.dragCompare.style.top=style.top;
                this.$refs.dragContent.style.left=style.left;
                this.$refs.dragContent.style.top=style.top;
            },
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
                    this.dataList = reponse.body.data.list;
                    //console.log(this.dataList);
                    this.serieName = reponse.body.data.name;
                    this.getDifferent();
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
            getDifferent(){
                var dataArray = [];
                var that = this;
                this.dataList.forEach(function(item,index){
                    var num = 0;
                    item.param.forEach(function(e,i){
                        e.list.forEach(function(it,ind){
                            if (typeof(dataArray[num]) == 'undefined') {
                                dataArray[num] = [];
                            }
                            //dataArray[index][i][ind] = it.name + "---" + it.value;
                            // console.log(dataArray);
                            // console.log(dataArray.length);
                            var flag = dataArray[num].find(function(value, index, arr) {
                              return value == it.value;
                            })
                            if (!flag) {
                                dataArray[num].push(it.value);
                            }
                            num++;
                        })
                    })
                });

                //console.log(dataArray);

                this.dataList.forEach(function(item,index){
                    var num = 0;
                    item.param.forEach(function(e,i){
                        e.list.forEach(function(it,ind){
                            var diff = (dataArray[num].length == 1) ? true : false;
                            that.dataList[index]['param'][i]['list'][ind]['diff'] = diff;
                            num++;
                        })
                    })
                });
                //console.log(this.dataList);
                
            },
        },
        mounted(){
            var autoId = this.$router.currentRoute.query.id;
            //console.log(autoId);
            //获取数据
            this.autoId = autoId;
            this.getData();

        },
        components:{

        },
        directives:{
            drag:{
                bind:function (el, binding) {
                    var that=this;
                    function Drag(ele){
                      this.ele=ele;
                    }
                    Drag.prototype={
                       fndown:function(event){
                           let _this=this;
                           let touch = event.touches[0]; //获取第一个触点
                           let startX = Number(touch.pageX); //页面触点X坐标
                           let startY = Number(touch.pageY); //页面触点Y坐标
                           this.disP={
                               x:startX-this.ele.offsetLeft,
                               y:startY-this.ele.offsetTop
                           };
                           _this.bindmove=function(event){
                                _this.fnmove(event);
                           }
                           _this.bindup=function(event){
                                _this.fnup(event);
                           }
                           document.addEventListener('touchmove',_this.bindmove,false);
                           document.addEventListener('touchend',_this.bindup,false);
                       },
                       fnmove:function(event){
                            let touch = event.touches[0]; //获取第一个触点
                            let x = Number(touch.pageX); //页面触点X坐标
                            let y = Number(touch.pageY); //页面触点Y坐标
                            this.move={
                                x:x-this.disP.x,
                                y:y-this.disP.y
                            };
                            var sizePx=parseInt(document.getElementsByTagName('html')[0].style.fontSize);
                            var sizeRem=this.move.x/sizePx;
                            if(this.move.x>0){
                                this.move.x=0;
                                this.ele.style.left=this.move.x+'px';
                            }else if(sizeRem<'-5'){
                                this.ele.style.left='-5rem';
                            }else{
                                this.ele.style.left=this.move.x+'px';
                            }
                            this.ele.style.top=this.ele.offsetTop+'px';
                            var style={
                                left:this.ele.style.left,
                                top:this.ele.style.top
                            }
                            binding.value(style);
                       },

                       fnup:function(){
                            var _this=this;
                            document.removeEventListener('touchmove',_this.bindmove);
                            document.removeEventListener('touchend',_this.bindup);
                       },
                       init:function(){                        
                           var self=this;
                           self.ele.addEventListener('touchstart', function(event) {
                                event=event||window.event;
                                self.fndown(event);
                                return false;
                            },false);
                       }

                    };
                    let drag=new Drag(el);
                    drag.init();

                }
            }
        },

    }
</script>
<style>
.table-row{
    display: table;
    width: 100%;
}
*{box-sizing:border-box;}
.brand-list-header{overflow:hidden;height:1.1733rem;text-align:center;line-height:1.1733rem;font-size:.5333rem;color:#fff;background-color:#27282f;position:fixed;width:100%;z-index: 5;}
.brand-left-cion{float:left;margin-left:.4666rem;margin-top:.4rem;}
.brand-switch{float:right;margin-right:.4666rem;font-size:.4rem;color:#d5aa5c;}
.marb{padding-top:1.1733rem;}
.config{display: table; width: 100%;}
.config-left{display: table-cell;width: 2.133rem;border-top: 1px solid #ccc;border-left: 1px solid #ccc;}
.config-right{display: table-cell;
    overflow: hidden;
    position: relative;border-top: 1px solid #ccc;vertical-align: top;border-right: 1px solid #ccc;}
.config-nothing{width:2.133rem;height:1.7333rem;background-color:#fff;}
/*.row-head{line-height: .52rem;height: auto;border-bottom: 1px solid #ccc;}*/
.config-param-head{height:1.1733rem;}

.config-param-names .row-head{height:1.4267rem;white-space:nowrap;}
.config-param-names .row-head .cell-text{display:block;height:1.4267rem;padding-right:.1867rem;line-height:1.4267rem;color:#2c2c2c;font-size:.4rem;text-align: center;font-weight: 700;width:2.133rem;background:#f5f5f5}

.config-param-names .row{display: table;
    width: 100%;}
.config-param-names .row .cell{display: table-cell;height:1.36rem;background-color:#fff;border-top:1px solid #ccc;border-right:1px solid #ccc;vertical-align: middle;text-align: center;}


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

.head-fixed{
    position:fixed;
    top:1.173rem;
    background:#f5f5f5
}

.config-list{width:3.2rem;float:left;}

.config-wrap ul{width:12.8rem;position: absolute;}
.config-list-t1{height:1.733rem;padding:0.25rem 0.15rem;background:#FFF;border-left:1px solid #CCC;}
.config-list-t2{line-height:1.4267rem;height:1.4267rem;text-align:right;}
.config-list-t3{    height: 1.36rem;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background: #FFF;
    border-top: 1px solid #CCC;
    border-right: 1px solid #CCC;}
</style>

