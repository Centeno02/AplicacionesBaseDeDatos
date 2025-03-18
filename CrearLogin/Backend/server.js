const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la conexión a SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // IP o nombre del servidor SQL
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Cambiar a true si usas Azure
    trustServerCertificate: true,
  },
};

// Endpoint para crear login y usuario
app.post('/crear-login-usuario', async (req, res) => {
  try {
    const { loginName, password, userName, databaseName } = req.body;

    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('LoginName', sql.NVarChar, loginName)
      .input('Password', sql.NVarChar, password)
      .input('UserName', sql.NVarChar, userName)
      .input('DatabaseName', sql.NVarChar, databaseName)
      .execute('CreateLoginAndUserSimple');

    res.json({ message: 'Login y usuario creados correctamente', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear login y usuario' });
  }
});

// Endpoint para asignar permisos y roles
app.post('/asignar-permisos-roles', async (req, res) => {
  try {
    const { userName, databaseName, permissions, roles } = req.body;

    let pool = await sql.connect(dbConfig);
    let result = await pool.request()
      .input('UserName', sql.NVarChar, userName)
      .input('DatabaseName', sql.NVarChar, databaseName)
      .input('Permissions', sql.NVarChar, permissions || null)
      .input('Roles', sql.NVarChar, roles || null)
      .execute('AsignarPermisosYRoles');

    res.json({ message: 'Permisos y roles asignados correctamente', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al asignar permisos y roles' });
  }
});

// Endpoint para obtener las bases de datos
app.get('/api/basesDeDatos', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT name 
      FROM sys.databases 
      WHERE state_desc = 'ONLINE' 
      AND name NOT IN ('master', 'tempdb', 'model', 'msdb', 'AdminDB')`); // Filtra las bases de datos del sistema

    res.json(result.recordset); // Envía las bases de datos como respuesta
  } catch (err) {
    console.error('Error en la consulta de bases de datos:', err);
    res.status(500).json({ message: 'Error al obtener las bases de datos: ' + err.message });
  }
});

// **Nuevo Endpoint para obtener logins y usuarios existentes usando el procedimiento almacenado**
app.get('/api/usuarios', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      EXEC ObtenerLoginsYBasesDeDatos;
    `);

    res.json(result.recordset); // Devuelve la lista de logins y usuarios en el nuevo orden
  } catch (err) {
    console.error('Error al obtener los logins y usuarios:', err);
    res.status(500).json({ message: 'Error al obtener los logins y usuarios: ' + err.message });
  }
});


// Endpoint para quitar permisos de un usuario
app.post('/quitar-permisos', async (req, res) => {
  try {
    const { userName, databaseName, permission } = req.body;

    // Verificar si se recibieron todos los parámetros necesarios
    if (!userName || !databaseName || !permission) {
      return res.status(400).json({ error: 'Faltan parámetros: userName, databaseName, o permission.' });
    }

    let pool = await sql.connect(dbConfig);
    
    // Ejecutar el procedimiento almacenado para quitar permisos
    let result = await pool.request()
      .input('UserName', sql.NVarChar, userName)
      .input('DatabaseName', sql.NVarChar, databaseName)
      .input('Permission', sql.NVarChar, permission)
      .execute('QuitarPermisosUsuario');  // Aquí se llama al procedimiento almacenado correcto

    res.json({ message: 'Permiso revocado correctamente', result });
  } catch (err) {
    console.error('Error al revocar permiso:', err);
    res.status(500).json({ error: 'Error al revocar el permiso' });
  }
});



// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
