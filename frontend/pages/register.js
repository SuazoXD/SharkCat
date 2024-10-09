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
    idRol: 1,
    valoracion: 4.5,  // Valor fijo por ahora
    horarioDiponibleInicio: '09:00:00',
    horarioDisponibleFin: '18:00:00',
  });
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

  const closePopup = () => {
    setShowPopup(false);
    if (redirectToLogin) {
      router.push('/login'); // Redirigir si el registro fue exitoso
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h1 className={styles.sharkCatTitle}>SharkCat</h1>
        <a href="/" className={styles.homeButton}>
          <img src="/images/home-icon.png" alt="Home" className={styles.homeIcon} />
        </a>
        <img src="/images/Register.png" alt="SharkCat Logo" className={styles.logoImage} />
        <h1 className={styles.title}>Registro de Usuario</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <input
            type="email"
            placeholder="Correo"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            required
            className={styles.input}
          />

          {/* Campo de contraseña con botón para mostrar/ocultar */}
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

          {/* Campo de confirmar contraseña con botón para mostrar/ocultar */}
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar Contraseña"
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
          <label className={styles.label}>¿Cómo quieres registrarte?:</label>
          <select
            value={formData.idRol}
            onChange={(e) => setFormData({ ...formData, idRol: Number(e.target.value) })}
            className={styles.select}
          >
            <option value={1}>Pupilo</option>
            <option value={2}>Tutor</option>
          </select>

          {/* Campos de valor fijo */}
          <input
            type="hidden"
            value={formData.valoracion}
            readOnly
          />
          <input
            type="hidden"
            value={formData.horarioDiponibleInicio}
            readOnly
          />
          <input
            type="hidden"
            value={formData.horarioDisponibleFin}
            readOnly
          />

          <button type="submit" className={styles.button}>Registrar</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>

      {/* Ventana emergente (pop-up) */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>{message}</p>
            {redirectToLogin && <p>Serás redirigido al login...</p>}
            <button onClick={closePopup} className={styles.closeButton}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
