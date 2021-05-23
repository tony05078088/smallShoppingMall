<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{ title }}</span>
          <a
            href="javascript:;"
            @click="$emit('cancel')"
            class="icon-close"
          ></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a
            href="javascript:;"
            v-if="btnType == 1"
            class="btn"
            @click="$emit('updateModal')"
            >{{ confirmText }}</a
          >
          <a
            href="javascript:;"
            v-else-if="btnType == 2"
            class="btn"
            @click="$emit('cancel')"
            >{{ confirmText }}</a
          >
          <div class="btn-group" v-else>
            <a href="javascript:;" @click="$emit('updateModal')" class="btn">{{
              confirmText
            }}</a>
            <a href="javascript:;" @click="$emit('cancel')" class="btn">{{
              cancelText
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    // 彈框類型：小small 中medium 大框large,表單 form
    modalType: {
      type: String,
      default: "form",
    },
    //彈框標題
    title: String,
    //按鈕類型: 1.確定按鈕 2.取消按鈕 3.確定取消
    btnType: String,
    confirmText: {
      type: String,
      default: "確定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showModal: Boolean,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/Modal.scss";
</style>
