<template>
  <div class="home col-8 mx-auto py-5 mt-5 users-red-stamp-detail">
    <div class="users-red-stamp-detail__left">
      <div class="users-red-stamp-detail__left__img">
        <img :src="getImgUrl(usersRedStamp.image_url)" v-bind:alt="usersRedStamp.image_url">
      </div>
    </div>
    <div class="users-red-stamp-detail__right">
      <div class="users-red-stamp-detail__right__user" >{{ user.name }}</div>
      <div class="users-red-stamp-detail__right__name">{{ usersRedStamp.sanctuary.name }}</div>
      <div class="users-red-stamp-detail__right__area">
        <div class="users-red-stamp-detail__right__area__prefecture">{{ usersRedStamp.sanctuary.prefecture }}</div>
        <div class="users-red-stamp-detail__right__area__city">{{ usersRedStamp.sanctuary.city }}</div>
      </div>
      <div class="users-red-stamp-detail__right__date">{{ usersRedStamp.date }}</div>
      <div class="users-red-stamp-detail__right__comment">{{ usersRedStamp.comment }}</div>
      
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
    return 'http://ec2-52-195-2-179.ap-northeast-1.compute.amazonaws.com:8000/' + pet 
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
  &__left{
    width:400px;
    height: 540px;
    background: darkblue;
    color: white;
  }
  &__right{
    width: 40%;
    /* display: flex; */
    padding: 24px;
    &__area{
      display: flex;
      justify-content: flex-start;
    }
    &__btn{
      display: flex;
      justify-content: flex-start;
    }
    
  }
}
</style>