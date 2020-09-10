<template>
  <div class="followings">
    <div class="followings__btn">
          <!-- <button
            class="followings__btn__desc"
            type="submit"
            @click.prevent="descUser"
          >新しい順</button>
          <button
            class="followings__btn__asc"
            type="submit"
            @click.prevent="ascUser"
          >古い順</button> -->
        </div>
  <!-- <p class="followings__body__link">フォロ-{{ followings }}</p> --> 
  <!-- <p class="followings__body__link">フォロ-{{ friend.id }}</p> -->
    <div v-for="following in followings" :key="following.id" class="followings__link__aaa">
      <router-link
      v-if="following.follow_user_id !== user.id"
        class="followings__body__link__next"
        :to="{ name : 'UsersRedStampList', params : { id: following.follow_user_id }}"
      >
        <following
          :following="following.follow_user_id"
        ></following>
      </router-link>
      <router-link
      v-else
        class="followings__body__link__next"
        :to="{ name : 'RedStampList'}"
      >
        <following
          :following="following.follow_user_id"
        ></following>
      </router-link>
    </div>
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
      followings: []
    };
  },
  mounted(){
    User.userFollowings(this.$route.params.id).then(response => {
      this.followings = response.data;
    });
    User.auth().then(response => {
      this.user = response.data;
  });
  },
  
  // methods: {
  //   ascUser() {
  //     User.userfollowingsAsc().then(response => {
  //     this.followings = response.data;
  //   });
  //   },
  //   descUser() {
  //     User.userfollowings().then(response => {
  //     this.followings = response.data;
  //   });
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.followings{
  color: $MAIN;
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 72px;
  margin-bottom: 40px;
  flex-wrap: wrap;
    &__btn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 354px;
      &__desc {
        padding: 8px;
        border: 1px solid;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__asc {
        padding: 8px;
        border: 1px solid;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &__body{
      &__link{
        width: 100%;
        height: 100%;
      }
    }
  }
  


</style>