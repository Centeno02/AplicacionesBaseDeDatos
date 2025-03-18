<template>
  <div class="form-container">
    <h2>Crear Login y Usuario</h2>
    <form @submit.prevent="crearLoginUsuario">
      <div>
        <label for="loginName">Nombre del Login:</label>
        <input v-model="loginName" id="loginName" placeholder="Nombre del Login" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input v-model="password" id="password" placeholder="Contraseña" type="password" required />
      </div>
      <div>
        <label for="userName">Nombre de Usuario:</label>
        <input v-model="userName" id="userName" placeholder="Nombre de Usuario" required />
      </div>
      <div>
        <label for="databaseName">Seleccionar Base de Datos:</label>
        <select v-model="databaseName" id="databaseName" required>
          <option v-for="db in databases" :key="db.name" :value="db.name">
            {{ db.name }}
          </option>
        </select>
      </div>
      <button type="submit">Crear Login y Usuario</button>
    </form>

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
      loginName: '',
      password: '',
      userName: '',
      databaseName: '',
      message: '',
      databases: [],
    };
  },
  mounted() {
    this.obtenerBasesDeDatos(); // Obtener las bases de datos cuando se monta el componente
  },
  methods: {
    async obtenerBasesDeDatos() {
      try {
        const response = await axios.get('http://localhost:3000/api/basesDeDatos');
        this.databases = response.data; // Guarda las bases de datos en el array
      } catch (error) {
        console.error('Error al obtener las bases de datos:', error);
      }
    },
    async crearLoginUsuario() {
      try {
        const response = await axios.post('http://localhost:3000/crear-login-usuario', {
          loginName: this.loginName,
          password: this.password,
          userName: this.userName,
          databaseName: this.databaseName,
        });
        this.message = response.data.message;
      } catch (error) {
        this.message = 'Error al crear el login y el usuario.';
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 350px; /* Aumenté el ancho para dar más espacio */
  margin: 0 auto;
  padding: 25px; /* Aumenté el padding para más espacio interno */
  border: 1px solid #ccc;
  border-radius: 8px;
}

input,
select {
  width: calc(100% - 20px); /* Reduje el ancho para dejar espacio a los lados */
  padding: 10px; /* Aumenté el padding para mejor legibilidad */
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px; /* Tamaño de fuente más legible */
}

input:focus,
select:focus {
  border-color: #4CAF50; /* Cambia el color del borde al enfocar */
  outline: none; /* Elimina el contorno predeterminado */
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Sombra al enfocar */
}

button {
  width: 100%;
  padding: 12px; /* Aumenté el padding para mejor apariencia */
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px; /* Tamaño de fuente más grande */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s ease; /* Transición suave */
}

button:hover {
  background-color: #45a049;
}

.message {
  margin-top: 20px;
  color: green;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>
