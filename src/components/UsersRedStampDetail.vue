<template>
<div class="red-stamp__top">
    <p class="red-stamp__top__top">
      {{ friend.name }}の御朱印
    </p>
  <div class="users-red-stamp-detail">
    <div class="users-red-stamp-detail__left">
      <div class="users-red-stamp-detail__left__img">
        <img :src="getImgUrl(usersRedStamp.image_url)" v-bind:alt="usersRedStamp.image_url" />
      </div>
    </div>
    <div class="users-red-stamp-detail__right">
      <div class="users-red-stamp-detail__right__user">
        こちらは  {{ usersRedStamp.date }}  に<br/>{{ usersRedStamp.sanctuary.name }}({{ usersRedStamp.sanctuary.prefecture.name }}{{ usersRedStamp.sanctuary.city }})で
        <br />頂いた御朱印です。
        <br />
        {{ usersRedStamp.comment }}
      </div>
      <router-link
        class="users-red-stamp-detail__right__btn__link"
        :to="{ name : 'UsersRedStampList', params : { id: friend.id }}"
      >
        <button
          class="users-red-stamp-detail__right__btn__link__edit"
          type="submit"
        >{{ friend.name }}の<br>御朱印帳に戻る</button>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import User from "../apis/User";
import RedStampApi from "../apis/RedStamp";

export default {
  name: "UsersRedStampDetail",
  data() {
    return {
      friend: null,
      usersRedStamp: []
    };
  },
  mounted() {
    User.usersDetail(this.$route.params.userId).then(response => {
      this.friend = response.data;
    });
    RedStampApi.usersRedStampDetail(this.$route.params.userId,this.$route.params.id).then(response => {
      this.usersRedStamp = response.data;
    });
  },
  methods:{
    getImgUrl(pet) {
    return 'http://localhost:8000/' + pet 
  },
  // deleteRedStamp() {
  //     RedStampApi.redStampDelete(this.$route.params.id)
  //       .then(() => {
  //         this.$router.push({ name : 'RedStampList'});
  //       })

  //       .catch(error => {
  //         if (error.response.status === 422) {
  //           this.errors = error.response.data.errors;
  //         }
  //       });
  // }
}
}
</script>

<style lang="scss" scoped>
.red-stamp__top__top{
  max-width: 920px;
  margin: 0 auto;
  margin-top: 72px;
  text-align: center;
    font-size: 28px;
}

.users-red-stamp-detail {
 color: $MAIN;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;
  flex-wrap: wrap;
  &__left {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
    padding: 16px;
    &__img {
      width: 320px;
      margin: 0 auto;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;

      img {
        width: 100%;
      }
    }
  }
  &__right {
    width: 320px;
    padding: 24px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__name {
      font-size: 6vh;
      display: flex;
      justify-content: center;
    }
    &__area {
      display: flex;
      justify-content: center;
      font-size: 4vh;
    }
    &__user {
      font-size: 3vh;
    }

    &__date {
      font-size: 4vh;
    }
    &__comment {
      font-size: 3vh;
    }

    &__btn {
      display: flex;
      justify-content: centerc;
      margin: 0 auto;
      height: 50px;
      position: absolute;
      bottom: -100px;
      left: 72px;
      width: 80%;
      &__link {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1px solid black;
        border: 1px solid black;
        padding: 0 24px;
        border-radius: 16px;
        text-align: center;
        margin-top: 24px;
      }
      &__delete {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
      }
    }
  }
}
</style>