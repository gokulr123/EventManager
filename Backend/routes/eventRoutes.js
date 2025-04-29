const express = require('express');
const router = express.Router();
const { createEvent, joinEvent ,getEvents,getEventById,joinEventById} = require('../controllers/eventController');
const verifyToken = require('../middleware/VerifyToken');
//const { authenticate } = require('../middleware/authMiddleware');

router.post('/create', createEvent);
router.get('/',verifyToken, getEvents); 
router.get('/:eventId',verifyToken, getEventById);
router.post('/join',verifyToken, joinEvent);
router.post('/:eventId/join',verifyToken,joinEventById)

module.exports = router;
