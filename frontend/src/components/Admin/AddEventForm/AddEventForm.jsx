import React, { useState } from 'react';
import axios from '../../../Services/Api';
const AddEventForm = () => {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous message

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/events/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message); // Set success message
      setFormData({
        eventName: '',
        description: '',
        time: '',
        venue: '',
        numberOfParticipants: '',
        eventType: '',
      }); // Reset form data after successful submission
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong'); // Set error message
    }
  };

  return (
    <div>
      <style>{`
        .event-form-container {
          max-width: 500px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .form-title {
          margin-bottom: 20px;
          font-size: 24px;
          text-align: center;
        }

        .form-message {
          text-align: center;
          color: green;
          margin-bottom: 20px;
        }

        .event-form {
          display: flex;
          flex-direction: column;
        }

        .form-input {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          background: #007bff;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-button:hover {
          background: #0056b3;
        }
      `}</style>

      <div className="event-form-container">
        <h2 className="form-title">Add New Event</h2>
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
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
