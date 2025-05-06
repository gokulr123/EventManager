import React, { useState } from 'react';
import axios from '../../../Services/Api';
import './CreateEventForm.css'; // Importing external CSS

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    time: '',
    venue: '',
    numberOfParticipants: '',
    eventType: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/events/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);
      setFormData({
        eventName: '',
        description: '',
        time: '',
        venue: '',
        numberOfParticipants: '',
        eventType: '',
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="event-form-container">
      <h2 className="form-title">Create New Event</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="form-input"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="form-input"
        />

        <input
          type="datetime-local"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="Venue"
          required
          className="form-input"
        />

        <input
          type="number"
          name="numberOfParticipants"
          value={formData.numberOfParticipants}
          onChange={handleChange}
          placeholder="No. of Participants"
          required
          className="form-input"
        />

        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Select Event Type</option>
          <option value="Dish">Dish</option>
          <option value="General">General</option>
        </select>

        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
