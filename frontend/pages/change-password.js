import { useState } from 'react';
import axios from 'axios';
import styles from '../pages/styles/change-password.module.css';

export default function ChangePassword() {
  const [userId, setUserId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3000/auth/pass-update/${userId}`, {
        oldPassword,
        newPassword
      });
      setMessage('Contraseña actualizada con éxito.');
    } catch (error) {
      setMessage('Error al actualizar la contraseña.');
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="text" 
            placeholder="ID de Usuario" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            required 
            className={styles.input}
          />
          <input 
            type="password" 
            placeholder="Contraseña Antigua" 
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
            required 
            className={styles.input}
          />
          <input 
            type="password" 
            placeholder="Nueva Contraseña" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Actualizar Contraseña</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
