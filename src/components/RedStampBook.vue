<template>
  <div class="red-stamp__top">
    <p class="red-stamp__top__top">
      プロフィール
    </p>
    <div class="red-stamp-book">
    <div class="red-stamp-book__left">
      <div class="red-stamp-book__left__front-img">
        <img :src="getImgUrl(redStampBook[0].front_image_url)" v-bind:alt="redStampBook.image_url" />
      </div>
      <div class="red-stamp-book__left__back-img">
        <img :src="getImgUrl(redStampBook[0].back_image_url)" v-bind:alt="redStampBook.image_url" />
      </div>
    </div>
    <div class="red-stamp-book__right">
      <div class="red-stamp-book__right__user">
        {{ user.name }}です。
        <br />
        こちらは{{ redStampBook[0].sanctuary.prefecture.name }}{{ redStampBook[0].sanctuary.city }}にある
        <br />
        {{ redStampBook[0].sanctuary.name }}で頂いた御朱印帳です。
        <br />
        {{ redStampBook[0].introduce }}
      </div>
      <div class="red-stamp-book__right__btn">
        <router-link
          class="red-stamp-book__right__btn__link"
          :to="{ name : 'RedStampBookEdit', params : { id: redStampBook[0].id }}"
        >
          <button class="red-stamp-book__right__btn__link__edit" type="submit">プロフィールを編集する</button>
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
  name: "RedStampBook",
  data() {
    return {
      user: null,
      redStampBook: []
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
    RedStampBookApi.redStampBook().then(response => {
      this.redStampBook = response.data;
    });
  },
  methods: {
    getImgUrl(pet) {
      return "http://localhost:8000/" + pet;
    },
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
.red-stamp__top__top{
  max-width: 920px;
  margin: 0 auto;
  margin-top: 72px;
  text-align: center;
    font-size: 28px;
}

.red-stamp-book {
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
    width: 320px;
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
      bottom:-100px;
      left:40px;
      &__link {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1px solid black;
        border: 1px solid black;
        padding: 24px;
        border-radius: 16px;
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