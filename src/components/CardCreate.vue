<template>
  <div v-if="card_create" class="create">
    <textarea v-model="card.text" class="create__textarea"></textarea>
    <div class="create__footer">
      <button @click="CreateButton" class="create__button" type="submit">
        Добавить карточку
      </button>
      <div class="create__close" @click="closeForm">&#215;</div>
    </div>
  </div>
  <a v-else @click="addForm" class="create__addform">Добавить карточку</a>
</template>

<script>
export default {
  name: "CardCreate",
  props: ["row"],
  data() {
    return {
      card_create: false,
      card: {
        row: this.row,
        text: "",
      },
    };
  },
  methods: {
    addForm() {
      this.card_create = true;
    },
    CreateButton() {
      this.$emit("cart-add", this.card);
      this.card_create = false;
    },
    closeForm() {
      this.card_create = !this.card_create;
    },
  },
};
</script>

<style lang="scss">
.create {
  position: relative;
  background-color: #292b31;
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  &__textarea {
    background-color: #717173;
    border-color: #717173;
    min-height: 80px;
  }
  &__button {
    border: 1px solid #717173;
    background-color: #717173;
    min-height: 30px;
    cursor: pointer;
    width: 70%;
  }
  &__addform {
    background-color: #292b31;
    color: #717173;
    padding: 20px;
    padding-top: 0;
    cursor: pointer;
  }
  &__close {
    color: #555557;
    font-size: 22px;
    cursor: pointer;
  }
  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>
