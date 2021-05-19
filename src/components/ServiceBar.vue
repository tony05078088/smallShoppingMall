<template>
  <div class="service">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>預約維修服務</li>
        <li><span class="icon-7day"></span>7天無理由退費</li>
        <li><span class="icon-15day"></span>15天免費換貨</li>
        <li><span class="icon-free"></span>滿1500免運</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "service-bar",
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.service {
  padding: 33px 0;
  color: #666666;
  font-size: 16px;
  li {
    display: inline-block;
    width: 24.9%;
    text-align: center;
    border-right: 1px solid #e5e5e5;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 8px
    }
    .icon-setting {
      @include bgImg(20px, 20px, '../../public/imgs/icon-setting.png');
    }
    .icon-7day {
      @include bgImg(20px, 20px, '../../public/imgs/icon-7day.png');
    }
    .icon-15day {
      @include bgImg(20px, 20px, '../../public/imgs/icon-15day.png');
    }
    .icon-free {
      @include bgImg(20px, 20px, '../../public/imgs/icon-post.png');
    }
  }
}
</style>
