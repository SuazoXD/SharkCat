"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from './styles/navbar.module.css';

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado

  useEffect(() => {
    // Verificar si el token existe en localStorage y que no esté vacío
    const token = localStorage.getItem('access_token');
    if (token && token !== "undefined" && token !== "null") {
      setIsAuthenticated(true); // Si hay token válido, el usuario está autenticado
    } else {
      setIsAuthenticated(false); // Si no hay token o es inválido, no está autenticado
    }

    // Obtener las categorías desde el backend
    axios
      .get('http://localhost:3000/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error);
      });
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);

    axios
      .get(`http://localhost:3000/categories/materia/${categoryId}`)
      .then((response) => {
        setMaterias(response.data);
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
            src="/images/logo.png"
            alt="Logo de SharkCat"
            width={50}
            height={50}
          />
          <h1 className={styles.navTitle}>SharkCat</h1>

          {/* Botón de Categorías */}
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>
              <Image 
                src="/images/logo.png"
                alt="Categorías"
                width={20}
                height={20}
              /> 
              Categorías
            </button>
            <div className={styles.dropdownContent}>
              {categories.length > 0 ? (
                <ul>
                  {categories.map((category) => (
                    <li key={category.idCategoria}>
                      <button 
                        className={styles.dropdownItem} 
                        onClick={() => handleCategorySelect(category.idCategoria)}
                      >
                        {category.categoria}
                      </button>
                      {selectedCategory === category.idCategoria && materias.length > 0 && (
                        <ul className={styles.submenu}>
                          {materias.map((materia) => (
                            <li key={materia.idMateria}>
                              <Link href="#">
                                {materia.materia}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Cargando categorías...</p>
              )}
            </div>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className={styles.navSearch}>
          <input type="text" placeholder="Buscar" className={styles.searchInput} />
          <button className={styles.searchButton}>
            <Image src="/images/Logo.png" alt="Buscar" width={16} height={16} />
          </button>
        </div>

        {/* Botones de autenticación */}
        <ul className={styles.authButtons}>
          {isAuthenticated ? (
            <>
              <li>
                <Link href="http://localhost:3001/UserProfile">
                  <button className={styles.authButton}>
                    <Image src="/images/logo.png" alt="Perfil" width={20} height={20} />
                    Perfil
                  </button>
                </Link>
              </li>
              <li>
                <Link href="http://localhost:3001/UserHome">
                  <button className={styles.authButton}>
                    <Image src="/images/logo.png" alt="Página Principal" width={20} height={20} />
                    Página Principal
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="http://localhost:3001/login">
                  <button className={styles.authButton}>
                    <Image src="/images/logo.png" alt="Iniciar Sesión" width={20} height={20} />
                    Iniciar Sesión
                  </button>
                </Link>
              </li>
              <li>
                <Link href="http://localhost:3001/register">
                  <button className={styles.authButton}>
                    <Image src="/images/logo.png" alt="Registrarse" width={20} height={20} />
                    Registrarse
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
