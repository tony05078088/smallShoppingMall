<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="" target="_blank">主頁</a><span>|</span>
      <a href="" target="_blank">Vue課程</a><span>|</span>
      <a href="" target="_blank">React課程</a><span>|</span>
      <a href="" target="_blank">微信支付</a>
    </div>
    <div class="CopyRight">
      Copyright ©2020 <span class="domain">mi.futurefe.com </span> All Rights
      Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/config.scss";
.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  background: $colorB;
  color: $colorD;
  font-size: $fontI;
  text-align: center;
  .footer-logo {
    margin: 46px 0 31px 0;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: $colorD;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
  }
  margin-bottom: 13px;
  .CopyRight {
    .domain {
      color: $colorA;
    }
  }
}
</style>
