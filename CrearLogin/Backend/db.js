// db.js
const mysql = require('mysql2');

// Configura tu conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sa',       // Cambia esto según tu configuración
  password: '123456', // Cambia esto según tu configuración
  database: 'master',  // Nombre de la base de datos
});

// Verifica la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

module.exports = connection;
