<template lang="html">
  <div v-if="products.length" class="order">
    <h2>Paskutinis žingsnis</h2>
    <p>įveskite asmeninius duomenis pagal kuriuos susisieksime dėl tolimesnių apmokėjimo instrukcijų</p>

    <form>
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Vardas:</label>
    <div class="col-sm-4">
      <input type="name" class="form-control" v-model="user.name" id="name" placeholder="Vardenis Pavardenis">
    </div>
    <label for="email" class="col-sm-2 col-form-label">El. Paštas:</label>
    <div class="col-sm-4">
      <input type="email" class="form-control" v-model="user.email" id="email" placeholder="pavyzdys@gmail.com">
    </div>
  </div>
  <div class="form-group row">
    <label for="description" class="col-sm-2 col-form-label">Pastabos:</label>
    <div class="col-sm-10">
      <textarea name="name" class="form-control" v-model="user.description" id="description" placeholder="čia galite palikti žinutę pardavėjui"></textarea>
    </div>
  </div>
   <button type="submit" :class="{ disabled: !cansubmit }"  @click.prevent="submit()" class="btn btn-dark">Užsakyti</button>
</form>
  </div>
  <div v-else class="order">
    <i>Jūs nieko neužsakote! </i>
    <router-link to="/">Į parduotuvę</router-link>
  </div>

</template>

<script>
export default {
  computed:{

    products(){
      return this.$store.getters.cartProducts;
    },

    cansubmit(){
      return (this.user.name.length>0 && this.user.email.length>0);
    }
  },
  data(){
    return{
      user: {
        name : '',
        email: '',
        description: ''
      },
      order:{
        id : 0,
        timestamp: '',
        user: {},
        cart: {},
        total: 0
      }
    }
  },
  methods:{
    submit(){

      if(!this.cansubmit){
        alert("patikrinkite ar įvedėte visus duomenis");
      }else{
        this.order.id = this.$store.getters.orders.length;
        this.order.timestamp = this.timeconverter(Date.now());
        this.order.user = this.user;
        this.order.cart = this.products;
        this.order.total = Math.round(this.products.reduce((total, p) => total + p.price * p.quantity, 0)*100)/100;
        this.$store.commit('makeOrder', this.order);
        localStorage.setItem('orders', JSON.stringify(this.$store.getters.orders));
        
        //nunuliname localStorage krepšelį
        this.$store.commit('setSomething', {name : 'added', content: [] });
        localStorage.setItem('added', JSON.stringify(this.$store.getters.added));
        //atnaujiname localstorage orders objektą
        this.$router.push('/');
        alert("Sveikiname! Užsakymas sėkmingai atliktas, netrukus su jumis susisieksime");
      }

    },

    timeconverter(timestamp){
      var a = new Date(timestamp);
      var months = ['01','02','03','03','04','06','07','08','09','10','11','12'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = year + '-' + month +'-' + date +' '+ + hour + ':' + min;
      return time;
    }
  },
}
</script>

<style lang="css">
.order{
  text-align: left;
}

.order p{
  padding-bottom: 1em;
  border-bottom: 1px solid #dee2e6;
}
</style>
