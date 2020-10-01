<template>
  <div class="red-stamp-book-edit">
    <p class="red-stamp-book-edit__top">プロフィール編集画面<br>(御朱印帳編集画面)</p>
    <div class="red-stamp-book-edit__left">
      <div class="red-stamp-book-edit__left__front-img-container">
        <p>
          <input type="file" @change="onFrontImageSelected" />
        </p>
        <div class="red-stamp-book-edit__left__back-img-container__img">
          <img
            :src="getImgUrl(puts[0].front_image_url)"
            v-bind:alt="puts[0].front_image_url"
            v-if="!selectedFrontImage"
          />
          <img :src="selectedFrontImage" />
        </div>
      </div>
      <div class="red-stamp-book-edit__left__back-img-container">
        <p>
          <input type="file" @change="onBackImageSelected" />
        </p>
        <div class="red-stamp-book-edit__left__back-img-container__img">
          <img
            :src="getImgUrl(puts[0].back_image_url)"
            v-bind:alt="puts[0].back_image_url"
            v-if="!selectedBackImage"
          />
          <img :src="selectedBackImage" />
        </div>
      </div>
    </div>

    <div class="red-stamp-book-edit__right">
      <div class="red-stamp-book-edit__left__sanctuary-container">
        <div class="red-stamp-book-edit__left__sanctuary-btn-container">
            <button
              class="red-stamp-book-edit__left__sanctuary-btn"
              type="submit"
              @click.prevent="ascSanctuary"
            >北から</button>
            <button
              class="red-stamp-book-edit__left__sanctuary-btn"
              type="submit"
              @click.prevent="descSanctuary"
            >南から</button>
            <button
              class="red-stamp-book-edit__left__sanctuary-btn"
              type="submit"
              @click.prevent="tokyoSanctuary"
            >東京</button>
            <button
              class="red-stamp-book-edit__left__sanctuary-btn"
              type="submit"
              @click.prevent="kyotoSanctuary"
            >京都</button>
          </div>
        <div
          v-for="sanctuary in sanctaries"
          :key="sanctuary.id"
          class="red-stamp-book-edit__left__child"
        >
          <sanctuary
            :name="sanctuary.name"
            :city="sanctuary.city"
            :prefecture="sanctuary.prefecture.name"
            :id="sanctuary.id"
            @sanctuary="sanctuarySelected"
            :class="{ selected:puts[0].sanctuary_id ===  sanctuary.id}"
          ></sanctuary>
        </div>
      </div>

      <div class="red-stamp-book-edit__right__comment-container">
        <v-col>
          <v-textarea
            solo
            name="input-7-4"
            label="こちらに記入"
            v-model="puts[0].introduce"
            class="red-stamp-book-edit__right__comment-container__comment"
          ></v-textarea>
        </v-col>


      <div class="red-stamp-book-edit__right__btn">
        <button
          class="red-stamp-book-edit__right__btn__edit"
          type="submit"
          @click.prevent="submit"
          v-if="puts[0].sanctuary_id && puts[0].introduce && puts[0].front_image_url && puts[0].back_image_url"
        >登録する</button>
        <p v-else class="red-stamp-book-create__right__btn__cannot-edit">まだ登録できません</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import SanctuaryApi from "../apis/Sanctuary";
import RedStampBookApi from "../apis/RedStampBook";
import Sanctuary from "./Sanctuary.vue";

