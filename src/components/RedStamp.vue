<template>
  <div class="red-stamp">
    <div class="red-stamp__top">
      <p class="red-stamp__top__name">{{ name }}</p>
      <p class="red-stamp__top__city">{{ prefecture }}</p>
      <p class="red-stamp__top__prefecture">{{ city }}</p>
    </div>
    <div class="red-stamp__middle">
      <div class="red-stamp__middle__img">写真が入ります</div>
    </div>
    <div class="red-stamp__bottom">
      <p class="red-stamp__bottom__date">{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RedStamp",
  props: {
    name: String,
    city: String,
    prefecture: String,
    date: String
  }
};
</script>

<style lang="scss" scoped>
.red-stamp {
  width: 240px;
  border-radius: 16px;
  background: #777777;
  margin: 8px;
  padding: 16px;

  &__top {
    display: flex;
    justify-content: space-between;
  }
  &__middle {
    background: cornsilk;
    height: 120px;
  }
}
</style>