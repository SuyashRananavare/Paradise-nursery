import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599593915116-2009048a1239", cost: "$15", description: "Produces oxygen at night." },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313f0a4223d7", cost: "$12", description: "Great for beginners." },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593482892398-e73703c9b77d", cost: "$18", description: "Removes toxins from air." },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", cost: "$14", description: "Adds lush green look." },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1525498128493-380d1990a112", cost: "$20", description: "Shiny dark leaves." },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$10", description: "Healing properties." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", cost: "$16", description: "Calming scent." },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb264b3", cost: "$22", description: "Sweet evening fragrance." },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515584854538-42994e430335", cost: "$12", description: "Herbaceous aroma." },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4", cost: "$8", description: "Refreshing fragrance." },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1606787366850-de63301c7bfc", cost: "$11", description: "Citrus scent." },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78", cost: "$25", description: "Soothing eucalyptus scent." }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", cost: "$18", description: "Thrives on neglect." },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1572688484438-313f0a4223d7", cost: "$10", description: "Hard to kill." },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1599593915116-2009048a1239", cost: "$24", description: "Extremely resilient." },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a", cost: "$9", description: "Store water in leaves." },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$15", description: "Symbol of good luck." },
        { name: "Agave", image: "https://images.unsplash.com/photo-1515584854538-42994e430335", cost: "$20", description: "Architectural foliage." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setShowCart(false)}>Paradise Nursery</div>
        <div className="navbar-links">
          <button onClick={() => setShowCart(false)}>Home / Plants</button>
          <button onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-badge">{totalCartCount}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <p>{plant.description}</p>
                    <button
                      className={`cart-btn ${addedToCart[plant.name] ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;