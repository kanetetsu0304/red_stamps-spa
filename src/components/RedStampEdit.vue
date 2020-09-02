<template>
  <div class="home col-8 mx-auto py-5 mt-5 red-stamp-edit">
    <div class="red-stamp-edit__left">
      <div>
        <p>
          <input type="file" @change="onImageSelected" />
        </p>
        <img :src="getImgUrl(puts.image_url)" v-bind:alt="puts.image_url" v-if="!selectedImage">
        <img :src="selectedImage" />
      </div>
    </div>
    <div class="red-stamp-edit__right">
      <div v-for="sanctuary in sanctaries" :key="sanctuary.id">
        <sanctuary :name="sanctuary.name" :id="sanctuary.id" @sanctuary="sanctuarySelected"></sanctuary>
      </div>
      <datepicker
        class="red-stamp-edit__right__date"
        :format="datePickerFormat"
        v-model="puts.date"
      ></datepicker>
      <v-col>
        <v-textarea solo name="input-7-4" label v-model="puts.comment"></v-textarea>
      </v-col>
      <div class="red-stamp-edit__right__btn">
        <button class="red-stamp-edit__right__btn__edit" type="submit" @click.prevent="submit">投稿する</button>
        
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
      puts: {
        user_id: "",
        sanctuary_id: "",
        date: "2020-03-04",
        comment: "postします",
        file: "",
        default: "2020-08-27"
      }
    };
  },
  mounted() {
    SanctuaryApi.sanctuary().then(response => {
      this.sanctaries = response.data;
    });
    RedStampApi.redStampDetail(this.$route.params.id).then(response => {
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
    return 'http://localhost:8000/' + pet 
  },

    sanctuarySelected(sanctuary) {
      this.puts.sanctuary_id = sanctuary;
    },

    datePickerFormat(date) {
      return moment(date).format("yyyy-MM-DD");
    },

    //  ユーザが画像を選択した直後に呼ばれるメソッド。
    // ユーザが選択したファイルを読み込んで、this.fileに設定する処理を行う。j
    onImageSelected(event) {
      // 発生したeventからファイル情報を取得
      const file = event.target.files[0];
      this.puts.file = file;

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

    submit() {
      const formatedDate = this.datePickerFormat(this.puts.date);

      const formData = new FormData();
      formData.append("image", this.puts.file); // 先ほど取得した画像データを追加
      formData.append("comment", this.puts.comment);
      formData.append("date", formatedDate);
      formData.append("sanctuary_id", this.puts.sanctuary_id);

      const config = {
        headers: {
          // FormDataでファイルを送信するため、Content-Typeをmultipart/form-dataに設定する。j:
          "Content-Type": "multipart/form-data",
          'X-HTTP-Method-Override': 'PUT',
        }
      };

      RedStampApi.redStampPut(this.puts.id,formData,config).then(() => {
        this.$router.push({ name : 'RedStampDetail', params:{ id: this.$route.params.id } });
      })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });

    },

  }
};
</script>

<style lang="scss" scoped>
.red-stamp-edit {
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
</style>