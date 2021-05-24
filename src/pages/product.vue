<template>
  <div class="product">
    <product-param>
      <template v-slot:buy>
        <button class="btn">立即購買</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item_bg">
        <img src="/imgs/product/product-bg-1.png" alt="" />
        <div class="all_details">
          <div class="title">AI 4K 全螢幕電視</div>
          <div class="description">小米全面屏電視 55英吋</div>
          <div class="feature">
            <span>全球首款雙頻</span>
            <span>驍龍845</span>
            <span>全球首款雙頻</span>
            <span>全球首款雙頻</span>
          </div>
          <div class="price">
            <span>$999</span>
          </div>
        </div>
      </div>
      <div class="item_bg_2">
        <img src="/imgs/product/product-bg-2.png" alt="" />
      </div>
      <div class="item_bg_3">
        <img src="/imgs/product/product-bg-3.png" alt="" />
      </div>
      <div class="item_bg_4">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <img :src="item.img" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="item_video">
        <h3>60FPS 超慢動作攝影</h3>
        <h3>慢慢回味每一瞬間的精彩</h3>
        <p>後置FPS960電影般超慢動作影片,將眨眼間的美妙展現地淋漓盡致</p>
        <p>以AI精準分析影片內容, 15個場景智能匹配背景音效</p>
        <div class="video-bg" @click="showSlide = true"></div>
        <div class="video-box">
          <div class="overlay" v-if="showSlide"></div>
          <div class="video" :class="{slide: showSlide}">
            <span class="icon-close" @click="showSlide = false"></span>
            <video
              v-if="showSlide"
              src="/imgs/product/video.mp4"
              autoplay
              controls="controls"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from "../components/ProductParam";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "product",
  components: {
    ProductParam,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      showSlide: false,
      swiperOptions: {
        autoplay: true,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      slideList: [
        {
          id: "42",
          img: "/imgs/product/gallery-2.png",
        },
        {
          id: "45",
          img: "/imgs/product/gallery-3.png",
        },
        {
          id: "46",
          img: "/imgs/product/gallery-4.png",
        },
        {
          id: "",
          img: "/imgs/product/gallery-5.jpg",
        },
        {
          id: "",
          img: "/imgs/product/gallery-6.jpg",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.product {
  .content {
    width: 100%;
    margin-top: 1%;
    @include flex(center);
    flex-direction: column;
    .item_bg {
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
      }
      .all_details {
        @include position(absolute, 5%, 50%, 100%, 50%);
        @include flex();
        flex-direction: column;
        transform: translate(-50%, 0%);
        div {
          width: 100%;
          height: 25%;
          line-height: 25%;
          text-align: center;
          padding-top: 2%;
          font-weight: bold;
          &.title {
            font-size: $fontA;
          }
          &.description {
            letter-spacing: 10px;
            font-size: $fontB;
          }
          &.feature {
            padding-left: 15%;
            padding-right: 15%;
            width: 70%;
            span {
              display: inline-block;
              width: 25%;
              height: 50%;
            }
          }
          &.price {
            padding-top: 0%;
            font-size: $fontD;
          }
        }
      }
    }
    .item_bg_2,
    .item_bg_3,
    .item_bg_4 {
      width: 100%;
      height: 98%;
      margin-bottom: 2%;
      img {
        width: 100%;
        max-width: 100%;
      }
    }
    .swiper-container {
      img {
        width: 100%;
      }
    }
    .item_video {
      width: 100%;
      height: 500px;
      background-color: #070708;
      color: $colorG;
      font-size: $fontG;
      text-align: center;
      h3 {
        padding: 2% 40% 0 40%;
      }
      .video-bg {
        width: 100%;
        height: 100%;
        background: url("/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        cursor: pointer;
      }
      .video-box {
        width: 100%;
        .overlay {
          @include position(fixed);
          background-color: $colorB;
          opacity: 0.4;
          //z-index: 20;
        }
        .video {
          width: 100%;
          height: 100%;
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 25;
          opacity: 0;
          transition: all 0.8s;
          &.slide {
            top: 50%;
            opacity: 1;
          }
          video {
            width: 90%;
            height: 90%;
            //原生設定,用object-fit 蓋掉
            object-fit: cover;
            outline: none;
          }
          .icon-close {
            position: absolute;
            top: 3%;
            right: 8%;
            @include bgImg(20px, 20px, "/imgs/icon-close.png");
            cursor: pointer;
            z-index: 26;
          }
        }
      }
    }
  }
}
</style>
