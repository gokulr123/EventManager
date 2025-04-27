import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const DishCard = ({ dish, onAdd }) => (
  <div className="dish-card">
    <h4>{dish.name}</h4>
    <button onClick={onAdd}><FaShoppingCart /></button>
    <style jsx>{`
      .dish-card {
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 10px;
        text-align: center;
        background-color: #fafafa;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
      }
      .dish-card:hover {
        transform: translateY(-2px);
      }
      .dish-card button {
        margin-top: 10px;
        background-color: #ff9800;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 5px;
        cursor: pointer;
      }
      .dish-card button:hover {
        background-color: #fb8c00;
      }
    `}</style>
  </div>
);

export default DishCard;
