# Crear Base de Datos - Formulario Vue.js

Este es un componente Vue.js que permite a los usuarios crear una base de datos ingresando varios parámetros como el nombre de la base de datos, rutas de archivos MDF y LDF, tamaños iniciales y tasas de crecimiento.

## Estructura del Componente

### Template

El template contiene un formulario con los siguientes campos:

- **Nombre de la Base de Datos**: Campo de texto para ingresar el nombre de la base de datos.
- **Ruta MDF**: Campo de texto para especificar la ruta del archivo MDF.
- **Tamaño Inicial MDF (MB)**: Campo numérico para definir el tamaño inicial del archivo MDF en MB.
- **Crecimiento MDF**: Campo de texto para especificar la tasa de crecimiento del archivo MDF.
- **Ruta LDF**: Campo de texto para especificar la ruta del archivo LDF.
- **Tamaño Inicial LDF (MB)**: Campo numérico para definir el tamaño inicial del archivo LDF en MB.
- **Crecimiento LDF**: Campo de texto para especificar la tasa de crecimiento del archivo LDF.

El formulario se envía mediante el método `crearBaseDatos` cuando el usuario hace clic en el botón "Crear Base de Datos".

### Script

El script contiene la lógica del componente:

- **Datos**: Se definen las propiedades reactivas para almacenar los valores de los campos del formulario, así como mensajes de éxito o error.
- **Métodos**: 
  - `crearBaseDatos`: Método asíncrono que realiza una solicitud POST al servidor para crear la base de datos. Maneja la respuesta y muestra un mensaje de éxito o error dependiendo del resultado.

### Estilos

Los estilos están definidos en el bloque `<style scoped>` y aplican solo a este componente. Incluyen estilos para el contenedor del formulario, los campos de entrada, el botón de envío y los mensajes de éxito/error.

## Código Completo

```vue
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

        if (response && response.data) {
          this.message = response.data.message;
          this.messageType = 'success';
        } else {
          throw new Error('Respuesta inesperada');
        }
      } catch (error) {
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