<template lang="html">
  <div class="orders">
    <modal :show="show_modal" :order="current_order" @showModal="showModal(data)"></modal>
    <div class="table-responsive">
      <table class="table table-bordered text-left">
        <thead>
          <tr class="columns">
            <th @click="sort('id')" :class="{active:currentSort == 'id'}" scope="col">
              <p class="float-left">#</p>
              <i class="fas fa-sort float-right"></i>
              <i class="fas sort-icon float-right" :class="currentSortDir == 'asc' ? 'fa-sort-up' : 'fa-sort-down' "></i>
            </th>
            <th @click="sort('name')" :class="{active:currentSort == 'name'}" scope="col">
              <p class="float-left">Vardas</p>
              <i class="fas fa-sort float-right"></i>
              <i class="fas sort-icon float-right" :class="currentSortDir == 'asc' ? 'fa-sort-up' : 'fa-sort-down' "></i>

            </th>
            <th @click="sort('email')" :class="{active:currentSort == 'email'}" scope="col">
              <p class="float-left">El.Paštas</p>
              <i class="fas fa-sort float-right"></i>
              <i class="fas sort-icon float-right" :class="currentSortDir == 'asc' ? 'fa-sort-up' : 'fa-sort-down' "></i>

            </th>
            <th @click="sort('timestamp')" :class="{active:currentSort == 'timestamp'}" scope="col">
              <p class="float-left">Užsakymo data</p>
              <i class="fas fa-sort float-right"></i>
              <i class="fas sort-icon float-right" :class="currentSortDir == 'asc' ? 'fa-sort-up' : 'fa-sort-down' "></i>

            </th>
            <th @click="sort('total')" :class="{active:currentSort == 'total'}" scope="col">
              <p class="float-left">Suma</p>
              <i class="fas fa-sort float-right"></i>
              <i class="fas sort-icon float-right" :class="currentSortDir == 'asc' ? 'fa-sort-up' : 'fa-sort-down' "></i>
            </th>
            <th scope="col">
              <p class="float-left">Veiksmas</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders">
            <th scope="row">{{order.id}}</th>
            <td>{{order.user.name}}</td>
            <td>{{order.user.email}}</td>
            <td>{{order.timestamp}}</td>
            <td>€{{round(order.total)}}</td>
            <td><button class="btn btn-light" @click="details(order)">detaliau</button></td>
          </tr>
        </tbody>
      </table>
    </div>
<div class="flex">
    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item" :class="{disabled : pageNumber-1<1}">
          <a @click.prevent="prevPage()" class="page-link">Atgal</a>
        </li>
        <li class="page-item" :class="{disabled : pageNumber-1<1}"><a class="page-link" @click.prevent="prevPage()" href="#">{{pageNumber-1}}</a></li>
        <li class="page-item active">
          <span class="page-link">
            {{pageNumber}}
            <span class="sr-only">{{pageNumber}}</span>
          </span>
        </li>
        <li class="page-item" :class="{disabled : pageNumber >= pageCount}" ><a class="page-link" @click.prevent="nextPage()" href="#">{{pageNumber+1}}</a></li>
        <li class="page-item" :class="{disabled : pageNumber >= pageCount}">
          <a class="page-link" @click.prevent="nextPage()" href="#">Pirmyn</a>
        </li>
      </ul>
    </nav>
        <label class="d-none d-md-inline">Viso puslapių: {{pageCount}}</label>
    <div>
      <form class="form-inline">
        <label class="d-xs-inline" for="exampleSelect1">Rodyti: </label>
        <select class="form-control" @change="pageNumber=1" v-model="items_per_page" id="exampleSelect1">
    <option>5</option>
    <option>10</option>
    <option>20</option>
  </select>
        <!-- <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Jane Doe"> -->
      </form>
    </div>
  </div>




  </div>
</template>

<script>
import modal from './modal.vue';

export default {

  components: {modal},

  data(){
    return{
      items_per_page : 5,
      pageNumber: 1,
      currentSort:'id',
      currentSortDir:'asc',
      show_modal : false,
      current_order : {}

    }
  },

  created(){

    this.sort(this.currentSort);
  },

  methods:{
    round(input){
      return Math.round(input * 100)/100;
    },

    showModal(data){
      this.show_modal = data;
    },

    search(input, phrase){
      return input.filter(post =>{
      return post.user.name.toLowerCase().includes(phrase.toLowerCase())
      })
    },

    paginate(input){
    const start = (this.pageNumber-1) * Number(this.items_per_page),
          end = start + Number(this.items_per_page);
     return input.slice(start, end);
   },

   nextPage(){
      this.pageNumber++;
   },
   prevPage(){
     this.pageNumber--;
   },

    details(order){
      this.showModal(true);
      this.current_order = order;
    },

    sort(column){
      //puslapio numerį pakeičiam į pirmą
      this.pageNumber = 1;
      //if s == current sort, reverse
    if(column == this.currentSort) {
      this.currentSortDir = this.currentSortDir=='asc'?'desc':'asc';
    }
      this.currentSort = column;
      this.$store.commit('sort', {currentSort : this.currentSort, currentSortDir: this.currentSortDir});
    }

  },

  computed:{

    phrase(){
      return this.$store.getters.search;
    },

    total_orders(){
      return this.$store.getters.orders;
    },

//atvaizduojam galutini rezultata su paginacija ir paieska

    orders() {
      return this.paginate(this.search(this.total_orders, this.phrase));

   },

   // skaiciuojam kiek puslapių bus po kiekvieno pasikeitimo

   pageCount(){
      let l = this.search(this.total_orders, this.phrase).length,
          s = Number(this.items_per_page);
      return Math.floor(l/s);
    }
},
  watch:{

    phrase : function (){
      this.pageNumber = 1;
    }

  }
}


</script>

<style lang="css">

  .page-link{
    color: #495057;
  }

.page-item.active .page-link{
  background-color: #343a40;
  border-color: #343a40;
}

#exampleSelect1{
  margin-left: .5em;
  margin-right: 0 !important;
}

nav{
  margin-right: .5em;
}

.col-sm-6{
  display: flex;
  justify-content: flex-end;
}

.col-sm-6:first-child{
  justify-content: flex-start;
}

.col-sm-6 p{
  margin-top: .5rem;
}

.columns th:hover{
  cursor: pointer;
  color: black;
}

th.active{
  background-color: #f8f9fa;
  color: black;
}

th.active:hover{

}

th p{
  margin-bottom: 0;
}

th .fas{
  line-height: 1.25;
}

.active .fa-sort{
  display: none;
}

.flex{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.flex > *{
  flex-basis: 1;
}


.flex label{
  padding: 0;
  padding-top: .5rem;
  margin: 0;
}

.form-inline label{
  padding: 0;
}

.sort-icon{
  display: none;
}

.active .sort-icon{
  display: inline-block;
}



</style>
