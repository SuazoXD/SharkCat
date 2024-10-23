import styles from "../pages/styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenedorGral}>
        <div className={styles.contenedor1}>
          <p>Recursos académicos</p>
          <p>Programas académicos</p>
          <p>Servicios Administrativos</p>
          <p>Guía de estudio</p>
          <p>Carrera Universitaria</p>
          <p>Inscripción de cursos</p>
          <p>Calendario académico</p>
          <p>Ayuda a estudiantes</p>
        </div>

        <div className={styles.contenedor2}>
          <ul className={styles.socialGrid}>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" className={styles.socialIcon} />
              
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-h-e2hgz8mwGfCt4gvj4IgMG_wAUolVM6w&s" alt="Twitter" className={styles.socialIcon} />
                
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/512/linkedin.png" alt="LinkedIn" className={styles.socialIcon} />
                
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="YouTube" className={styles.socialIcon} />
                
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p>© {new Date().getFullYear()} Shark Cat. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
