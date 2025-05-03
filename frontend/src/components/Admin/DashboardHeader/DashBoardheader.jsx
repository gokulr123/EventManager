import React from 'react';

const Header = ({ onSelect }) => {
  const styles = {
    header: {
      padding: '1.5rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '2px solid #dee2e6',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#2c3e50',
      textAlign: 'center',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
    },
    card: {
      flex: 1,
      maxWidth: '250px',
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
    },
    cardHover: {
      transform: 'scale(1.05)',
    },
    cardTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#34495e',
      marginBottom: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      margin: '0.25rem',
      fontSize: '0.9rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#3498db',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.title}>Admin Panel</div>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Events</div>
          <button
            style={styles.button}
            onClick={() => onSelect('addEvent')}
          >
            Add Event
          </button>
          <button
            style={styles.button}
            onClick={() => onSelect('viewEvents')}
          >
            View Events
          </button>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Dishes</div>
          <button
            style={styles.button}
            onClick={() => onSelect('addDish')}
          >
            Add Dish
          </button>
          <button
            style={styles.button}
            onClick={() => onSelect('viewDishes')}
          >
            View Dishes
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
