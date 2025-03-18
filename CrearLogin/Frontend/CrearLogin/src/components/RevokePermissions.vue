<template>
    <div class="revoke-permissions">
      <h2>Revocar Permiso de Usuario</h2>
      
      <!-- Formulario -->
      <form @submit.prevent="handleRevokePermission">
        <div class="form-group">
          <label for="userName">Nombre de Usuario</label>
          <input v-model="userName" id="userName" type="text" placeholder="Nombre del usuario" required />
        </div>
        
        <div class="form-group">
          <label for="databaseName">Nombre de la Base de Datos</label>
          <input v-model="databaseName" id="databaseName" type="text" placeholder="Nombre de la base de datos" required />
        </div>
  
        <div class="form-group">
          <label for="permission">Permiso</label>
          <input v-model="permission" id="permission" type="text" placeholder="Permiso a revocar" required />
        </div>
  
        <button type="submit" class="btn btn-primary">Revocar Permiso</button>
      </form>
  
      <!-- Mensaje de respuesta -->
      <div v-if="message" :class="messageClass">
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: "",
        databaseName: "",
        permission: "",
        message: "",
        messageClass: ""
      };
    },
    methods: {
      async handleRevokePermission() {
        try {
          // Enviar la solicitud al backend para revocar el permiso
          const response = await this.$axios.post('http://localhost:3000/quitar-permisos', {
            userName: this.userName,
            databaseName: this.databaseName,
            permission: this.permission
          });
  
          // Mostrar mensaje de éxito
          this.message = response.data.message;
          this.messageClass = "success";
        } catch (error) {
          console.error('Error al revocar el permiso:', error);
          this.message = 'Hubo un error al revocar el permiso.';
          this.messageClass = "error";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
  