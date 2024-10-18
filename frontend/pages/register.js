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
    confirmarContrasenia: '', // Campo de confirmación de contraseña
    edad: '',
    dni: '',
    telefono: '',
    codigoVerificacion: '',
    idRol: 1,
    valoracion: 4.5,  // Valor fijo por ahora
    horarioDiponibleInicio: '09:00:00',
    horarioDisponibleFin: '18:00:00',
  });
  
  const [step, setStep] = useState(1); // Estado para manejar los pasos del formulario
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar contraseñas
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para mostrar/ocultar confirmación
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar la visibilidad del pop-up
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Estado para mostrar si se redirigirá al login
  const router = useRouter(); // Para manejar redirecciones

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que las contraseñas coinciden
    if (formData.contrasenia !== formData.confirmarContrasenia) {
      setMessage('Las contraseñas no coinciden.');
      setShowPopup(true);
      return;
    }

    const dataToSend = {
      ...formData,
      idRol: Number(formData.idRol),
      edad: Number(formData.edad),  // Convertir edad a número
    };

    try {
      // Petición POST al backend con los datos completos
      const response = await axios.post('http://localhost:3000/auth/sign-up', dataToSend);
      setMessage('Registro exitoso. Serás redirigido al login.');
      setShowPopup(true);
      setRedirectToLogin(true); // Cambiamos el estado para redirigir

      // Redirige al login después de 5 segundos
      setTimeout(() => {
        router.push('/login');
      }, 5000); // 5 segundos
    } catch (error) {
      setMessage('Error en el registro. Inténtalo de nuevo.');
      setShowPopup(true);
      setRedirectToLogin(false); // No redirigir en caso de error
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const closePopup = () => {
    setShowPopup(false);
    if (redirectToLogin) {
      router.push('/login'); // Redirigir si el registro fue exitoso
    }
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
              <button type="submit" className={styles.button}>Continuar Registro</button>
            </form>
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
              {/*
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Código de Verificación"
                  value={formData.codigoVerificacion}
                  onChange={(e) => setFormData({ ...formData, codigoVerificacion: e.target.value })}
                  className={`${styles.input} ${styles.smallInput}`}
                />
                <button className={`${styles.button} ${styles.verifyButton}`}>Verificar Código</button>
              </div>*/}

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
                {/*
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="rol"
                    value="ambos"
                    checked={formData.idRol === 3}
                    onChange={() => setFormData({ ...formData, idRol: 3 })}
                  />
                  Quiero ser Pupilo y Tutor
                </label>*/}
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
