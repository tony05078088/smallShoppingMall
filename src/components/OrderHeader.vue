<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <h2>
          {{ title }}
          <slot name="tips"></slot>
        </h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{ username }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "order-header",
  props: {
    title: String,
  },
  computed: {
    ...mapState(["username"]),
  },
};
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.order-header {
  width: 100%;
  padding: 3% 0%;
  border-bottom: 2px solid #f60;
  .header-logo {
    float: left;
  }
  .username,
  .title {
    margin-left: 1%;
    height: 55px;
    line-height: 55px;
  }
  .title {
    font-size: 28px;
    float: left;
    color: #333333;
    span {
      width: 99%;
      font-size: 14px;
      //margin-left: 0.5%;
      color: #999;
      font-weight: 200;
    }
  }
  .username {
    float: right;
    a {
      color: #666666;
      font-size: 16px;
    }
  }
}

@include respond(phone) {
  .order-header {
    .container {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .header-logo {
        width: 50px;
        height: 50px;
      }
      .title {
        width: 90%;
        height: 100%;
        font-size: 1.5rem;
        text-align: center;
        h2 {
          display: inline-block;
          width: 100%;
          span {
            display: block;
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>
