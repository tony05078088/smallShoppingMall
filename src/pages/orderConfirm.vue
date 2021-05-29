<template>
  <div class="OrderConfirm">
    <div class="wrapper">
      <div class="container">
        <div class="order_box">
          <div class="address_box">
            <h2>收貨地址</h2>
            <div class="address">
              <span v-for="(item, index) in list" :key="index">
                <h4>{{ item.receiverName }}</h4>
                <div class="phone">{{ item.receiverMobile }}</div>
                <div class="info">
                  {{ item.receiverCity }} - {{ item.receiverDistrict }}-
                  {{ item.receiverProvince }}
                </div>
                <div class="action">
                  <i class="el-icon-delete"></i>
                  <i class="el-icon-edit"></i>
                </div>
              </span>
            </div>
          </div>
          <div class="goods_info">
            <h2>商品</h2>
            <div class="detail" v-for="(item, index) in cartList" :key="index">
              <span class="name">
                <img v-lazy="item.productMainImage" alt="" />
                {{ item.productName }} - {{ item.productSubtitle }}
              </span>
              <span class="quantity">
                {{ item.productPrice }} * {{ item.quantity }}
              </span>
              <span class="price"> {{ item.productTotalPrice }} 元</span>
            </div>
            <div class="ship">
              <h3>配送方式</h3>
              <a href="javascript:;">免運費</a>
            </div>
            <div class="envoice">
              <h3>發票</h3>
              <a href="javascript:;">電子發票</a>
              <a href="javascript:;">個人</a>
            </div>
          </div>
          <div class="total">
            <div class="item">
              <span>商品件數</span> <span>{{ count }}件</span>
            </div>
            <div class="item">
              <span>商品總價</span> <span>{{ cartTotalPrice }}元</span>
            </div>
            <div class="item"><span>優惠活動</span><span>0元</span></div>
            <div class="item"><span>運費</span> <span>0元</span></div>
          </div>
          <div class="btn-group">
            <button class="btn btn-default">返回購物車</button>
            <button class="btn">去結算</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderconfirm",
  components: {},
  data() {
    return {
      list: [], //收貨地址列表
      cartList: [], //購物車中需要結算的商品列表
      cartTotalPrice: 0,
      count: 0, //商品結算數量
    };
  },
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    getAddressList() {
      this.axios.get("/shippings").then(res => {
        this.list = res.list;
      });
    },
    getCartList() {
      this.axios.get("/carts").then(res => {
        let list = res.cartProductVoList; //獲取購物車中所有商品數據
        this.cartTotalPrice = res.cartTotalPrice; //商品總金額
        this.cartList = list.filter(item => item.productSelected);
        this.cartList.map(item => (this.count += item.quantity));
      });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/button.scss";

.OrderConfirm {
  width: 100%;
  height: 600px;
  .wrapper {
    width: 100%;
    height: 100%;
    padding-top: 3%;
    background-color: #f5f5f5;
    .container {
      height: 100%;
      margin-right: auto;
      margin-left: auto;
      background-color: #ffffff;
      .order_box {
        padding-left: 3%;
        width: 97%;
        height: 100%;
        .address_box {
          width: 100%;
          height: 40%;
          .address {
            display: flex;
            justify-content: space-between;
            height: 70%;
            margin-top: 1%;
            h4 {
              font-size: 18px;
              font-weight: 300;
              color: rgb(51, 51, 51);
              margin-bottom: 5%;
            }
            span {
              display: inline-block;
              width: 21%;
              box-sizing: border-box;
              border: 1px solid #e5e5e5;
              padding: 1%;
              cursor: pointer;
              &:last-child {
                margin-right: 3%;
              }
              div {
                color: rgb(117, 117, 117);
                font-size: 14px;
                height: 15%;
                margin-top: 1.5%;
                &.action {
                  height: 50%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
              }
            }
          }
        }
        .goods_info {
          width: 100%;
          height: 30%;
          display: flex;
          flex-direction: column;
          h3 {
            display: inline-block;
            font-weight: bold;
            width: 10%;
          }
          .detail {
            display: flex;
            padding: 1%;
            height: 20%;
            line-height: 36px;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            .name {
              flex: 3;
              img {
                width: 30px;
                height: 30px;
              }
            }
            .quantity {
              flex: 2;
            }
            .price {
              margin-right: 2%;
              color: #f60;
            }
          }
          .ship {
            margin-top: 3%;
            height: 20%;
            a {
              color: rgb(255, 103, 0);
            }
          }
          .envoice {
            margin-top: 2%;
            height: 20%;
            a {
              color: rgb(255, 103, 0);
              margin-right: 1%;
            }
          }
        }
        .total {
          width: 100%;
          height: 20%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          border-bottom: 1px solid rgb(245, 245, 245);
          .item {
            width: 100%;
            margin-right: 2%;
            margin-top: 0.5%;
            text-align: right;
            span {
              &:first-child {
                margin-right: 10%;
              }
              &:last-child {
                display: inline-block;
                width: 5%;
              }
            }
          }
        }
        .btn-group {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
