"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../pages/styles/userdat.module.css'; // Asegúrate de crear este archivo CSS
import Navbar from '../pages/NavBar'; // Importa el Navbar
import Footer from '../pages/footerSC'; // Importa el Footer

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null); // Estado para almacenar los detalles del usuario
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('access_token');

    // Si no hay token, redirigir al usuario a la página de login
    if (!token) {
      setMessage('No estás autenticado. Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        window.location.href = '/login';
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

  if (message) {
    return <p>{message}</p>; // Mostrar el mensaje si no hay autenticación
  }

  return (
    <div>
      <Navbar /> {/* Incluir Navbar */}
      <div className={styles.container}>
        <h1>Perfil de Usuario</h1>
        {userDetails ? (
          <div className={styles.profileDetails}>
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
      <Footer /> {/* Incluir Footer */}
    </div>
  );
}
