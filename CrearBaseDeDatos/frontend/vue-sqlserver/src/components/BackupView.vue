<template>
  <div class="form-container">
    <h2>Crear Backups</h2>

    <select v-model="databaseName">
      <option value="" disabled selected>Selecciona una base de datos</option>
      <option v-for="(db, index) in databases" :key="index" :value="db">
        {{ db }}
      </option>
    </select>
    <button @click="createBackup">Crear Backup</button>
    <p v-if="message" :class="messageClass">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      databases: [], // Para almacenar las bases de datos disponibles
      databaseName: '', // Para almacenar la base de datos seleccionada
      message: '', // Mensaje para mostrar resultados
      messageClass: '', // Clase para aplicar estilos según el tipo de mensaje
    };
  },
  methods: {
    async fetchDatabases() {
      try {
        const response = await axios.get('http://localhost:3000/api/basesDeDatos');
        this.databases = response.data.map(db => db.name); // Almacena solo los nombres
      } catch (error) {
        this.message = 'Error al obtener las bases de datos.';
        this.messageClass = 'error';
      }
    },
    async createBackup() {
      if (!this.databaseName) {
        this.message = 'Por favor, selecciona una base de datos.';
        this.messageClass = 'error';
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/backup', {
          database: this.databaseName
        });
        this.message = response.data.message;
        this.messageClass = 'success';
      } catch (error) {
        this.message = 'Error al crear el backup.';
        this.messageClass = 'error';
      }
    }
  },
  mounted() {
    this.fetchDatabases(); // Carga las bases de datos disponibles al montar el componente
  }
};
</script>

<style scoped>
.form-container {
  width: 350px; /* Aumenté el ancho para dar más espacio */
  margin: 0 auto;
  padding: 25px; /* Aumenté el padding para más espacio interno */
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center; /* Aseguramos que el texto esté centrado */
}

select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
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

.success {
  color: green;
  font-weight: bold;
  margin-top: 15px; /* Espacio superior para separar del botón */
  text-align: center; /* Centrar el mensaje */
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 15px; /* Espacio superior para separar del botón */
  text-align: center; /* Centrar el mensaje */
}
</style>
