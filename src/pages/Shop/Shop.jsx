import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import ProductCard from '../../components/ProductCard/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const { addToCart } = useOutletContext();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []); 

    if (loading)
        return <p>Loading products...</p>;
    if (error)
        return <p>Something went wrong. Please try again.</p>;
    
    return (
        <div>
            <h1>Shop</h1>
            <div>
                {products.map((product) => (
                    <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                />
                ))}
            </div>
        </div>
    );
};

export default Shop;