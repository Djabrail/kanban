<template>
  <div class="trello">
    <div class="column__list">
      <div class="column__item" v-for="column in columns" :key="column.id">
        <div class="column__header" :style="{ backgroundColor: column.color }">
          {{ column.title }} ({{ getRow(column.id).length }})
        </div>
        <div
          v-if="cards"
          class="card__list"
          @drop="onDrop($event, column.id)"
          @dragenter.prevent
          @dragover.prevent
        >
          <card-item
            v-for="card in getRow(column.id)"
            :key="card.id"
            :card_object="card"
            @delete-card="deleteCard"
            @dragstart="startDrag($event, card)"
          />
        </div>
        <card-create @cart-add="CartAdd" :row="column.id" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardItem from "@/components/CardItem";
import CardCreate from "@/components/CardCreate";

export default {
  name: "Home",
  components: {
    CardCreate,
    CardItem,
  },
  data() {
    return {
      columns: [
        {
          id: 0,
          title: "ON-HOLD",
          color: "#fb7e46",
        },
        {
          id: 1,
          title: "IN-PROGRESS",
          color: "#2a92bf",
        },
        {
          id: 2,
          title: "NEEDS-REVIEW",
          color: "#f4ce46",
        },
        {
          id: 3,
          title: "APPROVED",
          color: "#00b961",
        },
      ],
      cards: [],
    };
  },
  mounted() {
    this.getCards();
  },
  methods: {
    getCards() {
      axios
        .get("/api/v1/cards/")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.cards.push(response.data[i]);
          }
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    getRow(row) {
      return this.cards.filter((item) => Number(item.row) === row);
    },
    deleteCard(id) {
      axios.delete(`/api/v1/cards/${id}/`);
      this.cards = this.cards.filter((item) => item.id !== id);
    },
    CartAdd(card) {
      axios
        .post("/api/v1/cards/", card)
        .then((response) => {
          this.cards.push(response.data);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    startDrag(event, item) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemId", item.id);
    },
    onDrop(event, row) {
      const itemId = event.dataTransfer.getData("itemId");
      const item = this.cards.find((item) => item.id == itemId);
      item.row = row;

      axios
        .patch(`/api/v1/cards/${itemId}/`, {
          row,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
  },
};
</script>

<style lang="scss">
.column {
  &__list {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__item {
    width: 100%;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  &__header {
    padding: 20px;
    font-size: 16px;
    color: #fff;
  }
}
</style>
