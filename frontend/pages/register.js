import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../pages/styles/register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    contrasenia: '',
    confirmarContrasenia: '',
    edad: '',
    dni: '',
    telefono: '',
    codigoVerificacion: '',
    idRol: 1,
    valoracion: 4.5,
    horarioDiponibleInicio: '09:00:00',
    horarioDisponibleFin: '18:00:00',
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // Estado para manejar los pasos del formulario
  const [message, setMessage] = useState(''); // Agregamos el estado message
  const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar contraseñas
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para mostrar/ocultar confirmación
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del pop-up
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Estado para mostrar si se redirigirá al login
  const router = useRouter(); // Para manejar redirecciones

  // Función para validar los campos del primer paso
  const validateFirstStep = () => {
    let errors = {};

    // Validar que los nombres y apellidos no estén vacíos
    if (!formData.primerNombre.trim()) errors.primerNombre = 'El primer nombre es obligatorio';
    if (!formData.primerApellido.trim()) errors.primerApellido = 'El primer apellido es obligatorio';

    // Validar el correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) errors.correo = 'El correo electrónico no es válido';

    // Validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-]).{8,}$/;
    if (!passwordRegex.test(formData.contrasenia)) {
      errors.contrasenia = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un símbolo especial';
    }
  };

  // Enviar el formulario completo
  async function handleSubmit(e) {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.contrasenia !== formData.confirmarContrasenia) {
      errors.confirmarContrasenia = 'Las contraseñas no coinciden';
    }

    setErrors(errors);

    // Si no hay errores, retorna true, si hay errores, retorna false
    return Object.keys(errors).length === 0;
  }

  const handleNextStep = (e) => {
    e.preventDefault();

    // Validar todos los campos del primer paso
    const isValid = validateFirstStep();

    if (isValid) {
      // Si la validación es correcta, avanzar al segundo paso
      setStep(2);
    } else {
      // Si hay errores, mostrar todos los errores en el popup
      setShowPopup(true);
    }
  };

  // Función para manejar el envío del formulario completo (segundo paso)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = {
      ...formData,
      idRol: Number(formData.idRol),
      edad: Number(formData.edad),
    };

    try {
      const response = await axios.post('http://localhost:3000/auth/sign-up', dataToSend);
      setMessage('Registro exitoso. Ahora ingrese el código de verificación.');
      setShowPopup(true);
      setStep(4); // Ir al paso de validación del código
    } catch (error) {
      setMessage('Error en el registro. Inténtalo de nuevo.');
      setShowPopup(true);
      setRedirectToLogin(false);
    }
  };

  // Validar código de verificación
  const handleValidateCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/sign-up/verify', {
        code: formData.codigoVerificacion,
      });

      if (response.status === 200) {
        setMessage('Código validado correctamente. Redirigiendo al login...');
        setShowPopup(true);

        // Redirige al login después de la validación exitosa
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setMessage('Código incorrecto. Inténtalo de nuevo.');
        setShowPopup(true);
      }
    } catch (error) {
      setMessage('Error al validar el código.');
      setShowPopup(true);
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Barra de navegación */}
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.logo}>SharkCat - Demo</div>
          <div className={styles.navLinks}>
            <a href="/">Categorías</a>
            <a href="/tutorials">Encuentra asistencia o tutorías</a>
            <a href="/login">Iniciar Sesión</a>
            <a href="/register" className={styles.registerButton}>Registrarse</a>
          </div>
        </div>
      </nav>

      {/* Contenido del formulario */}
      <div className={styles.container}>
        {step === 1 ? (
          <div className={styles.registerBox}>
            <h1 className={styles.sharkCatTitle}>SharkCat</h1>
            <a href="/" className={styles.homeButton}>
              <img src="/images/home-icon.png" alt="Home" className={styles.homeIcon} />
            </a>
            <img src="/images/Register.png" alt="SharkCat Logo" className={styles.logoImage} />
            <h1 className={styles.title}>Registro de Usuario</h1>
            <form onSubmit={handleNextStep} className={styles.form}>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Primer Nombre"
                  value={formData.primerNombre}
                  onChange={(e) => setFormData({ ...formData, primerNombre: e.target.value })}
                  required
                  className={styles.input}
                />
                {errors.primerNombre && <span className={styles.error}>{errors.primerNombre}</span>}
                <input
                  type="text"
                  placeholder="Segundo Nombre"
                  value={formData.segundoNombre}
                  onChange={(e) => setFormData({ ...formData, segundoNombre: e.target.value })}
                  className={styles.input}
                />
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Primer Apellido"
                  value={formData.primerApellido}
                  onChange={(e) => setFormData({ ...formData, primerApellido: e.target.value })}
                  required
                  className={styles.input}
                />
                {errors.primerApellido && <span className={styles.error}>{errors.primerApellido}</span>}
                <input
                  type="text"
                  placeholder="Segundo Apellido"
                  value={formData.segundoApellido}
                  onChange={(e) => setFormData({ ...formData, segundoApellido: e.target.value })}
                  className={styles.input}
                />
              </div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
                className={styles.input}
              />
              {errors.correo && <span className={styles.error}>{errors.correo}</span>}

              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={formData.contrasenia}
                  onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
                  required
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.showPasswordButton}
                >
                  <img
                    src={showPassword ? "/images/eye-close.png" : "/images/eye-open.png"}
                    alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className={styles.eyeIcon}
                  />
                </button>
              </div>
              {errors.contrasenia && <span className={styles.error}>{errors.contrasenia}</span>}

              <div className={styles.passwordContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Verificar Contraseña"
                  value={formData.confirmarContrasenia}
                  onChange={(e) => setFormData({ ...formData, confirmarContrasenia: e.target.value })}
                  required
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.showPasswordButton}
                >
                  <img
                    src={showConfirmPassword ? "/images/eye-close.png" : "/images/eye-open.png"}
                    alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className={styles.eyeIcon}
                  />
                </button>
              </div>
              {errors.confirmarContrasenia && <span className={styles.error}>{errors.confirmarContrasenia}</span>}

              <button type="submit" className={styles.button}>Continuar Registro</button>
            </form>

            {/* Popup modal para mostrar errores de validación */}
            {showPopup && (
              <div className={styles.popupOverlay}>
                <div className={styles.popup}>
                  <h2>Error de Validación</h2>
                  <p>{message}</p> {/* Mostrar el mensaje de error */}
                  <button onClick={closePopup} className={styles.closeButton}>Cerrar</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.registerBox}>
            <h1 className={styles.sharkCatTitle}>SharkCat</h1>
            <a href="/" className={styles.homeButton}>
              <img src="/images/home-icon.png" alt="Home" className={styles.homeIcon} />
            </a>
            <img src="/images/Register.png" alt="SharkCat Logo" className={styles.logoImage} />
            <h1 className={styles.title}>Registro de Usuario</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="number"
                placeholder="Edad"
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                required
                className={styles.input}
              />
            <input
              type="text"
              placeholder="DNI"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              className={styles.input}
            />
            <input
              type="tel"
              placeholder="Número de Teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className={styles.input}
            />

            <label className={styles.label}>¿Eres Pupilo o Tutor?</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="rol"
                  value="pupilo"
                  checked={formData.idRol === 1}
                  onChange={() => setFormData({ ...formData, idRol: 1 })}
                />
                Soy Pupilo
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="rol"
                  value="tutor"
                  checked={formData.idRol === 2}
                  onChange={() => setFormData({ ...formData, idRol: 2 })}
                />
                Soy Tutor
              </label>
            </div>

            <button type="submit" className={styles.button}>Registrar</button>
          </form>
        </div>
        )}
      {/* Footer */}
      <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div>
              <h3>Recursos Académicos</h3>
              <p>Guías de Estudio</p>
              <p>Calendario Académico</p>
              <p>Ayuda para Estudiantes</p>
            </div>
            <div>
              <h3>Programas Académicos</h3>
              <p>Carreras Universitarias</p>
              <p>Programas de Posgrado</p>
              <p>Cursos en Línea</p>
            </div>
            <div>
              <h3>Servicios Administrativos</h3>
              <p>Inscripción de Cursos</p>
              <p>Consultar Calificaciones</p>
              <p>Solicitudes de Becas</p>
            </div>
            <div className={styles.subscribeSection}>
              <h3>¿Preguntas sobre nuestros servicios?</h3>
              <input type="email" placeholder="Ingresa tu Email" className={styles.input} />
              <button className={styles.subscribeButton}>Suscribete</button>
            </div>
          </div>
          <p className={styles.footerBottom}>© 2024 SharkCat. Derechos Reservados. <a href="/privacy">Políticas de Privacidad</a> | <a href="/terms">Términos & Servicios</a></p>
        </footer>
      </div>
    </div>
  );
}
