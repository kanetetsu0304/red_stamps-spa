
<template>
  <div class="users-red-stamp-list">
    <div>
      <div class="users-red-stamp-list__head">
        <h1 v-if="friend" class="users-red-stamp-list__head__top">{{ friend.name }}の御朱印帳</h1>
        <div class="users-red-stamp-list__head__middle">
          <div class="users-red-stamp-list__head__middle__center">
            <p
              v-if="friend"
              class="users-red-stamp-list__head__middle__center__count"
            >{{ count }}枚の御朱印</p>

            <div class="users-red-stamp-list__head__middle__center__unfollow">
              <button
                v-if="isUnfollowed || followed"
                class="users-red-stamp-list__head__middle__center__unfollow__btn"
                type="submit"
                @click.prevent="unfollowUser"
              >フォローを外す</button>
              <p v-else class="users-red-stamp-list__head__middle__center__unfollow__status">未フォロー中</p>
            </div>
            <div class="users-red-stamp-list__head__middle__center__follow">
              <button
                v-if="isFollowed && !followed"
                class="users-red-stamp-list__head__middle__center__follow__btn"
                type="submit"
                @click.prevent="followUser"
              >フォローする</button>
              <p v-else class="users-red-stamp-list__head__middle__center__follow__status">フォロー中</p>
            </div>
            <router-link
              class="users-red-stamp-list__head__middle__center__followings"
              :to="{ name : 'UsersFollowings', params : { id: friend.id } }"
            >
              <button
                class="users-red-stamp-list__head__middle__center__followings__btn"
                type="submit"
              >フォロー 10人</button>
            </router-link>
            <router-link
              class="users-red-stamp-list__head__middle__center__followers"
              :to="{ name : 'UsersFollowers', params : { id: friend.id } }"
            >
              <button
                class="users-red-stamp-list__head__middle__center__followers__btn"
                type="submit"
              >フォロワー 12人</button>
            </router-link>
          </div>
        </div>
        <div class="users-red-stamp-list__head__btn">
          <button
            class="users-red-stamp-list__head__btn__desc"
            type="submit"
            @click.prevent="descUsersRedStamp"
          >新しい順</button>
          <button
            class="users-red-stamp-list__head__btn__desc"
            type="submit"
            @click.prevent="ascUsersRedStamp"
          >古い順</button>
        </div>
      </div>
      <div class="users-red-stamp-list__body">
        <div v-for="usersRedStamp in usersRedStamps" :key="usersRedStamp.id" class="sss">
          <router-link
            class="users-red-stamp-list__body__link nav-item nav-link"
            :to="{ name : 'UsersRedStampDetail', params : {  userId:friend.id ,id: usersRedStamp.id }}"
          >
            <red-stamp
              :name="usersRedStamp.sanctuary.name"
              :city="usersRedStamp.sanctuary.city"
              :prefecture="usersRedStamp.sanctuary.prefecture.name"
              :date="usersRedStamp.date"
              :image_url="usersRedStamp.image_url"
              class="users-red-stamp-list__body__child"
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
import RedStamp from "./RedStamp.vue";

export default {
  name: "UsersRedStampList",
  components: {
    RedStamp
  },
  data() {
    return {
      friend: null,
      user: null,
      usersRedStamps: [],
      follow: {
        user_id: "",
        follow_user_id: ""
      },
      followed: null,
      isFollowed: true,
      isUnfollowed: false
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
    User.usersDetail(this.$route.params.id).then(response => {
      this.friend = response.data;
    });
    RedStampApi.usersRedStamp(this.$route.params.id).then(response => {
      this.usersRedStamps = response.data;
    });
    // User.userFollowed(15,14).then(response => {
    //   this.followed = response.data;
    //   });
  },
  updated() {
    User.userFollowed(this.user.id, this.friend.id).then(response => {
      this.followed = response.data;
    });
  },
  computed: {
    count() {
      return this.usersRedStamps.length;
    }
  },
  methods: {
    ascUsersRedStamp() {
      RedStampApi.usersRedStampAsc(this.$route.params.id).then(response => {
        this.usersRedStamps = response.data;
      });
    },
    descUsersRedStamp() {
      RedStampApi.usersRedStamp(this.$route.params.id).then(response => {
        this.usersRedStamps = response.data;
      });
    },
    followUser() {
      this.follow.user_id = this.user.id;
      this.follow.follow_user_id = this.friend.id;
      this.isFollowed = !this.isFollowed;
      this.isUnfollowed = !this.isUnfollowed;
      User.userFollow(this.follow);
    },
    unfollowUser() {
      this.isFollowed = !this.isFollowed;
      this.isUnfollowed = !this.isUnfollowed;
      User.userUnfollow(this.user.id, this.friend.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.users-red-stamp-list {
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
      &__center {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__count {
          margin-bottom: 8px;
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
      }

      &__asc {
        padding: 8px;
        border: 1px solid;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
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