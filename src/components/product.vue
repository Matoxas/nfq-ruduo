<template lang="html">
    <div class="card">
       <img class="card-img-top" :src="product.image" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">{{product.name}}</h4>
        <h5 class="card-text">€{{product.price}}</h5>
        <p class="card-text">{{product.description}}</p>
        <a href="#" @click.prevent="addtocart(product)" class="btn btn-light">į krepšelį</a>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['product']
,
  methods:
    mapActions([
      'addtocart'
    ])
}
</script>

<style lang="css">


</style>
