import React, { useState } from 'react';
import SearchBar from '../components/DishSearchBar/DishSearchBar';
import DishCard from '../components/DishCard/DishCard';
import CartModal from '../components/DishCartModal/DishCartModal';
import { FaShoppingCart } from 'react-icons/fa';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DishBottomCartBar from '../components/DishBottomcartBar/DishBottomCartBar';

const mockDishes = [
  { id: 1, name: "Tea", group: "Beverages" },
  { id: 2, name: "Samosa", group: "Snacks" },
  { id: 3, name: "Coffee", group: "Beverages" },
];

const DishSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [showModal, setShowModal] = useState(false);
 

  const addToCart = (dish) => {
    setCart(prev => ({
      ...prev,
      [dish.id]: {
        ...dish,
        quantity: (prev[dish.id]?.quantity || 0) + 1
      }
    }));
  };

  const updateQuantity = (dishId, change) => {
    setCart(prev => {
      const updatedQty = (prev[dishId].quantity || 1) + change;
      if (updatedQty <= 0) {
        const updated = { ...prev };
        delete updated[dishId];
        return updated;
      }
      return {
        ...prev,
        [dishId]: {
          ...prev[dishId],
          quantity: updatedQty
        }
      };
    });
  };

  const filteredDishes = mockDishes.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Header/>
    <div className="dish-page">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="dish-list" style={{ marginTop: '100px', minHeight:'700px' }}>
        {filteredDishes.map(dish => (
          <DishCard key={dish.id} dish={dish} onAdd={() => addToCart(dish)} />
        ))}
      </div>


      <DishBottomCartBar cartCount={Object.keys(cart).length} onCartClick={() => setShowModal(true)}/>

      {showModal && (
        <CartModal cart={cart} onUpdate={updateQuantity} onClose={() => setShowModal(false)} />
      )}
    </div>
    <Footer/>
    </>
  );
};

export default DishSelectionPage;
