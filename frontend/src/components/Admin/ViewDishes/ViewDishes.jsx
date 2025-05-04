import React from 'react';
import DishSelectionToggle from '../DishSelectionToggle/DishSelectionToggle'

const DishList = () => {
  // Dummy dish data
  const dishes = [
    {
      id: 1,
      dishName: 'Masala Chai',
      restaurantName: 'Chai Point',
      price: 25,
    },
    {
      id: 2,
      dishName: 'Samosa',
      restaurantName: 'Local Snacks',
      price: 15,
    },
  ];

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '900px',
      margin: 'auto',
    },
    card: {
      background: '#fefefe',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    detail: {
      marginBottom: '6px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Dish List</h2>
      {dishes.map((dish) => (
        <div key={dish.id} style={styles.card}>
          <div style={styles.title}>{dish.dishName}</div>
          <div style={styles.detail}>🏪 {dish.restaurantName}</div>
          <div style={styles.detail}>💵 Price: ₹{dish.price}</div>
        </div>
      ))}
      <DishSelectionToggle/>
    </div>
  );
};

export default DishList;
