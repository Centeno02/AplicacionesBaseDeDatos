import { createRouter, createWebHistory } from 'vue-router';
import CrearLogins from '../components/CrearLogin.vue';
import AsignacionPermisos from '../components/AsignarPermisos.vue';
import TablaLogins from '../components/TablaLogins.vue';
import revoke from '../components/RevokePermissions.vue';



const routes = [
  { path: '/gestion-logins', component: CrearLogins },
  { path: '/asignacion-permisos', component: AsignacionPermisos },
  { path: '/tabla', component: TablaLogins },
  { path: '/revoke', component: revoke },



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
