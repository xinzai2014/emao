<template>
	<div>
		<header class="brand-list-header header-fixed">
			<i class="white-lt brand-left-cion"></i> 
			<strong class="brand-list-title">授权店认证</strong>
	        <a href="javascript:;" class="auth-tel"></a>
		</header>
	    <section class="empower">
	        <div class="empower-tit">
	            <em>审核未通过</em>
	            <span>原因：经核对，您提交的审核资料存在以下问题：1.二手车经纪资质与实际不符； 2.用品加装与汽车美容资质与实际不符 ，以上信息请重新填写后上传。</span>
	        </div>
	        <div class="empower-info">
	        	<div class="empower-item empower-stall">
	        		<label>选择意向授权产品档位</label>
	        		<p v-for="(item,index) in itemsStall" :class="{active:item['flag']}" @click="ActiveStall(item)">
	        			<span>{{item.name}}</span>
	        			<em>{{item.value}}</em>
	        		</p>
	        		
	        	</div>
	        	<h3>经营概况</h3>
	        	<div class="empower-item empower-sales">
	        		<label>店铺月均销量</label>
	        		<input type="number"  v-model="carNum" ref="carNum" maxlength="5">
	        		<i>台</i>
	        	</div>
	        	<div class="empower-item">
	        		<div class="item-info">
	        			<label>用品加装与汽车美容资质<i @click="aptitudeShow(1)"></i></label>
		        		<div class="empower-limts-con">
		        			<em v-for="(item,index) in itemsAptitude" :class="{active:item['flag']}" @click="ActiveAptitude(item)"><i></i>{{item.name}}</em>
		        		</div>
	        		</div>
	        		<div class="item-info">
	        			<label>用品加装与汽车美容能力</label>
		        		<div class="empower-limts-con">
		        			<em v-for="(item,index) in itemsAbility" :class="{active:item['flag']}" @click="ActiveAbility(item,index)"><i></i>{{item.name}}</em>
		        		</div>
		        		<div class="empower-uploader" v-show="AbilitySelect">
		        			<div class="empower-text">美容车间照片</div>
                    		<uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
		        		</div>
	        		</div>
	        	</div>
				<div class="empower-item">
	        		<div class="item-info">
	        			<label>二手车经纪资质<i @click="aptitudeShow(0)"></i></label>
		        		<div class="empower-limts-con">
		        			<em v-for="(item,index) in itemsBroker" :class="{active:item['flag']}" @click="ActiveBroker(item)"><i></i>{{item.name}}</em>
		        		</div>
	        		</div>
	        		<div class="item-info">
	        			<label>二手车评估能力</label>
		        		<div class="empower-limts-con">
		        			<em v-for="(item,index) in itemsEvaluating" :class="{active:item['flag']}" @click="ActiveEvaluating(item,index)"><i></i>{{item.name}}</em>
		        		</div>
		        		<div class="empower-uploader" v-show="EvaluatingSelect">
		        			<div class="empower-text">二手车评估资质证书照片</div>
                    		<uploader :uploadData="uploadData2" @getUpload="getUpload"></uploader>
		        		</div>
	        		</div>
	        	</div>
	        	<div class="empower-item">
	        		<div class="item-info">
	        			<label>是否开展汽车金融业务</label>
		        		<div class="empower-limts-con">
		        			<em v-for="(item,index) in itemsFinancing" :class="{active:item['flag']}" @click="ActiveFinancing(item,index)"><i></i>{{item.name}}</em>
		        		</div>
		        		<input class="channel" type="text"  v-show="FinancingSelect"  v-model="channel" ref="channel" placeholder="请注明金融渠道，例如某银行或第三方">
	        		</div>
	        		<div class="item-info">
	        			<label>是否开展平行进口车业务</label>
		        		<div class="empower-limts-con">
		        			<em v-for="(item,index) in itemsParallel" :class="{active:item['flag']}" @click="ActiveParallel(item,index)"><i></i>{{item.name}}</em>
		        		</div>
		        		<div class="empower-uploader" v-show="ParallelSelect">
		        			<div class="empower-text">店内进口展车照片</div>
                    		<uploader :uploadData="uploadData3" @getUpload="getUpload"></uploader>
		        		</div>
	        		</div>
	        	</div>
	        	<h3>公司信息</h3>
	        	<div class="empower-item empower-sales">
	        		<label>展厅面积</label>
	        		<input type="number"  v-model="area" ref="area">
	        		<i>㎡</i>
	        	</div>
	        	<div class="empower-item">
	        		<div class="item-info">
	        			<label>股权结构</label>
		        		<div class="empower-limts-con">
		        			<em v-for="(item,index) in itemsStock" :class="{active:item['flag']}" @click="ActiveStock(item,index)"><i></i>{{item.name}}</em>
		        		</div>
		        		<div class="empower-tabel" v-show="StockSelect">
		        			<div class="empower-text"><i></i>请输入股东姓名和股权占比</div>
                    		<div class="empower-ratio">
                    			<p class="ratio-tit">
                    				<em>股东姓名</em>
                    				<em>股权占比</em>
                    			</p>
                    			<div class="ratio-info">
                    				<p v-for="(item,index) in itemsTabel">
	                    				<em><input type="text" v-model="item.name" /></em>
	                    				<em><input type="number" v-model="item.percent"/>%</em>
	                    			</p>
                    			</div>
                    		</div>
                    		<div class="empower-btn">
                    			<span class="add" @click="addTable">添加<em></em></span>
                    			<span class="del" @click="delTable">删除<em></em></span>
                    		</div>
		        		</div>
	        		</div>
	        	</div>
	        	<a href="javascript:;" class="empower-submit" @click="checkFormData">提交</a>
	        </div>
	    </section>
	    <!--弹框-->
	    <div class="mask">
	        <div class="cancel-car">
	            <p class="prompt-tit">拨打客服电话<br/>400-825-2368</p>
	            <p class="prompt-btn"><span>点错了</span><span class="confirm"><a href="tel:400-825-2368">确定</a></span></p>
	        </div>
	    </div>
	    <div class="prompt" v-show="aptitude_layer">
	        <div class="cancel-car">
	            <p class="prompt-tp">{{aptitude_text}}</p>
	            <p class="prompt-bt" @click="aptitudeHide">知道了</p>
	        </div>
	    </div>
	</div>
