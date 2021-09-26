// 商城Vuex-mutations

export default {
  saveUserName(state, username) {
    state.username = username
  },
  saveCartCount(state, cartCount) {
    state.cartCount = cartCount
  },
  saveListItem(state, listitem) {
    state.listitem = listitem
  },
  modifyTitle(state, obj) {
    state.listitem.filter(item => {
      if (item.id === obj.id) {
        item = obj
      }
    })
  },
}
