import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/navbar.module.css';

export default function NavBar({ userId }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src="/images/sharkcat1.png"  // Cambia la ruta si es necesario
          alt="SharkCat Logo"
          width={50}
          height={50}
        />
        <span className={styles.brand}>SharkCat</span>
      </div>
      <div className={styles.menu}>
        {userId && <span className={styles.welcome}>Bienvenido, ID: {userId}</span>}
        <Link href="http://localhost:3001/change-password" className={styles.profileButton}>
          Cambiar contraseña
        </Link>
      </div>
    </nav>
  );
}
