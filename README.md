# Formulario de Registro Avanzado

Este proyecto implementa un sistema completo de registro de usuarios con validaciones tanto del lado del cliente como del servidor, desarrollado como parte de la **Tarea 3** para demostrar técnicas avanzadas de validación de formularios.

## 🚀 Características

### ✨ Frontend
- **Formulario HTML5** con 8+ campos de diferentes tipos
- **Validaciones HTML5** nativas (required, pattern, minlength, etc.)
- **Validaciones JavaScript** avanzadas en tiempo real
- **Diseño responsive** y moderno con CSS Grid/Flexbox
- **Indicador de fortaleza de contraseña**
- **Contador de caracteres** para campos de texto largo
- **Mensajes de error** contextuales y amigables
- **Loading states** y feedback visual

### 🔧 Backend
- **Servidor Express.js** con arquitectura modular
- **Base de datos MongoDB** con Mongoose
- **Validaciones robustas** con express-validator
- **Manejo de errores** comprehensivo
- **Prevención de duplicados** (email, teléfono)
- **API RESTful** con respuestas JSON estructuradas

### 📋 Campos del Formulario
1. **Nombre Completo** - Texto (3-50 caracteres, solo letras)
2. **Email** - Email con validación de formato
3. **Contraseña** - Mínimo 8 caracteres, mayúscula, minúscula y número
4. **Confirmar Contraseña** - Debe coincidir con la contraseña
5. **Edad** - Número entre 18 y 99 años
6. **Teléfono** - 10 dígitos exactos
7. **Biografía** - Texto opcional hasta 300 caracteres
8. **Género** - Select con opciones predefinidas
9. **País** - Select con países de Latinoamérica y más
10. **Términos y Condiciones** - Checkbox requerido

## 🛠️ Tecnologías Utilizadas

### Frontend
- HTML5 con validaciones nativas
- CSS3 con Grid, Flexbox y animaciones
- JavaScript ES6+ (Vanilla)
- Fetch API para comunicación con el servidor

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- express-validator para validaciones
- CORS para cross-origin requests
- body-parser para parsing de JSON

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd Tarea3_Hernandez_Stefanny
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar MongoDB

#### Opción A: MongoDB Local
1. Instalar MongoDB Community Edition
2. Iniciar el servicio MongoDB
3. La aplicación se conectará automáticamente a `mongodb://localhost:27017/registro_usuarios`

#### Opción B: MongoDB Atlas (Nube)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un cluster gratuito
3. Obtener la cadena de conexión
4. Modificar la línea 13 en `/backend/index.js`:
```javascript
mongoose.connect('TU_CADENA_DE_CONEXION_ATLAS', {
```

### 4. Ejecutar la aplicación

#### Desarrollo
```bash
npm run dev
```

#### Producción
```bash
npm start
```

### 5. Acceder a la aplicación
Abrir navegador en: `http://localhost:3000`

## 📁 Estructura del Proyecto

```
Tarea3_Hernandez_Stefanny/
├── backend/
│   ├── index.js              # Servidor principal
│   ├── models/
│   │   └── Usuario.js        # Modelo de datos de usuario
│   └── routes/
│       └── registro.js       # Rutas de registro con validaciones
├── frontend/
│   ├── index.html           # Formulario principal
│   ├── styles.css          # Estilos CSS modernos
│   └── formulario.js       # Validaciones JavaScript
├── package.json            # Dependencias y scripts
└── README.md              # Este archivo
```

## 🔍 Validaciones Implementadas

### Cliente (Frontend)
- ✅ **HTML5**: required, minlength, maxlength, pattern, min, max
- ✅ **JavaScript**: Validación en tiempo real
- ✅ **Formato de email**: Expresión regular robusta
- ✅ **Fortaleza de contraseña**: Indicador visual
- ✅ **Coincidencia de contraseñas**: Validación cruzada
- ✅ **Rangos numéricos**: Edad y límites
- ✅ **Longitud de texto**: Contador de caracteres
- ✅ **Campos requeridos**: Validación de presencia

### Servidor (Backend)
- ✅ **express-validator**: Validaciones robustas
- ✅ **Sanitización**: Normalización de datos
- ✅ **Unicidad**: Email y teléfono únicos
- ✅ **Seguridad**: Re-validación server-side
- ✅ **Manejo de errores**: Respuestas estructuradas
- ✅ **Validación de esquema**: Mongoose validators

