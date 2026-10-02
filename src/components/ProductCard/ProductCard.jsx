import { useState } from 'react';
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0)
            setQuantity(value);
    };

    return (
        <div className={styles.card}>
        <div className={styles.imageWrapper}>
            <img
            src={product.image}
            alt={product.title}
            className={styles.image}
            />
        </div>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.quantityControl}>
            <button className={styles.quantityButton} onClick={handleDecrement}>-</button>
            <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className={styles.quantityInput}
            />
            <button className={styles.quantityButton} onClick={handleIncrement}>+</button>
        </div>
        <button className={styles.addButton} onClick={() => onAddToCart(product, quantity)}>
            Add to Cart
        </button>
        </div>
    );
};

export default ProductCard;