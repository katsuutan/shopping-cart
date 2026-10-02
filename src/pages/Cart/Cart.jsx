import { useOutletContext } from 'react-router';
import { Link } from 'react-router';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, updateQuantity } = useOutletContext();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className={styles.cart}>
        <h1 className={styles.heading}>Your Cart</h1>
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Link to="/shop" className={styles.shopLink}>Continue Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.cart}>
      <h1 className={styles.heading}>Your Cart</h1>
      <div className={styles.items}>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </div>
      <div className={styles.summary}>
        <p className={styles.total}>
          Total: <span className={styles.totalAmount}>${total.toFixed(2)}</span>
        </p>
        <button className={styles.checkoutButton}>Checkout</button>
      </div>
    </main>
  );
};

export default Cart;