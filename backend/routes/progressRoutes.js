const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const { authenticate } = require('../middleware/auth');

router.post('/toggle', authenticate, progressController.toggleLesson);
router.get('/', authenticate, progressController.getProgress);

module.exports = router;
