<template>
  <div class="orderlist">
    <order-header title="訂單列表">
      <template v-slot:tips>
        <span>請謹防釣魚連接或詐騙電話</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order" v-for="(item, index) in list" :key="index">
          <div class="order_title">
            <div class="item_info_left">
              <span class="time">{{ item.createTime }}</span>
              <span class="name">{{ item.receiverName }}</span>
              <span class="no">{{ item.orderNo }}</span>
              <span class="pay">{{ item.paymentTypeDesc }}</span>
            </div>
            <div class="item_info_right">
              <span
                >應付金額:
                <span class="totalfee">{{ item.payment }}元</span></span
              >
            </div>
          </div>
          <div
            class="item_detail"
            v-for="(singleitem, i) in item.orderItemVoList"
            :key="i"
          >
            <div class="detail_left">
              <img v-lazy="singleitem.productImage" alt="" />
              <div class="detail_item">
                <div>{{ singleitem.productName }}</div>
                <div>
                  {{ singleitem.currentUnitPrice }} X {{ singleitem.quantity }}
                </div>
              </div>
            </div>
            <div class="detail_right" v-if="item.status == 10">
              <span @click="goPay(item.orderNo)">
                {{ item.statusDesc }}
              </span>
            </div>
            <div class="detail_right" v-else>
              <span>
                {{ item.statusDesc }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
export default {
  name: "orderlist",
  components: {
    OrderHeader,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getOrderList() {
      this.axios.get("/orders").then(res => {
        this.list = res.list;
        console.log(res);
      });
    },
    goPay(orderNo) {
      console.log(orderNo);
      //導航的三種方式:
      //1. this.$router.push("/order/pay");
      //2. this.$router.push({
      //   name:'order-pay',
      //   query: {
      //     orderNo
      //   }
      // })

      //3.
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo,
        },
      });
    },
  },
  mounted() {
    this.getOrderList();
  },
};
</script>

<style lang="scss">
.orderlist {
  .wrapper {
    width: 100%;
    padding-top: 3%;
    background-color: #f5f5f5;
    .container {
      height: 100%;
      margin: 0 auto;
      .order {
        height: 25%;
        margin-bottom: 5%;
        background-color: #ffffff;
        border: 1px solid #d7d7d7;
        .order_title {
          width: 94%;
          height: 30%;
          padding: 1% 3%;
          display: flex;
          justify-content: space-between;
          background-color: #fffaf7;
          .item_info_left {
            flex: 4;
            display: flex;
            align-items: center;
            span {
              display: inline-block;
            }
            .time {
              width: 15%;
            }
            .name {
              width: 10%;
            }
            .no {
              width: 15%;
            }
          }
          .item_info_right {
            flex: 1;
            text-align: right;
            .totalfee {
              margin-left: 1.5%;
              font-size: 26px;
            }
          }
        }
        .item_detail {
          display: flex;
          height: 50%;
          padding: 2% 3%;
          justify-content: space-between;
          align-items: center;
          .detail_left {
            width: 30%;
            height: 100%;
            display: flex;
            img {
              width: 50px;
              height: 50px;
            }
            .detail_item {
              height: 100%;
              margin-left: 2%;
            }
          }
          .detail_right {
            width: 10%;
            font-size: 20px;
            color: #ff6600;
            text-align: right;
            span {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
