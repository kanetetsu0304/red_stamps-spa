<template>
  <div class="friend">
    <div class="friend__top">
      <p class="friend__top__name">{{ name }}の御朱印帳を見る</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Friend",
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
.friend {
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
  }

  img {
    width: 208px;
  }
}
</style>