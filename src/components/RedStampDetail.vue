<template>
<div class="red-stamp__top">
    <p class="red-stamp__top__top">
      {{ user.name }}の御朱印
    </p>
  <div class="red-stamp-detail">
    <div class="red-stamp-detail__left">
      <div class="red-stamp-detail__left__img">
        <img :src="getImgUrl(redStamp.image_url)" v-bind:alt="redStamp.image_url" />
      </div>
    </div>

    <div class="red-stamp-detail__right">
      <div class="red-stamp-detail__right__user">
        こちらは  {{ redStamp.date }}  に
        <br />
        {{ redStamp.sanctuary.name }}({{ redStamp.sanctuary.prefecture.name }}{{ redStamp.sanctuary.city }})で
        <br>頂いた御朱印です。
        <br />
        {{ redStamp.comment }}
      </div>

      <div class="red-stamp-detail__right__btn">
        <router-link
          class="red-stamp-detail__right__btn__link"
          :to="{ name : 'RedStampEdit', params : { id: redStamp.id }}"
        >
          <button class="red-stamp-detail__right__btn__link__edit" type="submit">編集する</button>
        </router-link>
        <button
          class="red-stamp-detail__right__btn__delete"
          type="submit"
          @click.prevent="deleteRedStamp"
        >削除する</button>
      </div>
      <div class="red-stamp-detail__right__back-btn">
        <router-link
          class="red-stamp-detail__right__back-btn__link"
          :to="{ name : 'RedStampList'}"
        >
          <button class="red-stamp-detail__right__back-btn__link__edit" type="submit">My御朱印帳に戻る</button>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import User from "../apis/User";
import RedStampApi from "../apis/RedStamp";

export default {
  name: "RedStampDetail",
  data() {
    return {
      user: null,
      redStamp: []
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
    RedStampApi.redStampDetail(this.$route.params.id).then(response => {
      this.redStamp = response.data;
    });
  },
  methods: {
    getImgUrl(pet) {
      return "http://localhost:8000/" + pet;
    },
    deleteRedStamp() {
      RedStampApi.redStampDelete(this.$route.params.id)
        .then(() => {
          this.$router.push({ name: "RedStampList" });
        })

        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
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

.red-stamp-detail {
  color: $MAIN;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;
  flex-wrap: wrap;
  &__left {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    padding: 16px;
    &__img {
      width: 320px;
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
    &__name {
      font-size: 6vh;
      display: flex;
      justify-content: center;
    }
    &__area {
      display: flex;
      justify-content: center;
      font-size: 4vh;
    }
    &__user {
      font-size: 3vh;
    }

    &__date {
      font-size: 4vh;
    }
    &__comment {
      font-size: 3vh;
    }

    &__btn {
      display: flex;
      justify-content:space-between ;
      height: 32px;
      margin-top: 32px;
      &__link {
        width: 48%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1px solid black;
        border: 1px solid black;
        border-radius: 8px;
      }
      &__delete {
        width: 48%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
         border-radius: 8px;
      }
    }

    &__back-btn {
      display: flex;
      height: 32px;
      margin-top: 32px;
      &__link {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1px solid black;
        border: 1px solid black;
         border-radius: 8px;
      }
    }
  }
}
</style>