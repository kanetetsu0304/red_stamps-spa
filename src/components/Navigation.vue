
<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <div class="navbar-header">
        <router-link class="navbar-brand" to="/">トップページ</router-link>
      </div>
      <ul class="nav navbar-nav">
        <router-link v-if="!isLoggedIn" class="nav-item nav-link" :to="{ name: 'Login' }">Login</router-link>
        <router-link
          v-if="!isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'Register' }"
        >Register</router-link>
        <router-link
          v-if="isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'RedStampList' }"
        >Dashboard</router-link>
        <a v-if="isLoggedIn" class="nav-item nav-link" @click.prevent="logout" href="#">Logout</a>
      </ul>
    </div>
  </nav>
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

<style>
.router-link-exact-active {
  color: #ffffff !important;
  transition: all 0.25s;
}
</style>
