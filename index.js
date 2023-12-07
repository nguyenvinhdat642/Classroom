const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sử dụng express-session và express-flash
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

const authController = require('./controllers/authController');
app.use(authController);

// app.get('/', (req, res) => {
//     res.render('index', { title: 'Classroom App' });
// });

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: req.flash('error') });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

const lessonController = require('./controllers/lessonController');
const indexController = require('./controllers/indexController');

app.get('/', indexController.getAllCourses);

app.get('/lessons', lessonController.getLesson);
app.get('/lesson/:courseID', lessonController.getLessonDetails);
app.get('/admin/create-lesson', lessonController.getCreateLessonForm);
app.post('/admin/create-lesson', lessonController.createLesson);
app.get('/lesson/enrollments/:courseID', lessonController.getEnrollments);
// app.post('/lesson/enrollments/:courseID', lessonController.checkEnrollments);

const assignmentController = require('./controllers/assignmentController');
app.get('/assignments', assignmentController.getAssignment);
app.get('/assignments/:courseID', assignmentController.getCourseID);
app.post('/assignments/create-assignment', assignmentController.getCreateAssignment);

const PORT = process.env.PORT || 8888;

const listener = app.listen(PORT, () => {
    console.log(`Server is running on port ${listener.address().port}`);
});
