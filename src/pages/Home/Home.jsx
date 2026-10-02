import { Link } from 'react-router';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.storeJapanese}>雫</p>
          <h1 className={styles.storeName}>Shizuku</h1>
          <p className={styles.tagline}>Wear the earth lightly.</p>
          <Link to="/shop" className={styles.shopButton}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philosophy}>
        <h2>Our Philosophy</h2>
        <p>
          At Shizuku, we believe that every purchase is a choice. We curate
          products that are made to last, sourced responsibly, and designed
          with the earth in mind. Like a water droplet that shapes stone over
          time, small mindful choices create lasting change.
        </p>
        <blockquote className={styles.quote}>
          <p>「もったいない」</p>
          <span>Mottainai — a regret over waste.</span>
        </blockquote>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <Link to="/shop" className={styles.categoryCard}>
            <h3>Clothing</h3>
            <p>Timeless pieces, natural fabrics</p>
          </Link>
          <Link to="/shop" className={styles.categoryCard}>
            <h3>Jewellery</h3>
            <p>Minimal, handcrafted, meaningful</p>
          </Link>
          <Link to="/shop" className={styles.categoryCard}>
            <h3>Electronics</h3>
            <p>Considered tech, built to last</p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;