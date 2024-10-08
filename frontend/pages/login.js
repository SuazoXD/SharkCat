import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Importa useRouter para manejar redirecciones
import styles from '../pages/styles/login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [savePassword, setSavePassword] = useState(false); // Estado para guardar la contraseña
  const [message, setMessage] = useState('');
  const router = useRouter(); // Inicializa useRouter para redirecciones

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/log-in', {
        correo: email,
        password: password
      });

      // Guarda el ID del usuario en localStorage para usarlo en otras páginas
      localStorage.setItem('userId', response.data.idUsuario);

      // Redirige a la página de UserHome
      router.push('/UserHome');
    } catch (error) {
      setMessage('Error de inicio de sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.sharkCatTitle}>SharkCat</h1>
        <a href="/" className={styles.homeButton}>
          <img src="/images/home-icon.png" alt="Home" className={styles.homeIcon} />
        </a>

        {/* Cambia la imagen del logo cuando se ingresa una contraseña */}
        <img 
          src={password.length > 0 ? "/images/new-logo.png" : "/images/sharkcat1.png"} 
          alt="Login Image" 
          className={password.length > 0 ? styles.smallLogo : styles.loginImage} 
        />

        <h1 className={styles.title}>Inicio de Sesión</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="email" 
            placeholder="Correo" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className={styles.input}
          />

          {/* Campo de contraseña con botón para mostrar/ocultar */}
          <div className={styles.passwordContainer}>
            <input 
              type={showPassword ? "text" : "password"} // Muestra la contraseña si showPassword es true
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
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

          {/* Checkbox para guardar contraseña */}
          <div className={styles.checkboxContainer}>
            <input 
              type="checkbox" 
              id="savePassword" 
              checked={savePassword}
              onChange={(e) => setSavePassword(e.target.checked)} 
              className={styles.checkbox}
            />
            <label htmlFor="savePassword" className={styles.checkboxLabel}>
              Guardar contraseña
            </label>
          </div>

          <button type="submit" className={styles.button}>Iniciar Sesión</button>

          {/* Enlace para recuperar contraseña */}
          <a href="http://localhost:3001/change-password" className={styles.forgotPasswordLink}>
            Recuperar contraseña
          </a>

          {/* Enlace para registrarse si no tiene cuenta */}
          <div className={styles.registerContainer}>
            <p>¿No tienes cuenta? <a href="http://localhost:3001/register" className={styles.registerLink}>Regístrate</a></p>
          </div>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
