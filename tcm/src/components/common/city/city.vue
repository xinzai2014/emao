 <template>
    <div class="dialog-back">
	    <div class="city-wrap">
            <div class="city-btn">
                <span>取消</span>
                <span>完成</span>
            </div>
            <div class="city-con">
                <div class="city-list" id="provinceWrap">
                    <ul>
                        <li></li>
                        <li></li>
                        <li v-for="(item,index) in cityData" @click="getCityData(item.id)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="city-list" id="cityWrap">
                    <ul>
                        <li v-for="(item,index) in perCityData" @click="getAreaData(item.id)">{{item.name}}</li>
                    </ul>
                </div>
                <div class="city-list" id="areaWrap">
                    <ul>
                        <li v-for="(item,index) in perAreaData" >{{item.name}}</li>
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
                    defaultCityID:1,
                    defaultAreaID:1
                },
                provinceScroll:null,
                cityScroll:null,
                areaScroll:null
            }
        },
        props: ['cityData'], 
        methods:{
            initScroll(scroller,scrollWrap){
                this[scroller] = new BScroll(document.getElementById(scrollWrap), {
                  startX: 0,
                  startY: 0,
                  click:true
                })
            },
            getCityData(id){
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
                    } 
                })
            },
            getAreaData(id){
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
                            }
                        })
                    } 
                })
            }
        },
        mounted(){
          this.getCityData(this.defaultData.defaultCityID);
          this.initScroll(this.provinceScroll,"provinceWrap");
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
}

</style>


