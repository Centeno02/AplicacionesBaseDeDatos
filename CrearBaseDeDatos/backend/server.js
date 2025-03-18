const cors = require('cors');
const express = require('express');
const mssql = require('mssql');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a SQL Server
const config = {
  user: 'sa',                 // Usuario de la base de datos
  password: '123456',         // Contraseña de la base de datos
  server: 'localhost',        // Dirección del servidor de base de datos
  database: 'master',         // Base de datos donde se ejecutará el procedimiento almacenado
  options: {
    encrypt: true,            // Usar cifrado (recomendado para Azure, pero también útil en otras configuraciones)
    trustServerCertificate: true, // Permitir conexiones sin validar el certificado del servidor
  },
};

// Ruta para crear una base de datos
app.post('/api/crearBaseDatos', async (req, res) => {
  const {
    nombreDB,
    rutaMDF,
    tamanoInicialMDF,
    crecimientoMDF,
    rutaLDF,
    tamanoInicialLDF,
    crecimientoLDF,
  } = req.body;

  try {
    const pool = await mssql.connect(config);
    const result = await pool.request()
      .input('NombreDB', mssql.NVarChar, nombreDB)
      .input('RutaMDF', mssql.NVarChar, rutaMDF)
      .input('TamanoInicialMDF', mssql.Int, tamanoInicialMDF)
      .input('CrecimientoMDF', mssql.NVarChar, crecimientoMDF)
      .input('RutaLDF', mssql.NVarChar, rutaLDF)
      .input('TamanoInicialLDF', mssql.Int, tamanoInicialLDF)
      .input('CrecimientoLDF', mssql.NVarChar, crecimientoLDF)
      .execute('sp_CrearBaseDatos');
    
    res.json({ message: 'Base de datos creada correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la base de datos: ' + err.message });
  }
});

// Ruta para obtener las bases de datos existentes
app.get('/api/basesDeDatos', async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool.request().query('SELECT name FROM sys.databases');
    
    // Devolver las bases de datos en formato JSON
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las bases de datos: ' + err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
