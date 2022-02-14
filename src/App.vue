<template>
  <div class="app" :class="mode">
    <router-view :mode="mode" @toggle="toggle"/>

   <!-- <LayoutDefault :mode="mode" @toggle="toggle"/> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
//import LayoutDefault from './layout/LayoutDefault.vue'

export default {
  name: 'App',
  // começça aki para apagar
  data (){
    return{
      mode: 'light'
    }
  },
  components: {
   // LayoutDefault
  },
  computed: {
    ...mapGetters('theme',['getTheme'])
  },

  mounted(){
    this.mode = this.getTheme
    console.log(this.getTheme)
  },

  methods: {
    toggle(){
      if(this.mode === 'dark'){
        this.mode = 'light'
      } else{
        this.mode = 'dark'
      } 
      this.ChangeTheme(this.mode)
    },
    ...mapActions('theme', ['ChangeTheme'])
  }
  //termina aki
}
</script>

<style>
.app {
  background-color:#00FA9A;
  min-height: 100vh !important;
  font-family: 'Roboto', monospace;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  transition: background 0.3s ease-in-out;

}

.dark{
  background: #192734;
}
</style>
