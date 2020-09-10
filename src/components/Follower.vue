<template>
  <div class="follower">
    <div class="follower__top">
      <p class="follower__top__name">{{ users[follower - 1].name }}の御朱印帳</p>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  name: "Follower",
  props: {
    follower: Number,
  },
  data() {
    return {
      users:{},
    };
  },
  mounted() {
    User.usersAsc(this.follower).then(response => {
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