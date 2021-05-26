<template>
  <div class="cart">
    <order-header title="我的購物車">
      <template v-slot:tips>
        <span>提示：產品是否購買成功，以最終下單為準，請盡快結算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="items_box">
        <ul class="items_head">
          <li class="col-1">
            <span class="checkbox" :class="{checked: allChecked}"></span>
            全選
          </li>
          <li class="col-3">
            商品名稱
          </li>
          <li class="col-1">
            單價
          </li>
          <li class="col-2">
            數量
          </li>
          <li class="col-1">
            小計
          </li>
          <li class="col-1">
            操作
          </li>
        </ul>
        <ul class="cart-Items">
          <li class="cart-Item" v-for="(item, index) in list" :key="index">
            <div class="item_check">
              <span
                class="checkbox"
                :class="{checked: item.productSelected}"
              ></span>
            </div>
            <div class="item_name">
              <img v-lazy="item.productMainImage" alt="" />
              <span>{{ item.productName + " , " + item.productSubtitle }}</span>
            </div>
            <div class="item_price">{{ item.productPrice }}</div>
            <div class="item_quantity">{{ item.quantity }}</div>
            <div class="item_total">{{ item.productTotalPrice }}</div>
            <div class="item_del"></div>
          </li>
        </ul>
      </div>
      <div class="order_wrap">
        <div class="item_wrap_left">
          <a href="">繼續購物</a>
          <span
            >共{{ list.length }}件商品,已選擇{{ checkedNumber.length }}件</span
          >
        </div>
        <div class="item_wrap_right">
          <span class="price">合計 {{ cartTotalPrice }}元</span>
          <span class="checkout">
            <a href="javascript:;">去結算</a>
          </span>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import NavFooter from "../components/NavFooter";
export default {
  name: "Cart",
  components: {
    OrderHeader,
    NavFooter,
  },
  data() {
    return {
      isChecked: false,
      list: [], //商品列表
      allChecked: false, //是否全選
      cartTotalPrice: 0, //選中商品總金額
      checkedNumber: 0, //選中商品數量
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.axios.get("/carts").then(res => {
        console.log(res);
        this.list = res.cartProductVoList || [];
        this.allChecked = res.selectedAll;
        this.cartTotalPrice = res.cartTotalPrice;
        this.checkedNumber = this.list.filter(item => {
          return item.productSelected;
        });
      });
    },
  },
};
</script>

<style lang="scss">
.cart {
  .wrapper {
    height: auto;
    padding: 5% 10%;
    background-color: #f5f5f5;
    .items_box {
      width: 100%;
      height: 80%;
      background-color: #ffffff;
      ul {
        height: 20%;
      }
      .items_head {
        height: 10%;
        display: flex;
        text-align: center;
        color: #666666;
        font-size: 14px;
        li {
          margin: auto;
          .checkbox {
            display: inline-block;
            width: 22px;
            height: 22px;
            border: 1px solid #e5e5e5;
            vertical-align: middle;
            margin-right: 5%;
          }
        }
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-Item {
        height: 90%;
        padding-top: 2%;
        display: flex;
        border-top: 1px solid #e5e5e5;
        .item_check,
        .item_price,
        .item_total,
        .item_del {
          flex: 1;
        }
        .item_quantity {
          flex: 2;
          text-align: center;
          padding: 0.5% 0;
        }
        .item_price {
          text-align: center;
          padding: 0.5% 0;
        }
        .item_name {
          flex: 3;
          display: flex;
          img {
            width: 30%;
          }
          span {
            display: inline-block;
            font-size: 18px;
            width: 60%;
            height: 100%;
            text-align: center;
            padding: 5% 0;
          }
        }
        .checkbox {
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #e5e5e5;
          vertical-align: middle;
          margin-left: 20%;
          cursor: pointer;
          &.checked {
            background: url("/imgs/icon-gou.png") #f60 no-repeat 50%;
            background-size: 16px 12px;
            border: none;
          }
        }
      }
    }
    .order_wrap {
      width: 100%;
      margin-top: 1.5%;
      font-size: 14px;
      height: 10%;
      display: flex;
      justify-content: space-between;
      .item_wrap_left {
        width: 30%;
        color: #666666;
        a {
          display: inline-block;
          margin-right: 3%;
          color: #666666;
        }
      }
      .item_wrap_right {
        width: 30%;
        display: flex;
        justify-content: end;
        span {
          height: 50%;
          display: inline-block;
          &.price {
            width: 48%;
            text-align: center;
            margin-right: 2%;
            margin: auto;
          }
          &.checkout {
            width: 50%;
            height: auto;
            text-align: center;
            margin: auto;
            padding: 5% 0;
            background-color: #ff6600;
            a {
              width: 50%;
              height: 100%;
              display: inline-block;
              color: #ffffff;
              margin: auto;
            }
          }
        }
      }
    }
  }
}
</style>
