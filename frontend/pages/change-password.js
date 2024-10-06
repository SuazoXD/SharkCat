import { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Cambiar Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="ID de Usuario" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña Antigua" 
          value={oldPassword} 
          onChange={(e) => setOldPassword(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Nueva Contraseña" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required 
        />
        <button type="submit">Actualizar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
