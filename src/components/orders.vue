<template lang="html">
  <div class="orders">
    <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Vardas</th>
      <th scope="col">El.paštas</th>
      <th scope="col">Užsakymo data</th>
      <th scope="col">Suma</th>
      <th scope="col">Veiksmas</th>
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

<div class="row">
  <div class="col-sm-6">
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
    <p>Viso puslapių: {{pageCount}}</p>
  </div>
  <div class="col-sm-6">
    <div class="float-right">
      <form class="form-inline">
        <label class="" for="exampleSelect1">Įrašų puslapyje: </label>
  <select class="form-control mb-2 mr-sm-2 mb-sm-0" @change="pageNumber=1" v-model="items_per_page" id="exampleSelect1">
    <option>5</option>
    <option>10</option>
    <option>20</option>
  </select>
        <!-- <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Jane Doe"> -->
      </form>
    </div>
  </div>
</div>




  </div>
</template>

<script>
export default {
  data(){
    return{
      items_per_page : 5,
      pageNumber: 1

    }
  },
  methods:{
    round(input){
      return Math.round(input * 100)/100;
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



</style>
