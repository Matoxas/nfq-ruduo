<template>
  <div class="cart">
    <h2 class="title">Jūsų krepšelis</h2>
    <br>
    <p v-show="!products.length">
      <i>jūsų krepšelis tuščias! </i>
      <router-link to="/">Į parduotuvę</router-link>
    </p>
    <div class="table-responsive">
      <table class="table is-striped" v-show="products.length">
        <thead>
          <tr>
            <td>Pavadinimas</td>
            <td>Kaina</td>
            <td>Kiekis</td>
            <td>Veiksmas</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products">
              <td>{{ p.name }}</td>
              <td>€{{ p.price }}</td>
              <td><input type="number" @change="quantitychange(p)" v-model="p.quantity"></td>
              <td><button class="btn btn-light" @click="remove(p)">pašalinti</button></td>
              <!-- <td><p @click="remove(p)" class="bold">pašalinti</p></td> -->
            </tr>
            <tr>
              <td><b>Viso:</b></td>
              <td><b>€{{ total }}</b></td>
              <td></td>
              <td>
                <router-link tag="button" class="btn btn-dark" to="/order"  type="button" name="button">užsakyti</router-link>
              </td>
              <br>
            </tr>
        </tbody>
      </table>
    </div>
    <!-- <p><button v-show="products.length" class='button is-primary' @click='checkout'>Užsakyti</button></p> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },

  created(){

  },

  computed:{

    products(){
      return this.$store.getters.cartProducts;
    },

    total(){

      return (Math.round(this.products.reduce((total, p) => total + p.price * p.quantity, 0)*100)/100);

    }
  },
  methods:{
    remove(item){
        let index = this.products.indexOf(item);
        this.$store.commit('removeItem',index);
    },

    back(){
      window.history.back()
    },

    quantitychange(item){
      let index = this.products.indexOf(item);
      if (item.quantity < 1){
        alert('kiekis negali būti mažiau nei 1 ;)');
        item.quantity = 1;
      }else if(item.quantity >99){
        alert('kiekis negali būti daugiau nei 99 ;)');
        item.quantity = 99;
      }

      let data = [index, item.quantity]
      this.$store.commit('updateQuantity',data);
    }
  }
}
</script>

<style lang="css">

.cart{
  text-align: left;
}

.bold:hover{
  cursor: pointer;
  text-decoration: underline;
  color: black;
}
.btn{
  margin-right: .5em;
}

</style>
