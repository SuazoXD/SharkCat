// pages/UserHome.js
import Navbar from './NavBar'; // Asegúrate de tener el componente Navbar
import Footer from './footerSC'; // Asegúrate de tener el componente Footer
import styles from './styles/userhome.module.css'; // Asegúrate de tener los estilos correspondientes

export default function UserHome() {
  return (
    <div className={styles.container}>
      <Navbar /> {/* Agregar el Navbar */}
      
      <main className={styles.mainContent}>
        <h1>Bienvenido a SharkCat</h1>
        <p>Explora tus opciones académicas y encuentra ayuda con nuestros tutores.</p>
        {/* Aquí puedes agregar más contenido relevante */}
      </main>

      <Footer /> {/* Agregar el Footer */}
    </div>
  );
}
