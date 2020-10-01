<template>
<div class="red-stamp__top">
    <p class="red-stamp__top__top">{{friend.name}}の<br>フォローユーザー一覧</p>
  <div class="users-followings">
    <div v-for="following in followings" :key="following.id" class="users-followings__link">
      <router-link
      v-if="following.follow_user_id !== user.id"
        class="users-followings__link__next"
        :to="{ name : 'UsersRedStampList', params : { id: following.follow_user_id }}"
      >
        <following
          :following="following.follow_user_id"
        ></following>
      </router-link>
      <router-link
      v-else
        class="users-followings__link__next"
        :to="{ name : 'RedStampList'}"
      >
        <following
          :following="following.follow_user_id"
        ></following>
      </router-link>
    </div>
  </div>
  <router-link
        class="users-followings__btn__link"
        :to="{ name : 'UsersRedStampList', params : { id: friend.id }}"
      >
        <button
          class="users-followings__btn__link__edit"
          type="submit"
        >{{ friend.name }}の<br>御朱印帳に戻る</button>
      </router-link>
</div>
</template>

<script>
import User from "../apis/User";
import Following from "./Following.vue";

export default {
  name: "followings",
  components: {
    Following
  },
  data() {
    return {
      user:null,
      friend:null,
      followings: [],
    };
  },
  mounted(){
    User.userFollowings(this.$route.params.id).then(response => {
      this.followings = response.data;
    });
    User.auth().then(response => {
      this.user = response.data;
  });
  User.usersDetail(this.$route.params.id).then(response => {
      this.friend = response.data;
  });
  },
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

.users-followings{
  color: $MAIN;
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
      &__link{
        height: 100%;
    width: 120px;
    text-align: center;
      }
      &__btn {
      display: flex;
      justify-content: centerc;
      margin: 0 auto;
      height: 50px;
      position: absolute;
      bottom: -100px;
      left: 72px;
      width: 80%;
      &__link {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 24px;
        border-radius: 16px;
        text-align: center;
        margin-top: 24px;

        &__edit{
          border-radius: 1px solid black;
        border: 1px solid black;
        }
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
  


</style>