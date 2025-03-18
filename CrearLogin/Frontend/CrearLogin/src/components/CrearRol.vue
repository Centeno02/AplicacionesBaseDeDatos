<template>
    <div>
      <h2>Crear Rol y Asignar Usuario</h2>
      <form @submit.prevent="crearRol">
        <label for="rolNombre">Nombre del Rol:</label>
        <input v-model="rolNombre" id="rolNombre" type="text" required />
  
        <label for="usuarioNombre">Usuario Nombre:</label>
        <input v-model="usuarioNombre" id="usuarioNombre" type="text" required />
  
        <button type="submit">Crear Rol y Asignar Usuario</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        rolNombre: "",
        usuarioNombre: "",
      };
    },
    methods: {
      async crearRol() {
        try {
          await axios.post("http://localhost:3000/api/crearRol", {
            rolNombre: this.rolNombre,
            usuarioNombre: this.usuarioNombre,
          });
          alert("Rol creado y usuario asignado exitosamente");
          this.rolNombre = "";
          this.usuarioNombre = "";
        } catch (error) {
          console.error(error);
          alert("Error al crear rol y asignar usuario");
        }
      },
    },
  };
  </script>
  