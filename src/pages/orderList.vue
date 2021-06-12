<template>
  <div class="orderlist">
    <order-header title="訂單列表">
      <template v-slot:tips>
        <span>請謹防釣魚連接或詐騙電話</span>
      </template>
    </order-header>
    <loading v-if="loading"></loading>
    <no-data v-if="!loading && list.length == 0"></no-data>
    <div class="wrapper" v-else>
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
        <el-pagination
          class="pagination"
          background
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleChange"
        >
        </el-pagination>
        <!-- <div class="load-more" v-if="showNextPage">
          <el-button type="primary" :loading="loading" @click="loadMore"
            >加載更多</el-button
          >
        </div>

        <div
          class="scoll-more"
          v-infinite-scroll="scrollMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="500"
        >
          <img
            src="/imgs/loading-svg/loading-spinning-bubbles.svg"
            alt=""
            v-show="loading"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import {Pagination, Button} from "element-ui";
import infiniteScroll from "vue-infinite-scroll";
export default {
  name: "orderlist",
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button,
  },
  directives: {infiniteScroll},
  data() {
    return {
      list: [],
      loading: true,
      pageSize: 5,
      pageNum: 1, //當前在第幾頁
      total: 0,
      busy: false, //滾動加載,是否觸發
      showNextPage: true, //加載更多,是否顯示按鈕
    };
  },
  methods: {
    getOrderList() {
      this.loading = true;
      this.busy = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then(res => {
          console.log(res);
          this.loading = false;
          this.busy = false;
          this.showNextPage = res.hasNextPage;
          //拼接array,將新的資料拼到舊的array後面成為新array
          this.list = this.list.concat(res.list);
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
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
    //換頁面第一種方法:分頁器
    handleChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    //換頁面第二種方法:加載更多:按鈕
    loadMore() {
      this.pageNum += 1;
      this.getOrderList();
    },
    //換頁面第三種方法:通過npm插件滑動時加載
    scrollMore() {
      this.busy = true;
      console.log("scollFire");
      setTimeout(() => {
        this.pageNum += 1;
        this.getList();
      }, 500);
    },
    //專給scrollMore使用
    getList() {
      this.loading = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then(res => {
          //拼接array,將新的資料拼到舊的array後面成為新array
          this.list = this.list.concat(res.list);
          this.loading = false;
          if (res.hasNextPage) {
            this.busy = false;
          } else {
            this.busy = true;
          }
        });
    },
  },
  mounted() {
    this.getOrderList();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
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
        margin-bottom: 3%;
        background-color: #ffffff;
        border: 1px solid #d7d7d7;
        .order_title {
          @include wH(94%, 30%);
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
            @include wH(30%, 100%);
            display: flex;
            img {
              @include wH(50px, 50px);
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
      .pagination {
        text-align: right;
        margin-bottom: 2%;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .load-more,
      .scoll-more {
        text-align: center;
      }
      .el-button--primary {
        color: #fff;
        border-color: #ff6600;
        background-color: #ff6600;
      }
    }
  }
}

@include respond(phone) {
  .orderlist {
    .wrapper {
      .container {
        .order {
          .order_title {
            flex-direction: column;
            .item_info_left {
              flex-direction: column;
              text-align: center;
              .time,
              .name,
              .no,
              .pay {
                width: 100%;
              }
            }
            .item_info_right {
              text-align: center;
            }
          }
        }
        .pagination {
          text-align: left;
        }
      }
    }
  }
}
</style>
