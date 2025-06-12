const express = require('express')
const app = express()
const mongoose = require('./database/conexion.js') // Conexion a MongoDB
const usersRoutes = require('./routes/usersRoutes.js') // Rutas de usuarios

// Middeware para parsear JSON
app.use(express.json());

// Usar las rutas de usuarios con el prefijo '/api'
app.use('/api', usersRoutes);

//Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
