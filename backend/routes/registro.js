const express = require('express');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Validaciones robustas del servidor
const validacionesRegistro = [
  body('nombre')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('contrasena')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('La contraseña debe contener al menos una minúscula, una mayúscula y un número'),
  
  body('confirmarContrasena')
    .custom((value, { req }) => {
      if (value !== req.body.contrasena) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),
  
  body('edad')
    .isInt({ min: 18, max: 99 })
    .withMessage('La edad debe ser un número entre 18 y 99'),
  
  body('telefono')
    .matches(/^\d{10}$/)
    .withMessage('El teléfono debe tener exactamente 10 dígitos'),
  
  body('biografia')
    .optional()
    .isLength({ max: 300 })
    .withMessage('La biografía no puede exceder 300 caracteres'),
  
  body('genero')
    .isIn(['Masculino', 'Femenino', 'Otro'])
    .withMessage('Debe seleccionar un género válido'),
  
  body('pais')
    .notEmpty()
    .withMessage('Debe seleccionar un país')
    .isLength({ min: 2, max: 50 })
    .withMessage('El país debe tener entre 2 y 50 caracteres')
];

router.post('/', validacionesRegistro, async (req, res) => {
  try {
    // Verificar errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ 
        error: 'Datos inválidos',
        errores: errores.array()
      });
    }

    const { nombre, email, contrasena, confirmarContrasena, edad, telefono, biografia, genero, pais } = req.body;

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        error: 'El correo electrónico ya está registrado' 
      });
    }

    // Verificar si el teléfono ya existe
    const telefonoExistente = await Usuario.findOne({ telefono });
    if (telefonoExistente) {
      return res.status(400).json({ 
        error: 'El número de teléfono ya está registrado' 
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      contrasena, 
      confirmarContrasena,
      edad, 
      telefono,
      biografia: biografia || '', 
      genero,
      pais
    });

    await nuevoUsuario.save();
    
    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        edad: nuevoUsuario.edad,
        genero: nuevoUsuario.genero,
        pais: nuevoUsuario.pais,
        fechaRegistro: nuevoUsuario.fechaRegistro
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
    // Manejar errores específicos de MongoDB
    if (error.code === 11000) {
      const campo = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        error: `El ${campo} ya está en uso` 
      });
    }
    
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'Error de validación',
        errores: errores
      });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
});

module.exports = router;
