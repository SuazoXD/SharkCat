import { useState } from 'react';
import styles from '../pages/styles/recovery.module.css';

const RecoveryPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [formSent, setFormSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar el error de longitud

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/auth/req-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email }),
      });

      if (response.ok) {
        setMessage('Solicitud de recuperación enviada con éxito.');
        setFormSent(true);
      } else {
        setMessage('Error al enviar la solicitud.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de red o servidor.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setErrorMessage('Caracteres insuficientes (mínimo 8)');
      return; // No continúa con la solicitud si hay error
    }

    setErrorMessage(''); // Limpiar el error si todo está bien

    try {
      const response = await fetch('http://localhost:3000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        setMessage('Éxito, redirigiendo a login...');
        setTimeout(() => {
          window.location.href = 'http://localhost:3001/login';
        }, 2000);
      } else {
        setMessage('Error al cambiar la contraseña.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de red o servidor.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.passwordBox}>
        <h1 className={styles.sharkCatTitle}>SharkCat</h1>
        <a href="/" className={styles.homeButton}>
          <img src="/images/home-icon.png" alt="Home" className={styles.homeIcon} />
        </a>
        <img src="/images/Contraseina.png" alt="SharkCat Logo" className={styles.logoImage} />
        <h1 className={styles.title}>Cambiar Contraseña</h1>

        {!formSent ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={styles.labelPink}>Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Enviar</button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className={styles.form}>
            <label className={styles.labelPink}>Correo al que se envió el código:</label>
            <input
              type="email"
              value={email}
              disabled
              className={styles.input}
            />

            <label htmlFor="code" className={styles.labelPink}>Ingrese el código enviado:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className={styles.input}
            />

            <label htmlFor="newPassword" className={styles.labelPink}>Ingrese nueva contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={styles.input}
            />
            
            {/* Mensaje de error si la longitud es menor a 8 caracteres */}
            {errorMessage && <p className={styles.errorMessage} className={styles.labelPink}>{errorMessage}</p>}
            
            <button type="submit" className={styles.button}>Cambiar Contraseña</button>
          </form>
        )}

        {message && <p className={styles.labelPink}>{message}</p>}
      </div>
    </div>
  );
};

export default RecoveryPassword;
