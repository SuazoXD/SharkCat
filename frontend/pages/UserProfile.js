// pages/UserProfile.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar'; // Asegúrate de tener el componente Navbar
import Footer from './footerSC'; // Asegúrate de tener el componente Footer
import styles from './styles/userprofile.module.css'; // Asegúrate de tener los estilos correspondientes

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      setMessage('No estás autenticado. Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
      return;
    }

    axios.get('http://localhost:3000/user/profile', {
      headers: {
        Authorization: `Bearer ${token}` // Usar el token en los headers
      }
    })
    .then((response) => {
      setUserDetails(response.data); // Guardar los detalles del perfil
    })
    .catch((error) => {
      console.error('Error al obtener el perfil:', error);
      setMessage('Error al obtener los detalles del perfil.');
    });
  }, []);

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div className={styles.container}>
      <Navbar /> {/* Agregar el Navbar */}
      
      <div className={styles.profileContainer}>
        {userDetails ? (
          <>
            <h1>Perfil de Usuario</h1>
            <p><strong>Nombre:</strong> {`${userDetails.nombre.primerNombre} ${userDetails.nombre.segundoNombre} ${userDetails.nombre.primerApellido} ${userDetails.nombre.segundoApellido}`}</p>
            <p><strong>Edad:</strong> {userDetails.edad}</p>
            <p><strong>Correo:</strong> {userDetails.correo}</p>
            <p><strong>DNI:</strong> {userDetails.dni}</p>
            <p><strong>Teléfono:</strong> {userDetails.telefono}</p>
            <p><strong>Horario Disponible:</strong> {new Date(userDetails.horarioDisponibleInicio).toLocaleTimeString()} - {new Date(userDetails.horarioDisponibleFin).toLocaleTimeString()}</p>
            <p><strong>Rol:</strong> {userDetails.rol.rol}</p>
            <p><strong>Valoración:</strong> {userDetails.valoracion}</p>
            {/* Dependiendo del rol mostramos contenido personalizado */}
            {userDetails.rol.rol === 'tutor' ? (
              <p>Eres un Tutor. Puedes ver las preguntas de los pupilos y ofrecer ayuda.</p>
            ) : (
              <p>Eres un Pupilo. Puedes hacer preguntas y recibir ayuda de los tutores.</p>
            )}
          </>
        ) : (
          <p>Cargando detalles del perfil...</p>
        )}
      </div>

      <Footer /> {/* Agregar el Footer */}
    </div>
  );
}
