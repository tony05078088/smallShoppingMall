<template>
  <div class="Nodata">
    <img src="/imgs/icon-no-data.png" alt="" />
    <p>暫無訂單紀錄～</p>
  </div>
</template>

<script>
export default {
  name: "no-data",
};
</script>

<style lang="scss">
.Nodata {
  background-color: #f5f5f5;
  text-align: center;
  font-size: 20px;
  color: #999999;
  margin: 1% 0;
  img {
    width: 30%;
    //margin-bottom: 2%;
  }
}
</style>
