import Vue from 'vue'
import Vuex from 'vuex'
import products from './assets/products.json';
Vue.use(Vuex)

const state = {
  added : [],
  all: [],
  orders: [],
  search: ''

};

const getters = {
  added: state => state.added,
  search: state => state.search,
  orders: state => state.orders,
  allProducts: state => state.all,
  cartProducts: state =>  state.added.map(({id,quantity}) =>{
      let product = state.all.find(p => p.id === id)
    return {
      name : product.name,
      price: product.price,
      quantity
    }
  }),

};

const actions ={
	addtocart({ commit }, product){
		commit('addtocart', product.id)
	}
}

const mutations = {

	addtocart (state, product_id ) {
	    const record = state.added.find(p => p.id === product_id)

	    if (!record) {
	      state.added.push({
	        id: product_id,
	        quantity: 1
	      })
	    } else {
	      record.quantity++
      }
      alert('produktas sėkmingai pridėtas į krepšelį.');
	    },

    removeItem(state, index){
      state.added.splice(index, 1);
    },

    makeOrder(state, order){
      state.orders.push(order);
    },

    updateQuantity(State, data){
      let index = data[0];
      let quantity = data[1];
      state.added[index].quantity = quantity;
    },

    setSearch(State, data){
      state.search = data;
    },

    setSomething(state, object){
      state[object.name] = object.content;
    },
  }



export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
