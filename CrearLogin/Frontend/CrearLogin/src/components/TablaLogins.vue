<template>
    <div class="table-container">
      <h2>Lista de Logins y Usuarios</h2>
      
      <!-- Tabla de logins y usuarios -->
      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Nombre de Usuario</th>
            <th>Base de Datos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(usuario, index) in usuarios" :key="index">
            <td>{{ usuario.LoginName }}</td>
            <td>{{ usuario.UserName }}</td>
            <td>{{ usuario.DatabaseName }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Mensaje de error si no se pueden cargar los datos -->
      <div v-if="message" class="message">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        usuarios: [], // Para almacenar la lista de logins y usuarios
        message: '',
      };
    },
    mounted() {
      this.obtenerUsuarios(); // Obtener la lista de usuarios al montar el componente
    },
    methods: {
      // Obtener usuarios desde el backend
      async obtenerUsuarios() {
        try {
          const response = await axios.get('http://localhost:3000/api/usuarios');
          this.usuarios = response.data; // Guardar los usuarios en el array
        } catch (error) {
          console.error('Error al obtener los usuarios:', error);
          this.message = 'Error al obtener los usuarios.'; // Mostrar mensaje de error
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .message {
    margin-top: 20px;
    color: red;
    text-align: center;
  }
  </style>
  