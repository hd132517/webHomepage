import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MyCalendar</div>
      <div className={styles.navLinks}>
        <Link href="/" className={`${styles.navLink} ${currentPath === '/' ? styles.active : ''}`}>
          Home
        </Link>
        <Link href="/chat" className={`${styles.navLink} ${currentPath === '/chat' ? styles.active : ''}`}>
          Chat
        </Link>
      </div>
    </nav>
  );
}
