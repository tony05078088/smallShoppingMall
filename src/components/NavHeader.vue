<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">雲服務</a>
          <a href="javascript:;">協議規則</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-else @click="login">登錄</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的訂單</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>
            購物車({{ cartCount }})</a
          >
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手機</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="(item, index) in phoneList"
                  :key="index"
                >
                  <a :href="'/#/product/' + item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi紅米</span>
          </div>
          <div class="item-menu">
            <span>電視</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="" />
                    </div>
                    <div class="pro-name">小米壁畫電視</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-2.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米全面屏電視</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-3.png" alt="" />
                    </div>
                    <div class="pro-name">小米電視4A 32'</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米電視4A 55'</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt="" />
                    </div>
                    <div class="pro-name">小米電視4A 65'</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-6.png" alt="" />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: [],
    };
  },
  computed: {
    ...mapState(["username", "cartCount"]),
    // username() {
    //   return this.$store.state.username;
    // },
    // cartCount() {
    //   return this.$store.state.cartCount;
    // },
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "$" + val.toFixed(2) + "元";
    },
  },
  mounted() {
    this.getProductList();
    let params = this.$route.params;
    if (params && params.from == "login") {
      this.getCartCount();
    }
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    getProductList() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 6,
          },
        })
        .then(res => {
          console.log(res);
          // if (res.list.length > 6) {
          //   this.phoneList = res.list.slice(0, 6);
          // }
          this.phoneList = res.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$message("登出成功");
        // 將cookie的值設為空
        this.$cookie.set("userId", "", {expires: "-1"});
        //將人名及購物車數量清空
        this.$store.dispatch("saveUserName", "");
        this.$store.dispatch("saveCartCount", 0);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        this.$store.dispatch("saveCartCount", res);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";

.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #b0b0b0;
        text-align: center;
        color: #ffffff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      @include flex();
      position: relative;
      height: 112px;
      .header-menu {
        display: inline-block;
        width: 100%;
        padding-left: 10%;
        .item-menu {
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          //line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 100%;
            height: 10%;
            opacity: 0;
            overflow: hidden;
            transition: all 0.2s;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            background-color: #ffffff;
            z-index: 10;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin: 19px 0 8px 0;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &:before {
                content: "";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child:before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            //width: 264px;
            width: 50%;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}

@include respond(phone) {
  .header {
    font-size: 0.25rem;
    .nav-topbar {
      .container {
        height: 100%;
        .topbar-menu {
          width: 56%;
          height: 100%;
          a {
            margin-right: 0.5%;
          }
        }
        .topbar-user {
          display: flex;
          justify-content: flex-end;
          width: 50%;
          height: 100%;
          a {
            //min-width: 25px;
            margin-right: 2.5%;
            &.my-cart {
              width: 60%;
              height: 100%;
              .icon-cart {
                width: 25%;
                margin-right: 1.5%;
              }
            }
          }
        }
      }
    }

    .nav-header {
      height: 50%;
      .container {
        height: 30%;
        .header-logo {
          width: 25px;
          height: 25px;
          a {
            //width: 110px;
            &:before {
              @include bgImg(25px, 25px, "/imgs/mi-logo.png", 25px);
              content: " ";
              transition: margin 0.2s;
            }
            &:after {
              @include bgImg(25px, 25px, "/imgs/mi-home.png");
              content: " ";
            }
            &:hover:before {
              margin-left: -55px;
              //可指定特定屬性進行過渡
              transition: margin 0.2s;
            }
          }
        }
        .header-menu {
          width: 80%;
          padding-left: 5%;
          .item-menu {
            margin-right: 2.5%;
            font-size: 0.5rem;
            &:hover {
              .children {
                height: auto;
                top: 1%;
                opacity: 1;
              }
            }
            .children {
              height: auto;
              opacity: 0;
              .product {
                height: auto;
                width: (100%/6);
                a {
                  width: 100%;
                  .pro-img {
                    height: auto;
                    img {
                      height: 50px;
                      margin-top: 0.5rem;
                    }
                  }
                  .pro-name {
                    width: 100%;
                    margin: 2% 0 1% 0;
                    font-size: 10px;
                  }
                }
              }
            }
          }
        }
        .header-search {
          width: 30%;
          height: 30%;
          .wrapper {
            height: 100%;
            input {
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
