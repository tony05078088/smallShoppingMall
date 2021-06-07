import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../src/pages/home";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      // redirect: "/index",
      // children: [
      //   {
      //     path: "/index",
      //     name: "index",
      //     component: Index,
      //   },
      //   {
      //     path: "/product/:id",
      //     name: "product",
      //     component: () => import("./pages/product.vue"),
      //   },
      //   {
      //     path: "/detail/:id",
      //     name: "detail",
      //     component: () => import("./pages/detail.vue"),
      //   },
      // ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/login.vue"),
    },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   component: () => import("./pages/cart.vue"),
    // },
    // {
    //   path: "/order",
    //   name: "order",
    //   component: () => import("./pages/order.vue"),
    //   children: [
    //     {
    //       path: "confirm",
    //       name: "order-confirm",
    //       component: () => import("./pages/orderConfirm.vue"),
    //     },
    //     {
    //       path: "list",
    //       name: "order-list",
    //       component: () => import("./pages/orderList.vue"),
    //     },
    //     {
    //       path: "pay",
    //       name: "order-pay",
    //       component: () => import("./pages/orderPay.vue"),
    //     },
    //     {
    //       path: "alipay",
    //       name: "ali-pay",
    //       component: () => import("./pages/alipay.vue"),
    //     },
    //   ],
    //},
  ],
});
