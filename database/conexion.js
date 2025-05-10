const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error de conexión:', err));

module.exports = mongoose;