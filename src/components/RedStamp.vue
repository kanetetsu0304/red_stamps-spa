<template>
  <div class="red-stamp">
    <div class="red-stamp__top">
      <p class="red-stamp__top__name">{{ name }}</p>
      <div class="red-stamp__top__area">
        <p class="red-stamp__top__area__city">{{ prefecture }}</p>
        <p class="red-stamp__top__area__prefecture">{{ city }}</p>
      </div>
    </div>
    <div class="red-stamp__middle">
      <img :src="getImgUrl(image_url)" v-bind:alt="image_url" />
    </div>
    <div class="red-stamp__bottom">
      <p class="red-stamp__bottom__date">参拝日 {{ date }}</p>
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
    date: String,
    image_url: String
  },
  methods: {
    getImgUrl(pet) {
      return "https://redstampapi.naoya-sawaguchi.jp" + pet;
    }
  }
};
</script>

<style lang="scss" scoped>
.red-stamp {
  position: relative;

  border-radius: 16px;
  border: 1px solid $MAIN;
  margin: 8px;
  padding: 16px 4px;
  height: 80%;

  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__name {
      font-size: 2vw;
    }
    &__area {
      display: flex;
      justify-content: space-between;
      font-size: 1.8vw;
    }
  }
  &__middle {
    width: 160px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    &::after {
      content: "";
      flex: auto;
    }

    img {
      width: 100%;
    }
  }

  &__bottom {
    position: absolute;
    bottom: 2px;
    left: 16px;
    display: flex;
    justify-content: center;
  }
}
</style>