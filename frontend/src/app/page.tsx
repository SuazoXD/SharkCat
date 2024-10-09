import Link from 'next/link';
import Image from 'next/image';
import styles from '../app/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.sharkCatTitle}>SharkCat</h1>
      <h2 className={styles.underConstruction}>EN CONSTRUCCIÓN</h2>

      <div className={styles.imageContainer}>
        <Image
          src="/images/sharkcat.png"  // Cambia la ruta de la imagen si es necesario
          alt="SharkCat Logo"
          width={200}
          height={200}
          className={styles.image}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Link href="/login" className={styles.button}>
          Ir a Login
        </Link>
        <Link href="/register" className={styles.button}>
          Ir a Registro
        </Link>
      </div>
    </div>
  );
}
