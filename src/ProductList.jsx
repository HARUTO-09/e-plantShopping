import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();

    // ... existing code (plantsArray, styles, handlers for nav)

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
    };

    return (
        <div>
            {/* ...navbar code remains the same */}

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category) =>
                        category.plants.map((plant) => (
                            <div key={plant.name} className="product-card">
                                <h3>{plant.name}</h3>
                                <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <p>{plant.description}</p>
                                <p><strong>{plant.cost}</strong></p>
                                <button
                                    onClick={() => handleAddToCart(plant)}
                                    disabled={addedToCart[plant.name]}
                                >
                                    {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
