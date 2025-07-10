const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  contrasena: { 
    type: String, 
    required: true,
    minlength: 8
  },
  confirmarContrasena: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.contrasena;
      },
      message: 'Las contraseñas no coinciden'
    }
  },
  edad: { 
    type: Number, 
    required: true,
    min: 18, 
    max: 99 
  },
  telefono: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'El teléfono debe tener 10 dígitos']
  },
  biografia: { 
    type: String, 
    maxlength: 300 
  },
  genero: { 
    type: String, 
    required: true,
    enum: ['Masculino', 'Femenino', 'Otro'] 
  },
  pais: {
    type: String,
    required: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para eliminar la confirmación de contraseña antes de guardar
usuarioSchema.pre('save', function(next) {
  this.confirmarContrasena = undefined;
  next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);
