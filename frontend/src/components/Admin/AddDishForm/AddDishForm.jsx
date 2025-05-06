import React, { useState } from 'react';
import axios from '../../../Services/Api'; // Ensure this points to your custom axios instance

const AddDishForm = () => {
  const [dishData, setDishData] = useState({
    dishName: '',
    restaurantName: '',
    price: '',
    category: 'Food',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDishData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: dishData.dishName,
      restaurantName: dishData.restaurantName,
      price: parseFloat(dishData.price),
      category: dishData.category,
    };

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/dishes/create', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Dish added successfully!');
      setDishData({ dishName: '', restaurantName: '', price: '', category: 'Food' });
    } catch (error) {
      console.error('Error adding dish:', error);
      alert(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: '600',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
    },
    select: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#28a745',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>Add Dish</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>Dish Name</label>
        <input
          style={styles.input}
          type="text"
          name="dishName"
          value={dishData.dishName}
          onChange={handleChange}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Restaurant Name</label>
        <input
          style={styles.input}
          type="text"
          name="restaurantName"
          value={dishData.restaurantName}
          onChange={handleChange}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Price</label>
        <input
          style={styles.input}
          type="number"
          name="price"
          value={dishData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Category</label>
        <select
          style={styles.select}
          name="category"
          value={dishData.category}
          onChange={handleChange}
          required
        >
          <option value="Food">Food</option>
          <option value="Beverage">Beverage</option>
        </select>
      </div>

      <button type="submit" style={styles.button}>Add Dish</button>
    </form>
  );
};

export default AddDishForm;
