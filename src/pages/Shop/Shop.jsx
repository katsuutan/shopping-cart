import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from "./Shop.module.css";

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
        return <p className={styles.loading}>Loading products...</p>;
    if (error)
        return <p className={styles.error}>Something went wrong. Please try again.</p>;
    
    return (
        <main className={styles.shop}>
            <h1 className={styles.heading}>Our Products</h1>
            <div className={styles.grid}>
                {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                />
            ))}
        </div>
        </main>
    );
};

export default Shop;