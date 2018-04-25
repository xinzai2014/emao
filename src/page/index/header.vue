<template>

	<header class="index-header">
	    <strong class="index-title">车商猫</strong>
	    <div class="index-news news-icon" v-show="myMessage">
	        <span>{{myMessage}}</span>
	    </div>
	</header>

</template>

<script>
export default {
	  name: 'header',
	  props:["myMessage"],
	  data () {
	    return {
	      
	    }
	  },
	  methods:{

	  },
	  mounted(){
		
	  },
	  watch:{
	   
	  }
}
</script>