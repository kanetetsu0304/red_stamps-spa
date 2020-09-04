<template>
  <div class="users-red-stamp-detail">
    <div class="users-red-stamp-detail__left">
      <div class="users-red-stamp-detail__left__img">
        <img :src="getImgUrl(usersRedStamp.image_url)" v-bind:alt="usersRedStamp.image_url" />
      </div>
    </div>
    <div class="users-red-stamp-detail__right">
      <div class="users-red-stamp-detail__right__name">{{ usersRedStamp.sanctuary.name }}</div>
      <div class="users-red-stamp-detail__right__area">
        <div class="users-red-stamp-detail__right__area__prefecture">{{ usersRedStamp.sanctuary.prefecture }}</div>
        <div class="users-red-stamp-detail__right__area__city">{{ usersRedStamp.sanctuary.city }}</div>
      </div>
      <div class="users-red-stamp-detail__right__user">参拝人 {{ user.name }}</div>
      <div class="users-red-stamp-detail__right__date">参拝日 {{ usersRedStamp.date }}</div>
      <div class="users-red-stamp-detail__right__comment">コメント {{ usersRedStamp.comment }}</div>
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
      user: null,
      usersRedStamp: []
    };
  },
  mounted() {
    User.usersDetail(this.$route.params.userId).then(response => {
      this.user = response.data;
    });
    RedStampApi.usersRedStampDetail(this.$route.params.userId,this.$route.params.id).then(response => {
      this.usersRedStamp = response.data;
    });
  },
  methods:{
    getImgUrl(pet) {
    return 'https://redstampapi.naoya-sawaguchi.jp' + pet 
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
.users-red-stamp-detail {
 color: $MAIN;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 72px;
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
      font-size: 4vh;
    }

    &__date {
      font-size: 4vh;
    }
    &__comment {
      font-size: 3vh;
    }

    &__btn {
      display: flex;
      justify-content: space-around;
      height: 32px;
      margin-top: 32px;
      &__link {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1px solid black;
        border: 1px solid black;
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