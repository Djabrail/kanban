<template>
  <div>
    <form class="form" @submit.prevent="register">
      <h4>Register</h4>
      <div class="form__row">
        <input
          id="name"
          type="text"
          v-model="username"
          placeholder="Username"
          required
        />
      </div>

      <div class="form__row">
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>

      <div class="form__row">
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>

      <button class="form__button" type="submit">Зарегистрироваться</button>
      <router-link class="form__link" to="/login">Войти</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/login"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
