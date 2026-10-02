import { Link } from 'react-router';
import styles from './NavBar.module.css';

const NavBar = ({ cartCount }) => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>雫 Shizuku</Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/shop" className={styles.link}>Shop</Link>
        <Link to="/cart" className={styles.cartLink}>Cart ({cartCount})</Link>
      </div>
    </nav>
  );
};

export default NavBar;