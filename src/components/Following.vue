<template>
  <div class="following">
    <div class="following__top">
      <div class="following__top__img" v-if="usersRedStampBook.length !== 0">
        <img
          :src="getImgUrl(usersRedStampBook[0].front_image_url)"
          v-bind:alt="usersRedStampBook.image_url"
        />
      </div>
      <p class="following__top__name">{{ users[following - 1].name }}</p>
      <div class="following__top__img" v-if="usersRedStampBook.length !== 0">
        <img
          :src="getImgUrl(usersRedStampBook[0].back_image_url)"
          v-bind:alt="usersRedStampBook.image_url"
        />
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import RedStampBookApi from "../apis/RedStampBook";

export default {
  name: "Following",
  props: {
    following: Number
  },
  data() {
    return {
      users: {},
      usersRedStampBook: null
    };
  },
  mounted() {
    User.usersAsc(this.following).then(response => {
      this.users = response.data;
    });
    RedStampBookApi.usersRedStampBook(this.following).then(response => {
      this.usersRedStampBook = response.data;
    });
  },
  methods: {
    getImgUrl(pet) {
      return "http://localhost:8000/" + pet;
    }
  }
};
</script>

<style lang="scss" scoped>
.following {
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
    height: 40px;
    &__img {
      width: 20px;
      img {
        width: 100%;
      }
    }
    &__name {
      margin-bottom: 16px;
      font-size: 12px;
      width: 100%;
      margin-bottom: 0;
    }
  }
}
</style>