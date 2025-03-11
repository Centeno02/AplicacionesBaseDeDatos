## API para la Gestión de Bases de Datos en SQL Server con Node.js

Este proyecto es una API en Node.js con Express que permite la gestión de bases de datos en SQL Server. Utiliza `mssql` para conectarse a SQL Server y `cors` para manejar peticiones desde diferentes dominios.

### Instalación
Para instalar las dependencias necesarias, ejecute el siguiente comando:

```sh
npm install express mssql cors
```

### Configuración
En el archivo principal (`server.js`), se define la configuración de conexión a SQL Server:

```js
const config = {
  user: 'superadmin',
  password: 'P@ssw0rd123',
  server: 'localhost',
  database: 'AdminDB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
```

### Endpoints Disponibles

#### 1. Crear una Base de Datos
**Ruta:** `POST /api/crearBaseDatos`

**Descripción:**
Ejecuta un procedimiento almacenado (`sp_CrearBaseDatos`) para crear una base de datos con los parámetros proporcionados en el cuerpo de la petición.

**Parámetros en el cuerpo (JSON):**
- `nombreDB` (string)
- `rutaMDF` (string)
- `tamanoInicialMDF` (int)
- `crecimientoMDF` (string)
- `rutaLDF` (string)
- `tamanoInicialLDF` (int)
- `crecimientoLDF` (string)

**Ejemplo de petición:**
```json
{
  "nombreDB": "MiBaseDeDatos",
  "rutaMDF": "C:\\data\\MiBase.mdf",
  "tamanoInicialMDF": 10,
  "crecimientoMDF": "10MB",
  "rutaLDF": "C:\\data\\MiBase.ldf",
  "tamanoInicialLDF": 5,
  "crecimientoLDF": "5MB"
}
```

**Respuesta:**
```json
{
  "message": "Base de datos creada correctamente."
}
```

---

#### 2. Obtener la Lista de Bases de Datos
**Ruta:** `GET /api/basesDeDatos`

**Descripción:**
Consulta la lista de bases de datos existentes en el servidor.

**Ejemplo de Respuesta:**
```json
[
  { "name": "master" },
  { "name": "tempdb" },
  { "name": "model" },
  { "name": "MiBaseDeDatos" }
]
```

### Inicio del Servidor
Para iniciar el servidor, ejecute:
```sh
node server.js
```

El servidor estará disponible en: `http://localhost:5000`

### Notas
- Asegúrese de que SQL Server está configurado para aceptar conexiones remotas.
- El usuario y contraseña deben ser configurados adecuadamente en el objeto `config`.
- `trustServerCertificate: true` se usa para evitar errores con certificados SSL en entornos locales.

---
API para gestión de bases de datos con Node.js y SQL Server

