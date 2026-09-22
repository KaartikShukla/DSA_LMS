const express = require('express');
const router = express.Router();
const tracerController = require('../controllers/tracerController');

router.post('/trace', tracerController.traceCodeExecution);

module.exports = router;
