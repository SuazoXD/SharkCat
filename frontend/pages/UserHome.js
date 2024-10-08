import { useState, useEffect } from 'react';
import NavBar from '../pages/NavBar.js';
import styles from '../pages/styles/userhome.module.css';

export default function UserHome() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Aquí debes obtener el ID del usuario que inició sesión
    const storedUserId = localStorage.getItem('userId'); // Suponiendo que el ID se guarda en localStorage
    setUserId(storedUserId);
  }, []);

  return (
    <div className={styles.container}>
      <NavBar userId={userId} />
      <div className={styles.content}>
        <h1 className={styles.title}>Bienvenido a SharkCat, tu ID es: {userId}</h1>
      </div>
    </div>
  );
}
