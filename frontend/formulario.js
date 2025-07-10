// Configuración de validaciones
const validaciones = {
  nombre: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    message: 'El nombre debe tener entre 3 y 50 caracteres y solo contener letras'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Ingrese un email válido'
  },
  contrasena: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
  },
  confirmarContrasena: {
    required: true,
    match: 'contrasena',
    message: 'Las contraseñas no coinciden'
  },
  edad: {
    required: true,
    min: 18,
    max: 99,
    message: 'La edad debe estar entre 18 y 99 años'
  },
  telefono: {
    required: true,
    pattern: /^\d{10}$/,
    message: 'El teléfono debe tener exactamente 10 dígitos'
  },
  biografia: {
    required: false,
    maxLength: 300,
    message: 'La biografía no puede exceder 300 caracteres'
  },
  genero: {
    required: true,
    message: 'Debe seleccionar un género'
  },
  pais: {
    required: true,
    message: 'Debe seleccionar un país'
  },
  terminos: {
    required: true,
    message: 'Debe aceptar los términos y condiciones'
  }
};

// Elementos del DOM
const form = document.getElementById('registroForm');
const submitBtn = document.querySelector('.submit-btn');
const erroresContainer = document.getElementById('errores');
const successContainer = document.getElementById('success');
const biografiaTextarea = document.getElementById('biografia');
const charCount = document.getElementById('char-count');
const contrasenaInput = document.getElementById('contrasena');

// Estado del formulario
let formErrors = {};

