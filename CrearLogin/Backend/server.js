require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

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
    trustServerCertificate: true,
  },
};

app.post("/create-user", async (req, res) => {
  const { LoginName, Password, UserName, DatabaseName, Permissions, Roles } = req.body;

  try {
    await sql.connect(dbConfig);
    const request = new sql.Request();

    request.input("LoginName", sql.NVarChar, LoginName);
    request.input("Password", sql.NVarChar, Password);
    request.input("UserName", sql.NVarChar, UserName);
    request.input("DatabaseName", sql.NVarChar, DatabaseName);
    request.input("Permissions", sql.NVarChar, Permissions || null);
    request.input("Roles", sql.NVarChar, Roles || null);

    await request.execute("CreateLoginAndUser");
    res.json({ message: "Usuario creado exitosamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
