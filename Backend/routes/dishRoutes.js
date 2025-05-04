const express = require('express');
const router = express.Router();
const { getDishes, createDish,getDishSummary,activateDishes,deactivateDishes,getDishActiveStatus } = require('../controllers/dishController');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/VerifyToken');

router.post('/create',verifyToken,isAdmin,createDish);
router.post('/:eventId/dishsummary',verifyToken,getDishSummary)
router.put('/activate',verifyToken,isAdmin,activateDishes)
router.put('/deactivate',verifyToken,isAdmin,deactivateDishes)
router.get('/active-status',verifyToken,isAdmin,getDishActiveStatus)
router.get('/',verifyToken,getDishes);

module.exports = router;
