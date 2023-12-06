const express = require('express');
const router = express.Router();

const lessonController = require('./controllers/lessonController');
const indexController = require('./controllers/indexController');

router.get('/', lessonController.getAllCourses);

router.get('/lessons', lessonController.getLesson);
router.get('/lessons/:courseID', lessonController.getLessonDetails);
router.get('/admin/create-lesson', lessonController.getCreateLessonForm);
router.post('/admin/create-lesson', lessonController.createLesson);

module.exports = router;
