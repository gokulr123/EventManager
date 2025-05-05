import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SearchBar from '../components/DishSearchBar/DishSearchBar';
import DishCard from '../components/DishCard/DishCard';
import CartModal from '../components/DishCartModal/DishCartModal';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FinalConfirmModal from '../components/DishCartModal/FinalConfirmationModal'
import DishBottomCartBar from '../components/DishBottomcartBar/DishBottomCartBar';
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import GlobalLoading from '../components/GlobalModal/GlobalLoading';

const socket = io(`${process.env.REACT_APP_API_BASE_URL}`); 




const DishSelectionPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams()
  const token = localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [initialloading, setinitialLoading] = useState(true);
   const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || decoded.userId); // Adjust based on your backend
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
   
    
    const fetchDishes = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/dishes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
       // await new Promise((resolve) => setTimeout(resolve, 10000));
        setDishes(data);
        setinitialLoading(false)
      } catch (error) {
        console.error('Failed to fetch dishes:', error.message);
        setinitialLoading(false)
      }
    };

    fetchDishes();
  }, [token]);
  const handleConfirm = async () => {
    try {
      setLoading(true);
      const selectedDishes = Object.values(cart).map(item => ({
        dish: item._id,
        quantity: item.quantity
      }));
      console.log("selecteddishes",selectedDishes)
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/events/${eventId}/participants/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // only if your API requires auth
        },
        body: JSON.stringify({ selectedDishes })
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit dishes');
      }
  
      const data = await response.json();
      socket.emit("event-update", { eventId });
      setLoading(false);
      navigate(`/event/${eventId}`);

      // Optionally show toast or success UI here
  
    } catch (error) {
      console.error('Error submitting dishes:', error);
      setLoading(false);
      // Optionally show error toast or modal
    }
  };
  const addToCart = (dish) => {
    console.log("cart",cart)
    setCart(prev => ({
      ...prev,
      [dish._id]: {
        ...dish,
        quantity: (prev[dish._id]?.quantity || 0) + 1
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

  const filteredDishes = dishes.filter(d =>
    d.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
     {loading && <GlobalLoading />} {/* Loading modal on top */}
      <Header />
      <div className="dish-page">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="dish-list">
        {initialloading ? (
    // Loading skeleton or spinner
    Array(6).fill(0).map((_, index) => (
      <div key={index} className="dish-skeleton"></div>
    ))
  ) : (
    filteredDishes.map(dish => (
      <DishCard key={dish._id} dish={dish} onAdd={() => addToCart(dish)} />
    ))
  )}
        </div>

        <DishBottomCartBar
          cartCount={Object.keys(cart).length}
          onCartClick={() => setShowModal(true)}
        />

        {showModal && (
          <CartModal
            cart={cart}
            onUpdate={updateQuantity}
            onClose={() => setShowModal(false)}
            onConfirm={() => setShowConfirmModal(true)}
          />
        )}
        {showConfirmModal && (
  <FinalConfirmModal
    onCancel={() => setShowConfirmModal(false)}
    onOk={async () => {
      await handleConfirm();        // submit to backend
      setShowConfirmModal(false);  // close confirm modal
      setShowModal(false);         // close cart modal
    }}
  />
)}
        <style jsx>{`
      .dish-page {
  padding: 80px 20px 20px;
  min-height: 700px;
}

.dish-list {
  font-size:1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
  .dish-skeleton {
  width: 320px;
  height: 180px;
  background: linear-gradient(-90deg, #e0e0e0 0%, #f8f8f8 50%, #e0e0e0 100%);
  background-size: 400% 400%;
  border-radius: 12px;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
    `}</style>
      </div>
      <Footer />
    </>
  );
};

export default DishSelectionPage;
