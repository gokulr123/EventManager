// const mongoose = require('mongoose');
// const eventSchema = new mongoose.Schema({
//     eventName: { type: String, required: true },
//     description: { type: String, required: true },
//     time: { type: Date, required: true },
//     venue: { type: String, required: true },
//     numberOfParticipants: { type: Number, required: true },
//     participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // List of participants
//     dishSelection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DishSelectionHistory' }],  // History of dishes selected by participants
//     eventType: { type: String, required: true },  // Event type, e.g., "Dish"
//     dishSummary: {
//       tea: { type: Number, default: 0 },  // Total number of tea selected
//       snacks: { type: Number, default: 0 },  // Total number of snacks selected
//       // Add more dishes if needed
//     },
//     randomTeaServants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Participants randomly selected to serve tea
//     randomCleaners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // Participants randomly selected to clean
//   });
  
//   module.exports = mongoose.model('Event', eventSchema);
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, required: true },
  venue: { type: String, required: true },
  numberOfParticipants: { type: Number, required: true },

  // Updated participants structure
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
      selectedDishes: [
        {
          dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', },
          quantity: { type: Number,default: 1 }
        }
      ],
      isDishSelected:{type:Boolean,default:false}
    }
  ],

  dishSelection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DishSelectionHistory' }],
  eventType: { type: String, required: true },

  dishSummary: {
    tea: { type: Number, default: 0 },
    snacks: { type: Number, default: 0 },
    // Extend this if needed
  },

  randomTeaServants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String }
  }],
  randomCleaners: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String }
  }]
});

module.exports = mongoose.model('Event', eventSchema);
