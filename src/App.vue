<template>
  <v-app>
    
<div class="main">
    <v-main>
      
      <Navigation/>
      <router-view />
      
    </v-main>
</div>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation';



export default {
  name: 'App',

  components: {
    // HelloWorld,
    // Login,
    // Register,
    Navigation
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
 .main{
   font-weight: bold;
   
    // padding-bottom: 80px;
    // background: black;
    // color: white;
 }
</style>
