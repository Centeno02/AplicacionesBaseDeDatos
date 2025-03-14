require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // Cambia a true si usas Azure
        trustServerCertificate: true
    }
};

// Conectar a SQL Server
sql.connect(dbConfig).then(() => {
    console.log('✅ Conectado a SQL Server');
}).catch(err => console.error('Error de conexión:', err));

app.post('/backup', async (req, res) => {
    try {
        const { database } = req.body; // Recibe el nombre de la DB desde el frontend
        if (!database) return res.status(400).json({ error: 'Falta el nombre de la base de datos' });

        const query = `EXEC BackupDatabase @DatabaseName = '${database}', @BackupType = 'FULL'`;
        await sql.query(query);
        
        res.json({ message: `Backup de ${database} creado exitosamente` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener las bases de datos disponibles
app.get('/api/basesDeDatos', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT name FROM sys.databases');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error en la consulta de bases de datos:', err); // Muestra detalles del error
        res.status(500).json({ message: 'Error al obtener las bases de datos: ' + err.message });
    }
});


// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
