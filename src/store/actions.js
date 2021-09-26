export default {
  saveUserName(context, username) {
    context.commit('saveUserName', username)
  },
  saveCartCount(context, cartCount) {
    context.commit('saveCartCount', cartCount)
  },
  saveListItem(context, listitem) {
    console.log(listitem)
    context.commit('saveListItem', listitem)
  },
}
