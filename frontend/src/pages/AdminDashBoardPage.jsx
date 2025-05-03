import React, { useState } from 'react';
import AddEventForm from '../components/Admin/AddEventForm/AddEventForm';
import EventList from '../components/Admin/ViewEvents/ViewEvents';
import AddDishForm from '../components/Admin/AddDishForm/AddDishForm';
import DishList from '../components/Admin/ViewDishes/ViewDishes';
import Headers from '../components/Header/Header';

const AdminDashboard = () => {
  const [view, setView] = useState('');

  const styles = {
    dashboard: {
      padding: '2rem',
      marginTop:'100px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f6fa',
      minHeight: '100vh',
    },
    topSection: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '2rem',
      marginBottom: '2rem',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      flex: 1,
      textAlign: 'center',
    },
    cardTitle: {
      marginBottom: '1rem',
      color: '#2c3e50',
    },
    button: {
      margin: '0.5rem',
      padding: '0.6rem 1.2rem',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#2980b9',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    bottomSection: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#1c5980';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '#2980b9';
  };

  const renderContent = () => {
    switch (view) {
      case 'addEvent':
        return <AddEventForm />;
      case 'viewEvents':
        return <EventList />;
      case 'addDish':
        return <AddDishForm />;
      case 'viewDishes':
        return <DishList />;
      default:
        return <p>Select an option above to get started.</p>;
    }
  };

  return (
    <>
    <Headers/>
    <div style={styles.dashboard}>
      <div style={styles.topSection}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Events</h3>
          <button
            style={styles.button}
            onClick={() => setView('addEvent')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Add Event
          </button>
          <button
            style={styles.button}
            onClick={() => setView('viewEvents')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            View Events
          </button>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Dishes</h3>
          <button
            style={styles.button}
            onClick={() => setView('addDish')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Add Dish
          </button>
          <button
            style={styles.button}
            onClick={() => setView('viewDishes')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            View Dishes
          </button>
        </div>
      </div>

      <div style={styles.bottomSection}>{renderContent()}</div>
    </div>
    </>
  );
};

export default AdminDashboard;
