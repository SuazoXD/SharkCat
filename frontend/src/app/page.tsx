// pages/home.js
import Navbar from '../../pages/NavBar';
import Footer from '../../pages/footerSC';
import Parti from '../../src/app/components/particulasfondo';
import styles from '../app/home.module.css';
import Image from 'next/image'; // <-- Falta esta importación
export default function Home() {
  return (
    <div className={styles.container}>
      <Parti />
      <Navbar />
     
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
              <Image src="/images/fisica.jpg" alt="Física" width={300} height={100} /> {/* Añade la imagen correcta */}
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

      <Footer />
    </div>
  );
}
