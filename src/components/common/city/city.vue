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
                        <li v-for="(item,index) in cityData" :class="{active:defaultData.defaultProcinveID == item.id}"  @click.stop="getCityData(item.id,item.name,index)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="city-list" id="cityWrap">
                    <ul>
                        <li></li>
                        <li></li>
                        <li v-for="(item,index) in perCityData" :class="{active:defaultData.defaultCityID == item.id}" @click.stop="getAreaData(item.id,item.name,index)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="city-list" id="areaWrap">
                    <ul>
                        <li></li>
                        <li></li>
                        <li v-for="(item,index) in perAreaData" :class="{active:defaultData.defaultAreaID == item.id}" @click.stop="updateAreaData(item.id,item.name,index)">{{item.name}}</li>
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
                cityData:null, //全部省市区数据
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
                defaultProvinceIndex:null, //默认省值索引
                defaultCityIndex:null,     //默认市值索引
                defaultAreaIndex:null,     //默认地区值索引
                postData:{
                    provinceData:null,
                    cityData:null,
                    areaData:null
                }
            }
        },
        props:["defaultCityData","showCity"],
        methods:{
            getCity(){
                var that = this;
                this.$http.get(
                    "area?token=" + sessionStorage.token
                    ).then(function(reponse){
                        this.cityData = reponse.body.data;
                        //获取默认值 省
                       this.defaultProvinceIndex = this.getDefalultIndex(this.cityData,this.defaultData.defaultProcinveID,"provinceData");

                       // //获取市默认值
                       this.perCityData = this.cityData[this.defaultProvinceIndex].city;
                       this.defaultCityIndex = this.getDefalultIndex(this.perCityData,this.defaultData.defaultCityID,"cityData");

                        //获取区默认值
                        this.perAreaData = this.perCityData[this.defaultCityIndex].district;
                        this.defaultAreaIndex = this.getDefalultIndex(this.perAreaData,this.defaultData.defaultAreaID,"areaData");

                        if(this.defaultCityData.length){
                            this.getChooseData();
                        }

                    },function(error){

                })
            },
            getDefalultIndex(data,defaultID,flag){
                var defaulIndex = data.findIndex(function(ele,index,arr){
                    return ele.id == defaultID;
                })
               defaulIndex = (defaulIndex == -1)?0:defaulIndex;
               console.log(defaulIndex);
               if(this.defaultCityData){ //如果传入值，就要回显
                    this.postData[flag] = {
                        id:data[defaulIndex]["id"],
                        name:data[defaulIndex]["name"]
                    };
                };
               return defaulIndex;
            },
            closeCityDialog(){  //取消城市弹出窗
                this.$emit("closeCity");
            },
            getChooseData(){   //选取城市
                this.$emit("closeCity",this.postData);
            },
            initScroll(scroller,scrollWrap,index){
                setTimeout(()=>{
                    this[scroller] = new BScroll(document.getElementById(scrollWrap), {
                      startX: 0,
                      startY: 0,
                      click:true
                    })

                    this.scrollToElement(scroller,scrollWrap,index);
                })
            },
            scrollToElement(scroller,scrollWrap,index){
                this[scroller].scrollToElement(document.getElementById(scrollWrap).children[0].getElementsByTagName("li")[index]);
            },
            getCityData(id,name,index){
                this.defaultProvinceIndex = index;
                this.perCityData = this.cityData[this.defaultProvinceIndex].city;
                this.defaultData.defaultProcinveID = id;
                this.scrollToElement("provinceScroll","provinceWrap",this.defaultProvinceIndex);
                this.postData["provinceData"] = {
                    id:id,
                    name:name
                };

                //改变省的时候，市需要重新初始化滚动，另外地区需要更新数据并重新初始化
                var firstItem = this.perCityData[0]; //默认选中第一个
                this.postData["cityData"] = {
                  id:firstItem.id,
                  name:firstItem.name
                };
                this.defaultData.defaultCityID = firstItem.id;
                this.defaultCityIndex = 0;

                //更新市
                var firstAreaItem =  firstItem["district"][0];
                this.defaultData.defaultAreaID = firstAreaItem.id;

                this.perAreaData = this.perCityData[0]["district"];
                this.updateAreaData(firstAreaItem.id,firstAreaItem.name,0);

                this.initCityScroll();
            },
            getAreaData(id,name,index){
                this.defaultCityIndex = index;
                this.defaultData.defaultCityID = id;
                this.scrollToElement("cityScroll","cityWrap",index);
                this.scrollToElement("areaScroll","areaWrap",0);
                this.postData["areaData"] = {
                    id:id,
                    name:name
                };
                this.perAreaData = this.perCityData[index]["district"]
                var firstAreaItem =  this.perAreaData[0];
                this.updateAreaData(firstAreaItem.id,firstAreaItem.name,0);
            },
            updateAreaData(id,name,index){
                this.defaultAreaIndex = index;
                this.defaultData.defaultAreaID = id;
                this.scrollToElement("areaScroll","areaWrap",this.defaultAreaIndex);
                this.postData["areaData"] = {
                    id:id,
                    name:name
                };
                this.defaultData.defaultAreaID = id;
            },
            initCityScroll(){
                this.initScroll("provinceScroll","provinceWrap",this.defaultProvinceIndex);
                this.initScroll("cityScroll","cityWrap",this.defaultCityIndex);
                this.initScroll("areaScroll","areaWrap",this.defaultAreaIndex);
            }
        },
        mounted(){
            if(this.defaultCityData.length){ //如果传入了值的话，就用传入的值，否则用默认到北京北京
                this.defaultData.defaultProcinveID = this.defaultCityData[0];
                this.defaultData.defaultCityID = this.defaultCityData[1];
                this.defaultData.defaultAreaID = this.defaultCityData[2];
            }else{
               this.defaultData.defaultProcinveID = 1;
               this.defaultData.defaultCityID = 1;
               this.defaultData.defaultAreaID = 1;
            };
          this.getCity();
        },
        watch:{
          showCity(){
              if(!this.provinceScroll){
                 this.initCityScroll();
              }
          }
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
    z-index:100;
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





