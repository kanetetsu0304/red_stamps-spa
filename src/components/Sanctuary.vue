<template>
  <div class="sanctuary">
    <div class="sanctuary__top">
      <button class="red-stamp-create__right__name" @click.prevent="$emit('sanctuary', id)">
      <p class="sanctuary__top__name">{{ name }}</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sanctuary",
  props: {
    name: String,
    id:Number
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
.sanctuary {
  display: inline;
}
</style>