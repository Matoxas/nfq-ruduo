<template lang="html">
  <div class="">

    <!-- Button trigger modal -->
<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button> -->

<!-- Modal -->
<div @keyup.native.esc="showModal(false)" class="modal bd-example-modal-lg" :class="{show : show}">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Užsakymo nr. #{{order.id}} detalės:</h5>
        <button type="button" @click="showModal(false)" class="close" aria-label="Close">
          <span>&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <br>
        <table v-if="order.cart.length > 0" class="table">
  <thead>
    <tr>
      <th scope="col">Produktas</th>
      <th scope="col">Kiekis</th>
      <th scope="col">Vieneto kaina</th>
      <th scope="col">Viso</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="cart in order.cart">
        <th scope="row">{{cart.name}}</th>
        <td>{{cart.quantity}}</td>
        <td>€{{cart.price}}</td>
        <td>€{{Math.round(cart.price * cart.quantity*100)/100}}</td>
    </tr>
    <br>
    <tr class="last">
      <td></td>
      <td></td>
      <th>Viso:</th>
      <th>€{{order.total}}</th>
    </tr>
  </tbody>
  <br>
  <h5>Asmeninė informacija:</h5>
</table>
<div class="row">
  <div class="col-3"><p><b>Vardas: </b></p></div>
  <div class="col-9"><p>{{order.user.name}}</p></div>
</div>
<div class="row">
  <div class="col-3"><p><b>El. Paštas: </b></p></div>
  <div class="col-9"><p>{{order.user.email}}</p></div>
</div>
<div class="row">
  <div class="col-3"><p><b>Užsakymo data: </b></p></div>
  <div class="col-9"><p>{{order.timestamp}}</p></div>
</div>
<div class="row">
  <div class="col-3"><p><b>Komentaras: </b></p></div>
  <div class="col-8"><p>{{order.user.description}}</p></div>
</div>
<div v-if="!order.cart.length > 0" class="row">
  <div class="col-3"><p><b>Bendra suma: </b></p></div>
  <div class="col-8"><p>€{{Math.round(order.total*100)/100}}</p></div>
</div>

      </div>
      <div class="modal-footer">
        <button type="button" @click="showModal(false)" class="btn btn-secondary">Uždaryti</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>

  </div>

</template>

<script>
export default {

  props: ['show', 'order'],
  data(){
    return{
      // show : false
    }
  },
  methods:{
    showModal(data){
      this.$emit('showModal', false)
    }
  }
}
</script>

<style lang="css">

.show{
  display: block;
}

.modal{
  background-color:rgba(0, 0, 0, 0.5);
  text-align: left;
}

.modal .table td, .table th {
   border: none;
}

tr.last{
  border-top: 1px solid #e9ecef;
}

.modal h5{
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1em;
}

.modal-header h5{
  border: 0;
  padding: 0;
}

.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    height: 450px;
    overflow-y: auto;
}


</style>
