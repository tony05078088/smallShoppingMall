<template>
  <div class="nav-bar" :class="{isFixed: isFixed}">
    <div class="container">
      <div class="pro-title">
        <span>
          {{ title }}
        </span>
      </div>
      <div class="pro-param">
        <div class="param_box">
          <span>概述</span>
          <span>參數</span>
          <span>用戶評價</span>
          <slot name="buy"></slot>
          <!-- <span>立即購買</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  props: ["title"],
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    },
  },
  destroyed() {
    // 觸發的function必須獨立抽取,否則是無法remove,第三個參數為判斷冒泡或捕獲,false為冒泡
    window.removeEventListener("scroll", this.initHeight, false);
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
.nav-bar {
  width: 90%;
  height: 50px;
  line-height: 50px;
  padding: 0 5%;
  border-top: 1px solid $colorH;
  &.isFixed {
    position: fixed;
    top: 0;
    background-color: $colorG;
    box-shadow: 0 5px 5px $colorE;
    width: 95%;
    z-index: 30;
  }
  .container {
    @include flex();
    width: 100%;
    height: 50%;
    .pro-title,
    .pro-param {
      width: 25%;
      height: 100%;
      font-weight: bold;
    }
    span {
      display: inline-block;
      color: $colorB;
    }
    .param_box {
      display: flex;
      text-align: right;
      span {
        position: relative;
        width: 25%;
        text-align: center;
        color: $colorC;
        &:last-child {
          background-color: #ff7301;
          color: $colorG;
          height: 90%;
          cursor: pointer;
        }
        &:not(:last-child) {
          &:after {
            position: absolute;
            top: 50%;
            right: -2.5%;
            transform: translate(-50%, -50%);
            content: "";
            height: 10px;
            border: 0.3px solid $colorD;
          }
        }
      }
    }
  }
}
</style>
