<template>
    <div class="container">
      <h1>Crear Backup de la Base de Datos</h1>
      <select v-model="databaseName">
        <option value="" disabled selected>Selecciona una base de datos</option>
        <option v-for="(db, index) in databases" :key="index" :value="db">
          {{ db }}
        </option>
      </select>
      <button @click="createBackup">Crear Backup</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        databases: [], // Para almacenar las bases de datos disponibles
        databaseName: '', // Para almacenar la base de datos seleccionada
        message: ''
      };
    },
    methods: {
      async fetchDatabases() {
        try {
          const response = await axios.get('http://localhost:3000/api/basesDeDatos');
          this.databases = response.data.map(db => db.name); // Almacena solo los nombres
        } catch (error) {
          this.message = 'Error al obtener las bases de datos.';
        }
      },
      async createBackup() {
        if (!this.databaseName) {
          this.message = 'Por favor, selecciona una base de datos.';
          return;
        }
        try {
          const response = await axios.post('http://localhost:3000/backup', {
            database: this.databaseName
          });
          this.message = response.data.message;
        } catch (error) {
          this.message = 'Error al crear el backup.';
        }
      }
    },
    mounted() {
      this.fetchDatabases(); // Carga las bases de datos disponibles al montar el componente
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 400px;
    margin: 50px auto;
    text-align: center;
  }
  select {
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  button {
    padding: 10px;
    background: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background: darkblue;
  }
  </style>
  