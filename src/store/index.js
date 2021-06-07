import {createStore} from "vuex";
import actions from "./actions";
import mutations from "./mutations";

const state = {
  username: "",
  cartCount: 0,
};

export default createStore({
  state,
  mutations,
  actions,
});
