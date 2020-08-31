<template>
  <div class="home col-8 mx-auto py-5 mt-5 red-stamp-list">
    <div>
      <div class="red-stamp-list__head">
        <div class="red-stamp-list__head__left">
          <h1 v-if="user" class="red-stamp-list__head__left__name">{{ user.name }}の御朱印一覧</h1>
          <h2 v-if="user" class="red-stamp-list__head__left__count">{{ count }}枚の御朱印</h2>
        </div>
        <div class="red-stamp-list__head__right">
          <div class="red-stamp-list__head__right__btn">
            <button type="submit" class="add-card__form__button">フォローする</button>
          </div>
          <div class="red-stamp-list__head__right__link">
            <button type="submit" class="add-card__form__button">followings</button>
            <button type="submit" class="add-card__form__button">followers</button>
          </div>
        </div>
      </div>
      <div class="red-stamp-list__body">
        <div v-for="redStamp in redStamps" :key="redStamp.id">
          <router-link
            class="red-stamp-list__body__link nav-item nav-link"
            :to="{ name : 'RedStampDetail', params : { id: redStamp.id }}"
          >
            <red-stamp
              :name="redStamp.sanctuary.name"
              :city="redStamp.sanctuary.city"
              :prefecture="redStamp.sanctuary.prefecture"
              :date="redStamp.date"
            ></red-stamp>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import RedStampApi from "../apis/RedStamp";
import RedStamp from "./RedStamp.vue";

export default {
  name: "RedStampList",
  components: {
    RedStamp
  },
  data() {
    return {
      user: null,
      redStamps: []
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
    RedStampApi.redStamp().then(response => {
      this.redStamps = response.data;
    });
  },
  computed: {
    count() {
      return this.redStamps.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.red-stamp-list {
  color: $MAIN;
  &__head {
    display: flex;
    justify-content: space-between;

    &__left {
      display: flex;
      flex-direction: column;
      &__name {
        font-size: 32px;
        font-weight: bold;
      }
    }
    &__right {
      display: flex;
      flex-direction: column;
      margin-right: 24px;
      &__btn {
        padding: 8px;
        border: 1px solid black;
        border-radius: 12px;
        width: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__link {
        display: flex;
        justify-content: space-between;
        width: 180px;
        padding: 12px 0;
      }
    }
  }
  &__body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    &__link {
      color: $MAIN;
    }
  }
}
</style>