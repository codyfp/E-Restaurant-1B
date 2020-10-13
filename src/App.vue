<template>
  <v-app>
  <Navbar/>
    <v-main>
      <router-view></router-view>
   
    </v-main>
  <Footer/>
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
</style>