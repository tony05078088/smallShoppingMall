<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手機 電話卡</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="sub in item" :key="sub.id">
                    <a :href="sub ? '/#/product/' + sub.id : ''">
                      <img
                        :src="sub ? sub.img : '/imgs/item-box-1.png'"
                        alt=""
                      />
                      {{ sub ? sub.name : '小米9' }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">電視 盒子</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">筆記型電腦 平板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家電 插線板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">電源 配件</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children"></div>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <a :href="'/#/product/' + item.id"><img :src="item.img"/></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a
          :href="'/#/product/' + item.id"
          v-for="(item, index) in adsList"
          :key="index"
        >
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30"></a>
        <img v-lazy="'/imgs/banner-1.png'" alt="" />
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手機</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt="" />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <div class="item" v-for="(item, index) in arr" :key="index">
                <span :class="[index % 2 == 0 ? 'new-pro' : 'kill-pro']">{{
                  index % 2 == 0 ? '新品' : '秒殺'
                }}</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="" />
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p>
                  <p class="price" @click="addCart(item.id)">
                    {{ item.price }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      confirmText="確定"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      @updateModal="updateModal"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        <p>
          商品添加成功
        </p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import Modal from '../components/Modal'
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import axios from 'axios'
export default {
  name: 'index',
  components: {
    Swiper,
    SwiperSlide,
    ServiceBar,
    Modal,
  },
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg',
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg',
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg',
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg',
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg',
        },
      ],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9',
          },
          {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米青春版',
          },
          {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Remmi K20 PRO',
          },
          {
            id: 33,
            img: '/imgs/item-box-4.jpg',
            name: '移動4G專區',
          },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png',
        },
        {
          id: 48,
          img: '/imgs/ads/ads-2.jpg',
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png',
        },
        {
          id: 47,
          img: '/imgs/ads/ads-4.jpg',
        },
      ],
      phoneList: [],
      showModal: false,
    }
  },
  methods: {
    init() {
      this.axios
        .get('products', {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then(res => {
          // slice不會影響原array,splice會影響
          res.list = res.list.slice(6, 14)
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart(id) {
      console.log(id)
      this.axios
        .post('/carts', {
          productId: id,
          selected: true,
        })
        .then(res => {
          console.log(res)
          this.showModal = true
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        })
        .catch(err => {
          console.log(err)
          this.showModal = true
        })
    },
    updateModal() {
      this.showModal = false
      this.$router.push('/cart')
    },
    loginAuth() {
      let username = localStorage.getItem('username')
      let token = localStorage.getItem('token')
      if (!token || !username) {
        this.$router.replace('/login')
        return
      }
      this.$store.dispatch('saveUserName', username)
    },
    listItem() {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
          console.log(res)
         // this.$store.dispatch('saveListItem',res)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted() {
    this.loginAuth()
    this.listItem()
  },
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      z-index: 5;
      width: 264px;
      height: 451px;
      background-color: #55585a7a;
      .menu-wrap {
        height: 97%;
        display: flex;
        flex-direction: column;
        padding: 1.5% 0;
        justify-content: space-evenly;
        .menu-item {
          // height:11%;
          a {
            position: relative;
            display: block;
            height: 50%;
            margin: auto 0;
            padding-left: 15%;
            font-size: 1rem;
            color: #ffffff;
            &:after {
              position: absolute;
              right: 10%;
              content: '';
              @include bgImg(10px, 1.5rem, '/imgs/icon-arrow.png');
            }
          }
          &:hover {
            background-color: #ff6600;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            position: absolute;
            top: 0;
            left: 100%;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 16.66%;
              background-color: $colorG;
              li {
                width: 25%;
                height: 100%;
                line-height: 100%;
                padding-left: 3%;
                a {
                  color: $colorB;
                  font-size: 1rem;
                }
                img {
                  width: 35px;
                  height: 42px;
                  vertical-align: middle;
                  margin-right: 3%;
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 22%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin: 1% 0 2% 0;
    width: 100%;
    a {
      height: 100%;
    }
  }
  .banner {
    width: 100%;
    margin-bottom: 3%;
    img {
      width: 100%;
    }
  }
  .product-box {
    box-sizing: border-box;
    margin: 0 auto;
    background-color: $colorJ;
    padding: 3% 5%;
    .container {
      margin: 0 auto;
      h2 {
        font-size: $fontF;
        height: 21px;
        line-height: 21px;
        color: $colorB;
      }
      .wrapper {
        display: flex;
        width: 100%;
        max-width: 100%;
        margin-top: 3%;
        .banner-left {
          width: 28%;
          display: inline-block;
          margin-right: 2%;
          img {
            width: 67%;
            height: auto;
            object-fit: cover;
          }
        }
        .list-box {
          width: 70%;
          height: 50%;
          display: flex;
          flex-direction: column;
          .list {
            @include flex();
            width: 100%;
            height: 50%;
            &:last-child {
              margin-top: 1.5%;
            }
            .item {
              //width: 236px;
              width: 25%;
              height: 302px;
              background-color: $colorG;
              text-align: center;
              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: $colorG;
                &.new-pro {
                  background-color: #7ecf68;
                }
                &.kill-pro {
                  background-color: #e82626;
                }
              }
              .item-img {
                width: 100%;
                img {
                  max-width: 100%;
                  width: 100%;
                  height: 100%;
                }
              }
              .item-info {
                h3 {
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                }
                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto;
                }
                .price {
                  color: #f20a0a;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor: pointer;
                  &:after {
                    content: '';
                    @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                    margin-left: 5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
