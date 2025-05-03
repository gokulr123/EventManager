import React from 'react';

const EventList = () => {
  // Dummy event data
  const events = [
    {
      id: 1,
      eventName: 'Tea Time Fun',
      description: 'Team bonding over tea',
      time: '4:00 PM',
      venue: 'Cafeteria',
      numberOfParticipants: 10,
      eventType: 'Casual',
    },
    {
      id: 2,
      eventName: 'Chai & Code',
      description: 'Coding session with tea',
      time: '5:00 PM',
      venue: 'Meeting Room 2',
      numberOfParticipants: 6,
      eventType: 'Tech',
    },
  ];

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '900px',
      margin: 'auto',
    },
    card: {
      background: '#f8f9fa',
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Event List</h2>
      {events.map((event) => (
        <div key={event.id} style={styles.card}>
          <div style={styles.title}>{event.eventName}</div>
          <div style={styles.detail}>📝 {event.description}</div>
          <div style={styles.detail}>⏰ {event.time}</div>
          <div style={styles.detail}>📍 {event.venue}</div>
          <div style={styles.detail}>👥 Participants: {event.numberOfParticipants}</div>
          <div style={styles.detail}>🎉 Type: {event.eventType}</div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
