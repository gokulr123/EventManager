import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './DishCard.css'

const DishCard = ({ dish, onAdd }) => (
  <div className="dish-card">
      <h3>{dish.name}</h3>
      <p><strong>Restaurant:</strong> {dish.restaurantName}</p>
      <p><strong>Price:</strong> ₹{dish.price}</p>
      <div className='button-wrapper'><button onClick={onAdd}>Add to Cart <FaShoppingCart/></button></div>
      
  </div>
);

export default DishCard;
