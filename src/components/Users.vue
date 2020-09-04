<template>
  <div class="users">
    <div class="users__btn">
          <button
            class="users__btn__desc"
            type="submit"
            @click.prevent="descUser"
          >新しい順</button>
          <button
            class="users__btn__asc"
            type="submit"
            @click.prevent="ascUser"
          >古い順</button>
        </div>
  
    <div v-for="friend in users" :key="friend.id">
      <router-link
        class="users__body__link nav-item nav-link"
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
  },
  methods: {
    ascUser() {
      User.usersAsc().then(response => {
      this.users = response.data;
    });
    },
    descUser() {
      User.users().then(response => {
      this.users = response.data;
    });
    }
  }
};
</script>

<style lang="scss" scoped>
.users{
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
  }
  


</style>