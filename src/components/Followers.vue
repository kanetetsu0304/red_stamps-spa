<template>
  <div class="followers">
    <div class="followers__btn">
          <!-- <button
            class="followers__btn__desc"
            type="submit"
            @click.prevent="descUser"
          >新しい順</button>
          <button
            class="followers__btn__asc"
            type="submit"
            @click.prevent="ascUser"
          >古い順</button> -->
        </div>
  <!-- <p class="followers__body__link">フォロ-{{ followers }}</p> --> 
  <p class="followers__body__link">フォロ-{{ user.id }}</p>
    <div v-for="follower in followers" :key="follower.id" class="followers__link__aaa">
      <router-link
        class="followers__body__link__next"
        :to="{ name : 'UsersRedStampList', params : { id: follower.user_id }}"
      >
        <follower
          :follower="follower.user_id"
        ></follower>
      </router-link>
    </div>
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
      followers: []
    };
  },

  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
  },
  updated(){
    User.userFollowers(this.user.id).then(response => {
      this.followers = response.data;
    });
    // User.userFollowers(15).then(response =>{
    //   this.followers = response.data;
    // })
  },
  
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
};
</script>

<style lang="scss" scoped>
.followers{
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