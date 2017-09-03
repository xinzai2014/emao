<template>
  <div id="app">
  	<transition name="fade">
    	<router-view></router-view>
    </transition>
    <loader v-if="this.$store.state.ajaxLoading"></loader>
    <alert v-if="this.$store.state.alert.flag"></alert>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
import loader from './components/common/loader/loader'
import alert from './components/common/alertTip/alertTip'

export default {
  name: 'app',
  data () {
    return{

    }
  },
  mounted(){
    //console.log();
  },

  components:{
      loader,
      alert
  }
}
</script>

<style>
 #app{
  height:100%;
 }

.fade-enter-active {
  transition: opacity 2.5s
}
.fade-leave-active{
  transition: opacity 0
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0 
}

</style>
