const Lesson = require('../models/Lesson');
const UserController = require('../controllers/UserController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const lessonController = {
    getAllLessons: async (req, res) => {
        try {
            const lessons = await Lesson.getAllLessons();
            res.render('lessons', { lessons });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getLesson: async (req, res) => {
        try {
            if (!req.session.user || !req.session.user.role) {
                res.redirect('/login');
                return;
            }
            const userRole = req.session.user.role;

            switch (userRole) {
                case 'admin':
                    const lessons = await Lesson.getAllLessons();
                    res.render('admin/lessons', { lessons: lessons });
                    break;
                case 'teacher':
                    const teacherID = req.session.user.userID;
                    const teacherLessons = await Lesson.getTeacherLessons(teacherID);
                    res.render('teacher/lessons', { lessons: teacherLessons });
                    break;
                case 'user':
                    
                    res.render('user/lessons');
                    break;
                default:
                    res.render('lessons');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getLessonDetails: async (req, res) => {

        if (!req.session.user) {
            res.redirect('/login');
            return;
        }

        const courseID = req.params.courseID;
        const studentID = req.session.user.userID;

        

        try {
            const user = req.session.user;
            if (!user) {
                return res.status(401).send('Unauthorized');
            }
            let viewPath;
            switch (user.role) {
                case 'teacher':
                    viewPath = 'teacher/lessonDetail';
                    break;
                case 'admin':
                    viewPath = 'admin/lessonDetail';
                    break;
                case 'user':
                    viewPath = 'user/lessonDetail';
                    break;
                default:
                    return res.status(403).send('Permission denied');
            }
            const lesson = await Lesson.getLessonById(courseID);
    
            if (!lesson) {
                return res.status(404).send('Lesson not found');
            }

            const isEnrolled = await Lesson.isStudentEnrolled(courseID, studentID);

            if (isEnrolled) {
                return await res.render('user/lessonDetailEnroll', { lesson });
            } else {
                res.render(viewPath, { lesson });
            }
            

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    

    getCreateLessonForm: async (req, res) => {
        try {
            const userRole = req.session.user.role;
            if (userRole === 'admin') {
                res.render('admin/createLessonForm');
            } else {
                res.status(403).send('Unknown role. Permission denied.');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    createLesson: [
        upload.fields([{ name: 'lesson-banner', maxCount: 1 }]),
    
        async (req, res) => {
            const { 'lesson-title': lessonTitle, 'teacher-email': teacherEmail, 'lesson-description': lessonDescription, 'lesson-content': lessonContent } = req.body;
            console.log(req.body);
            console.log(teacherEmail);
            try {
                const userRole = req.session.user.role;
                if (userRole !== 'admin') {
                    return res.status(403).send('Permission denied. Only admins can create lessons.');
                }
    
                const teacherID = await UserController.findUserIdByEmail(teacherEmail);
                if (teacherID === null) {
                    return res.status(404).send('Teacher not found');
                }
    
                const lessonBanner = req.files['lesson-banner'] ? req.files['lesson-banner'][0].filename : '';
    
                const newLesson = {
                    courseName: lessonTitle,
                    teacherID: teacherID,
                    description: lessonDescription,
                    bai_tap: '',
                    image: lessonBanner,
                    content: lessonContent,
                };
    
                console.log('Thông tin bài học mới:', newLesson);
    
                await Lesson.createLesson(newLesson);
                res.redirect('/lessons');
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        },
    ],

    getEnrollments: async (req, res) => {
        try {
            const courseID = req.params.courseID;
            const studentID = req.session.user.userID;
    
            if (!req.session.user || !studentID) {
                res.redirect('/login');
                return;
            }
    
            const isEnrolled = await Lesson.isStudentEnrolled(courseID, studentID);

            await Lesson.enrollStudent(courseID, studentID);
    
            res.redirect('/lesson/' + courseID);
    
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    

    
};

module.exports = lessonController;
