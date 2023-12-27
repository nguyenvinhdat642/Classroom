const Assignment = require('../models/assignment');
const mkdirp = require('mkdirp');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const { courseID } = req.body;
            const teacherEmail = req.session.user.email;
            const folderPath = path.join(__dirname, `../public/files/${courseID}/${teacherEmail}`);
            fs.mkdirSync(folderPath, { recursive: true });
            cb(null, folderPath);
        } catch (error) {
            console.error(error);
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


const upload = multer({ storage });

const assignmentController = {
    getAssignment: async (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
            return;
        }

        try {
            const userRole = req.session.user.role;

            if (userRole === 'user') {
                const userID = req.session.userID;
                const userEnrollments = await Enrollment.getUserEnrollments(userID);
                const courseIDs = userEnrollments.map((enrollment) => enrollment.courseID);
                const assignments = await Assignment.getUserAssignments(courseIDs);
                res.render('assignments', { assignments });


            } else if (userRole === 'teacher') {
                const teacherID = req.session.userID;
                const teacherCourses = await Course.getTeacherCourses(teacherID);
                const courseID = teacherCourses.map((course) => course.courseID);
                const assignments = await Assignment.getTeacherAssignments(courseID);
                res.render('assignments', { assignments });


            } else if (userRole === 'admin') {
                const assignments = await Assignment.getAllAssignments();
                res.render('assignments', { assignments });

            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    },

    getCourseID: async (req, res) => {
        try {
            const courseID = req.params.courseID;
            if (!req.session || !req.session.user) {
                return res.redirect('/login');
            }

            const userRole = req.session.user.role;

            if (userRole === 'admin') {
                const assignments = await Assignment.getAllAssignments(courseID);
                res.render('admin/createAssignmentForm', { assignments, courseID });

            } else if (userRole === 'teacher') {
                // const assignments = await Assignment.getTeacherAssignments(courseID, req.session.user.userID);
                res.render('teacher/createAssignmentForm', { courseID });

            } else if (userRole === 'user') {
                const assignments = await Assignment.getUserAssignments(courseID, req.session.user.userID);
                console.log(assignments);
                res.render('user/assignment-info', { assignments, courseID });

            } else {
                res.status(403).send('Forbidden');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    },

    getCreateAssignment: async (req, res) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/login');
        }
        try {
            upload.single('lesson-doc')(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Lỗi khi tải lên tệp tin', details: err.message });
                }

                if (!req.file) {
                    return res.status(400).json({ error: 'Vui lòng tải lên một tệp tin' });
                }

                const { courseID, 'lesson-title': assignmentName, deadline, 'lesson-content': content } = req.body;
                const teacherEmail = req.session.user.email;
                const filePath = path.join(__dirname, `../public/files/${courseID}/${teacherEmail}`, req.file.originalname);

                const assignmentData = {
                    courseID,
                    assignmentName,
                    deadline,
                    content,
                    documentPath: filePath,
                    userID: req.session.user.userID,
                };

                const result = await Assignment.createAssignment(assignmentData);

                if (result) {
                    res.redirect('/lesson/' + encodeURIComponent(courseID));
                } else {
                    res.status(500).json({ error: 'Lỗi khi tạo bài tập' });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    },

    getAssignmentID: async (req, res) => {
        if (!req.session || !req.session.user) {
            return res.redirect('/login');
        }
        try {
            const assignmentID = req.params.assignmentID;
            const userRole = req.session.user.role;
            const userID = req.session.user.userID;


            if (userRole === 'admin') {
                const assignments = await Assignment.getAssignmentById(assignmentID);
                console.log(assignments);
                res.render('admin/assignment-info', { assignments: assignments });

            } else if (userRole === 'teacher') {
                const assignments = await Assignment.getAssignmentById(assignmentID);
                const submissions = await Assignment.getAllSubmissionAssignmentById(assignmentID);
                const studentID = submissions.map(submission => submission.studentID);
                const submissionStudent = await Assignment.getSubmissionStudents(studentID);

                console.log(submissions.studentID);
                console.log(submissions);
                console.log(assignments);
                console.log(submissionStudent);

                res.render('teacher/assignment-info', { assignments: assignments, submissions: submissions, submissionStudent: submissionStudent });

            } else if (userRole === 'user') {
                const submissions = await Assignment.getSubmissionAssignmentById(assignmentID, userID);
                const assignments = await Assignment.getAssignmentById(assignmentID);
                console.log(assignmentID, userID);
                console.log(assignments);
                res.render('user/assignment-info', { assignments: assignments, submissions: submissions });


            } else {
                res.status(403).send('Forbidden');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    },

    createSubmission: async (req, res) => {
    }
};

module.exports = assignmentController;
