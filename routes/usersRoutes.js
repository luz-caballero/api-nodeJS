const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');

// Ruta para obtener todos los usuarios (GET)
router.get('/users', usersController.getUsers);

// Ruta para crear un nuevo usuario (POST)
router.post('/users', usersController.createUser);

// Ruta para obtener, actualizar y eliminar un usuario  por su ID (GET, PATCH, DELETE)
router.route('/users/:id')
    .get(usersController.getUserById) // Obtener un usuario por ID
    .patch(usersController.updateUser) // Actualizar un usuario por ID
    .delete(usersController.deleteUser); // Eliminar un usuario por ID

module.exports = router;
