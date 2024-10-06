import { useState } from 'react';
import axios from 'axios';

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

    console.log('Datos enviados:', dataToSend);  // Para ver los datos enviados

    try {
      // Petición POST al backend
      const response = await axios.post('http://localhost:3000/auth/sign-up', dataToSend);
      setMessage('Registro exitoso.');
    } catch (error) {
      setMessage('Error en el registro. Inténtalo de nuevo.');
      console.error(error.response);  // Para depurar mejor el error
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Primer Nombre" 
          value={formData.primerNombre} 
          onChange={(e) => setFormData({ ...formData, primerNombre: e.target.value })}
          required 
        />
        <input 
          type="text" 
          placeholder="Segundo Nombre" 
          value={formData.segundoNombre} 
          onChange={(e) => setFormData({ ...formData, segundoNombre: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Primer Apellido" 
          value={formData.primerApellido} 
          onChange={(e) => setFormData({ ...formData, primerApellido: e.target.value })}
          required 
        />
        <input 
          type="text" 
          placeholder="Segundo Apellido" 
          value={formData.segundoApellido} 
          onChange={(e) => setFormData({ ...formData, segundoApellido: e.target.value })}
        />
        <input 
          type="email" 
          placeholder="Correo" 
          value={formData.correo} 
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={formData.contrasenia} 
          onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
          required 
        />
        <input 
          type="number" 
          placeholder="Edad" 
          value={formData.edad} 
          onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
          required
        />
        <input 
          type="text" 
          placeholder="DNI" 
          value={formData.dni} 
          onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
        />
        <label>Rol:</label>
        <select 
          value={formData.idRol} 
          onChange={(e) => setFormData({ ...formData, idRol: Number(e.target.value) })}
        >
          <option value={1}>Pupilo</option>
          <option value={2}>Tutor</option>
        </select>

        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
