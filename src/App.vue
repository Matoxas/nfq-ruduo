<template>
  <div id="app">
    <div class="container">
      <appnavbar></appnavbar>
      <router-view></router-view>
      <appfooter></appfooter>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import appindex from './components/index.vue'
import appfooter from './components/footer.vue'
import appnavbar from './components/navbar.vue'

import products from './assets/products.json';
import orders from './assets/orders.json';

export default {
  name: 'app',
  components: {
    HelloWorld,
    appindex,
    appnavbar,
    appfooter
  },

  created(){

    //užkrauname produktų sąrašą

    this.$store.commit('setSomething', {name : 'all', content: products });

    // jei localStorage turi išsaugotą užsakymų sąrašą, jį užkrauname
    if(localStorage.getItem('orders')){
      let object = {name : 'orders', content: JSON.parse(localStorage.getItem('orders'))};
      this.$store.commit('setSomething', object);
    }else{
      this.$store.commit('setSomething', {name : 'orders', content: orders });
    }
    // jei localStorage turi išsaugotą krepšelį, jį užkrauname
    if(localStorage.getItem('added')){
      let object = {name : 'added', content: JSON.parse(localStorage.getItem('added'))};
      this.$store.commit('setSomething', object);
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #495057;
  margin-top: 60px;
  border-radius: 0px !important;
}
 body{
   background-color: #fcfcfc;
 }
</style>