## 🧪 Pruebas de Funcionalidad

### Casos de Prueba Positivos
1. Completar formulario con datos válidos
2. Verificar registro exitoso en base de datos
3. Comprobar mensajes de confirmación

### Casos de Prueba Negativos
1. Envío con campos vacíos
2. Email con formato inválido
3. Contraseña débil
4. Contraseñas que no coinciden
5. Edad fuera de rango
6. Teléfono con formato incorrecto
7. Email o teléfono duplicado
8. Biografía excesivamente larga

## 🔒 Seguridad

- **Validación doble**: Cliente y servidor
- **Sanitización**: Limpieza de datos de entrada
- **Prevención XSS**: Escape de caracteres especiales
- **Validación de esquema**: Mongoose validators
- **Manejo seguro de errores**: Sin exposición de información sensible

## 🎨 Características de UI/UX

- **Diseño responsivo**: Adaptable a móviles y desktop
- **Validación en tiempo real**: Feedback inmediato
- **Indicadores visuales**: Estados de validación claros
- **Animaciones suaves**: Transiciones CSS
- **Accesibilidad**: Labels apropiados y navegación por teclado
- **Loading states**: Indicadores de carga
- **Mensajes contextuales**: Errores específicos por campo

## 🚨 Solución de Problemas

### MongoDB no se conecta
```bash
# Verificar que MongoDB esté ejecutándose
sudo systemctl status mongod

# Iniciar MongoDB si está detenido
sudo systemctl start mongod
```

### Error de puerto en uso
```bash
# Verificar qué proceso usa el puerto 3000
lsof -i :3000

# Cambiar puerto en backend/index.js línea 26
const PORT = 3001; // Cambiar puerto
```

### Errores de dependencias
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## 📚 API Endpoints

### POST /api/registro
Registra un nuevo usuario

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "contrasena": "MiPassword123",
  "confirmarContrasena": "MiPassword123",
  "edad": 25,
  "telefono": "1234567890",
  "biografia": "Desarrollador web",
  "genero": "Masculino",
  "pais": "México"
}
```

**Response Success (201):**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "usuario": {
    "id": "...",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "edad": 25,
    "genero": "Masculino",
    "pais": "México",
    "fechaRegistro": "2025-01-09T..."
  }
}
```

**Response Error (400):**
```json
{
  "error": "Datos inválidos",
  "errores": [
    {
      "field": "email",
      "message": "Debe ser un email válido"
    }
  ]
}
```

## 👥 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama feature: `git checkout -b nueva-caracteristica`
3. Commit cambios: `git commit -am 'Agregar nueva característica'`
4. Push a la rama: `git push origin nueva-caracteristica`
5. Crear Pull Request

## 📄 Licencia

Este proyecto es parte de una tarea académica y está disponible bajo licencia ISC.

## 👨‍💻 Autor

**Stefanny Hernández**
- Proyecto: Tarea 3 - Formulario de Registro Avanzado
- Fecha: Enero 2025

---

## 📝 Notas de Desarrollo

### Características Implementadas según Requerimientos

#### ✅ Parte 1: Preparación del Entorno
- [x] Proyecto web con backend Node.js/Express
- [x] Frontend HTML/CSS/JavaScript
- [x] Conexión a base de datos MongoDB
- [x] Formulario con 7+ campos de diferentes tipos
- [x] Atributos name e id apropiados

#### ✅ Parte 2: Validación Frontend
- [x] Validaciones HTML5 (required, minlength, pattern, etc.)
- [x] Validaciones JavaScript avanzadas
- [x] Campos obligatorios validados
- [x] Formato de email validado
- [x] Contraseña con requisitos específicos
- [x] Confirmación de contraseña
- [x] Campos numéricos con rangos
- [x] Límites de caracteres
- [x] Mensajes de error amigables
- [x] Prevención de envío con errores

#### ✅ Parte 3: Validación Backend y Persistencia
- [x] Ruta POST para formulario
- [x] Validación server-side con express-validator
- [x] Re-validación de todos los datos
- [x] Verificación de duplicados en BD
- [x] Persistencia en MongoDB
- [x] Manejo de errores de BD
- [x] Respuestas apropiadas al usuario
- [x] Mensajes de éxito y error claros

Este proyecto demuestra una implementación completa y profesional de validaciones de formularios, siguiendo las mejores prácticas de desarrollo web moderno.
