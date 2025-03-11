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
  width: 350px; /* Aumenté el ancho para dar más espacio */
  margin: 0 auto;
  padding: 25px; /* Aumenté el padding para más espacio interno */
  border: 1px solid #ccc;
  border-radius: 8px;
}

input {
  width: calc(100% - 20px); /* Reduje el ancho para dejar espacio a los lados */
  padding: 10px; /* Aumenté el padding para mejor legibilidad */
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px; /* Tamaño de fuente más legible */
}

input:focus {
  border-color: #4CAF50; /* Cambia el color del borde al enfocar */
  outline: none; /* Elimina el contorno predeterminado */
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5); /* Sombra al enfocar */
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