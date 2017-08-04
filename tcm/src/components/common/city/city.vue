 <template>
    <div class="dialog-back" @click="closeCityDialog">
	    <div class="city-wrap">
            <div class="city-btn">
                <span @click="closeCityDialog">取消</span>
                <span @click="getChooseData">完成</span>
            </div>
            <div class="city-con">
                <div class="city-list" id="provinceWrap">
                    <ul>
                        <li></li>
                        <li></li>
                        <li v-for="(item,index) in cityData" :class="{active:defaultData.defaultProcinveID == item.id}"  @click.stop="getCityData(item.id,item.name)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="city-list" id="cityWrap">
                    <ul>
                        <li></li>
                        <li></li>
                        <li v-for="(item,index) in perCityData" :class="{active:defaultData.defaultCityID == item.id}" @click.stop="getAreaData(item.id,item.name)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="city-list" id="areaWrap">
                    <ul>
                        <li></li>
                        <li></li>
                        <li v-for="(item,index) in perAreaData" :class="{active:defaultData.defaultAreaID == item.id}" @click.stop="updateAreaData(item.id,item.name)">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
    	data(){
            return{
                perCityData:null,
                perAreaData:null,
                defaultData:{
                    defaultProcinveID:1,
                    defaultCityID:1,
                    defaultAreaID:1
                },
                provinceScroll:null,
                cityScroll:null,
                areaScroll:null,
                postData:{
                    provinceData:null,
                    cityData:null,
                    areaData:null
                }
            }
        },
        props: ['cityData'], 
        methods:{
            closeCityDialog(){  //取消城市弹出窗
                this.$emit("closeCity");
            },
            getChooseData(){   //选取城市
                this.$emit("closeCity",this.postData);
            },
            initScroll(scroller,scrollWrap){
                this[scroller] = new BScroll(document.getElementById(scrollWrap), {
                  startX: 0,
                  startY: 0,
                  click:true
                })
            },
            getCityData(id,name){
                var that = this;
                this.defaultData.defaultCityID = id;
                this.cityData.forEach(function(item,index){ 
                    if(item.id == id){
                        that.perCityData = item.city;
                        if(that.cityScroll == null){
                            that.initScroll("cityScroll","cityWrap");
                        }else{
                            setTimeout(function(){
                                 that.cityScroll.refresh();
                            },500)
                        }
                        that.defaultData.defaultProcinveID = id;
                    } 
                })
                this.postData["provinceData"] = {
                    id:id,
                    name:name
                };
            },
            getAreaData(id,name){
                var that = this;
                this.defaultData.defaultAreaID = id;
                this.cityData.forEach(function(item,index){ 
                    if(item.id == that.defaultData.defaultCityID){
                        item.city.forEach(function(e,i){
                            if(e.id == id){
                                that.perAreaData = e.district;
                                if(that.areaScroll == null){
                                    that.initScroll("areaScroll","areaWrap");
                                }else{
                                    setTimeout(function(){
                                         that.areaScroll.refresh();
                                    },500)
                                }
                                that.defaultData.defaultCityID = id;
                            }
                        })
                    } 
                })
                this.postData["cityData"] = {
                    id:id,
                    name:name
                };
            },
            updateAreaData(id,name){
                this.defaultData.defaultAreaID = id;
                this.postData["areaData"] = {
                    id:id,
                    name:name
                };
            }
        },
        mounted(){
          this.getCityData(this.defaultData.defaultCityID);
          this.getAreaData(this.defaultData.defaultCityID);
          this.initScroll("provinceScroll","provinceWrap");
        }
    }
</script>

<style>

.dialog-back{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.75);
}

.city-wrap{
    position:fixed;
    width:100%;
    bottom:0;
}

.city-btn{
    height:1.2rem;
    line-height:1.2rem;
    font-size:0.45rem;
    color:#d6ab55;
    padding:0 0.45rem;
    background:#fff;
}

.city-btn span:nth-of-type(1){
    float:left;
}

.city-btn span:nth-of-type(2){
    float:right;
}

.city-con{
    background:#ededed;

}

.city-con::after{
    clear:both;
    content:"";
    display:block;
}

.city-list{
    width:33.33%;
    float:left;
    padding:0.25rem 0;
    height:6rem;
    overflow:hidden;
}

.city-list li{
    line-height:1rem;
    height:1rem;
    text-align:center;
    font-size:0.35rem;
    color:#b3b4b6;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}

.city-list li.active{
    color:#333;
}

</style>





