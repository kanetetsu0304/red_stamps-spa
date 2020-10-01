<template>
  <div class="red-stamp__top">
    <p class="red-stamp__top__top">{{ friend.name }}のプロフィール</p>
    <div class="users-red-stamp-book">
      <div class="users-red-stamp-book__left">
        <div class="users-red-stamp-book__left__front-img">
          <img
            :src="getImgUrl(usersRedStampBook[0].front_image_url)"
            v-bind:alt="usersRedStampBook.image_url"
          />
        </div>
        <div class="users-red-stamp-book__left__back-img">
          <img
            :src="getImgUrl(usersRedStampBook[0].back_image_url)"
            v-bind:alt="usersRedStampBook.image_url"
          />
        </div>
      </div>
      <div class="users-red-stamp-book__right">
        <div class="users-red-stamp-book__right__user">
          {{ friend.name }}です。
          <br />
          こちらは{{ usersRedStampBook[0].sanctuary.prefecture.name }}{{ usersRedStampBook[0].sanctuary.city }}に構える
          <br />
          {{ usersRedStampBook[0].sanctuary.name }}で頂いた御朱印です。
          <br />
          {{ usersRedStampBook[0].introduce }}
        </div>
        <div class="users-red-stamp-book__right__btn">
          <router-link
            class="users-red-stamp-book__right__btn__link"
            :to="{ name : 'UsersRedStampList', params : { id: friend.id }}"
          >
            <button class="users-red-stamp-book__right__btn__link__edit" type="submit">
              {{ friend.name }}の
              <br />御朱印帳に戻る
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import RedStampBookApi from "../apis/RedStampBook";

export default {
  name: "UsersRedStampBook",
  data() {
    return {
      friend: null,
      usersRedStampBook: []
    };
  },
  mounted() {
    User.usersDetail(this.$route.params.id).then(response => {
      this.friend = response.data;
    });
    RedStampBookApi.usersRedStampBook(this.$route.params.id).then(response => {
      this.usersRedStampBook = response.data;
    });
  },
  methods: {
    getImgUrl(pet) {
      return "http://localhost:8000/" + pet;
    }
    // deleteRedStamp() {
    //   RedStampApi.redStampDelete(this.$route.params.id)
    //     .then(() => {
    //       this.$router.push({ name: "RedStampList" });
    //     })

    //     .catch(error => {
    //       if (error.response.status === 422) {
    //         this.errors = error.response.data.errors;
    //       }
    //     });
    // }
  }
};
</script>

<style lang="scss" scoped>
.red-stamp__top__top {
  max-width: 920px;
  margin: 0 auto;
  margin-top: 72px;
  text-align: center;
  font-size: 28px;
}
.users-red-stamp-book {
  color: $MAIN;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 920px;
  margin: 0 auto;
  margin-bottom: 40px;
  flex-wrap: wrap;
  &__left {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    padding: 16px;
    width: 600px;
    &__front-img {
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

      img {
        width: 100%;
      }
    }
    &__back-img {
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

      img {
        width: 100%;
      }
    }
  }
  &__right {
    padding: 24px;
    margin: 0 auto;
    position: relative;
    &__name {
      font-size: 3vh;
      display: flex;
      justify-content: center;
    }
    &__area {
      display: flex;
      justify-content: center;
      font-size: 3vh;
    }
    &__user {
      font-size: 3vh;
    }

    &__date {
      font-size: 3vh;
    }
    &__comment {
      font-size: 2vh;
    }

    &__btn {
      display: flex;
      justify-content: centerc;
      margin: 24px auto;
      height: 50px;
      position: absolute;
      bottom: -100px;
      left: 100px;
      &__link {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1px solid black;
        border: 1px solid black;
        padding: 24px;
        border-radius: 16px;
        text-align: center;
      }
      &__delete {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
      }
    }
  }
}
</style>