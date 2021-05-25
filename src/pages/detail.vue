<template>
  <div class="detail">
    <product-param :title="product.name"> </product-param>
    <div class="container">
      <div class="wrapper">
        <div class="item_pic">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="(item, index) in 4" :key="index">
              <img :src="`/imgs/detail/phone-${item}.jpg`" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="item_info">
          <h3>{{ product.name }}</h3>
          <p>
            相機全新升級<span>/</span>960FPS超慢動作<span>/</span>手持超級夜景
            <span>/</span>全球首款雙頻GPS <span>/</span> <br />
            驍龍845處理器
            <span>/</span
            >紅外線人臉解鎖<span>/</span>AI變焦雙攝<span>/</span>三星AMOLED螢幕
          </p>
          <div class="retailer">小米自營</div>
          <span class="price">{{ product.price }}元</span>
          <span class="price fake">{{ product.price + 500 }}元</span>
          <div class="line"></div>
          <div class="address_box">
            <img src="/imgs/detail/icon-loc.png" alt="" class="icon" />
            <span>北京 北京市 朝陽區 安定門街道</span>
            <p>有現貨</p>
          </div>
          <div class="option">
            <h4>選擇版本</h4>
            <div
              class="phone"
              :class="{check: version === 1}"
              @click="version = 1"
            >
              6GB + 64GB 全網通
            </div>
            <div
              class="phone"
              :class="{check: version === 2}"
              @click="version = 2"
            >
              6GB + 64GB 移動4G
            </div>
            <h4>選擇顏色</h4>
            <div class="phone check">
              <span></span>
              深空灰
            </div>
          </div>
          <div class="item_total">
            <div class="goods_info">
              <div class="item">
                {{ product.name }} {{ optionToGo }} 深空灰色
              </div>
              <span>{{ product.price }}元 </span>
            </div>
            <div class="goods_price">總計 {{ product.price }}元</div>
          </div>
          <div class="button_area">
            <button class="btn-default" @click="addCart">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <h2>價格說明</h2>
      <div class="saying">
        <img src="/imgs/detail/item-price.jpeg" alt="" />
      </div>
    </div>
    <div class="service">
      <span>
        <span class="fix"></span>
        預約維修服務</span
      >
      <span>
        <span class="seven"></span>
        7天無理由退貨</span
      >
      <span>
        <span class="free"></span>
        15天免費換貨</span
      >
      <span>
        <span class="ship"></span>
        滿1500元免運</span
      >
    </div>
  </div>
</template>

<script>
import ProductParam from "../components/ProductParam";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "detail",
  components: {
    ProductParam,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      id: this.$route.params.id,
      swiperOptions: {
        autoplay: true,
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      product: {},
      version: 1,
    };
  },
  methods: {
    getProductInfo() {
      this.axios.get(`/products/${this.id}`).then(res => {
        this.product = res;
      });
    },
    addCart() {
      this.axios
        .post("/carts", {
          productId: this.id,
          selected: true,
        })
        .then((res = {cartProductVoList: []}) => {
          console.log(res);
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
          this.$router.push("/cart");
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProductInfo();
  },
  computed: {
    optionToGo() {
      if (this.version == 1) {
        return "6GB + 64GB 全網通";
      } else {
        return "6GB + 64GB 移動4G";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/button.scss";
.detail {
  width: 100%;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2%;
    box-sizing: border-box;
    background-color: $colorG;
    .wrapper {
      width: 100%;
      display: flex;
      height: 800px;
      .item_pic {
        width: 50%;
        padding: 0 1%;
        img {
          width: 100%;
        }
      }
      .item_info {
        width: 50%;
        height: 100%;
        h3 {
          font-weight: bold;
          font-size: $fontC;
        }
        span {
          margin: 0 5px;
        }
        .retailer {
          margin: 2% 0 1% 0%;
          color: $colorA;
          font-size: $fontJ;
        }
        .price {
          color: #ff6700;
          font-size: $fontJ;
          display: inline-block;
          &.fake {
            color: $colorD;
            text-decoration: line-through;
          }
        }
        .line {
          width: 100%;
          height: 1px;
          background-color: $colorH;
          border-top: 1px solid $colorH;
          margin: 3% 0;
        }
        .address_box {
          width: 100%;
          height: 20px;
          padding: 3% 0%;
          position: relative;
          background-color: #fafafa;
          .icon {
            @include position(absolute, 15%, 5%, 3%, auto);
          }
          span {
            display: inline-block;
            @include position(absolute, 15%, 10%, 30%, auto);
          }
          p {
            @include position(absolute, 30%, 50%, 28%, auto);
            color: #ff6700;
          }
        }
        .option {
          width: 100%;
          height: 30%;
          margin-top: 5%;
          h4 {
            margin-top: 2%;
            margin-bottom: 2%;
          }
          .phone {
            width: 40%;
            height: 10%;
            padding: 1% 2%;
            display: inline-block;
            margin: 0 2.5%;
            border: 1px solid $colorH;
            cursor: pointer;
            color: $colorA;
            text-align: center;
            &.check {
              border: 1px solid $colorA;
              span {
                display: inline-block;
                width: 14px;
                height: 14px;
                background-color: rgb(102, 102, 102);
              }
            }
          }
        }
        .item_total {
          width: 100%;
          height: 100px;
          padding: 2%;
          margin-top: 3%;
          background-color: #fafafa;
          .goods_info {
            height: 30%;
            line-height: 30%;
            .item {
              display: inline-block;
              width: 80%;
              height: 100%;
            }
            span {
              display: inline-block;
              height: 100%;
              margin-left: 10%;
              font-size: $fontJ;
              text-align: center;
            }
          }
          .goods_price {
            font-size: $fontD;
            color: $colorA;
          }
        }
        .button_area {
          width: 100%;
          height: 10%;
          margin-top: 5%;
          .btn-default {
            width: 50%;
            height: 50%;
            background-color: $colorA;
            cursor: pointer;
          }
        }
      }
    }
  }
  .price-info {
    width: 100%;
    height: 400px;
    background-color: #f3f3f3;
    h2 {
      padding: 3% 10% 1% 4%;
    }
    .saying {
      width: 100%;
      padding: 1% 2% 3% 4%;

      img {
        width: 80%;
        display: block;
      }
    }
  }
  .service {
    width: 90%;
    height: 50px;
    padding: 2% 5%;
    display: flex;
    span {
      display: inline-block;
      width: 25%;
      text-align: left;
      &.fix {
        display: inline;
        @include bgImg(20px, 20px, "/imgs/icon-setting.png", contain);
      }
      &.seven {
        display: inline;
        @include bgImg(20px, 20px, "/imgs/icon-7day.png", contain);
      }
      &.free {
        display: inline;
        @include bgImg(20px, 20px, "/imgs/icon-15day.png", contain);
      }
      &.ship {
        display: inline;
        @include bgImg(20px, 20px, "/imgs/icon-post.png", contain);
      }
    }
  }
}
</style>