</template>
<script>
	import uploader from '@/components/common/uploader/uploader'

	export default {
		name: 'empower',
		data () {
		    return{
		    	carNum:'',//台数
		    	channel:'',//渠道
		    	area:'',//展厅面积
		    	uploadData1:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"plant",
                    image:"static/sample20.jpg"
                },
                uploadData2:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"diploma",
                    image:"static/sample21.jpg"
                },
                uploadData3:{
                    url:"https://tcmapi.emao.com/upload",
                    count:1,
                    flag:"showcar",
                    image:"static/sample22.png"
                },
                dataURL:{},
                booth_plant_img:'',
                booth_diploma_img:'',
                booth_showcar_img:'',
                aptitude_layer:false, //美容资质
                aptitude_text:'',//弹框内容
                itemsStall:[
                	{ name: '普通档产品',value:'（16万以内）',type:1,flag:false},
		            { name: '高档档产品',value:'（16万以以上）',type:2,flag:false}
                ],
                itemsAptitude: [
		            { name: '具备',type:1,flag:false},
		            { name: '不具备',type:2,flag:false},
		        ],
		        itemsAbility: [
		            { name: '具备', type:1,flag:false},
		            { name: '不具备',type:2,flag:false},
		        ],
		        itemsBroker: [
		            { name: '具备', type:1,flag:false},
		            { name: '不具备',type:2,flag:false},
		        ],
		        itemsEvaluating: [
		            { name: '具备', type:1,flag:false},
		            { name: '不具备',type:2,flag:false},
		        ],
		        itemsFinancing: [
		            { name: '已开展',type:1,flag:false},
		            { name: '未开展',type:2,flag:false},
		        ],
		        itemsParallel: [
		            { name: '已开展',type:1,flag:false},
		            { name: '未开展',type:2,flag:false},
		        ],
		        itemsStock: [
		            { name: '单一股东',type:1,flag:false},
		            { name: '多股东',type:2,flag:false},
		        ],
		        itemsTabel: [
		            { name: '',percent:''},
		            { name: '',percent:''},
		        ],
		        AbilitySelect:false,
		        EvaluatingSelect:false,
		        FinancingSelect:false,
		        ParallelSelect:false,
		        StockSelect:false,
		        types:'',
		        AptitudeType:'',
		        AbilityType:'',
		        BrokerType:'',
		        EvaluatingType:'',
		        FinancingType:'',
		        ParallelType:'',
		        StockType:'',
		        percentNum:0 //股份百分比
		    }
		},
		methods:{
			//提示弹框
			aptitudeShow(type){
				this.aptitude_layer = !this.aptitude_layer;
				if(type){
					this.aptitude_text = '用品家装与汽车美容资质，即在营业执照经营范围中是否涵盖此项'
				}else{
					this.aptitude_text = '二手车经纪资质，即在营业执照经营范围中是否涵盖此项'
				}
			},
			aptitudeHide(){
				this.aptitude_layer = !this.aptitude_layer;
			},
			ActiveStall(item){ //产品档位
				var that = this;
                item["flag"] = !item["flag"];
                var type = [];
                this.itemsStall.forEach(function(item,index){
                    if(item.flag == true){
                        type.push(item.type);
                    }
                })
                this.types = type;
			},
			ActiveAptitude(item){ //美容资质
				this.itemsAptitude.forEach((ele,index)=>{
                    ele.flag = false;
                })
				item["flag"] = !item["flag"];
				this.AptitudeType = item.type;
			},
			ActiveAbility(item,index){//美容能力
				this.itemsAbility.forEach((ele,index)=>{
                    ele.flag = false;
                })
				item["flag"] = !item["flag"];
				if(!index){
					this.AbilitySelect = true;
				}else{
					this.AbilitySelect = false;
				}
				this.AbilityType = item.type;
			},
			ActiveBroker(item){ //经纪资源
				this.itemsBroker.forEach((ele,index)=>{
                    ele.flag = false;
                })
				item["flag"] = !item["flag"];
				this.BrokerType = item.type;
			},
			ActiveEvaluating(item,index){//评估能力
				this.itemsEvaluating.forEach((ele,index)=>{
                    ele.flag = false;
                })
				item["flag"] = !item["flag"];
				if(!index){
					this.EvaluatingSelect = true;
				}else{
					this.EvaluatingSelect = false;
				}
				this.EvaluatingType = item.type;
			},
			ActiveFinancing(item,index){//金融业务
				this.itemsFinancing.forEach((ele,index)=>{
                    ele.flag = false;
                })
				item["flag"] = !item["flag"];
				if(!index){
					this.FinancingSelect = true;
				}else{
					this.FinancingSelect = false;
				}
				this.FinancingType = item.type;
			},
			ActiveParallel(item,index){//进口车业务
				this.itemsParallel.forEach((ele,index)=>{
                    ele.flag = false;
                })
				item["flag"] = !item["flag"];
				if(!index){
					this.ParallelSelect = true;
				}else{
					this.ParallelSelect = false;
				}
				this.ParallelType = item.type;
			},
			ActiveStock(item,index){//股权
				this.itemsStock.forEach((ele,index)=>{
                    ele.flag = false;
                })
				item["flag"] = !item["flag"];
				if(index){
					this.StockSelect = true;
				}else{
					this.StockSelect = false;
				}
				this.StockType = item.type;
			},
			addTable(){ //添加股东
				var len = this.itemsTabel.length
				if(len < 5){
					this.itemsTabel.push({ name: '',percent:''});
				}
			},
			delTable(){ //添加股东
				var len = this.itemsTabel.length
				if(len > 2){
					this.itemsTabel.splice(len-1);
				}
			},
			getUpload(data,flag){
                this.dataURL[flag] = data;
                for(flag in this.dataURL){
                    switch (flag)
                    {
                        case "plant":
                            this.booth_plant_img = this.dataURL[flag][0];
                            break;
                        case "diploma":
                            this.booth_diploma_img = this.dataURL[flag][0]
                            break;
                        case "showcar":
                            this.booth_showcar_img = this.dataURL[flag][0]
                            break;
                    }
                }
            },
            checkFormData(){
            	if((this.types == "")||(this.types == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择意向授权产品档位"
                      }
                    );
                    return false
                }
                if((this.carNum == "")||(this.carNum == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请填写店铺月均销量"
                      }
                    );
                    return false
                }
                if((this.AptitudeType == "")||(this.AptitudeType == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择是否具备用品加装与汽车美容资质"
                      }
                    );
                    return false
                }
                if((this.AbilityType == "")||(this.AbilityType == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择是否具备用品加装与汽车美容能力"
                      }
                    );
                    return false
                }
                if(this.AbilityType == 1){
                	if((this.booth_plant_img == "") || (this.booth_plant_img == null)){
                		this.$store.dispatch("ALERT", 
	                      {
	                        flag:true,
	                        text:"请上传美容车间照片"
	                      }
	                    );
	                    return false
                	}
                }
                if((this.BrokerType == "")||(this.BrokerType == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择是否具备二手车经纪资质"
                      }
                    );
                    return false
                }
                if((this.EvaluatingType == "")||(this.EvaluatingType == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择是否具备二手车评估能力"
                      }
                    );
                    return false
                }
                if(this.EvaluatingType == 1){
                	if((this.booth_diploma_img == "") || (this.booth_diploma_img == null)){
                		this.$store.dispatch("ALERT", 
	                      {
	                        flag:true,
	                        text:"请上传二手车评估资质证书照片"
	                      }
	                    );
	                    return false
                	}
                }
                if((this.FinancingType == "")||(this.FinancingType == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择是否开展汽车金融业务"
                      }
                    );
                    return false
                }
                if(this.FinancingType == 1){
                	if((this.channel == "") || (this.channel == null)){
                		this.$store.dispatch("ALERT", 
	                      {
	                        flag:true,
	                        text:"请填写金融渠道"
	                      }
	                    );
	                    return false
                	}
                }
                if((this.ParallelType == "")||(this.ParallelType == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择是否开展平行进口车业务"
                      }
                    );
                    return false
                }
                if(this.ParallelType == 1){
                	if((this.booth_showcar_img == "") || (this.booth_showcar_img == null)){
                		this.$store.dispatch("ALERT", 
	                      {
	                        flag:true,
	                        text:"请上传店内进口展车照片"
	                      }
	                    );
	                    return false
                	}
                }
                if((this.area == "")||(this.area == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请填写展厅面积"
                      }
                    );
                    return false
                }
                if((this.StockType == "")||(this.StockType == null)){
                    this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"请选择股权结构"
                      }
                    );
                    return false
                }
                this.percentNum = 0;
                this.itemsTabel.forEach((ele,index)=>{
                    if(ele.name == ''){
                    	this.$store.dispatch("ALERT", 
	                      {
	                        flag:true,
	                        text:"请填写股东姓名"
	                      }
	                    );
	                    return false
                    }
                    if(ele.percent == ''){
                    	this.$store.dispatch("ALERT", 
	                      {
	                        flag:true,
	                        text:"请填写股东占比"
	                      }
	                    );
	                    return false
                    }
                    this.percentNum += parseFloat(ele.percent);
                })
                if(this.percentNum > 100){
                	this.$store.dispatch("ALERT", 
                      {
                        flag:true,
                        text:"股东占比总和不能大于100%"
                      }
                    );
                    return false
                }
            },
            AppTcm(){ //app跳转

            }
		},
		mounted(){
			//组件初始化

		},
		components:{
		    uploader
		}
	}

