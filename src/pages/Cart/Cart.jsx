import { useOutletContext } from 'react-router';
import CartItem from '../../components/CartItem/CartItem';

const Cart = () => {
    const { cart, updateQuantity } = useOutletContext();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div>
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <div>
                {cart.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                    />
                ))}
            </div>
            <h2>Total: ${total.toFixed(2)}</h2>
        </div>
    );
};
    
export default Cart;