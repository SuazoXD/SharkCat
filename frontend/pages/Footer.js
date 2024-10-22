import styles from '../pages/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.brandName}>SharkCat</span>
      </div>
      <div className={styles.footerLinks}>
        <a href="#">Recursos Académicos</a>
        <a href="#">Servicios Administrativos</a>
        <a href="#">Programas Académicos</a>
      </div>
      <div className={styles.socialIcons}>
        <a href="#"><img src="/images/instagram-icon.png" alt="Instagram" className={styles.icon} /></a>
        <a href="#"><img src="/images/facebook-icon.png" alt="Facebook" className={styles.icon} /></a>
        <a href="#"><img src="/images/twitter-icon.png" alt="Twitter" className={styles.icon} /></a>
      </div>
    </footer>
  );
}
