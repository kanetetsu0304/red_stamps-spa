
<template>
  <div class="users-red-stamp-list">
    <div>
      <div class="users-red-stamp-list__head">
        <h1 v-if="friend" class="users-red-stamp-list__head__name">{{ friend.name }}の御朱印帳</h1>
        <p v-if="friend" class="users-red-stamp-list__head__count">{{ count }}枚の御朱印</p>
        <div class="users-red-stamp-list__head__btn">
          <button
            class="users-red-stamp-list__head__btn__desc"
            type="submit"
            
          >新しい順</button>
          <button
            class="users-red-stamp-list__head__btn__asc"
            type="submit"
            
          >古い順</button>
        </div>
      </div>
      <div class="users-red-stamp-list__body">
        <div v-for="usersRedStamp in usersRedStamps" :key="usersRedStamp.id" class="sss">
          <router-link
            class="users-red-stamp-list__body__link nav-item nav-link"
            :to="{ name : 'UsersRedStampDetail', params : {  userId:friend.id ,id: usersRedStamp.id }}"
          >
            <red-stamp
              :name="usersRedStamp.sanctuary.name"
              :city="usersRedStamp.sanctuary.city"
              :prefecture="usersRedStamp.sanctuary.prefecture"
              :date="usersRedStamp.date"
              :image_url="usersRedStamp.image_url"
              class="users-red-stamp-list__body__child"
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
  },
  methods: {
    ascRedStamp() {
      RedStampApi.redStampAsc().then(response => {
        this.redStamps = response.data;
      });
    },
    descRedStamp() {
      RedStampApi.redStamp().then(response => {
        this.redStamps = response.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.users-red-stamp-list {
  color: $MAIN;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 60px;
  &__head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &__name {
      font-size: 32px;
      font-weight: bold;
    }
    &__btn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 372px;
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

  &__body {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .sss {
      height: 480px;
      margin-bottom: -72px;
    }
    &__link {
      color: $MAIN;
    }
  }
}
</style>