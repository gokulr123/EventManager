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

    const alreadyJoined = event.participants.some(
      (participant) => participant.user.toString() === userId
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: 'You have already joined this event' });
    }
    // if (event.participants.length >= event.numberOfParticipants) {
    //   return res.status(400).json({ message: 'Event is already full' });
    // }
     // ✅ Push participant object (with dish-related fields as default)
     event.participants.push({
      user: userId,
      selectedDishes: [],
      isDishSelected: false
    });
    
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
      const { eventId } = req.params;
  
      const event = await Event.findById(eventId)
        .populate('participants.user') // populate user details
        .populate('participants.selectedDishes.dish'); // populate dish details
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.status(200).json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
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
      const alreadyJoined = event.participants.some(participant =>
        participant.user.toString() === userId
      );
      if (alreadyJoined) {
        return res.status(400).json({ message: 'User already joined this event' });
      }
      // Add user to participants list
      event.participants.push({
        user: userId,
        selectedDishes: [],
        isDishSelected: false
      });
  
      await event.save();
      
    // Fetch user data to send in WebSocket message
    const user = await User.findById(userId); 
    console.log(user)// Ensure you have user model and replace as needed
    const io = req.app.get('io');
    // Emit event to all connected clients
    if (io) {
      io.emit('new-participant', {
        eventId,
        participant: {
          user: {userName: user.userName, 
            status: 'active',
            id: user._id}
          
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

  exports.addDishesToParticipant = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.userId; // Assuming you're using auth middleware
    const { selectedDishes } = req.body; // [{ dish: <dishId>, quantity: <number> }, ...]
    try {
      const event = await Event.findById(eventId);
  
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      // Find participant index
      const index = event.participants.findIndex(p => p.user.toString() === userId);
  
      if (index !== -1) {
        if (Array.isArray(selectedDishes) && selectedDishes.length > 0) {
          event.participants[index].selectedDishes = selectedDishes;
          event.participants[index].isDishSelected = true;
        } else {
          return res.status(400).json({ message: 'Selected dishes are required' });
        }
      }
  
      await event.save();
      res.status(200).json({ message: 'Dishes added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  exports.selectRandomParticipants = async (req, res) => {
    try {
      const io = req.app.get('io');
      const { eventId, count } = req.body; 
      // count = number of people to select
  
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      const allUserIds = event.participants.map(p => p.user.toString());
  
      if (count > allUserIds.length) {
        return res.status(400).json({ message: 'Requested number exceeds total participants' });
      }
  
      // Shuffle and select
      const shuffled = allUserIds.sort(() => 0.5 - Math.random());
      const selectedUserIds = shuffled.slice(0, count);
  
      // Get usernames
      const users = await User.find({ _id: { $in: selectedUserIds } }, '_id userName');
      
      // Ensure return order matches selectedUserIds
      const sortedUsers = selectedUserIds.map(id => users.find(u => u._id.toString() === id));
      console.log(sortedUsers)
      console.log("reached")

       // Remove previous participants from the randomTeaServants array
    event.randomTeaServants = [];

    // Add the new selected participants to the randomTeaServants array
    sortedUsers.forEach(user => {
      event.randomTeaServants.push({
        user: user._id,  // Store the ObjectId of the user
        userName: user.userName  // Store the userName
      });
    });
    // Save the updated event document with the new randomTeaServants array
    await event.save();

      if (io) {
        // Emit to the event room where participants are connected
        io.to(eventId).emit('random-pick-result', {
          selected: sortedUsers
        });
      } else {
        console.error('WebSocket server is not initialized');
      }
      res.status(200).json({ selected: sortedUsers });
    } catch (error) {
      console.error("Random select error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  