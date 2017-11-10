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
	  			var myMessage = response.body.data;
	  			var that = this;
          if(myMessage.length>0){
            myMessage.forEach(function(e,index){
              var num = e.num?parseInt(e.num):0;
              that.myMessage += num;
            })
          }
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
