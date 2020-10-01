<template>
<div class="red-stamp__top">
    <p class="red-stamp__top__top">{{ friend.name }}の<br>フォロワーー一覧</p>
  <div class="users-followers">
    <div v-for="follower in followers" :key="follower.id" class="users-followers__link">
      <router-link
      v-if="follower.user_id !== user.id"
        class="users-followers__link__next"
        :to="{ name : 'UsersRedStampList', params : { id: follower.user_id }}"
      >
        <follower
          :follower="follower.user_id"
        ></follower>
      </router-link>
      <router-link
      v-else
        class="users-followers__link__next"
        :to="{ name : 'RedStampList'}"
      >
        <follower
          :follower="follower.user_id"
        ></follower>
      </router-link>
    </div>
  </div>
  <router-link
        class="users-followers__btn__link"
        :to="{ name : 'UsersRedStampList', params : { id: friend.id }}"
      >
        <button
          class="users-followers__btn__link__edit"
          type="submit"
        >{{ friend.name }}の<br>御朱印帳に戻る</button>
      </router-link>
</div>
</template>

<script>
import User from "../apis/User";
import Follower from "./Follower.vue";


export default {
  name: "Followers",
  components: {
    Follower
  },
  data() {
    return {
      user:null,
      friend:null,
      followers: []
    };
  },

  mounted(){
    User.userFollowers(this.$route.params.id).then(response => {
      this.followers = response.data;
    });
    User.auth().then(response => {
      this.user = response.data;
  });
  User.usersDetail(this.$route.params.id).then(response => {
      this.friend = response.data;
  });
  
  // methods: {
  //   ascUser() {
  //     User.userfollowersAsc().then(response => {
  //     this.followers = response.data;
  //   });
  //   },
  //   descUser() {
  //     User.userfollowers().then(response => {
  //     this.followers = response.data;
  //   });
  //   }
  // }
  }
}
</script>

<style lang="scss" scoped>
.red-stamp__top__top {
  max-width: 920px;
  margin: 0 auto;
  margin-top: 72px;
  text-align: center;
  font-size: 28px;
}

.users-followers{
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