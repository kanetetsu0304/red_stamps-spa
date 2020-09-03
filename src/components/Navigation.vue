<template>
  <div class="navigation">
    <div class="navigation__top">
      <router-link class="navigation__top__brand" to="/">
        御朱印
        <br />グラム
      </router-link>
    </div>
    <div class="navigation__menu">
    <router-link v-if="!isLoggedIn" class="navigation__menu__child" :to="{ name: 'Login' }" :class="{ beforelogin:!isLoggedIn}">ログイン</router-link>
    <router-link v-if="!isLoggedIn" class="navigation__menu__child" :to="{ name: 'Register' }" :class="{ beforelogin:!isLoggedIn}">館員登録</router-link>
    <router-link v-if="isLoggedIn" class="navigation__menu__child" :to="{ name: 'RedStampList' }">My御朱印帳</router-link>
    <router-link v-if="isLoggedIn" class="navigation__menu__child" :to="{ name: 'Users' }">皆の御朱印帳</router-link>
    <router-link v-if="isLoggedIn" class="navigation__menu__child" :to="{ name: 'RedStampCreate' }">投稿する</router-link>
    <a v-if="isLoggedIn" class="navigation__menu__child" @click.prevent="logout" href="#">ログアウト</a>

    </div>
  </div>
</template>

<script>
import User from "../apis/User";
export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    this.$root.$on("login", () => {
      this.isLoggedIn = true;
    });
    this.isLoggedIn = !!localStorage.getItem("auth");
  },
  methods: {
    logout() {
      User.logout().then(() => {
        localStorage.removeItem("auth");
        this.isLoggedIn = false;
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.navigation{
  display: flex;
  position: fixed;
  height: 8%;
  width: 100%;
  color: $MAIN;
  border-bottom: 1px solid $MAIN;
  
  &__top{
    width: 12%;
  height: 100%;
  background-color: brown;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:2vw;
  color: $MAIN;

  }
  &__menu{
    display: flex;
    width: 88%;
    // font-size: 3vh 3vw;
    &__child{
      display: flex;
      justify-content: center;
      align-items: center;
      background: cadetblue;
      width: 25%;
      font-size:2.5vw;
      border-right: 1px solid black;
      color: $MAIN;
    }
  }
}

.beforelogin{
  width: 50%;
}
</style>
