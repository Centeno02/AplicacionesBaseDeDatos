<template>
  <div class="container">
    <h2>Crear Login y Usuario</h2>
    <form @submit.prevent="createUser">
      <input v-model="form.LoginName" placeholder="Login Name" required />
      <input v-model="form.Password" placeholder="Password" type="password" required />
      <input v-model="form.UserName" placeholder="User Name" required />
      <input v-model="form.DatabaseName" placeholder="Database Name" required />
      <input v-model="form.Permissions" placeholder="Permissions (opcional)" />
      <input v-model="form.Roles" placeholder="Roles (separados por coma)" />
      <button type="submit">Crear</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        LoginName: "",
        Password: "",
        UserName: "",
        DatabaseName: "",
        Permissions: "",
        Roles: "",
      },
      message: "",
    };
  },
  methods: {
    async createUser() {
      try {
        const response = await axios.post("http://localhost:3000/create-user", this.form);
        this.message = response.data.message;
      } catch (error) {
        this.message = "Error: " + error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
input, button {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
</style>
