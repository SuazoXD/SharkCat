import Link from 'next/link';
import Image from 'next/image';
import styles from '../app/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <h1 className={styles.navTitle}>SharkCat</h1>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <div className={styles.dropdown}>
                <button className={styles.dropdownButton}>Categorías</button>
                <div className={styles.dropdownContent}>
                  <Link href="#">Física</Link>
                  <Link href="#">Matemática</Link>
                  <Link href="#">Inglés</Link>
                  <Link href="#">Literatura</Link>
                </div>
              </div>
            </li>
            <li>
              <Link href="#">Encuentra Tutor o Asistencia</Link>
            </li>
            <li className={styles.navSearch}>
              <input type="text" placeholder="Buscar" className={styles.searchInput} />
              <button className={styles.searchButton}>🔍</button>
            </li>
            <li>
              <button className={styles.authButton}>Iniciar Sesión</button>
            </li>
            <li>
              <button className={styles.authButton}>Registrarse</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Body */}
      <main className={styles.main}>
        <h2 className={styles.subtitle}>
          Explora tus opciones académicas y servicios
        </h2>
        <p className={styles.description}>
          "Accede a una amplia gama de cursos, profesores y servicios de apoyo académico. 
          Encuentra lo que necesitas para avanzar en tu carrera y mejorar tu experiencia universitaria."
        </p>

        {/* Contenedor de categorías */}
        <section className={styles.categoriesSection}>
          <h3 className={styles.categoriesTitle}>Categorías Disponibles</h3>
          <div className={styles.categoryGrid}>
            <div className={styles.categoryCard}>
              <Image src="/images/fisica.jpg" alt="Física" width={300} height={100} />
              <p>Física</p>
            </div>
            <div className={styles.categoryCard}>
              <Image src="/images/math.jpg" alt="Matemática" width={300} height={100} />
              <p>Matemática</p>
            </div>
            <div className={styles.categoryCard}>
              <Image src="/images/ingles.jpg" alt="Inglés" width={300} height={100} />
              <p>Inglés</p>
            </div>
            <div className={styles.categoryCard}>
              <Image src="/images/literatura.jpg" alt="Literatura" width={300} height={100} />
              <p>Literatura</p>
            </div>
          </div>
        </section>

        {/* Contenedor de Leyendas de Pupilos */}
        <section className={styles.testimonialsSection}>
          <h3 className={styles.testimonialsTitle}>Testimonios</h3>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <Image src="/images/persona1.jpg" alt="Maria Carmen" width={200} height={200} />
              <p>“Me ayudaron muy bien con mi tarea de física 200”</p>
              <span>Maria Carmen <br /> Tegucigalpa, UNAH</span>
            </div>
            <div className={styles.testimonialCard}>
              <Image src="/images/persona3.jpg" alt="Jesus Lorenzo" width={200} height={200} />
              <p>“Servicio Super Rápido”</p>
              <span>Jesus Lorenzo <br /> CU, UNAH</span>
            </div>
            <div className={styles.testimonialCard}>
              <Image src="/images/persona2.jpg" alt="Julia Alvarez" width={200} height={200} />
              <p>“Excelente apoyo en mis estudios de literatura”</p>
              <span>Julia Alvarez <br /> Siguatepeque, UNAH</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <div>
            <h4>Recursos Académicos</h4>
            <ul>
              <li>Guías de Estudio</li>
              <li>Calendario Académico</li>
              <li>Ayuda para Estudiantes</li>
              <li>Bibliotecas</li>
            </ul>
          </div>
          <div>
            <h4>Programas Académicos</h4>
            <ul>
              <li>Carreras Universitarias</li>
              <li>Programas de Posgrado</li>
              <li>Cursos en Línea</li>
              <li>Certificaciones</li>
            </ul>
          </div>
          <div>
            <h4>Servicios Administrativos</h4>
            <ul>
              <li>Inscripción de Cursos</li>
              <li>Consultar Calificaciones</li>
              <li>Solicitudes de Becas</li>
              <li>Apoyo Técnico</li>
            </ul>
          </div>
          <div>
            <h4>¿Preguntas sobre nuestros servicios?</h4>
            <form className={styles.formContainer}>
              <input type="email" placeholder="Ingresa tu Email" className={styles.formInput} />
              <button className={styles.subscribeButton}>Suscribirse</button>
            </form>
          </div>
        </div>
        <div className={styles.footerCopy}>
          <p>© 2024 SharkCat. Derechos Reservados. Políticas de Privacidad | Términos & Servicios</p>
        </div>
      </footer>
    </div>
  );
}
