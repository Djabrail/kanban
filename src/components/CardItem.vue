<template>
  <div class="card__item" draggable="true">
    <div class="card__delete" @click="deleteItem">&#215;</div>
    <div class="card__header">
      Id: <span>{{ item.id }}</span>
    </div>
    <div class="card__body">{{ item.text }}</div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    card_object: {
      type: Object,
    },
  },
  data() {
    return {
      item: this.card_object,
    };
  },
  methods: {
    deleteItem() {
      this.$emit("delete-card", this.item.id);
    },
  },
};
</script>

<style lang="scss">
.card {
  &__list {
    background-color: #292b31;
    padding-bottom: 40px;
  }
  &__item {
    background-color: #191a1d;
    margin: 20px;
    padding: 20px;
    color: #fff;
    position: relative;
  }
  &__header {
    span {
      color: #555557;
    }
  }
  &__body {
    margin-top: 4px;
    color: #555557;
  }
  &__delete {
    color: #555557;
    position: absolute;
    top: 3px;
    right: 6px;
    font-size: 22px;
    cursor: pointer;
  }
}
</style>
