<template>
  <v-app>
  <Navbar/>
    <v-main id="main">
      <router-view id="main"></router-view>
   
    </v-main>
  <Footer id="footer"/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: "App",
  components:{
    'Navbar' : Navbar,
    'Footer' : Footer
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#main{
  padding-bottom: 108px;
  min-height:calc(100vh-108px);
  position:relative;
}
#footer{
  bottom:0;
  width:100%;
  height:108px;
  position: absolute;
    
}
</style>

