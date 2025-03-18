<template>
  <div id="app">
    <!-- Menú de navegación -->
    <nav>
      <ul>
        <li><router-link to="/gestion-logins">Gestión de Logins</router-link></li>
        <li><router-link to="/asignacion-permisos">Asignación de Permisos</router-link></li>
        <li><router-link to="/tabla">tabla</router-link></li>
        <li><router-link to="/revoke">quitar</router-link></li>


      </ul>
    </nav>

    <!-- Vista de contenido -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 15px;
}

a {
  text-decoration: none;
  color: #42b983;
}

a:hover {
  text-decoration: underline;
}
</style>
