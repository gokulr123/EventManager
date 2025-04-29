const Event = require('../models/event');
const User = require('../models/User');

//const DishSelectionHistory = require('../models/dishSelectionHistory');

exports.createEvent = async (req, res) => {
  try {
    
    const { eventName, description, time, venue, numberOfParticipants, eventType } = req.body;

    const newEvent = new Event({
      eventName,
      description,
      time,
      venue,
      numberOfParticipants,
      eventType,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id; // Get userId from the token

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ message: 'Event not found' });
    }

    if (event.participants.length >= event.numberOfParticipants) {
      return res.status(400).json({ message: 'Event is already full' });
    }

    event.participants.push(userId);
    await event.save();
    res.status(200).json({ message: 'Successfully joined the event' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getEvents = async (req, res) => {
    try {
      const events = await Event.find(); // You can also add `.populate('participants')` if needed
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  exports.getEventById = async (req, res) => {
    try {
        console.log("reached")
      const { eventId } = req.params;
      console.log(req.params);
      const event = await Event.findById(eventId).populate('participants'); // Make sure to populate participants or any other related data
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event); // Send back the event data
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.joinEventById=async (req, res) => {

    try {
      const eventId = req.params.eventId;
      const userId = req.userId;
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Check if user already joined
      if (event.participants.includes(userId)) {
        return res.status(400).json({ message: 'User already joined this event' });
      }
  
      // Add user to participants list
      event.participants.push(userId);
      await event.save();
      
    // Fetch user data to send in WebSocket message
    const user = await User.findById(userId); // Ensure you have user model and replace as needed
    const io = req.app.get('io');
    // Emit event to all connected clients
    if (io) {
      io.emit('new-participant', {
        eventId,
        participant: {
          userName: user.userName, // Or use user.username depending on your model
          status: 'active',
          id: user._id
        }
      });
    } else {
      console.error('WebSocket server is not initialized');
    }
  
      res.status(200).json({ message: 'User successfully joined the event' });
    } catch (error) {
      console.error('Error joining event:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };