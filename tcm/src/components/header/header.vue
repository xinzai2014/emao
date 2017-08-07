<template>

	<header class="index-header">
	    <strong class="index-title">淘车猫</strong>
	    <div class="index-news news-icon"  @click="goMess">
	        <span v-show="myMessage">{{myMessage}}</span>
	    </div>
	</header>

</template>

<script>
export default {
	  name: 'header',
	  data () {
	    return {
	      myMessage:0
	    }
	  },
	  methods:{
	  	goMess(){
	  		this.$router.push("/message");
	  	},
	  	getMessList(){
	  		this.$http({
	  			url:"dealerMessage/messageList?token=" + sessionStorage.token,
	  			type:"GET"
	  		}).then(function(response){
	  			console.log(response);
	  			this.myMessage = response.body.data.length;
	  		},function(){

	  		})
	  	}
	  },
	  mounted(){
		this.getMessList();
	  },
	  watch:{
	   
	  }
}
</script>