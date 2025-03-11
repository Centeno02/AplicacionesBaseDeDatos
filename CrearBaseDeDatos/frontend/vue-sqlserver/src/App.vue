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
        <li @click="menuActivo = 'crear'" :class="{ active: menuActivo === 'crear' }">Crear Base de Datos</li>
        <li @click="menuActivo = 'listar'" :class="{ active: menuActivo === 'listar' }">Bases de Datos Existentes</li>
      </ul>
    </nav>

    <!-- Vistas Condicionales con transiciones -->
    <transition name="fade" mode="out-in">
      <div :key="menuActivo">
        <div v-if="menuActivo === 'crear'">
          <CrearBase />
        </div>
        <div v-if="menuActivo === 'listar'">
          <ListaBase />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Estilos para el menú */
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

nav li {
  cursor: pointer;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #333; /* Fondo oscuro */
  color: #fff; /* Texto blanco */
  transition: background-color 0.3s, color 0.3s;
}

nav li:hover {
  background-color: #555; /* Cambio de color más claro en hover */
}

nav li.active {
  background-color: #535353; /* Fondo azul cuando está activo */
  color: white; /* Texto blanco cuando está activo */
}

/* Transición de desvanecimiento */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
