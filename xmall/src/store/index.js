import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    userInfo: null,
    cartList: [],
    showCart: false
  },
  mutations: {
    SHOWCART(state, {
      showCart
    }) {
      state.showCart = showCart
    },
    ISLOGING(state, info) {
      state.userInfo = info;
      state.login = true;
      setStore('userInfo', info)
    },
    ADDCART(state, {
      productId,
      salePrice,
      productName,
      productImageBig,
      productNum = 1
    }) {
      let cart = state.cartList;
      let goods = {
        productId,
        salePrice,
        productName,
        productImageBig
      }
      let falg = true;
      if (cart.length) {
        cart.forEach(item => {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              falg = false;
              item.productNum += productNum;
            }
          }
        })
      }
      if (!cart.length || falg) {
        goods.productNum = productNum;
        cart.push(goods);
      }
      state.cartList = cart;
      setStore('buyCart', cart);
    }
  },
  actions: {},
  modules: {}
})
