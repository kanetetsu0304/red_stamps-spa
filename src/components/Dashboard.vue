<template>
  <div class="home col-8 mx-auto py-5 mt-5 red-stamp-list">
    <h1>Dashnhbhboard</h1>
    <div>
      <div v-if="user">
        <h3>{{ user.name }}</h3>
        <button />
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
export default {
  data() {
    return {
      user: null
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.red-stamp-list{
  color: aqua;
}
</style>