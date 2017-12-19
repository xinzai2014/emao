<template>
	<p class="ptag">ddddd</p>
</template>
<script>
	import uploader from '@/components/common/uploader/uploader'

	export default {
		name: 'app',
			data () {
			    return{

			    }
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
	.ptag{
		color:$red;
	}
</style>