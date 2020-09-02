<template>
  <div class="home col-8 mx-auto py-5 mt-5 users-red-stamp-list">
    <div>
      <div class="users-red-stamp-list__head">
        <div class="users-red-stamp-list__head__left">
          <h1 v-if="friend" class="users-red-stamp-list__head__left__name">{{ friend.name }}の御朱印一覧</h1>
          <h2 v-if="friend" class="users-red-stamp-list__head__left__count">{{ count }}枚の御朱印</h2>
        </div>
        <div class="users-red-stamp-list__head__right">
          <div class="users-red-stamp-list__head__right__btn">
            <button type="submit" class="add-card__form__button">フォローする</button>
          </div>
          <div class="users-red-stamp-list__head__right__link">
            <button type="submit" class="add-card__form__button">followings</button>
            <button type="submit" class="add-card__form__button">followers</button>
          </div>
        </div>
      </div>
      <div class="users-red-stamp-list__body">
        <div v-for="usersRedStamp in usersRedStamps" :key="usersRedStamp.id">
          <router-link
            class="users-red-stamp-list__body__link nav-item nav-link"
            :to="{ name : 'UsersRedStampDetail', params:{ userId: $route.params.id,id: usersRedStamp.id }}"
          >
            <red-stamp
              :name="usersRedStamp.sanctuary.name"
              :city="usersRedStamp.sanctuary.city"
              :prefecture="usersRedStamp.sanctuary.prefecture"
              :date="usersRedStamp.date"
              :image_url="usersRedStamp.image_url"
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
  name: "UsersRedStampList",
  components: {
    RedStamp
  },
  data() {
    return {
      friend: null,
      usersRedStamps: []
    };
  },
  mounted() {
    User.usersDetail(this.$route.params.id).then(response => {
      this.friend = response.data;
    });
    RedStampApi.usersRedStamp(this.$route.params.id).then(response => {
      this.usersRedStamps = response.data;
    });
  },
  computed: {
    count() {
      return this.usersRedStamps.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.users-red-stamp-list {
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