</script>
<style lang="scss">
	@import '../../../style/mixin';
	.empower{
		background:$white;
		overflow:hidden;
	}
	.brand-list-header {
	    position: relative;
	    z-index: 25;
	    overflow: hidden;
	    height: 1.1733rem;
	    text-align: center;
	    @include font(0.4rem,1.1733rem);
	    color: $white;
	    background-color: #27282f;
	}
	.brand-left-cion {
	    position: absolute;
	    left: .4666rem;
	    top: .4rem;
	}
	.auth-tel{
	    display:block;
	    @include WH(0.546rem,0.546rem);
	    @include bgPic('../../assets/icon-s3.png');
	    position:absolute;
	    top:0;
	    bottom:0;
	    left:auto;
	    right:0.45rem;
	    margin:auto;
	}

	/*内容*/
	.empower-tit{
	    padding:0.533333rem 0.4rem;
	    background:$orange;
	    overflow:hidden;
	    color:$white;
	}
	.empower-tit em{
	    display:block;
	    @include font-dpr(38px);
		padding-bottom:0.533333rem;
	}
	.empower-tit span{
	    display:block;
	    @include font-dpr(26px);
		line-height:1.5;
	}
	.empower-item{
		@include font-dpr(32px);
		padding-top:0.4rem;
		margin:0 0.4rem;
		overflow:hidden;
		border-bottom:1px solid #e0e0e0;
	}
	.empower-item label{
		display:block;
	}
	.empower-stall,.empower-sales{
		padding-bottom:0.4rem;
	}
	.empower-stall p{
		display:inline-block;
		text-align:center;
		width:4.373333rem;
    	margin-top:0.533333rem;
    	float:left;
    	color:$orange;
    	background:$white;
    	@include padding(0.266667rem,0);
    	@include borderRadius(0.133333rem);
    	border:1px solid $orange;
	}
	.empower-stall p span,.empower-stall p em{
		@include font-dpr(28px);
		display:block;
	}
	.empower-stall p em{
		@include font-dpr(24px);
		padding-top:0.133333rem;
	}
	.empower-stall p:last-child{
		float:right;
	}
	.empower-stall p.active{
		color:$white;
		background:$orange;
	}
	.empower-info h3{
		@include font-dpr(34px);
		background:#f1f1f1;
		@include padding(0.4rem,0.4rem);
	}
	.empower-sales label{
		display:inline-block;
	}
	.empower-sales input{
		border: none;
		outline: none;
		line-height: 0.85rem;
		padding-left:0.4rem;
		@include WH(5.8rem,0.85rem);
	}
	.empower-item label i{
		display:inline-block;
		vertical-align:middle;
		margin-left:0.2rem;
	    @include WH(0.373333rem,0.373333rem);
	    @include bgPic('../../assets/icon-s6.png');
	}
	.empower-limts-con{
		@include padding(0.4rem,0);
	}
	.empower-limts-con em{
	    margin-right:0.8rem;
	    position:relative;
	    padding-left:0.67rem;
	    color:$gray;
	    @include font-dpr(30px);
	}
	.empower-limts-con em i{
	    @include WH(0.4rem,0.4rem);
	    display:block;
	    position:absolute;
	    top:0;
	    left:0;
	    right:auto;
	    bottom:0;
	    margin:auto;
	    @include bgPic('../../assets/icon-s4.png');
	}
	.empower-limts-con .active{
	    color:$orange;
	}
	.empower-limts-con .active i{
	    @include bgPic('../../assets/icon-s5.png');
	}
	.empower-text{
		color:$gray;
		@include font-dpr(28px);
		padding-left:0.4rem;
	}
	.channel{
		border: none;
		outline: none;
		@include font-dpr(26px);
		@include WH(9.2rem,0.85rem);
		line-height: 0.85rem;
		margin-bottom:0.4rem;
		border-bottom:1px solid #e0e0e0;
	}
	.empower-sales{
		position:relative;
	}
	.empower-sales i{
		position:absolute;
		right:0;
		top:0.52rem;
	}
	.empower-text i{
		display:inline-block;
		background:#000;
		margin-right:0.133333rem;
		vertical-align:middle;
		@include WH(0.106667rem,0.106667rem);
		@include borderRadius(100%);
	}
	.empower-ratio{
		border:1px solid #e0e0e0;
		margin:0.533333rem 0.4rem;
		text-align:center;
		@include font-dpr(28px);
	}
	.empower-ratio p{
		border-bottom:1px solid #e0e0e0;
		line-height:0.933333rem;
	}
	.empower-ratio p:last-child{
		border-bottom:none;
	}
	.empower-ratio p em{
		display:inline-block;
		width:48%;
		border-right:1px solid #e0e0e0;
	}
	.empower-ratio p em:nth-child(2n){
		border-right:none;
	}
	.ratio-tit{
		background:#f5f5f5;
	}
	.ratio-info input{
		border: none;
		outline: none;
		text-align:center;
		line-height: 0.933333rem;
		@include WH(80%,0.933333rem);
	}
	.empower-btn{
		text-align:center;
	}
	.empower-btn span{
		display:block;
		float:left;
		width:50%;
		color:#e6b255;
		@include font-dpr(28px);
	}
	.empower-btn span em{
		display:inline-block;
		vertical-align:middle;
		margin-left:0.2rem;
		@include WH(0.4rem,0.4rem);
		@include bgPic('../../assets/icon-s7.png');
	}
	.empower-btn span.del em{
		@include bgPic('../../assets/icon-s8.png');
	}
	.empower-submit{
		display:block;
		text-align:center;
		margin:0.666667rem auto;
		line-height:1.173333rem;
		background:$orange;
		color:$white;
		@include WH(6.666667rem,1.173333rem);
		@include borderRadius(0.666667rem);
		@include font-dpr(34px);
	}
	/*弹框*/
	.mask,.prompt{
		@include WH(100%,100%);
		background:rgba(0,0,0,0.8);
		position:fixed;
		left:0;
		top:0;
		z-index:99;
	}
	.mask{
		display:none;
	}
	.cancel-car{
		position:fixed;
		@include WH(7.2rem,auto);
		@include borderRadius(0.133333rem);
		overflow:hidden;
		left:50%;
		top:50%;
		margin-top:-1.866667rem;
		margin-left:-3.6rem;
	}
	.prompt-tit{
		@include font-dpr(34px);
		background:$white;
		text-align:center;
		color:#2c2c2c;
		padding:0.986667rem 0;
	}
	.prompt-tp{
		@include font-dpr(34px);
		background:$white;
		text-align:center;
		color:#2c2c2c;
		@include padding(0.533333rem,0.6rem);
	}
	.prompt-btn{
		background:#f5f5f5;
		overflow:hidden;
		height:1.173333rem;
		line-height:1.173333rem;
	}
	.prompt-bt{
		background:$orange;
		color:$white;
		text-align:center;
		overflow:hidden;
		height:1.173333rem;
		line-height:1.173333rem;
	}
	.prompt-btn span{
		display:block;
		width:50%;
		float:left;
		text-align:center;
		@include font-dpr(34px);
	}
	.prompt-btn span.confirm{
		background:$orange;
		color:$white;
	}
	.prompt-btn span a{
		display:block;
	}
</style>