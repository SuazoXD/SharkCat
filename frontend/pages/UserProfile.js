import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar';
import Footer from './footerSC';
import styles from './styles/userprofile.module.css';


export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newCoverPhoto, setNewCoverPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedProfilePicture = localStorage.getItem('profile_picture');
    const savedCoverPhoto = localStorage.getItem('cover_photo');

    if (savedProfilePicture) {
      setNewProfilePicture(savedProfilePicture);
    }
    if (savedCoverPhoto) {
      setNewCoverPhoto(savedCoverPhoto);
    }
    
    if (!token) {
      setMessage('No estás autenticado. Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
      return;
    }

    axios.get('http://localhost:3000/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setUserDetails(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener el perfil:', error);
      setMessage('Error al obtener los detalles del perfil.');
    });
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfilePicture(imageUrl);
      localStorage.setItem('profile_picture', imageUrl);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewCoverPhoto(imageUrl);
      localStorage.setItem('cover_photo', imageUrl);
    }
  };

  const handleProfilePictureUpload = () => {
    if (!newProfilePicture) {
      alert('No se ha seleccionado ninguna imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', newProfilePicture);

    console.log('Subiendo imagen de perfil...', newProfilePicture);
  };

  const handleFieldEdit = (field, value) => {
    const updatedUserDetails = { ...userDetails, [field]: value };
    setUserDetails(updatedUserDetails);
    localStorage.setItem('user_details', JSON.stringify(updatedUserDetails));
  };

  const renderRating = (rating) => {
    return '⭐'.repeat(rating);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, rating }]);
      setNewComment('');
      setRating(0);
    }
  };

  if (message) {
    return <div className={styles.messageContainer}><p>{message}</p></div>;
  }

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.mainContent}>
        <div className={styles.coverPhotoContainer}>
          <img
            src={newCoverPhoto ? newCoverPhoto : '/images/default-cover.jpg'}
            alt="Foto de Portada"
            className={styles.coverPhoto}
          />
          <label htmlFor="coverInput" className={styles.coverInputLabel}>⬆️</label>
          <input type="file" id="coverInput" onChange={handleCoverPhotoChange} className={styles.coverInput} />
        </div>

        <div className={styles.centeredProfileContainer}>
          <div className={styles.profileContainer}>
            {userDetails ? (
              <>
                <div className={styles.profileHeader}>
                  <div className={styles.profileImageContainer}>
                    <img
                      src={
                        newProfilePicture
                          ? newProfilePicture
                          : userDetails.fotoPerfil || '/images/default-profile.png'
                      }
                      alt="Foto de Perfil"
                      className={styles.profileImage}
                    />
                    <label htmlFor="fileInput" className={styles.fileInputLabel}>⬆️</label>
                    <input type="file" id="fileInput" onChange={handleProfilePictureChange} className={styles.fileInput} />
                    <button onClick={handleProfilePictureUpload} className={styles.uploadButton}>Cambiar Foto</button>
                    <h3 className={styles.profileName}>{`${userDetails.nombre.primerNombre} ${userDetails.nombre.primerApellido}`}</h3>
                  </div>
                </div>

                <div className={styles.profileDetailsContainer}>
                  <h2>Información básica:</h2>
                  <div className={styles.profileDetails}>
                    <div className={styles.profileDetailContainer}>
                      <label>Nombre</label>
                      <input type="text" value={userDetails.nombre.primerNombre} onChange={(e) => handleFieldEdit('nombre.primerNombre', e.target.value)} />
                      <label className={styles.editButtonLabel}>⬆️</label>
                    </div>
                    <div className={styles.profileDetailContainer}>
                      <label>Apellido</label>
                      <input type="text" value={userDetails.nombre.primerApellido} onChange={(e) => handleFieldEdit('nombre.primerApellido', e.target.value)} />
                      <label className={styles.editButtonLabel}>⬆️</label>
                    </div>
                    <div className={styles.profileDetailContainer}>
                      <label>Correo:</label>
                      <p>{userDetails.correo}</p>
                    </div>
                    <div className={styles.profileDetailContainer}>
                      <label>DNI:</label>
                      <p>{userDetails.dni}</p>
                    </div>
                    <div className={styles.profileDetailContainer}>
                      <label>Edad</label>
                      <input type="number" value={userDetails.edad} onChange={(e) => handleFieldEdit('edad', e.target.value)} />
                      <label className={styles.editButtonLabel}>⬆️</label>
                    </div>
                    <div className={styles.profileDetailContainer}>
                      <label>Teléfono:</label>
                      <input type="tel" value={userDetails.telefono} onChange={(e) => handleFieldEdit('telefono', e.target.value)} />
                      <label className={styles.editButtonLabel}>⬆️</label>
                    </div>
                    <div className={styles.profileDetailContainer}>
                      <label>Horario Disponible:</label>
                      <input type="time" value={new Date(userDetails.horarioDisponibleInicio).toISOString().substr(11, 5)} onChange={(e) => handleFieldEdit('horarioDisponibleInicio', e.target.value)} />
                      <label className={styles.editButtonLabel}>⬆️</label>
                      <input type="time" value={new Date(userDetails.horarioDisponibleFin).toISOString().substr(11, 5)} onChange={(e) => handleFieldEdit('horarioDisponibleFin', e.target.value)} />
                      <label className={styles.editButtonLabel}>⬆️</label>
                    </div>
                    <div className={styles.profileDetailContainer}>
                      <label>Valoración:</label>
                      <p>{renderRating(userDetails.valoracion)}</p>
                    </div>
                  </div>
                </div>

                {userDetails.rol.rol === 'tutor' && (
                  <div className={styles.commentsSection}>
                    <h2>Comentarios de Referencia:</h2>
                    <div className={styles.commentInputContainer}>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className={styles.commentInput}
                      />
                      <div className={styles.ratingContainer}>
                        <label>Valoración:</label>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        />
                      </div>
                      <button onClick={handleCommentSubmit} className={styles.submitCommentButton}>Añadir Comentario</button>
                    </div>
                    <div className={styles.commentsList}>
                      {comments.map((comment, index) => (
                        <div key={index} className={styles.commentItem}>
                          <p>{comment.text}</p>
                          <p>{renderRating(comment.rating)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>Cargando detalles del perfil...</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

