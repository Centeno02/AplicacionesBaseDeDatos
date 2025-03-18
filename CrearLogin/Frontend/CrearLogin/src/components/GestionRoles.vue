<template>
    <div>
      <h2>Gestión de Roles</h2>
      <form @submit.prevent="crearRol">
        <label for="rolNombre">Nombre del Rol:</label>
        <input v-model="rolNombre" id="rolNombre" type="text" required />
  
        <button type="submit">Crear Rol</button>
      </form>
  
      <h3>Roles y Usuarios Asignados</h3>
      <table>
        <thead>
          <tr>
            <th>Rol</th>
            <th>Usuarios Asignados</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rol in roles" :key="rol.id">
            <td>{{ rol.nombre }}</td>
            <td>{{ rol.usuarios.join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        rolNombre: '',
        roles: [],
      };
    },
    methods: {
      async crearRol() {
        try {
          await axios.post('http://localhost:3000/api/crearRol', {
            nombre: this.rolNombre,
          });
  
          // Reset fields and refresh data
          this.rolNombre = '';
          this.getRoles();
        } catch (error) {
          console.error(error);
        }
      },
      async getRoles() {
        try {
          const response = await axios.get('http://localhost:3000/api/roles');
          this.roles = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
    created() {
      this.getRoles();
    },
  };
  </script>
  