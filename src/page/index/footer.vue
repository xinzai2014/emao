<template>
	<div>
	<p class="footer-bt"></p>
	<footer class="index-fooer">
        <ul class="clearfix">
            <li class="index-order-car active">
                <i></i>
                <span>订车</span>
            </li>
            <router-link to="/profile" tag="li" class="index-my">
	                <i></i>
	                <span>我的</span>
            </router-link>
        </ul>
    </footer>
	</div>
</template>

<script>
export default {
	  name: 'footer',
	  data () {
	    return {
	      
	    }
	  },
	  methods:{
	  	goHome(){
	  		this.$router.push("/profile");
	  	}
	  },
	  mounted(){
		
	  },
	  watch:{
	   
	  }
}
</script>