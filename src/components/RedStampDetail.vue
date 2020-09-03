<template>
  <div class="home col-8 mx-auto py-5 mt-5 red-stamp-detail">
    <div class="red-stamp-detail__left">
      <div class="red-stamp-detail__left__img">
        <img :src="getImgUrl(redStamp.image_url)" v-bind:alt="redStamp.image_url">
      </div>
    </div>
    <div class="red-stamp-detail__right">
      <div class="red-stamp-detail__right__user" >{{ user.name }}</div>
      <div class="red-stamp-detail__right__name">{{ redStamp.sanctuary.name }}</div>
      <div class="red-stamp-detail__right__area">
        <div class="red-stamp-detail__right__area__prefecture">{{ redStamp.sanctuary.prefecture }}</div>
        <div class="red-stamp-detail__right__area__city">{{ redStamp.sanctuary.city }}</div>
      </div>
      <div class="red-stamp-detail__right__date">{{ redStamp.date }}</div>
      <div class="red-stamp-detail__right__comment">{{ redStamp.comment }}</div>
      <div class="red-stamp-detail__right__btn">
        <router-link
            class="red-stamp-list__body__link nav-item nav-link"
            :to="{ name : 'RedStampEdit', params : { id: redStamp.id }}"
          >
        <button class="red-stamp-detail__right__btn__edit" type="submit">編集する</button>
        </router-link>
        <button class="red-stamp-detail__right__btn__edit" type="submit" @click.prevent="deleteRedStamp">削除する</button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import RedStampApi from "../apis/RedStamp";

export default {
  name: "RedStampDetail",
  data() {
    return {
      user: null,
      redStamp: []
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
    RedStampApi.redStampDetail(this.$route.params.id).then(response => {
      this.redStamp = response.data;
    });
  },
  methods:{
    getImgUrl(pet) {
    return 'http://ec2-52-195-2-179.ap-northeast-1.compute.amazonaws.com:8000/' + pet 
  },
  deleteRedStamp() {
      RedStampApi.redStampDelete(this.$route.params.id)
        .then(() => {
          this.$router.push({ name : 'RedStampList'});
        })

        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
  }
}
}
</script>

<style lang="scss" scoped>
.red-stamp-detail {
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