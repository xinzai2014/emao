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
	        		<p class="fl">
	        			<span>普通档产品</span>
	        			<em>（16万以内）</em>
	        		</p>
	        		<p class="rt active">
	        			<span>高档产品</span>
	        			<em>（16万以上）</em>
	        		</p>
	        	</div>
	        	<h3>经营概况</h3>
	        	<div class="empower-item empower-sales">
	        		<label>店铺月均销量</label>
	        		<input type="text"  v-model="carNum" ref="carNum">
	        		<i>台</i>
	        	</div>
	        	<div class="empower-item">
	        		<div class="item-info">
	        			<label>用品加装与汽车美容资质<i></i></label>
		        		<div class="empower-limts-con">
		        			<em class="active"><i></i>具备</em>
		        			<em><i></i>不具备</em>
		        		</div>
	        		</div>
	        		<div class="item-info">
	        			<label>用品加装与汽车美容能力</label>
		        		<div class="empower-limts-con">
		        			<em class="active"><i></i>具备</em>
		        			<em><i></i>不具备</em>
		        		</div>
		        		<div class="empower-uploader">
		        			<div class="empower-text">美容车间照片</div>
                    		<uploader :uploadData="uploadData1" @getUpload="getUpload"></uploader>
		        		</div>
	        		</div>
	        	</div>
				<div class="empower-item">
	        		<div class="item-info">
	        			<label>二手车经纪资质<i></i></label>
		        		<div class="empower-limts-con">
		        			<em class="active"><i></i>具备</em>
		        			<em><i></i>不具备</em>
		        		</div>
	        		</div>
	        		<div class="item-info">
	        			<label>二手车评估能力</label>
		        		<div class="empower-limts-con">
		        			<em class="active"><i></i>具备</em>
		        			<em><i></i>不具备</em>
		        		</div>
		        		<div class="empower-uploader">
		        			<div class="empower-text">二手车评估资质证书照片</div>
                    		<uploader :uploadData="uploadData2" @getUpload="getUpload"></uploader>
		        		</div>
	        		</div>
	        	</div>
	        	<div class="empower-item">
	        		<div class="item-info">
	        			<label>是否开展汽车金融业务<i></i></label>
		        		<div class="empower-limts-con">
		        			<em class="active"><i></i>已开展</em>
		        			<em><i></i>未开展</em>
		        		</div>
		        		<input class="channel" type="text"  v-model="channel" ref="channel" placeholder="请注明金融渠道，例如某银行或第三方">
	        		</div>
	        		<div class="item-info">
	        			<label>是否开展平行进口车业务</label>
		        		<div class="empower-limts-con">
		        			<em class="active"><i></i>已开展</em>
		        			<em><i></i>未开展</em>
		        		</div>
		        		<div class="empower-uploader">
		        			<div class="empower-text">店内进口展车照片</div>
                    		<uploader :uploadData="uploadData3" @getUpload="getUpload"></uploader>
		        		</div>
	        		</div>
	        	</div>
	        	<h3>公司信息</h3>
	        	<div class="empower-item empower-sales">
	        		<label>展厅面积</label>
	        		<input type="text"  v-model="area" ref="area">
	        		<i>㎡</i>
	        	</div>
	        	<div class="empower-item">
	        		<div class="item-info">
	        			<label>股权结构</label>
		        		<div class="empower-limts-con">
		        			<em><i></i>单一股东</em>
		        			<em class="active"><i></i>多股东</em>
		        		</div>
		        		<div class="empower-tabel">
		        			<div class="empower-text"><i></i>请输入股东姓名和股权占比</div>
                    		<div class="empower-ratio">
                    			<p class="ratio-tit">
                    				<em>股东姓名</em>
                    				<em>股权占比</em>
                    			</p>
                    			<div class="ratio-info">
                    				<p>
	                    				<em><input type="text"/></em>
	                    				<em><input type="text"/>%</em>
	                    			</p>
	                    			<p>
	                    				<em><input type="text"/></em>
	                    				<em><input type="text"/>%</em>
	                    			</p>
                    			</div>
                    		</div>
                    		<div class="empower-btn">
                    			<span class="add">添加<em></em></span>
                    			<span class="del">删除<em></em></span>
                    		</div>
		        		</div>
	        		</div>
	        	</div>
	        	<a href="javascript:;" class="empower-submit">提交</a>
	        </div>
	    </section>
	    <!--弹框-->
	    <div class="mask">
	        <div class="cancel-car">
	            <p class="prompt-tit">拨打客服电话<br/>400-825-2368</p>
	            <p class="prompt-btn"><span>点错了</span><span class="confirm"><a href="tel:400-825-2368">确定</a></span></p>
	        </div>
	    </div>
	    <div class="prompt">
	        <div class="cancel-car">
	            <p class="prompt-tp">不同星级的权益说明不同（视权益提供情况做该提示）</p>
	            <p class="prompt-bt">知道了</p>
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
                    image:"static/sample20.png"
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
                booth_showcar_img:''
		    }
		},
		methods:{
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
		},
		mounted(){

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
	.fl{float:left;}
	.rt{float:right;}
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
		@include padding(0.4rem,0);
		@include font-dpr(32px);
		margin:0 0.4rem;
		overflow:hidden;
		border-bottom:1px solid #e0e0e0;
	}
	.empower-item label{
		display:block;
	}
	.empower-stall p{
		display:inline-block;
		text-align:center;
		width:4.373333rem;
    	margin-top:0.533333rem;
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
		line-height: 0.933333rem;
		@include WH(60%,0.933333rem);
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