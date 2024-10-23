import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Para manejar redirecciones
import styles from '../pages/styles/userhome.module.css';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null); // Estado para almacenar los detalles del usuario
  const [message, setMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar u ocultar el menú de perfil
  const [offerMessage, setOfferMessage] = useState(''); // Estado para el mensaje de la oferta
  const [idPregunta, setIdPregunta] = useState(''); // Estado para el ID de la pregunta
  const [responseMessage, setResponseMessage] = useState(''); // Estado para almacenar el mensaje de respuesta de la oferta
  const router = useRouter(); // Para manejar redirecciones

  useEffect(() => {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('access_token');

    // Si no hay token, redirigir al usuario a la página de login
    if (!token) {
      setMessage('No estás autenticado. Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
      return;
    }

    // Hacer la solicitud al backend para obtener el perfil del usuario
    axios
      .get('http://localhost:3000/user/profile/', {
        headers: {
          Authorization: `Bearer ${token}` // Enviar el token en los headers
        }
      })
      .then((response) => {
        setUserDetails(response.data); // Guardar los detalles del perfil en el estado
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del perfil:', error);
        setMessage('Error al obtener los detalles del perfil.');
      });
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Mostrar u ocultar el menú de perfil
  };

  const sendOffer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token'); // Obtener el token de localStorage

    if (!token) {
      setResponseMessage('No estás autenticado.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/user/pregunta/send-offer',
        {
          idPregunta: idPregunta, // ID de la pregunta que se quiere resolver
          descripcion: offerMessage // Mensaje de la oferta
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Enviar el token en los headers
          }
        }
      );

      if (response.status === 200) {
        setResponseMessage('¡Oferta enviada con éxito!');
      } else {
        setResponseMessage('Error al enviar la oferta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la oferta:', error);
      setResponseMessage('Error al enviar la oferta. Inténtalo de nuevo.');
    }
  };

  const goToPupilPage = () => {
    router.push('/pupilQuestion'); // Redirigir a la página del pupilo
  };

  const goToTutorPage = () => {
    router.push('/tutorQuestions'); // Redirigir a la página del tutor
  };

  // **Nueva función** para redirigir a la página de agregar materia
  const goToAggMateriaPage = () => {
    router.push('/aggMateria'); // Redirigir a la página para agregar materia
  };

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div className={styles.container}>
      {/* Barra de navegación */}
      <nav className={styles.navbar}>
        <div className={styles.logoSection}>
          <img src="/images/logo.png" alt="Logo SharkCat" className={styles.logo} />
          <span className={styles.username}>
            {userDetails
              ? `${userDetails.nombre.primerNombre} ${userDetails.nombre.segundoNombre} ${userDetails.nombre.primerApellido} ${userDetails.nombre.segundoApellido}`
              : 'Cargando...'}
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

      {/* Botones para cambiar entre páginas de Pupilo y Tutor */}
      <div className={styles.switchRoleButtons}>
        <button onClick={goToPupilPage} className={styles.button}>Página de Pupilo</button>
        <button onClick={goToTutorPage} className={styles.button}>Página de Tutor</button>

        {/* Botón para agregar materia de interés */}
        <button onClick={goToAggMateriaPage} className={styles.button}>Agregar Materia de Interés</button>
      </div>

      {/* Contenido del perfil */}
      <div className={styles.profileContainer}>
        {userDetails ? (
          <div className={styles.profileDetails}>
            <h1>Perfil de Usuario</h1>
            <p><strong>Nombre:</strong> {userDetails.nombre.primerNombre} {userDetails.nombre.segundoNombre} {userDetails.nombre.primerApellido} {userDetails.nombre.segundoApellido}</p>
            <p><strong>Edad:</strong> {userDetails.edad}</p>
            <p><strong>Correo:</strong> {userDetails.correo}</p>
            <p><strong>DNI:</strong> {userDetails.dni}</p>
            <p><strong>Teléfono:</strong> {userDetails.telefono}</p>
            <p><strong>Horario Disponible:</strong> {new Date(userDetails.horarioDisponibleInicio).toLocaleTimeString()} - {new Date(userDetails.horarioDisponibleFin).toLocaleTimeString()}</p>
            <p><strong>Rol:</strong> {userDetails.rol.rol}</p>
            <p><strong>Valoración:</strong> {userDetails.valoracion}</p>
          </div>
        ) : (
          <p>Cargando detalles del perfil...</p>
        )}
      </div>

      {/* Mostrar solo si el usuario es tutor */}
      {userDetails && userDetails.rol.rol === 'tutor' && (
        <div className={styles.offerContainer}>
          <h2>Enviar oferta de resolución</h2>
          <form onSubmit={sendOffer} className={styles.form}>
            <input
              type="number"
              placeholder="ID de la pregunta"
              value={idPregunta}
              onChange={(e) => setIdPregunta(e.target.value)}
              required
              className={styles.input}
            />
            <textarea
              placeholder="Escribe tu mensaje de oferta..."
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
              required
              className={styles.textarea}
            />
            <button type="submit" className={styles.button}>Enviar Oferta</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>} {/* Mostrar el mensaje de respuesta */}
        </div>
      )}
    </div>
  );
}
