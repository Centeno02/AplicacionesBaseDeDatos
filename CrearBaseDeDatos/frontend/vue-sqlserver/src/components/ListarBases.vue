<template>
  <div class="container">
    <h2 class="title">Bases de Datos</h2>
    <ul v-if="basesDeDatos.length > 0" class="database-list">
      <li v-for="(base, index) in basesDeDatos" :key="index" class="database-item">
        {{ base.name }}
      </li>
    </ul>
    <p v-else class="no-databases">No se encontraron bases de datos.</p>
    <p v-if="loading" class="loading">Cargando...</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
/* Contenedor principal */
.container {
  width: 350px; /* Ancho ajustado */
  margin: 20px auto;
  padding: 25px;
  background-color: #2d2d2d; /* Color oscuro de fondo */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Título */
.title {
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
}

/* Lista de bases de datos */
.database-list {
  list-style-type: none;
  padding: 0;
}

.database-item {
  padding: 10px;
  background-color: #444; /* Fondo oscuro */
  border-radius: 4px;
  margin: 8px 0;
  font-size: 1rem;
  color: #b3e1b3; /* Verde claro */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.database-item:hover {
  background-color: #555;
}

/* Mensajes */
.no-databases {
  text-align: center;
  color: #ccc;
  font-size: 1rem;
}

.loading {
  text-align: center;
  color: #ff9800;
  font-size: 1.1rem;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
