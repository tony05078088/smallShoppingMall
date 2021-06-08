<template>
  <div class="orderPay">
    <order-header title="訂單支付">
      <template v-slot:tips>
        <span>請謹防釣魚連接或詐騙電話</span>
      </template>
    </order-header>
    <div class="messageBox">
      <div class="success">
        <div class="successImg"></div>
        <div class="successInfo">
          <h2>訂單提交成功! 去付款～</h2>
          <div class="tip">
            <p>請在 <span>30分</span> 內完成支付,超時將取消訂單</p>
            <p>收貨訊息: {{ addressInfo }}</p>
          </div>
        </div>
        <div class="order-total">
          <p>
            應付總額： <span>{{ totalfees }}元</span>
          </p>
          <p>
            訂單詳情
            <i
              class="el-icon-arrow-up"
              :class="{
                down: orderDetailDisplay,
              }"
              @click="orderDetailDisplay = !orderDetailDisplay"
            ></i>
          </p>
        </div>
        <div class="hiddenDetail" v-show="orderDetailDisplay">
          <div class="order_number">
            <span>訂單號</span>
            <span>{{ orderId }}</span>
          </div>
          <div class="shipping_info">
            <span>收貨訊息</span>
            <span class="detailDescription">{{ addressInfo }}</span>
          </div>
          <div class="goods_info">
            <span>商品名稱</span>
            <span
              class="items"
              v-for="(item, index) in orderDetail"
              :key="index"
            >
              <img class="logoPic" :src="item.productImage" alt="" />

              {{ item.productName }}</span
            >
          </div>
          <div class="invoice_info">
            <span>電子發票</span>
            <span>66666</span>
          </div>
        </div>
      </div>
    </div>
    <div class="platformBox">
      <h3>選擇以下支付方式付款</h3>
      <p>支付平台</p>
      <div class="payway">
        <div
          class="pay alipay"
          :class="{checked: payType == 1}"
          @click="paySubmit(1)"
        ></div>
        <div
          class="pay wechat"
          :class="{checked: payType == 2}"
          @click="paySubmit(2)"
        ></div>
      </div>
    </div>
    <scan-pay-code
      v-if="showPay"
      :img="QRCodeImg"
      @close="closePayModel"
    ></scan-pay-code>
    <modal
      title="支付確認"
      btnType="3"
      :showModal="showPayModal"
      confirmText="查看訂單"
      cancelText="未支付"
      @cancel="showPayModal = false"
      @updateModal="goOrderList"
    >
      <template v-slot:body>
        <p>是否確認完成支付?</p>
      </template>
    </modal>
  </div>
</template>

<script>
import QRCode from "qrcode";
import ScanPayCode from "../components/ScanPayCode";
import Modal from "../components/Modal";
import OrderHeader from "../components/OrderHeader";

export default {
  name: "order-pay",
  components: {
    ScanPayCode,
    Modal,
    OrderHeader,
  },
  data() {
    return {
      orderDetailDisplay: false,
      orderId: this.$route.query.orderNo,
      addressInfo: "", //收貨人地址訊息
      orderDetail: [], //訂單詳情,包含商品列表
      totalfees: 0, //應付總額
      payType: 0, //支付類型 1:支付寶 2:微信支付
      showPay: false, //微信支付qrcode顯示
      QRCodeImg: "", //微信支付二維碼圖片
      showPayModal: false, //是否顯示二次支付確認彈框
      T: "", //定時器ID
    };
  },
  methods: {
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then(res => {
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
        this.orderDetail = res.orderItemVoList;
        this.totalfees = res.payment;
      });
    },
    paySubmit(type) {
      this.payType = type;
      if (this.payType == 1) {
        //支付寶支付
        window.open("/#/order/alipay?orderId=" + this.orderId, "_blank");
      } else {
        //微信支付
        this.axios
          .post("/pay", {
            orderId: this.orderId,
            orderName: "Vue模仿小米商城",
            amount: 0.01,
            payType: 2,
          })
          .then(res => {
            console.log(res);
            QRCode.toDataURL(res.content)
              .then(url => {
                this.showPay = true;
                this.QRCodeImg = url;
                this.loopOrderState();
              })
              .catch(() => {
                this.$message.error("微信二維碼生成失敗,請稍候重試");
              });
          });
      }
    },
    //關閉微信彈框
    closePayModel() {
      this.showPayModal = true;
      this.showPay = false;
      clearInterval(this.T);
    },
    goOrderList() {
      this.$router.push("/order/list");
    },
    // 持續查詢當前訂單支付狀態
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then(res => {
          console.log(res);
          if (res.status == 20) {
            //用戶已付款成功
            clearInterval(this.T);
            this.goOrderList();
          }
        });
      }, 500);
    },
  },
  mounted() {
    this.getOrderDetail();
  },
};
</script>

<style lang="scss">
.orderPay {
  width: 100%;
  background-color: #f5f5f5;
  padding: 3% 10%;
  box-sizing: border-box;
  .messageBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .success {
      width: 94%;
      flex-wrap: wrap;
      background-color: #ffffff;
      padding: 3%;
      display: flex;
      align-items: center;
      .successImg {
        display: inline-block;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: url(/imgs/icon-gou.png) #80c58a 50% no-repeat;
        margin-right: 3%;
      }
      .successInfo {
        flex: 3;
        box-sizing: border-box;
        padding: 1.5% 0;
        height: 100%;
        margin-right: 5%;
        h2 {
          margin-bottom: 5%;
        }
        .tip {
          font-size: 14px;
          p {
            color: #666;
            span {
              color: #ff6700;
            }
          }
        }
      }
      .order-total {
        font-size: 14px;
        flex: 2;
        padding: 1.5% 0;
        height: 100%;
        box-sizing: border-box;
        p {
          margin-top: 3.5%;
          height: 50%;
          span {
            font-size: 28px;
            color: #ff6700;
          }
          i {
            margin-left: 1.5%;
            cursor: pointer;
          }
        }
        .el-icon-arrow-up {
          transition: all 0.5s;
          &.down {
            transform: rotate(180deg);
          }
        }
      }
      .hiddenDetail {
        width: 100%;
        height: 30%;
        font-size: 14px;
        color: #333;
        border-top: 1px solid #d7d7d7;
        padding: 3% 8%;
        div {
          margin-top: 2%;
          span {
            display: inline-block;
            width: 10%;
            margin-right: 5%;
            &.detailDescription {
              width: 80%;
            }
          }
        }
        .items {
          width: 15%;
          .logoPic {
            display: inline-block;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
  .platformBox {
    width: 100%;
    box-sizing: border-box;
    margin-top: 3%;
    padding: 1.5% 3%;
    background-color: #ffffff;
    h3 {
      font-size: 20px;
      font-weight: 200;
      color: #333;
      padding-bottom: 1%;
      border-bottom: 1px solid #d7d7d7;
      margin-bottom: 1%;
    }
    p {
      font-size: 18px;
    }
    .payway {
      width: 100%;
      height: 100px;
      .pay {
        width: 200px;
        height: 80px;
        display: inline-block;
        margin-top: 1%;
        cursor: pointer;
        border: 1px solid #d7d7d7;
        &.alipay {
          background: url("/imgs/pay/icon-ali.png") no-repeat 50%;
          background-size: 103px 38px;
          margin-right: 3%;
        }
        &.wechat {
          background: url("/imgs/pay/icon-wechat.png") no-repeat 50%;
          background-size: 103px 38px;
        }
        &.checked {
          border: 1px solid #ff6700;
        }
      }
    }
  }
}
</style>
