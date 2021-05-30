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
                  <i class="el-icon-delete" @click="deleteItem(item)"></i>
                  <i class="el-icon-edit" @click="deleteItem(item)"></i>
                </div>
              </span>
              <span class="add">
                <div class="add-icon" @click="openModalAddress"></div>
                <span>添加新地址</span>
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
    <modal
      title="確認新增"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal = false"
      @updateModal="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="姓名"
              v-model="checkedItem.receiverName"
            />
            <input
              type="text"
              class="input"
              placeholder="手機號碼"
              v-model="checkedItem.receiverMobile"
            />
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家莊</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="北京">昌平區</option>
              <option value="天津">海淀區</option>
              <option value="河北">東城區</option>
              <option value="河北">西城區</option>
              <option value="河北">順義區</option>
              <option value="河北">房山區</option>
            </select>
          </div>
          <div class="item">
            <textarea
              name="street"
              v-model="checkedItem.receiverAddress"
            ></textarea>
          </div>
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="郵遞區號"
              v-model="checkedItem.receiverZip"
            />
          </div>
        </div>
      </template>
    </modal>
    <modal
      title="確認刪除"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal = false"
      @updateModal="submitAddress"
    >
      <template v-slot:body>
        <p>確認刪除此地址嗎</p>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "../components/Modal";
export default {
  name: "orderconfirm",
  components: {Modal},
  data() {
    return {
      list: [], //收貨地址列表
      cartList: [], //購物車中需要結算的商品列表
      cartTotalPrice: 0,
      count: 0, //商品結算數量
      checkedItem: {}, //選中的商品對象
      userAction: "", // 用戶行為 0:新增 1:編輯 2:刪除
      showDelModal: false, //是否顯示刪除彈框
      showEditModal: false, //是否顯示新增或編輯彈框
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
    deleteItem(item) {
      this.checkedItem = item;
      this.userAction = 2;
      this.showDelModal = true;
    },
    //地址刪除,編輯,新增功能
    submitAddress() {
      let {checkedItem, userAction} = this;
      let method,
        url,
        params = {};
      if (userAction == 0) {
        method = "post";
        url = "/shippings";
        console.log(this.checkedItem);
      } else if (userAction == 1) {
        method = "put";
        url = `/shippings/${checkedItem.id}`;
      } else {
        method = "delete";
        url = `/shippings/${checkedItem.id}`;
      }
      if (userAction == 0 || userAction == 1) {
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        } = this.checkedItem;
        let errMsg;
        if (!receiverName) {
          errMsg = "請輸入收貨人名稱";
        } else if (!receiverMobile || !/\d{10}/.test(receiverMobile)) {
          errMsg = "請輸入10位手機號碼";
        } else if (!receiverProvince) {
          errMsg = "請選擇省份";
        } else if (!receiverCity) {
          errMsg = "請選擇城市";
        } else if (!receiverDistrict || !receiverAddress) {
          errMsg = "請輸入收貨地址";
        } else if (!/\d{5}/.test(receiverAddress)) {
          errMsg = "請輸入5位郵遞區號";
        }
        if (errMsg) {
          this.$message.error(errMsg);
          return;
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        };
      }
      this.axios[method](url, params).then(res => {
        console.log(res);
        this.closeModal();
        this.getAddressList();
        this.$message.success("操作成功");
      });
    },
    closeModal() {
      this.checkedItem = {};
      this.userAction = "";
      this.showDelModal = false;
      this.showEditModal = false;
    },
    openModalAddress() {
      this.userAction = 0;
      this.checkedItem = {};
      this.showEditModal = true;
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
            //justify-content: space-between;
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
              margin-right: 1%;
              padding: 1%;
              //cursor: pointer;
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
                  i:hover {
                    background-color: black;
                    cursor: pointer;
                  }
                }
              }
              &.add {
                padding: 3% 1%;
                .add-icon {
                  width: 50px;
                  height: 50px;
                  margin: 0 auto;
                  cursor: pointer;
                  background: url("/imgs/icon-add.png") 50% center no-repeat
                    rgb(224, 224, 224);
                }
                span {
                  display: block;
                  width: 30%;
                  height: 30%;
                  margin: 5% auto;
                  border: none;
                  color: rgb(117, 117, 117);
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
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      input {
        display: inline-block;
        width: 45%;
        height: 40px;
        line-height: 40px;
        padding-left: 2%;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 3%;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        margin-right: 2.5%;
        border: 1px solid #e5e5e5;
      }
      textarea {
        width: 100%;
        height: 50px;
        padding: 1% 0% 1% 1%;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
      }
    }
  }
}
</style>
