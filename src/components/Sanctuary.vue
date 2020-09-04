<template>
  <div class="sanctuary">
    <button class="sanctuary__btn" @click.prevent="$emit('sanctuary', id)">
      <p class="sanctuary__name">
        {{ name }}
        <br />
      </p>
      <p class="sanctuary__area">({{ prefecture }}{{ city }})</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "Sanctuary",
  props: {
    name: String,
    city: String,
    prefecture: String,
    id: Number
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.sanctuary {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 12px 4px;
  margin-bottom: 16px;

  &__name {
    font-size: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    font-size: 1.7vh;
  }
  &__area {
    font-size: 1vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
  }
}
</style>