import { useState } from 'react';
import axios from 'axios';
import styles from '../pages/styles/register.module.css';

export default function Register() {
  // Inicializamos el estado para cada campo requerido
  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    contrasenia: '',
    edad: '',  // Asegurémonos de enviar un número
    dni: '',
    idRol: 1,  // Valor inicial predeterminado a 1
    valoracion: 4.5,  // Valor fijo por ahora
    horarioDiponibleInicio: '09:00:00',
    horarioDisponibleFin: '18:00:00'
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aseguramos que `edad` e `idRol` sean números
    const dataToSend = {
      ...formData,
      idRol: Number(formData.idRol),
      edad: Number(formData.edad)  // Convertir edad a número
    };

    try {
      // Petición POST al backend
      const response = await axios.post('http://localhost:3000/auth/sign-up', dataToSend);
      setMessage('Registro exitoso.');
    } catch (error) {
      setMessage('Error en el registro. Inténtalo de nuevo.');
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
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.contrasenia}
            onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
            required
            className={styles.input}
          />
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
          <label className={styles.label}>¿Comó quieres registrarte?:</label>
          <select
            value={formData.idRol}
            onChange={(e) => setFormData({ ...formData, idRol: Number(e.target.value) })}
            className={styles.select}
          >
            <option value={1}>Pupilo</option>
            <option value={2}>Tutor</option>
          </select>
          <button type="submit" className={styles.button}>Registrar</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
