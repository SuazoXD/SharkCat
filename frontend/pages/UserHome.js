import { useState, useEffect } from 'react';
import styles from '../pages/styles/userhome.module.css';

export default function UserHome() {
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState({}); // Estado para almacenar los datos del usuario
  const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar u ocultar el menú de perfil
  const [coursesVisible, setCoursesVisible] = useState(false); // Estado para mostrar u ocultar el menú de cursos

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    if (storedUserId) {
      fetch(`http://localhost:3000/home/${storedUserId}`)
        .then(response => response.json())
        .then(data => {
          // Guardar los datos del usuario (primernombre, segundonombre, primerapellido, segundoapellido)
          setUserDetails({
            primernombre: data.primernombre,
            segundonombre: data.segundonombre,
            primerapellido: data.primerapellido,
            segundoapellido: data.segundoapellido,
          });
        })
        .catch(error => console.error('Error al obtener los detalles del usuario:', error));
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Mostrar u ocultar el menú de perfil
  };

  const toggleCourses = () => {
    setCoursesVisible(!coursesVisible); // Mostrar u ocultar el menú de cursos
  };

  return (
    <div className={styles.container}>
      {/* Barra de navegación */}
      <nav className={styles.navbar}>
        <div className={styles.logoSection} onClick={toggleCourses}>
          <img src="/images/logo.png" alt="Logo SharkCat" className={styles.logo} />
          {/* Mostrar el nombre completo del usuario */}
          <span className={styles.username}>
            {`${userDetails.primernombre} ${userDetails.segundonombre} ${userDetails.primerapellido} ${userDetails.segundoapellido}`} (ID: {userId})
          </span>
        </div>
        <div className={styles.profileSection}>
          <img 
            src="/images/images.jpg" // Imagen temporal del perfil 
            alt="Perfil" 
            className={styles.profileIcon} 
            onClick={toggleMenu} 
          />
        </div>
      </nav>

      {/* Menú de perfil desplegable */}
      {menuVisible && (
        <div className={styles.dropdownMenu}>
          <a href="/change-password" className={styles.dropdownItem}>Cambiar contraseña</a>
        </div>
      )}

      {/* Menú de cursos desplegable */}
      {coursesVisible && (
        <div className={styles.coursesDropdown}>
          <a href="/courses" className={styles.dropdownItem}>Cursos disponibles</a>
        </div>
      )}

      {/* Contenido principal con mensaje de bienvenida y post */}
      <div className={styles.content}>
        <div className={styles.welcomePost}>
          <h1 className={styles.title}>¡Bienvenido a la comunidad SharkCat!</h1>
          <p className={styles.subtitle}>Estamos emocionados de que seas parte de nuestra familia. Comparte, aprende y crece con nosotros.</p>
          
          {/* Publicación de bienvenida */}
          <div className={styles.postContainer}>
            <div className={styles.postHeader}>
              <img src="/images/logo.png" alt="Logo SharkCat" className={styles.postLogo} />
              <span className={styles.postUsername}>SharkCat</span>
            </div>
            <p className={styles.postText}>¡Nos encanta verte aquí! Recuerda revisar nuestros cursos disponibles y disfrutar aprendiendo con nosotros.</p>
          </div>

          {/* Contenedor para que el usuario pueda hacer publicaciones */}
          <div className={styles.createPostContainer}>
            <textarea 
              className={styles.textArea} 
              placeholder="Comparte algo con la comunidad..." 
            />
            <button className={styles.postButton}>Publicar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
