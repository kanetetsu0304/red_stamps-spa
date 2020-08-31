<template>
  <div class="home col-8 mx-auto py-5 mt-5 red-stamp-create">
    <div class="red-stamp-create__left">
      <div>
        <p>
          <input type="file" />
        </p>
      </div>
    </div>
    <div class="red-stamp-create__right">
      <div v-for="sanctuary in sanctaries" :key="sanctuary.id">
        <button class="red-stamp-create__right__name">{{ sanctuary.name }}</button>
      </div>
      <datepicker
        class="red-stamp-create__right__date"
        :value="this.default"
        :format="DatePickerFormat"
        v-model="date"
      ></datepicker>
      <v-col>
        <v-textarea solo name="input-7-4" label v-model="comment"></v-textarea>
      </v-col>
      <div class="red-stamp-create__right__btn">
        <button class="red-stamp-create__right__btn__edit" @click="uploadImage">投稿する</button>
      </div>
    </div>
  </div>
</template>

<script>
import SanctuaryApi from "../apis/Sanctuary";
import Datepicker from "vuejs-datepicker";
import RedStampApi from "../apis/RedStamp";

export default {
  name: "RedStampCreate",
  components: {
    Datepicker
  },
  props: {},
  data() {
    return {
      sanctaries: [],
      default: "2020-08-27",
      DatePickerFormat: "yyyy-MM-dd",
      comment: "ここにコメント",
      file: "",
      date: "2020-03-04",
      images: {}
    };
  },
  mounted() {
    SanctuaryApi.sanctuary().then(response => {
      this.sanctaries = response.data;
    });
  },
  created: function() {
    this.getImage();
  },
  methods: {
    getImage() {
      RedStampApi.redStamp().then(response => {
        this.images = response.data;
      });
    },

    uploadImage() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("comment", this.comment);
      formData.append("date", this.date);

      let config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      RedStampApi.postImage(formData, config).then(response => {
        this.images = response.data;
        this.getImage();
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
</style>