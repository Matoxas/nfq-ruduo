<template>
  <div class="feed">

    <div class="navbar">
      <div class="nav-logo">
          <router-link to="/" tag="h1" class="logo">
            <span id="text" class="d-none d-lg-inline">parduotuvėlė</span>
          </router-link>
        <!-- <a class="navbar-brand" href="#">
          <span id="logo">logo</span>
          <span id="text" class="d-none d-lg-inline">Drabužiai</span>
        </a> -->
      </div>
      <div class="nav-search">
          <input type="text"
                 class="form-control"
                 v-model="input"
                 @keyup="search()"
                 placeholder="Ieškoti užsakymų..."/>
      </div>
      <div class="nav-links">
        <ul class="">
          <li class="">
            <router-link to="/cart" tag="a" class="nav-link">
              <i class="fas fa-shopping-cart">
                <span v-if="itemsInCart" class="badge">{{itemsInCart}}</span>
              </i>
            </router-link>
          </li>
          <router-link class="link" tag="li"  to="/">pagrindinis</router-link>
          <router-link class="link" tag="li"  to="/orders">užsakymai</router-link>
        </ul>
      </div>

    </div>
      <br>


  </div>
</template>

<script>
export default {
  data () {
    return {
      toggler : false,
      retrievedObject : '',
      input : ''
    }
  },
  methods:{
    search(){
      this.$router.push('/orders');
      this.$store.commit('setSearch', this.input);
    }

  },

  created(){

  },

  computed:{

    itemsInCart(){
      let cart = this.$store.getters.cartProducts;
      // po kiekvieno krepšelio pasikeitimo duomenis išsaugome localStorage
      localStorage.setItem('added', JSON.stringify(this.$store.getters.added));
      return cart.reduce((accum, item) => Number(accum) + Number(item.quantity), 0)
    }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


/* @font-face {
    font-family: FontAwesome;
    src: url("../assets/fa-regular-400.eot");
} */

*{
  padding: 0;
  margin: 0;
  color: #495057;
}

.logo{
  /* padding-left: 1rem; */
}

.navbar{
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  background-color: #f8f9fa;
  align-items: center;
}

.navbar > div{
  flex-grow: 1;
  padding: .5rem;
}


.navbar *{
    margin: 0;
}

.nav-logo{
  text-align: left;
}

h1{
  color: red;
  font-size: 1.25rem;
}


.nav-link{
  text-align: right;
  font-size: 1.25rem;
}
.navbar ul li{
  display: inline-block;
  margin-left: 1rem;
  margin-right: 1rem;
  text-decoration: none;
}


.form-control{
  border-radius: 0;
  padding: .375rem .75rem;
}

.link, .logo{
  cursor: pointer;
}

.link:hover, .logo:hover{
    color: black;
}



a:hover{
  color: black !important;
}


.open{
  display: block;
}

.dropdown-item{
  padding: 1rem;
}

.dropdown-menu{
  position: absolute;
  margin-top: 1.8rem;
  left: 20;
  /* text-align: center; */
}

ul{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

ul > *{
  display: block;
}

.fas{
  position: relative;
}

.badge{
  font-size: .4em;

      display: block;
      position: absolute;
      top: -.5em;
      right: -.75em;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.7em;
      border-radius: 50%;
      text-align: center;

      color: #fff;
      background: red;
}


</style>
