<template>
  <div class="friend">
    <div class="friend__top">
      <p class="friend__top__name">{{ name }}の御朱印帳</p>
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
  width: 160px;
    border-radius: 16px;
    background: #777777;
    margin: 8px;
    padding: 16px 8px;
    display: flex;
    justify-content: center;
    color: wheat;

  &__top {
    display: flex;
    justify-content: center;
    align-items: center;
&__name{
  margin-bottom: 16px;
    font-size: 12px;
    width: 100%;
    margin-bottom: 0;
    
}
  }
  
  img {
    width: 208px;
  }
}
</style>