// Función para mostrar/ocultar loading en el botón
function toggleLoading(loading) {
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  if (loading) {
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
  } else {
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Función para mostrar error en un campo específico
function mostrarError(campo, mensaje) {
  const errorElement = document.getElementById(`error-${campo}`);
  const formGroup = document.querySelector(`#${campo}`).closest('.form-group');
  
  if (errorElement) {
    errorElement.textContent = mensaje;
    errorElement.classList.add('show');
  }
  
  if (formGroup) {
    formGroup.classList.add('invalid');
    formGroup.classList.remove('valid');
  }
  
  formErrors[campo] = mensaje;
}

// Función para limpiar error de un campo
function limpiarError(campo) {
  const errorElement = document.getElementById(`error-${campo}`);
  const formGroup = document.querySelector(`#${campo}`).closest('.form-group');
  
  if (errorElement) {
    errorElement.classList.remove('show');
  }
  
  if (formGroup) {
    formGroup.classList.remove('invalid');
    formGroup.classList.add('valid');
  }
  
  delete formErrors[campo];
}

// Función para validar un campo individual
function validarCampo(nombreCampo, valor) {
  const reglas = validaciones[nombreCampo];
  if (!reglas) return true;

  // Campo requerido
  if (reglas.required && (!valor || valor.trim() === '')) {
    mostrarError(nombreCampo, `${nombreCampo.charAt(0).toUpperCase() + nombreCampo.slice(1)} es requerido`);
    return false;
  }

  // Si el campo no es requerido y está vacío, no validar más
  if (!reglas.required && (!valor || valor.trim() === '')) {
    limpiarError(nombreCampo);
    return true;
  }

  // Longitud mínima
  if (reglas.minLength && valor.length < reglas.minLength) {
    mostrarError(nombreCampo, reglas.message);
    return false;
  }

  // Longitud máxima
  if (reglas.maxLength && valor.length > reglas.maxLength) {
    mostrarError(nombreCampo, reglas.message);
    return false;
  }

  // Patrón de expresión regular
  if (reglas.pattern && !reglas.pattern.test(valor)) {
    mostrarError(nombreCampo, reglas.message);
    return false;
  }

  // Valores mínimos y máximos (para números)
  if (reglas.min !== undefined || reglas.max !== undefined) {
    const numero = parseInt(valor);
    if (isNaN(numero) || (reglas.min !== undefined && numero < reglas.min) || 
        (reglas.max !== undefined && numero > reglas.max)) {
      mostrarError(nombreCampo, reglas.message);
      return false;
    }
  }

  // Coincidencia con otro campo
  if (reglas.match) {
    const otroValor = document.getElementById(reglas.match).value;
    if (valor !== otroValor) {
      mostrarError(nombreCampo, reglas.message);
      return false;
    }
  }

  // Campo checkbox (términos)
  if (nombreCampo === 'terminos') {
    const checkbox = document.getElementById('terminos');
    if (!checkbox.checked) {
      mostrarError(nombreCampo, reglas.message);
      return false;
    }
  }

  limpiarError(nombreCampo);
  return true;
}

// Función para evaluar la fortaleza de la contraseña
function evaluarFortalezaContrasena(contrasena) {
  let puntuacion = 0;
  
  if (contrasena.length >= 8) puntuacion++;
  if (/[a-z]/.test(contrasena)) puntuacion++;
  if (/[A-Z]/.test(contrasena)) puntuacion++;
  if (/[0-9]/.test(contrasena)) puntuacion++;
  if (/[^A-Za-z0-9]/.test(contrasena)) puntuacion++;
  
  return puntuacion;
}

// Función para mostrar indicador de fortaleza de contraseña
function mostrarFortalezaContrasena(contrasena) {
  let strengthContainer = document.querySelector('.password-strength');
  
  if (!strengthContainer) {
    strengthContainer = document.createElement('div');
    strengthContainer.className = 'password-strength';
    strengthContainer.innerHTML = `
      <div class="strength-meter">
        <div class="strength-meter-fill"></div>
      </div>
      <div class="strength-text"></div>
    `;
    contrasenaInput.parentNode.appendChild(strengthContainer);
  }
  
  const fill = strengthContainer.querySelector('.strength-meter-fill');
  const text = strengthContainer.querySelector('.strength-text');
  
  if (contrasena.length === 0) {
    strengthContainer.classList.remove('show');
    return;
  }
  
  strengthContainer.classList.add('show');
  const puntuacion = evaluarFortalezaContrasena(contrasena);
  
  fill.className = 'strength-meter-fill';
  text.className = 'strength-text';
  
  if (puntuacion <= 2) {
    fill.classList.add('weak');
    text.classList.add('weak');
    text.textContent = 'Débil';
  } else if (puntuacion <= 3) {
    fill.classList.add('medium');
    text.classList.add('medium');
    text.textContent = 'Media';
  } else {
    fill.classList.add('strong');
    text.classList.add('strong');
    text.textContent = 'Fuerte';
  }
}

// Función para actualizar contador de caracteres
function actualizarContadorCaracteres() {
  const texto = biografiaTextarea.value;
  const longitud = texto.length;
  charCount.textContent = longitud;
  
  const container = charCount.parentElement;
  container.classList.remove('warning', 'danger');
  
  if (longitud > 250) {
    container.classList.add('danger');
  } else if (longitud > 200) {
    container.classList.add('warning');
  }
}

// Función para mostrar errores generales
function mostrarErrores(errores) {
  erroresContainer.innerHTML = '';
  
  if (errores.length === 0) {
    erroresContainer.classList.remove('show');
    return;
  }
  
  const titulo = document.createElement('h3');
  titulo.textContent = 'Por favor corrija los siguientes errores:';
  erroresContainer.appendChild(titulo);
  
  const lista = document.createElement('ul');
  errores.forEach(error => {
    const item = document.createElement('li');
    item.textContent = error;
    lista.appendChild(item);
  });
  
  erroresContainer.appendChild(lista);
  erroresContainer.classList.add('show');
  
  // Scroll hacia los errores
  erroresContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Función para mostrar mensaje de éxito
function mostrarExito(mensaje) {
  successContainer.innerHTML = `
    <h3>¡Registro exitoso!</h3>
    <p>${mensaje}</p>
  `;
  successContainer.style.display = 'block';
  successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Event listeners para validación en tiempo real
Object.keys(validaciones).forEach(campo => {
  const elemento = document.getElementById(campo);
  if (elemento) {
    // Validar al perder el foco
    elemento.addEventListener('blur', (e) => {
      validarCampo(campo, e.target.value);
    });
    
    // Validar mientras se escribe (para algunos campos)
    if (['nombre', 'email', 'telefono'].includes(campo)) {
      elemento.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
          validarCampo(campo, e.target.value);
        }
      });
    }
  }
});

// Event listener especial para la contraseña
contrasenaInput.addEventListener('input', (e) => {
  const contrasena = e.target.value;
  mostrarFortalezaContrasena(contrasena);
  
  if (contrasena.length > 0) {
    validarCampo('contrasena', contrasena);
  }
  
  // Revalidar confirmación si ya tiene valor
  const confirmacion = document.getElementById('confirmarContrasena').value;
  if (confirmacion.length > 0) {
    validarCampo('confirmarContrasena', confirmacion);
  }
});

// Event listener para contador de caracteres
biografiaTextarea.addEventListener('input', actualizarContadorCaracteres);

// Event listener para el envío del formulario
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  toggleLoading(true);
  erroresContainer.classList.remove('show');
  successContainer.style.display = 'none';
  
  // Obtener valores del formulario
  const formData = {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim(),
    contrasena: document.getElementById('contrasena').value,
    confirmarContrasena: document.getElementById('confirmarContrasena').value,
    edad: document.getElementById('edad').value,
    telefono: document.getElementById('telefono').value.trim(),
    biografia: document.getElementById('biografia').value.trim(),
    genero: document.getElementById('genero').value,
    pais: document.getElementById('pais').value
  };
  
  // Validar todos los campos
  let esValido = true;
  formErrors = {};
  
  Object.keys(validaciones).forEach(campo => {
    if (!validarCampo(campo, formData[campo])) {
      esValido = false;
    }
  });
  
  // Validar términos y condiciones
  if (!validarCampo('terminos', document.getElementById('terminos').checked)) {
    esValido = false;
  }
  
  if (!esValido) {
    toggleLoading(false);
    const errores = Object.values(formErrors);
    mostrarErrores(errores);
    return;
  }
  
  try {
    // Enviar datos al servidor
    const response = await fetch('http://localhost:3000/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // Éxito
      mostrarExito(result.mensaje);
      form.reset();
      actualizarContadorCaracteres();
      document.querySelector('.password-strength')?.classList.remove('show');
      
      // Limpiar todos los estados de validación
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('valid', 'invalid');
      });
      
      // Opcional: redirigir después de unos segundos
      setTimeout(() => {
        // window.location.href = '/success.html';
      }, 3000);
      
    } else {
      // Error del servidor
      if (result.errores && Array.isArray(result.errores)) {
        // Errores de validación del servidor
        const erroresServidor = result.errores.map(error => error.msg || error.message || error);
        mostrarErrores(erroresServidor);
      } else {
        // Error simple
        mostrarErrores([result.error || 'Error al procesar el registro']);
      }
    }
    
  } catch (error) {
    console.error('Error de conexión:', error);
    mostrarErrores(['Error de conexión. Verifique que el servidor esté funcionando.']);
  }
  
  toggleLoading(false);
});

// Inicializar contador de caracteres
actualizarContadorCaracteres();

// Prevenir envío del formulario con Enter en campos que no son textarea
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Mover al siguiente campo
      const campos = Array.from(form.querySelectorAll('input, select, textarea'));
      const indiceActual = campos.indexOf(e.target);
      const siguienteCampo = campos[indiceActual + 1];
      
      if (siguienteCampo) {
        siguienteCampo.focus();
      }
    }
  });
});

// Validación adicional para teléfono (solo números)
document.getElementById('telefono').addEventListener('input', (e) => {
  // Permitir solo números
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  
  // Limitar a 10 dígitos
  if (e.target.value.length > 10) {
    e.target.value = e.target.value.slice(0, 10);
  }
});

// Validación adicional para edad (solo números)
document.getElementById('edad').addEventListener('input', (e) => {
  // Permitir solo números
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  
  // Limitar a números razonables
  const valor = parseInt(e.target.value);
  if (valor > 120) {
    e.target.value = '120';
  }
});

console.log('Formulario de registro inicializado correctamente');
