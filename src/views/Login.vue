<template>
  <div>
    <form class="form" @submit.prevent="login">
      <h1>Вход</h1>
      <div class="form__row">
        <input required v-model="username" type="text" placeholder="Name" />
      </div>
      <div class="form__row">
        <input
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <button class="form__button" type="submit">Войти</button>
      <router-link class="form__link" to="/register">Регистрация</router-link>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 250px;
  &__row {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    input {
      display: block;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      appearance: none;
      border-radius: 0.25rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  }
  &__button {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    margin-top: 10px;
  }
  &__link {
    color: #0d6efd;
    text-align: center;
    margin-top: 6px;
  }
}
</style>
