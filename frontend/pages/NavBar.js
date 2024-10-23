"use client"; // Indica que es un componente cliente

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from './styles/navbar.module.css';

export default function Navbar() {
  // Estado para almacenar las categorías obtenidas del backend
  const [categories, setCategories] = useState([]);
  // Estado para almacenar las materias de la categoría seleccionada
  const [materias, setMaterias] = useState([]);
  // Estado para almacenar la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Obtener las categorías desde el backend al cargar el componente
  useEffect(() => {
    axios
      .get('http://localhost:3000/categories')
      .then((response) => {
        setCategories(response.data); // Guardar las categorías en el estado
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error);
      });
  }, []);

  // Función para manejar la selección de una categoría
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // Guardar la categoría seleccionada

    // Hacer una solicitud GET para obtener las materias de la categoría seleccionada
    axios
      .get(`http://localhost:3000/categories/materia/${categoryId}`)
      .then((response) => {
        setMaterias(response.data); // Guardar las materias en el estado
      })
      .catch((error) => {
        console.error('Error al obtener las materias:', error);
      });
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoSection}>
          <Image 
            src="/images/logo.png" // Ruta de la imagen
            alt="Logo de SharkCat" 
            width={50} 
            height={50} 
          />
          <h1 className={styles.navTitle}>SharkCat</h1>

          {/* Botón de Categorías al lado del logo */}
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>Categorías</button>
            <div className={styles.dropdownContent}>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category.idCategoria}>
                    <button 
                      className={styles.dropdownItem} 
                      onClick={() => handleCategorySelect(category.idCategoria)}
                    >
                      {category.categoria}
                    </button>
                    {selectedCategory === category.idCategoria && materias.length > 0 && (
                      <div className={styles.submenu}>
                        {materias.map((materia) => (
                          <Link key={materia.idMateria} href="#">
                            {materia.materia}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Cargando categorías...</p>
              )}
            </div>
          </div>
        </div>

        {/* Barra de búsqueda centrada */}
        <div className={styles.navSearch}>
          <input type="text" placeholder="Buscar" className={styles.searchInput} />
          <button className={styles.searchButton}>🔍</button>
        </div>

        {/* Botones de inicio de sesión y registro */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="http://localhost:3001/login">
              <button className={styles.authButton}>Iniciar Sesión</button>
            </Link>
          </li>
          <li>
            <Link href="http://localhost:3001/register">
              <button className={styles.authButton}>Registrarse</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
