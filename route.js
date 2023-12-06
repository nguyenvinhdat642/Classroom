const express = require('express');
const router = express.Router();

const lessonController = require('./controllers/lessonController');

router.get('/lessons', lessonController.getAllLessons);
router.get('/lessons/:courseID', lessonController.getLessonDetails);
router.get('/admin/create-lesson', lessonController.getCreateLessonForm);
router.post('/admin/create-lesson', lessonController.createLesson);

module.exports = router;