export default {
  name: "RedStampBookEdit",
  components: {
    Sanctuary
  },
  props: {},
  data() {
    return {
      sanctaries: [],
      selectedFrontImage: "",
      selectedBackImage: "",
      puts: {
        user_id: "",
        sanctuary_id: "",
        introduce: "postします",
        front_file: "",
        back_file: ""
      }
    };
  },
  mounted() {
    SanctuaryApi.sanctuaryAsc().then(response => {
      this.sanctaries = response.data;
    });
    RedStampBookApi.redStampBook().then(response => {
      this.puts = response.data;
    });
  },
  // created: function() {
  //   this.getImage();
  // },
  // methods: {
  //   getImage() {
  //     RedStampApi.redStamp().then(response => {
  //       this.images = response.data;
  //     });
  //   },

  //   uploadImage() {
  //     let formData = new FormData();
  //     formData.append("file", this.file);
  //     formData.append("comment", this.comment);
  //     formData.append("date", this.date);

  //     let config = {
  //       headers: {
  //         "content-type": "multipart/form-data"
  //       }
  //     };

  //     RedStampApi.postImage(formData, config).then(response => {
  //       this.images = response.data;
  //       this.getImage();
  //     });
  //   }
  // }
  methods: {
    getImgUrl(pet) {
      return "http://localhost:8000/" + pet;
    },

    ascSanctuary() {
      SanctuaryApi.sanctuaryAsc().then(response => {
        this.sanctaries = response.data;
      });
    },
    descSanctuary() {
      SanctuaryApi.sanctuaryDesc().then(response => {
        this.sanctaries = response.data;
      });
    },
    tokyoSanctuary(){
      SanctuaryApi.sanctuaryTokyo().then(response => {
        this.sanctaries = response.data;
      });
    },
    kyotoSanctuary(){
      SanctuaryApi.sanctuaryKyoto().then(response => {
        this.sanctaries = response.data;
      });
    },


    sanctuarySelected(sanctuary) {
      this.puts[0].sanctuary_id = sanctuary;
    },

    onFrontImageSelected(event) {
      const file = event.target.files[0];
      this.puts[0].front_file = file;
      const r = new FileReader();
      r.onload = event => {
        this.selectedFrontImage = event.target.result;
      };
      r.readAsDataURL(file);
    },

    onBackImageSelected(event) {
      const file = event.target.files[0];
      this.puts[0].back_file = file;
      const r = new FileReader();
      r.onload = event => {
        this.selectedBackImage = event.target.result;
      };
      r.readAsDataURL(file);
    },

    submit() {
      const formData = new FormData();
      formData.append("front_image", this.puts[0].front_file);
      formData.append("back_image", this.puts[0].back_file);
      formData.append("introduce", this.puts[0].introduce);
      formData.append("sanctuary_id", this.puts[0].sanctuary_id);

      const config = {
        headers: {
          // FormDataでファイルを送信するため、Content-Typeをmultipart/form-dataに設定する。j:
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT"
        }
      };

      RedStampBookApi.redStampBookPut(this.puts[0].id, formData, config)
        .then(() => {
          this.$router.push({
            name: "RedStampBook"
          });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.red-stamp-book-edit {
  color: $MAIN;
  // display: flex;
  // justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 72px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  &__top{
    text-align: center;
    font-size: 28px;
  }

  &__left {
    padding: 0 8px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    &__front-img-container {
      align-items: center;
      padding: 32px 4px 16px;
      border: 1px solid;
      position: relative;
      margin-bottom: 24px;

      &::before {
        content: "STEP1  御朱印帳の表紙を選んでください";
        position: absolute;
        top: 4px;
        left: 8px;
      }
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

    &__back-img-container {
      align-items: center;
      padding: 32px 4px 16px;
      border: 1px solid;
      position: relative;
      margin-bottom: 24px;

      &::before {
        content: "STEP2  御朱印帳の裏表紙を選んでください";
        position: absolute;
        top: 4px;
        left: 8px;
      }
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

    &__sanctuary-container {
      padding: 32px 12px 16px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border: 1px solid;
      position: relative;
      width: 344px;
      margin-bottom: 24px;
      &::before {
        content: "STEP3  御朱印帳の神社・寺を選んでください";
        position: absolute;
        top: 4px;
        left: 8px;
      }
    }
    &__sanctuary-btn-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 8px 0 16px;
    }
    &__sanctuary-btn {
      width: 100%;
      border: 1px solid black;
      padding: -13px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      height: 32px;
    }
    &__child {
      width: 32%;
    }
  }
  &__right {
    padding: 0 8px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 120px;

    &__comment-container {
      border: 1px solid;
      padding-top: 20px;
      position: relative;
      padding: 32px 16px 0px;
      width: 344px;
      height: 100%;
      &::before {
        content: "STEP4  プロフィールを記入してください";
        position: absolute;
        top: 4px;
        left: 8px;
      }
      &__comment {
        height: 160px;
      }
    }

    &__btn {
      position: absolute;
    bottom: -72px;
    width: 312px;
      
      &__edit {
        width: 100%;
        border: 1px solid;
        position: relative;
        margin-bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        background:crimson;
        color: white;
        border-radius: 8px;
      }

      &__cannot-edit {
        width: 100%;
        border: 1px solid;
        margin-top: 24px;
        margin-bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        border-radius: 8px;
      }
    }
  }

  .selected {
    font-size: 20px;
    background: black;
    color: red;
  }
}
</style>