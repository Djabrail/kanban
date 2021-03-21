<template>
  <router-view />
</template>
<script>
import axios from "axios";
export default {
  name: "App",
  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "jwt " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");
body {
  background-color: #33363d;
  font-family: "Roboto", sans-serif;
}
</style>
