import styles from './CartItem.module.css';

const CartItem = ({ item, onUpdateQuantity }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <img src={item.image} alt={item.title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.price}>${item.price.toFixed(2)}</p>
        <p className={styles.subtotal}>
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className={styles.controls}>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityButton}
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className={styles.removeButton}
          onClick={() => onUpdateQuantity(item.id, 0)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;