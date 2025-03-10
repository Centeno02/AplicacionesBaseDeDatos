<template>
  <div class="form-container">
    <h2>Crear Base de Datos</h2>
    <form @submit.prevent="crearBaseDatos">
      <div>
        <label for="nombreDB">Nombre de la Base de Datos</label>
        <input v-model="nombreDB" type="text" id="nombreDB" required />
      </div>
      <div>
        <label for="rutaMDF">Ruta MDF</label>
        <input v-model="rutaMDF" type="text" id="rutaMDF" required />
      </div>
      <div>
        <label for="tamanoInicialMDF">Tamaño Inicial MDF (MB)</label>
        <input v-model="tamanoInicialMDF" type="number" id="tamanoInicialMDF" required />
      </div>
      <div>
        <label for="crecimientoMDF">Crecimiento MDF</label>
        <input v-model="crecimientoMDF" type="text" id="crecimientoMDF" required />
      </div>
      <div>
        <label for="rutaLDF">Ruta LDF</label>
        <input v-model="rutaLDF" type="text" id="rutaLDF" required />
      </div>
      <div>
        <label for="tamanoInicialLDF">Tamaño Inicial LDF (MB)</label>
        <input v-model="tamanoInicialLDF" type="number" id="tamanoInicialLDF" required />
      </div>
      <div>
        <label for="crecimientoLDF">Crecimiento LDF</label>
        <input v-model="crecimientoLDF" type="text" id="crecimientoLDF" required />
      </div>
      <button type="submit">Crear Base de Datos</button>
    </form>
    <div v-if="message" :class="messageType">{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombreDB: '',
      rutaMDF: '',
      tamanoInicialMDF: 0,
      crecimientoMDF: '',
      rutaLDF: '',
      tamanoInicialLDF: 0,
      crecimientoLDF: '',
      message: '',
      messageType: '',
    };
  },
  methods: {
    async crearBaseDatos() {
  try {
    const response = await axios.post('http://localhost:5000/api/crearBaseDatos', {
      nombreDB: this.nombreDB,
      rutaMDF: this.rutaMDF,
      tamanoInicialMDF: this.tamanoInicialMDF,
      crecimientoMDF: this.crecimientoMDF,
      rutaLDF: this.rutaLDF,
      tamanoInicialLDF: this.tamanoInicialLDF,
      crecimientoLDF: this.crecimientoLDF,
    });

    // Verificar si la respuesta es válida antes de acceder a 'data'
    if (response && response.data) {
      this.message = response.data.message;
      this.messageType = 'success';
    } else {
      throw new Error('Respuesta inesperada');
    }
  } catch (error) {
    // Manejar el error aquí, de forma más detallada si es necesario
    this.message = error.response?.data?.message || error.message;
    this.messageType = 'error';
  }
},
  },
};
</script>

<style scoped>
.form-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background-color: #45a049;
}
.success {
  color: green;
  font-weight: bold;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
