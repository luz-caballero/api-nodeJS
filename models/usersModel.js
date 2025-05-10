const mongoose = require('../database/conexion'); 

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
});

// Modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
