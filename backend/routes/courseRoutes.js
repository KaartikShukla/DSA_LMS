const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate } = require('../middleware/auth');

router.get('/modules', courseController.getModules);
router.get('/modules/:slug', courseController.getModuleBySlug);
router.get('/lessons', courseController.getLessons);
router.get('/lessons/:slug', courseController.getLessonBySlug);
router.post('/lessons', authenticate, courseController.createLesson);

module.exports = router;
