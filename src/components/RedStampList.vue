<template>
  <div class="red-stamp-list">
    <div>
      <div class="red-stamp-list__head">
        <h1 v-if="user" class="red-stamp-list__head__name">{{ user.name }}の御朱印帳</h1>
        <p v-if="user" class="red-stamp-list__head__count">{{ count }}枚の御朱印</p>
        <div class="red-stamp-list__head__btn">
          <button
            class="red-stamp-list__head__btn__desc"
            type="submit"
            @click.prevent="descRedStamp"
          >新しい順</button>
          <button
            class="red-stamp-list__head__btn__asc"
            type="submit"
            @click.prevent="ascRedStamp"
          >古い順</button>
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
              :prefecture="redStamp.sanctuary.prefecture"
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
import RedStamp from "./RedStamp.vue";

export default {
  name: "RedStampList",
  components: {
    RedStamp
  },
  data() {
    return {
      user: null,
      redStamps: []
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
    RedStampApi.redStamp().then(response => {
      this.redStamps = response.data;
    });
  },
  computed: {
    count() {
      return this.redStamps.length;
    }
  },
  methods: {
    ascRedStamp() {
      RedStampApi.redStampAsc().then(response => {
        this.redStamps = response.data;
      });
    },
    descRedStamp() {
      RedStampApi.redStamp().then(response => {
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
    &__name {
      font-size: 32px;
      font-weight: bold;
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