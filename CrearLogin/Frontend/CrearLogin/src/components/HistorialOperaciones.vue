<template>
    <div>
      <h2>Historial de Operaciones</h2>
  
      <!-- Filtro de fechas -->
      <form @submit.prevent="filtrarHistorial">
        <div>
          <label for="fechaInicio">Fecha Inicio:</label>
          <input v-model="fechaInicio" type="date" id="fechaInicio" />
        </div>
        <div>
          <label for="fechaFin">Fecha Fin:</label>
          <input v-model="fechaFin" type="date" id="fechaFin" />
        </div>
        <button type="submit">Filtrar</button>
      </form>
  
      <!-- Tabla de historial -->
      <h3>Historial de Operaciones</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Operación</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="operacion in historial" :key="operacion.id">
            <td>{{ operacion.fecha }}</td>
            <td>{{ operacion.operacion }}</td>
            <td>{{ operacion.detalles }}</td>
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
        fechaInicio: '',
        fechaFin: '',
        historial: [],
      };
    },
    methods: {
      // Filtrar el historial de operaciones por fechas
      async filtrarHistorial() {
        try {
          // Llamar al backend para obtener el historial filtrado
          const response = await axios.get('http://localhost:3000/api/historial', {
            params: {
              fechaInicio: this.fechaInicio,
              fechaFin: this.fechaFin,
            },
          });
          // Actualizar el historial con los datos filtrados
          this.historial = response.data;
        } catch (error) {
          console.error('Error al obtener el historial:', error);
        }
      },
    },
    created() {
      // Cargar el historial al inicio
      this.filtrarHistorial();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el componente */
  h2 {
    margin-bottom: 20px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
  }
  
  input[type="date"] {
    padding: 5px;
    margin-left: 10px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  </style>
  