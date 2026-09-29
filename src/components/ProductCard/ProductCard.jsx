import { useState } from 'react';

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
        <div>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <div>
                <button onClick={handleDecrement}>-</button>
                <input
                    type='number'
                    value={quantity}
                    onChange={handleQuantityChange}
                    min='1'
                />
                <button onClick={handleIncrement}>+</button>
            </div>

            <button onClick={() => onAddToCart(product, quantity)}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;