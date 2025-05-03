const express = require('express');
const router = express.Router();
const { getDishes, createDish } = require('../controllers/dishController');

router.post('/create',createDish);
router.get('/',getDishes);

module.exports = router;
