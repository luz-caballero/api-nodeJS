const { default: mongoose } = require('mongoose');
const User = require('../models/usersModel');  // Importa el modelo de usuario

// Método para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();  // Obtener todos los usuarios de la base de datos
    res.status(200).json(users);  // Responde con los usuarios encontrados
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
  }
};

// Método para obtener un usuario por su ID
const getUserById = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del usuario desde los parámetros de la URL

  try {
    // Asegurarse de que el ID es un objectId valido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de usuario invalido' });
    }

    // Buscar el usuario por su ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);  // Responde con el usuario encontrado
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: err });
  }
};

// Método para insertar un nuevo usuario (POST)
const createUser = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      age
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();
    
    // Responder con el usuario creado
    res.status(201).json(savedUser); 
  } catch (err) {
    res.status(500).json({ message: 'Error al insertar el usuario', error: err });
  }
};

// Método para actualizar un usuario por su ID (PATCH)
const updateUser = async (req, res) => {
  const { id } = req.params; 
  const { name, email, age } = req.body;  // Obtener los datos a actualizar desde el cuerpo de la solicitud

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      id,
      name,
      email,
      age
    }, { new: true });  // `new: true` devuelve el documento actualizado

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(updatedUser);  // Responde con el usuario actualizado
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
  }
};

// Método para eliminar un usuario por su ID (DELETE)
const deleteUser = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del usuario desde los parámetros de la URL

  try {
    const deletedUser = await User.findByIdAndDelete(id);  // Eliminar el usuario por ID

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado', user: deletedUser });  // Responde con el usuario eliminado
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
  }
};

// Exportar los métodos del controlador
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
