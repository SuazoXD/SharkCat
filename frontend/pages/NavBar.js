import { useState, useEffect } from 'react';
import styles from '../pages/styles/Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para actualizar el estado de isMobile basado en el ancho de la ventana
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
          setIsSearchVisible(false); // Aseguramos que la barra de búsqueda esté visible en pantallas grandes
        }
      }
    };

    // Ejecutamos la función al montar el componente
    handleResize();

    // Agregamos el event listener
    window.addEventListener('resize', handleResize);

    // Limpiamos el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className={styles.navbar}>
      {/* Contenedor del logo y nombre */}
      <div className={styles.logoContainer}>
        <Image
          src="/images/logo.png"
          alt="Logo de SharkCat"
          width={40}
          height={40}
          className={styles.logo}
        />
        <span className={styles.brandName}>SharkCat - Demo</span>
      </div>

      {/* Barra de búsqueda */}
      {(!isMobile || isSearchVisible) && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Encuentra asistencia o tutorías"
            className={styles.searchInput}
            aria-label="Buscar"
          />
          <Image
            src="/images/search-icon.png"
            alt="Icono de búsqueda"
            width={20}
            height={20}
            className={styles.searchIcon}
          />
        </div>
      )}

      {/* Íconos */}
      <div className={styles.iconContainer}>
        <a href="#" className={styles.iconLink} aria-label="Favoritos">
          <Image
            src="/images/heart-icon.png"
            alt="Icono de favoritos"
            width={25}
            height={25}
            className={styles.icon}
          />
        </a>
        <a href="#" className={styles.iconLink} aria-label="Monedero">
          <Image
            src="/images/money-icon.png"
            alt="Icono de monedero"
            width={25}
            height={25}
            className={styles.icon}
          />
        </a>
        <a href="#" className={styles.iconLink} aria-label="Carrito">
          <Image
            src="/images/cart-icon.png"
            alt="Icono de carrito"
            width={25}
            height={25}
            className={styles.icon}
          />
        </a>

        {/* Botón de búsqueda (visible solo en móviles) */}
        {isMobile && (
          <button
            className={styles.searchButton}
            onClick={handleSearchClick}
            aria-label="Buscar"
          >
            <Image
              src="/images/search-icon.png"
              alt="Buscar"
              width={25}
              height={25}
              className={styles.icon}
            />
          </button>
        )}
      </div>

      {/* Botón de perfil */}
      <button className={styles.profileButton} aria-label="Perfil">
        <Image
          src="/images/profile-icon.png"
          alt="Icono de perfil"
          width={30}
          height={30}
          className={styles.profileIcon}
        />
      </button>
    </nav>
  );
}
