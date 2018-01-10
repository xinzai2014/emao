<template>
	<div>
		<header class="brand-list-header header-fixed" v-show="titHide">
			<i class="white-lt brand-left-cion" @click="showLoginDialog"></i> 
			<strong class="brand-list-title">授权店认证</strong>
	        <a href="javascript:;" @click="authTel" class="auth-tel"></a>
		</header>
	    <section class="empower">
	        <div class="empower-tit" v-if="grantStatus == 3">
	            <em>审核未通过</em>
	            <span>{{grantReason}}</span>
	        </div>
	        <div class="empower-info">
	        	<div class="empower-item empower-stall">
	        		<label>选择意向授权产品档位</label>
	        		<p v-for="(item,index) in itemsStall" :class="{active:item['flag']}" @click="ActiveStall(item)">
	        			<span :class="item.value ? '':'leng'">{{item.name}}</span>
	        			<em>{{item.value}}</em>
	        		</p>
	        		
	        	</div>
	        	<h3>经营概况</h3>
	        	<div class="empower-item empower-sales">
	        		<label>店铺月均销量</label>
	        		<input type="number"  v-model="carNum" ref="carNum" @keyup="InputLength">
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
	        		<input type="number" v-model="area" ref="area" @keyup='areaLength'>
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
	                    				<em><input type="number" v-model="item.ratio" @input="parseFl(item)"/>%</em>
	                    			</p>
                    			</div>
                    		</div>
                    		<div class="empower-btn">
                    			<p><span v-show="addBtn" class="add" @click="addTable">添加<em></em></span></p>
                    			<p><span v-show="delBtn"  class="del" @click="delTable">删除<em></em></span></p>
                    		</div>
		        		</div>
	        		</div>
	        	</div>
	        	<a href="javascript:;" class="empower-submit" @click="checkFormData">提交</a>
	        </div>
	    </section>
	    <!--弹框-->
	    <div class="mask" v-show="Tel">
	        <div class="cancel-car">
	            <p class="prompt-tit">拨打客服电话<br/>400-825-2368</p>
	            <p class="prompt-btn" @click="closeTel"><span>点错了</span><span class="confirm"><a href="tel:400-825-2368">确定</a></span></p>
	        </div>
	    </div>
	    <div class="prompt" v-show="aptitude_layer">
	        <div class="cancel-car">
	            <p class="prompt-tp">{{aptitude_text}}</p>
	            <p class="prompt-bt" @click="aptitudeHide">知道了</p>
	        </div>
	    </div>
	    <div class="dialog" v-if="showDialog" @click="closeDialog">
            <div class="dialog-con">
                <p>确定退出授权店认证</p>
                <div class="dialog-btn">
                    <span>点错了</span>
                    <span @click.stop="loginOut">确定退出</span>
                </div>
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
		    	Tel:false,//电话
		    	carNum:'',//台数
		    	channel:'',//渠道
		    	area:'',//展厅面积
		    	showDialog:false,
		    	lenbtn:false,
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
		            { name: '高档档产品',value:'（16万以上）',type:2,flag:false},
		            { name: '平行进口车',value:'',type:3,flag:false},
                ],
                itemsAptitude: [
		            { name: '具备',type:1,flag:false},
		            { name: '不具备',type:0,flag:false},
		        ],
		        itemsAbility: [
		            { name: '具备', type:1,flag:false},
		            { name: '不具备',type:0,flag:false},
		        ],
		        itemsBroker: [
		            { name: '具备', type:1,flag:false},
		            { name: '不具备',type:0,flag:false},
		        ],
		        itemsEvaluating: [
		            { name: '具备', type:1,flag:false},
		            { name: '不具备',type:0,flag:false},
		        ],
		        itemsFinancing: [
		            { name: '已开展',type:1,flag:false},
		            { name: '未开展',type:0,flag:false},
		        ],
		        itemsParallel: [
		            { name: '已开展',type:1,flag:false},
		            { name: '未开展',type:0,flag:false},
		        ],
		        itemsStock: [
		            { name: '单一股东',type:1,flag:false},
		            { name: '多股东',type:2,flag:false},
		        ],
		        itemsTabel: [
		            { name: '',ratio:''},
		            { name: '',ratio:''},
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
		        percentNum:0, //股份百分比
		        addBtn:true, //添加按钮
		        delBtn:false, //添加按钮
		        token:'',
		        titHide:true,//顶部返回是否显示
		        telephoneButtonFlag:false,//是否显示电话
		        gobackButtonFlag:true,//是否有弹框
		        grantStatus:0,//审核状态
		        grantReason:'',//驳回理由
		        APPWap:false, //是wap还是App flase是wap
		        showPhone:0, //0显示1不显示
		        showEnable:0, //0有弹框 1没弹框
		        nameIndex:0,
		        ratioIndex:0
		    }
		},
		methods:{
			//返回
			closeDialog(){
                this.showDialog = false;
            },
            showLoginDialog(){
                this.showDialog = !this.showDialog;
            },
            loginOut(){
                this.$router.go(-1);
            },
			authTel(){//电话弹框
				this.Tel = true;
			},
			closeTel(){
				this.Tel = false;
			},
			//提示弹框
			aptitudeShow(type){
				this.aptitude_layer = !this.aptitude_layer;
				if(type){
					this.aptitude_text = '用品加装与汽车美容资质，即在营业执照经营范围中是否涵盖此项'
				}else{
					this.aptitude_text = '二手车经纪资质，即在营业执照经营范围中是否涵盖此项'
				}
			},
			areaLength(){
				var leng = this.area.length;
				if(leng >= 5){
					this.area = this.area.substr(0,5);
				}
				
			},
			InputLength(){
				var leng = this.carNum.length;
				if(leng >= 5){
					this.carNum = this.carNum.substr(0,5);
				}
				
			},
			parseFl(item){
				var str = item.ratio.indexOf('.');
				var val = 0;
				if(str > 0){
					val = item.ratio.split('.')[1];
					if(val.length >= 2){
						item.ratio = (item.ratio.split('.')[0])+'.'+(val[0])
					}
				}else if(str == 0){
					this.$store.dispatch("ALERT", 
	                    {
	                        flag:true,
	                        text:"请输入正确的股东占比"
	                    }
                    );
                    return false
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
                this.types = type.join(",");
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
				var len = this.itemsTabel.length;
				this.itemsTabel.push({ name: '',ratio:''});
				this.delBtn = true;
				if(len == 4){
					this.addBtn = false;
				}
			},
			delTable(){ //添加股东
				var len = this.itemsTabel.length;
				this.itemsTabel.splice(len-1);
				this.addBtn = true;
				if(len == 3){
					this.delBtn = false;
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
                if((this.AptitudeType === "")||(this.AptitudeType == null)){
                    this.$store.dispatch("ALERT", 
	                    {
	                        flag:true,
	                        text:"请选择是否具备用品加装与汽车美容资质"
	                    }
                    );
                    return false
                }
                if((this.AbilityType === "")||(this.AbilityType == null)){
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
                if((this.BrokerType === "")||(this.BrokerType == null)){
                    this.$store.dispatch("ALERT", 
	                    {
	                        flag:true,
	                        text:"请选择是否具备二手车经纪资质"
	                    }
                    );
                    return false
                }
                if((this.EvaluatingType === "")||(this.EvaluatingType == null)){
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
                if((this.FinancingType === "")||(this.FinancingType == null)){
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
                if((this.ParallelType === "")||(this.ParallelType == null)){
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
                
                if(this.StockType == 2){
                	for(var i=0;i<this.itemsTabel.length;i++){
                		if((this.itemsTabel[i].name == "")||(this.itemsTabel[i].name == null)){
	                    	this.$store.dispatch("ALERT", 
			                    {
			                        flag:true,
			                        text:"请填写股东姓名"
			                    }
		                    )
		                    return false
	                    }
	                    if((this.itemsTabel[i].ratio == "")||(this.itemsTabel[i].ratio == null)){
	                    	this.$store.dispatch("ALERT", 
			                    {
			                        flag:true,
			                        text:"请填写股东占比"
			                    }
		                    );
		                    return false
	                    }
	                    this.percentNum += parseFloat(this.itemsTabel[i].ratio);
                	}
	                if(this.percentNum > 100){
	                	this.$store.dispatch("ALERT", 
		                    {
		                        flag:true,
		                        text:"股东持股比例不能超过100%"
		                    }
	                    );
	                    return false
	                }
                }
                if(this.StockType == 1){
                	this.itemsTabel = [
                		{ name: '',ratio:''},
		            	{ name: '',ratio:''}
                	];
                }
                var data = {
			        token:this.token,
			        authorizeGrade:this.types,
			        monthlySales:this.carNum,
			        carBeautyQualification:this.AptitudeType,
			        carBeautyAlility:this.AbilityType,
			        carBeautyImage:this.booth_plant_img,
			        brokeringQualification:this.BrokerType,
			        evaluationAbility:this.EvaluatingType,
			        evaluationImage:this.booth_diploma_img,
			        autoFinance:this.FinancingType,
			        autoFinanceText:this.channel,
			        parallelImportCar:this.ParallelType,
			        parallelImportCarImage:this.booth_showcar_img,
			        exhibitionHallArea:this.area,
			        shareholdingStructure:this.StockType,
			        shareholderRatio:this.itemsTabel,
			        grantStatus:this.grantStatus
			    }
                //提交信息
                
                this.$http.post("dealerInfo/authorizedregist",data)
                .then(function (response) {
                	/*this.$store.dispatch("ALERT", 
	                    {
	                        flag:true,
	                        text:"提交成功"
	                    }
                    );*/
                	if(this.APPWap){
                		this.$router.push({path:'empower/empowerSuccess',query:{token:this.token}});
                	}else{
                		this.$router.push({path:'empower/empowerSuccess'});
                	}
			    },function (error) {
			        this.$store.dispatch("ALERT", 
	                    {
	                        flag:true,
	                        text:"网络异常"
	                    }
                    );
			    });
            },
            tcmApp(obj){ //app跳转
            	if (navigator.userAgent.indexOf("iPhone") > 0) {
	            	window.webkit.messageHandlers.tcmAppObject.postMessage(obj);//IOS
	            }
	            else {
	            	window.tcmAppObject.postMessage(JSON.stringify(obj));//Android
	            }
            },
            telephoneButton(){ //电话
            	var obj = {
	        		actionname:"telephoneButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
	        		params:{hidden:0}//hidden=0显示电话按钮，hidden=1隐藏电话按钮
	    		};
	            this.tcmApp(obj);//tcmApp 函数参见通信规则中的示例说明
            },
            enableGobackButton(){ //禁止返回
            	var obj = {
	      			actionname:"enableGobackButton",//Native 函数名称：必填，Native 提供给 JS 的可用函数的函数名称
	        		params:{enable:0, title: "确定退出授权店认证"}//enable=0不允许返回，enable=1允许返回
	    		};
	            this.tcmApp(obj);//tcmApp 函数参见通信规则中的示例说明
            },
            //数据初始化
            fullData(){
            	var data = {
			        token:this.token
			    }
            	this.$http({
			        url:"dealerInfo/authorizeddetail",
			        method:"GET",
			        params:data
			    }).then(function (response) { 
			    	var data = response.body.data;
			    	if(data.grantStatus == 1){
			    		if(this.APPWap){
			    			this.$router.push({path:'empower/empowerAudit',query:{token:this.token}});
			    		}else{
			    			this.$router.push({path:'empower/empowerAudit'});
			    		}
			    	}
			    	if(data.grantStatus == 2){
			    		if(this.APPWap){
			    			this.$router.push({path:'empower/empowerAdopt',query:{token:this.token}});
			    		}else{
			    			this.$router.push({path:'empower/empowerAdopt'});
			    		}
			    	}

			    	this.types = data.authorizeGrade;
			        if(data.authorizeGrade){
			        	var manageTypeList = data.authorizeGrade.split(",");
						var that = this;
                       	manageTypeList.forEach(function(e){
                       		that.itemsStall.forEach(function(ele,i){
                       			if(ele.type == e){
                       				ele.flag = true;
                       			}
                       		})
                       	})
                   	}
                   	if(data.monthlySales){
                   		this.carNum = data.monthlySales;
                   	}
			        if(data.carBeautyQualification !== ''){
			        	this.AptitudeType = data.carBeautyQualification;
			        	this.ratioShow(this.AptitudeType,this.itemsAptitude);
			        }
			        if(data.carBeautyAlility !== ''){
			        	this.AbilityType = data.carBeautyAlility;
				        this.ratioShow(this.AbilityType,this.itemsAbility);
				        if(data.carBeautyImage.length > 0){
				        	this.AbilitySelect = true;
				        	this.$set(this.uploadData1,"imgArr",[data.carBeautyImage])
	            			this.booth_plant_img = data.carBeautyImage;
				        }
			        }
			        if(data.brokeringQualification !== ''){
			        	this.BrokerType = data.brokeringQualification;
			        	this.ratioShow(this.BrokerType,this.itemsBroker);
			        }
			        if(data.evaluationAbility !== ''){
			        	this.EvaluatingType = data.evaluationAbility;
				        this.ratioShow(this.EvaluatingType,this.itemsEvaluating);
				        if(data.evaluationImage.length > 0){
				        	this.EvaluatingSelect = true;
				        	this.$set(this.uploadData2,"imgArr",[data.evaluationImage])
	            			this.booth_diploma_img = data.evaluationImage;
				        }
			        }
			        if(data.autoFinance !== ''){
			        	this.FinancingType = data.autoFinance;
				        this.ratioShow(this.FinancingType,this.itemsFinancing);
				        if(this.FinancingType == 1){
				        	this.FinancingSelect = true;
				        }
			        }
			        if(data.autoFinanceText){
			        	this.channel = data.autoFinanceText;
			        	
			        }
			        if(data.parallelImportCar !== ''){
			        	this.ParallelType = data.parallelImportCar;
				        this.ratioShow(this.ParallelType,this.itemsParallel);
				        if(data.parallelImportCarImage.length > 0){
				        	this.ParallelSelect = true;
				        	this.$set(this.uploadData3,"imgArr",[data.parallelImportCarImage])
	            			this.booth_showcar_img = data.parallelImportCarImage;
				        }
			        }
			        if(data.exhibitionHallArea){
			        	this.area = data.exhibitionHallArea;
			        }
			        if(data.shareholdingStructure){
			        	this.StockType = data.shareholdingStructure;
				        this.ratioShow(this.StockType,this.itemsStock);
				        if(this.StockType == 2){
				        	this.StockSelect = true;
				        }
			        }
			        
			        if(data.shareholderRatio.length > 0){
			        	this.itemsTabel = data.shareholderRatio;
			        }
			        if(data.shareholderRatio.length == 5){
			        	this.delBtn = true;
			        	this.addBtn = false;
			        }
			        if(data.grantStatus){
			        	this.grantStatus = data.grantStatus;
			        }
			        if(data.grantReason){
			        	this.grantReason = data.grantReason;
			        }
			    },function(){
			    })
            },
            ratioShow(type,item){
            	if(type == 1){
	        		item[0].flag = true;
		        }else{
		        	item[1].flag = true;
		        }
            }
		},
		mounted(){
			//组件初始化
			this.token = this.$route.query.token||sessionStorage.token;
			this.fullData();
		    if(this.$route.query.token){
	            this.titHide = false;
	            this.APPWap = true;
        		document.title='授权店认证';
        		this.telephoneButton();
        		this.enableGobackButton();
	        }
	        
		},
		components:{
		    uploader
		}/*,
		beforeRouteLeave(to,form,next){
			if(this.$route.query.token){
				this.showPhone = 1;
				this.showEnable = 1;
		      	this.telephoneButton();
		      	this.enableGobackButton();
			}
	      	next();
	    }*/
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
		width:2.8rem;
    	margin-top:0.533333rem;
    	float:left;
    	color:$orange;
    	background:$white;
    	@include padding(0.266667rem,0);
    	@include borderRadius(0.133333rem);
    	border:1px solid $orange;
    	margin-right:0.3rem;
    	height:1.063rem;
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
		margin-right:0
	}
	.empower-stall p.active{
		color:$white;
		background:$orange;
	}
	.empower-stall p span.leng{
		line-height:1rem;
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
		@include WH(5.3rem,0.85rem);
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
		background:none;
	}
	.empower-btn{
		text-align:center;
		overflow:hidden;
	}
	.empower-btn p{
		float:left;
		width:50%;
		color:#e6b255;
		@include font-dpr(28px);
		padding-bottom:0.4rem;
	}
	.empower-btn span{
		display:block;
		width:100%;
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
		background:#fff;
		overflow:hidden;
		height:1.173333rem;
		line-height:1.173333rem;
	}
	.prompt-bt{
		@include font-dpr(34px);
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
		background:#f5f5f5;
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