const express = require('express');
const router = express.Router();
const { createEvent, joinEvent ,getEvents,getEventById} = require('../controllers/eventController');
//const { authenticate } = require('../middleware/authMiddleware');

router.post('/create', createEvent);
router.get('/', getEvents); 
router.get('/:eventId', getEventById);
router.post('/join', joinEvent);

module.exports = router;
