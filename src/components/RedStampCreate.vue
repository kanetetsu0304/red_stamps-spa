<template>
  <div class="home col-8 mx-auto py-5 mt-5 red-stamp-create">
    <div class="red-stamp-create__left">
      <div>
        <p>
          <input type="file" @change="onImageSelected" />
        </p>
        <img :src="selectedImage" />
      </div>
    </div>
    <div class="red-stamp-create__right">
      <div v-for="sanctuary in sanctaries" :key="sanctuary.id">
        <sanctuary :name="sanctuary.name" :id="sanctuary.id" @sanctuary="sanctuarySelected" :class="{ selected:posts.sanctuary_id ===  sanctuary.id}"></sanctuary>
      </div>
      <datepicker
        class="red-stamp-create__right__date"
        :format="datePickerFormat"
        v-model="posts.date"
      ></datepicker>
      <v-col>
        <v-textarea solo name="input-7-4" label v-model="posts.comment"></v-textarea>
      </v-col>
      <div class="red-stamp-create__right__btn">
        <button
          class="red-stamp-create__right__btn__edit"
          type="submit"
          @click.prevent="submit"
          v-if="posts.sanctuary_id && posts.date && posts.comment && posts.file"
        >投稿する</button>
        <p v-else>ddddd</p>
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
  &__left {
    width: 400px;
    height: 540px;
    background: darkblue;
    color: white;
  }
  &__right {
    /* display: flex; */
    padding: 24px;
    &__name {
      border: 1px solid black;
      margin: 4px;
    }
  }
}

.selected{
  font-size: 20px;
  color: brown;
}
</style>