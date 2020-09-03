<template>
  <div class="users-red-stamp">
    <div class="users-red-stamp__top">
      <p class="users-red-stamp__top__name">{{ name }}</p>
      <p class="users-red-stamp__top__city">{{ prefecture }}</p>
      <p class="users-red-stamp__top__prefecture">{{ city }}</p>
    </div>
    <div class="users-red-stamp__middle">
      <img :src="getImgUrl(image_url)" v-bind:alt="image_url">
    </div>
    <div class="users-red-stamp__bottom">
      <p class="users-red-stamp__bottom__date">{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersRedStamp",
  props: {
    name: String,
    city: String,
    prefecture: String,
    date: String,
    image_url:String
  },
  methods:{
    getImgUrl(pet) {
    return 'http://ec2-52-195-2-179.ap-northeast-1.compute.amazonaws.com:8000/' + pet 
  }
  }
};
</script>

<style lang="scss" scoped>
.users-red-stamp {
  width: 240px;
  border-radius: 16px;
  background: #777777;
  margin: 8px;
  padding: 16px;

  &__top {
    display: flex;
    justify-content: space-between;
  }
  &__middle {
    background: cornsilk;
    
  }

  img{
    width: 208px;
  }
}
</style>