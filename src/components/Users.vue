<template>
  <div class="users">
    <div v-for="friend in users" :key="friend.id">
      <router-link
        class="red-stamp-list__body__link nav-item nav-link"
        :to="{ name : 'UsersRedStampList', params : { id: friend.id }}"
      >
        <friend
          :name="friend.name"
        ></friend>
      </router-link>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import Friend from "./Friend.vue";


export default {
  name: "Users",
  components: {
    Friend
  },
  data() {
    return {
      users: {}
    };
  },

  mounted() {
    User.users().then(response => {
      this.users = response.data;
    });
    // RedStampApi.redStamp().then(response => {
    //   this.redStamps = response.data;
    // });
  }
};
</script>

<style lang="scss" scoped>
</style>