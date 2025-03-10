<template>
    <div>
      <ul v-if="basesDeDatos.length > 0">
        <li v-for="(base, index) in basesDeDatos" :key="index">{{ base.name }}</li>
      </ul>
      <p v-else>No se encontraron bases de datos.</p>
      <p v-if="loading">Cargando...</p>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        basesDeDatos: [],
        loading: false,
        errorMessage: null
      };
    },
    methods: {
      async obtenerBasesDeDatos() {
        this.loading = true;
        this.errorMessage = null;
        try {
          const response = await axios.get('http://localhost:5000/api/basesDeDatos');
          this.basesDeDatos = response.data; // Guardamos las bases de datos en el array
        } catch (error) {
          this.errorMessage = 'Error al obtener las bases de datos: ' + error.message;
        } finally {
          this.loading = false;
        }
      }
    },
    created() {
      this.obtenerBasesDeDatos(); // Llamamos al método al crear el componente
    }
  };
  </script>
  
  <style scoped>
  /* Agrega estilos si lo deseas */
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 5px 0;
  }
  </style>
  