const CartItem = ({ item, onUpdateQuantity }) => {
    return (
        <div>
             <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <div>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => onUpdateQuantity(item.id, 0)}>Remove</button>
        </div>
    );
};

export default CartItem;