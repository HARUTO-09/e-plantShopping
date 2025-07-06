import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '20px',
            }}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div> <a href="#" onClick={handleCartClick} style={{
                        color: 'white',
                        fontSize: '30px',
                        textDecoration: 'none',
                        position: 'relative'
                    }}>
                        🛒
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-12px',
                            background: 'red',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '14px',
                            color: 'white'
                        }}>{totalQuantity}</span>
                    </a></div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map(category =>
                        category.plants.map(plant => (
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

// plantsArray stays the same as you already have it above

export default ProductList;
