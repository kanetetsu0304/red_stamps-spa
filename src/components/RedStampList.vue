<template>
  <div class="red-stamp-list">
    <div>
      <div class="red-stamp-list__head">
        <div v-if="redStampBook.length !== 0">{{ redStampBook[0].introduce }}</div>
        <div v-else>↓名前をクリックして御朱印帳を登録</div>
        <router-link
        v-if="redStampBook.length === 0"
            class="red-stamp-list__head__middle__center__followings"
              :to="{ name : 'RedStampBookCreate' }"
            >
        <h1 class="red-stamp-list__head__top">{{ user.name }}の御朱印帳</h1>
        </router-link>
        <router-link
        v-else
            class="red-stamp-list__head__middle__center__followings"
              :to="{ name : 'RedStampBook' }"
            >
        <h1  class="red-stamp-list__head__top">{{ user.name }}の御朱印帳</h1>
        </router-link>
        <div class="red-stamp-list__head__middle">
          <div class="red-stamp-list__head__middle__left">
          <img :src="getImgUrl(redStampBook[0].front_image_url)" v-if="redStampBook.length !== 0" />
          </div>
          <div class="red-stamp-list__head__middle__center">
            <p
              
              class="red-stamp-list__head__middle__center__count"
            >{{ count }}枚の御朱印</p>
            <div class="red-stamp-list__head__middle__center__home">M y<br>御朱印帳</div>
            <router-link
            class="red-stamp-list__head__middle__center__followings"
              :to="{ name : 'UsersFollowings', params : { id: user.id } }"
            >
              <button
                class="red-stamp-list__head__middle__center__followings__btn"
                type="submit"
              >フォロー {{ countFollowings }}人</button>
            </router-link>
            <router-link
              class="red-stamp-list__head__middle__center__followers"
              :to="{ name : 'UsersFollowers', params : { id: user.id } }"
            >
              <button
                class="red-stamp-list__head__middle__center__followers__btn"
                type="submit"
              >フォロワー {{ countFollowers }}人</button>
            </router-link>
          </div>
          <div class="red-stamp-list__head__middle__left" >
          <img :src="getImgUrl(redStampBook[0].back_image_url)" v-if="redStampBook.length !== 0"/>
          </div>
        </div>
        <div class="red-stamp-list__head__btn">
          <button
            class="red-stamp-list__head__btn__desc"
            type="submit"
            @click.prevent="descRedStamp"
          >新しい順</button>
          <button
            class="red-stamp-list__head__btn__desc"
            type="submit"
            @click.prevent="ascRedStamp"
          >古い順</button>
          <button
            class="red-stamp-list__head__btn__desc"
            type="submit"
            @click.prevent="tokyoRedStamp"
          >東京</button>
          <button
            class="red-stamp-list__head__btn__desc"
            type="submit"
            @click.prevent="kyotoRedStamp"
          >京都</button>
        </div>
      </div>
      <div class="red-stamp-list__body">
        <div v-for="redStamp in redStamps" :key="redStamp.id" class="sss">
          <router-link
            class="red-stamp-list__body__link nav-item nav-link"
            :to="{ name : 'RedStampDetail', params : { id: redStamp.id }}"
          >
            <red-stamp
              :name="redStamp.sanctuary.name"
              :city="redStamp.sanctuary.city"
              :prefecture="redStamp.sanctuary.prefecture.name"
              :date="redStamp.date"
              :image_url="redStamp.image_url"
              class="red-stamp-list__body__child"
            ></red-stamp>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";
import RedStampApi from "../apis/RedStamp";
import RedStampBookApi from "../apis/RedStampBook";
import RedStamp from "./RedStamp.vue";


export default {
  name: "RedStampList",
  components: {
    RedStamp
  },
  data() {
    return {
      user: null,
      redStamps: [],
      redStampBook:null,
      countFollowings:null,
      countFollowers:null,
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
    RedStampApi.redStamp().then(response => {
      this.redStamps = response.data;
    });
    RedStampBookApi.redStampBook().then(response => {
     this.redStampBook = response.data;
    });
  },
  updated(){
    User.countUserFollowings(this.user.id).then(response => {
     this.countFollowings = response.data;
    });
    User.countUserFollowers(this.user.id).then(response => {
     this.countFollowers = response.data;
    });
  },
 
  // updated(){
  //   RedStampBookApi.redStampBook().then(response => {
  //     this.redStampBook = response.data;
  //   });
  // },
  // updated(){
  //   User.userFollowings(this.user.id).then(response => {
  //     this.followings = response.data;
  //   });
  //   User.userFollowers(15).then(response =>{
  //     this.followers = response.data;
  //   })
  // },
  computed: {
    count() {
      return this.redStamps.length;
    }
  },
  methods: {
    getImgUrl(pet) {
      return "http://localhost:8000/" + pet;
    },
    ascRedStamp() {
      RedStampApi.redStampAsc().then(response => {
        this.redStamps = response.data;
      });
    },
    descRedStamp() {
      RedStampApi.redStamp().then(response => {
        this.redStamps = response.data;
      });
    },
    tokyoRedStamp(){
     RedStampApi.redStampTokyo(this.user.id).then(response => {
        this.redStamps = response.data;
      });
    },
    kyotoRedStamp(){
     RedStampApi.redStampKyoto(this.user.id).then(response => {
        this.redStamps = response.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.red-stamp-list {
  color: $MAIN;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 60px;
  &__head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &__top {
      font-size: 28px;
      font-weight: bold;
    }
    &__middle {
      height: 160px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__left{
        width: 80px;
        img{
          width: 100%;
        }
      }
      &__center {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 8px;
        &__count {
          margin-bottom: 8px;
        }
        &__home{
          display: flex;

          
    justify-content: center;
    align-items: center;
    background: crimson;
    padding: 4px 8px;
    border-radius: 8px;
    color: white;
    text-align: center;

        }
        &__follow {
          width: 84px;
          margin-bottom: 8px;

          &__btn {
            border: 1px solid black;
            font-size: 12px;
            padding: 4px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: darkcyan;
          }
          &__status {
            border: 1px solid black;
            margin-bottom: 0;
            font-size: 12px;
            padding: 4px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: cadetblue;
            color: cornsilk;
          }
        }
        &__unfollow {
          width: 84px;
          margin-bottom: 8px;

          &__btn {
            border: 1px solid black;
            font-size: 10px;
            padding: 4px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: darkred;
          }
          &__status {
            border: 1px solid black;
            margin-bottom: 0;
            font-size: 12px;
            padding: 4px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: darkred;
            color: white;
          }
        }
        &__followings {
          color: black;

          display: block;
          // &__btn{
          //   width: 84px;
          // display: block;
          &__btn {
            font-size: 12px;
          }
          // }
        }
        &__followers {
          color: black;

          display: block;
          &__btn {
            font-size: 12px;
          }
        }
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 372px;
      &__desc {
        padding: 8px;
        border: 1px solid;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }

      &__asc {
        padding: 8px;
        border: 1px solid;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }
    }
  }

  &__body {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .sss {
      height: 480px;
      margin-bottom: -72px;
    }
    &__link {
      color: $MAIN;
    }
  }
}
</style>