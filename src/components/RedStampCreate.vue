<template>
  <div class="red-stamp-create">
    <div class="red-stamp-create__left">
      <div class="red-stamp-create__left__img-container">
        <p>
          <input type="file" @change="onImageSelected" />
        </p>
        <div class="red-stamp-create__left__img-container__img">
          <img :src="selectedImage" />
        </div>
      </div>
      <div class="red-stamp-create__left__sanctuary-container">
        <div
          v-for="sanctuary in sanctaries"
          :key="sanctuary.id"
          class="red-stamp-create__left__child"
        >
          <sanctuary
            :name="sanctuary.name"
            :city="sanctuary.city"
            :prefecture="sanctuary.prefecture"
            :id="sanctuary.id"
            @sanctuary="sanctuarySelected"
            :class="{ selected:posts.sanctuary_id ===  sanctuary.id}"
          ></sanctuary>
        </div>
      </div>
    </div>
    <div class="red-stamp-create__right">
      <div class="red-stamp-create__right__date-container">
        <datepicker
          class="red-stamp-create__right__date-container__date"
          :format="datePickerFormat"
          v-model="posts.date"
          placeholder="こちらをクリック"
        ></datepicker>
      </div>
      <div class="red-stamp-create__right__comment-container">
        <v-col>
          <v-textarea
            solo
            name="input-7-4"
            label="こちらに記入"
            v-model="posts.comment"
            class="red-stamp-create__right__comment-container__comment"
          ></v-textarea>
        </v-col>
      </div>

      <div class="red-stamp-create__right__btn">
        <button
          class="red-stamp-create__right__btn__edit"
          type="submit"
          @click.prevent="submit"
          v-if="posts.sanctuary_id && posts.date && posts.comment && posts.file"
        >投稿する</button>
        <p v-else class="red-stamp-create__right__btn__cannot-edit">まだ投稿できません</p>
      </div>
    </div>
  </div>
</template>

<script>
import SanctuaryApi from "../apis/Sanctuary";
import Datepicker from "vuejs-datepicker";
import RedStampApi from "../apis/RedStamp";
import moment from "moment/moment";
import Sanctuary from "./Sanctuary.vue";

export default {
  name: "RedStampCreate",
  components: {
    Datepicker,
    Sanctuary
  },
  props: {},
  data() {
    return {
      sanctaries: [],
      selectedImage: "",
      posts: {
        user_id: "",
        sanctuary_id: "",
        date: "",
        comment: "",
        file: "",
        default: "2020-08-27"
      }
    };
  },
  mounted() {
    SanctuaryApi.sanctuary().then(response => {
      this.sanctaries = response.data;
    });
  },
  methods: {
    sanctuarySelected(sanctuary) {
      this.posts.sanctuary_id = sanctuary;
    },

    datePickerFormat(date) {
      return moment(date).format("yyyy-MM-DD");
    },

    // ユーザが画像を選択した直後に呼ばれるメソッド。
    // ユーザが選択したファイルを読み込んで、this.fileに設定する処理を行う。j
    onImageSelected(event) {
      // 発生したeventからファイル情報を取得
      const file = event.target.files[0];
      this.posts.file = file;

      // これ以降、選択した画像を表示する処理。j

      // https://developer.mozilla.org/ja/docs/Web/API/FileReader
      // PC上に保存されているファイルを取得するため、FileReaderを使う。
      const r = new FileReader();

      // ファイルの読み込みが完了したら呼ばれるイベントハンドラをFileReaderに登録。
      r.onload = event => {
        // 取得したファイルをこのVueオブジェクトのプロパティに設定する。
        // Base64エンコードされたデータが`this.file`に設定される。
        this.selectedImage = event.target.result;
      };

      // ファイルの読み込みを開始する。
      // https://developer.mozilla.org/ja/docs/Web/API/FileReader/readAsDataURL
      r.readAsDataURL(file);
    },

    // 画像と、それに付随する各種譲歩をサーバに送信する。
    submit() {
      const formatedDate = this.datePickerFormat(this.posts.date);

      const formData = new FormData();
      formData.append("image", this.posts.file); // 先ほど取得した画像データを追加
      formData.append("comment", this.posts.comment);
      formData.append("date", formatedDate);
      formData.append("sanctuary_id", this.posts.sanctuary_id);

      const config = {
        headers: {
          // FormDataでファイルを送信するため、Content-Typeをmultipart/form-dataに設定する。j:
          "Content-Type": "multipart/form-data"
        }
      };

      RedStampApi.redStampPost(formData, config).then(() => {
        this.$router.push({ name: "RedStampList" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.red-stamp-create {
  color: $MAIN;
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 72px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  &__left {
    width: 360px;
    padding: 32px 8px;
    margin: 0 auto;

    &__img-container {
      margin: 0 auto;
      align-items: center;
      padding: 32px 12px 16px;
      border: 1px solid;
      position: relative;

      &::before {
        content: "STEP1  投稿する御朱印を選んでください";
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
      margin-top: 24px;
      &::before {
        content: "STEP2  参拝した神社・寺を選んでください";
        position: absolute;
        top: 4px;
        left: 8px;
      }
    }
    &__child {
      width: 32%;
    }
  }
  &__right {
    width: 360px;
    padding: 32px 8px;
    margin: 0 auto;

    &__date-container {
      border: 1px solid;
      padding-top: 20px;
      position: relative;
      &::before {
        content: "STEP3  参拝日を選んでください";
        position: absolute;
        top: 4px;
        left: 8px;
      }

      &__date {
        color: red;
        padding: 4px;
        padding-left: 24px;

        div > input {
          width: 100%;
        }
      }
    }

    &__comment-container {
      border: 1px solid;
      padding-top: 20px;
      margin-top: 24px;
      position: relative;
      padding: 32px 16px 0px;
      &::before {
        content: "STEP4  コメントを記入してください";
        position: absolute;
        top: 4px;
        left: 8px;
      }
      &__comment {
        height: 160px;
      }
    }

    &__btn {
      &__edit {
        width: 100%;
        border: 1px solid;
        margin-top: 24px;
        position: relative;
        margin-bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        background: saddlebrown;
      }

      &__cannot-edit {
        width: 100%;
        border: 1px solid;
        margin-top: 24px;
        position: relative;
        margin-bottom: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
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