<template>

	<section class="index-car-source">
        <p class="index-car-title">本地车源</p>
        <ul class="index-car-con">
            <li v-for="(item,index) in serieList" :serieID = item.id  @click="goSerie(item.id)">
                <img :src= item.imgUrl alt="">
                <p class="index-car-name">{{item.name}}</p>
                <p class="index-car-price"><span>{{item.minPrice}}</span>万起</p>
                <p class="index-car-count">共<i>{{item.saleCars}}</i>个车型在售</p>
                <p class="index-car-sale">最高下降 <strong>{{item.maxFall}}万</strong></p>
            </li>
        </ul>
        <p class="index-more-brand" v-show="serieMore" @click="getSerie">查看更多 <i class="yellow-bt"></i></p>
    </section>

</template>

<script>
export default {
	  name: 'serie',
	  props:["serieList","initData","serieMore"],
	  data () {
	    return {
	      lookAll:true
	    }
	  },
	  methods:{
	  	seeMore(){
	  		this.lookAll = false;
	  	},
	  	getSerie(){ //获取车系数据
	       this.initData.token = sessionStorage.token;
	       this.initData.offset += this.initData.len;
	        this.$http({
	            url:"index",
	            method:"GET",
	            params:this.initData
	        }).then(function (response) {
	            this.serieList = this.serieList.concat(response.body.data.series);
	            if(response.body.data.series.length<this.initData.len){
	            	this.serieMore = !this.serieMore;
	            }
	          }).catch(function (error) {
	            console.log("请求失败了");
	          });
	    }
	  },
	  mounted(){
		
	  },
	  watch:{
	   
	  }
}
</script>