<template lang="html">
  <div class="wrap">
    <div class="row">
      <div v-for="product in products" class="col-sm-6">
          <product :product="product"></product>
      </div>
    </div>
  </div>

</template>

<script>
import product from './product.vue'
export default {
  name: 'index',
  data(){
    return{
      products : []
    }
  },
  components:{
    product
  },

  created(){

    this.products = this.$store.getters.allProducts;

  },

  methods:{
    addtocart(product){
      console.log(product + this.test);
    }
  }
}
</script>

<style lang="css">

  .card-header{
    color: white;
  }

  .wrap{
    margin-top: 1rem;
  }

  .bg-primary{
    background-color: #f8f9fa!important;
  }

  .card{
    margin-bottom: 1rem;
  }

  .card-img-top{
    width: 55%;
    display: block;
    margin-left: auto;
    margin-right: auto ;
    text-align: center;
  }

  .card-body{
    min-height: 250px;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: space-around;
  }

  .card-title{

  }

</style>
