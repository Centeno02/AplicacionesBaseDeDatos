<script setup>
import { ref } from 'vue';
import CrearBase from './components/CrearBase.vue';
import ListaBase from './components/ListarBases.vue';

// Creamos una propiedad reactiva para manejar el estado del menú
const menuActivo = ref('crear'); // 'crear' o 'listar'

</script>

<template>
  <div>
    <h1>Gestión de Bases de Datos SQL Server</h1>

    <!-- Menú de Navegación -->
    <nav>
      <ul>
        <li @click="menuActivo = 'crear'">Crear Base de Datos</li>
        <li @click="menuActivo = 'listar'">Bases de Datos Existentes</li>
      </ul>
    </nav>

    <!-- Vistas Condicionales -->
    <div v-if="menuActivo === 'crear'">
      <CrearBase />
    </div>
    <div v-if="menuActivo === 'listar'">
      <ListaBase />
    </div>
  </div>
</template>

<style scoped>
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 20px;
}

nav li {
  cursor: pointer;
  font-weight: bold;
}

nav li:hover {
  color: blue;
}
</style>
