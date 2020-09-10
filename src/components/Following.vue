<template>
  <div class="following">
    <div class="following__top">
      <p class="following__top__name">{{ users[following - 1].name }}の御朱印帳</p>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  name: "Following",
  props: {
    following: Number,
  },
  data() {
    return {
      users:{},
    };
  },
  mounted() {
    User.usersAsc(this.following).then(response => {
      this.users = response.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.friend {
  width: 160px;
    border-radius: 16px;
    background: #777777;
    margin: 8px;
    padding: 16px 8px;
    display: flex;
    justify-content: center;
    color: wheat;

  &__top {
    display: flex;
    justify-content: center;
    align-items: center;
&__name{
  margin-bottom: 16px;
    font-size: 12px;
    width: 100%;
    margin-bottom: 0;
    
}
  }
  
  img {
    width: 208px;
  }
}
</style>