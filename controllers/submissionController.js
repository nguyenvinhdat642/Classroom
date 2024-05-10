const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const multer = require('multer');
const Assignment = require('../models/assignment');
const axios = require('axios');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            console.log(req.body);
            const { courseID, submissionID} = req.body || { courseID: file.fieldname, submissionID: file.fieldname };
            const studentEmail = req.session.user.email;

            console.log(courseID, submissionID);
            const folderPath = path.join(__dirname, `../public/files/${courseID}/submission/${submissionID}/${studentEmail}`);
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

const submissionController = {
    createSubmission: async (req, res) => {
        try {
            upload.single('submit-doc')(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Lỗi khi tải lên tệp tin', details: err.message });
                }
    
                if (!req.file) {
                    return res.status(400).json({ error: 'Vui lòng tải lên một tệp tin' });
                }
    
    
                const { courseID, submissionID, ngay_nop} = req.body;
    
    
                const studentEmail = req.session.user.email;
                const filePath = path.join(__dirname, `../public/files/${courseID}/submission/${submissionID}/${studentEmail}`);
    
                const noi_dung = filePath + '/' + req.file.originalname;
    
    
                const submissionData = {
                    submissionID,
                    courseID, 
                    noi_dung, 
                    ngay_nop,
                    userEmail: studentEmail,       
                };
    
                // const result = Assignment.submissionsByStudent(submissionData);
                axios.post('http://localhost:3000/assignments/detail/submit/' + submissionID, submissionData)
                    .then(response => {
                        console.log('Response:', response.data);
                        res.redirect('/lesson/' + encodeURIComponent(courseID));

                    })
                    .catch(error => {
                        console.error('Error:', error.response.data);
                        res.status(500).json({ error: 'Lỗi khi tạo bài tập' });

                    });
    
                // if (result) {
                //     res.redirect('/lesson/' + encodeURIComponent(courseID));
                // } else {
                //     res.status(500).json({ error: 'Lỗi khi nộp bài tập' });
                // }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    },

    getSubmission: async (req, res) => {
        try {
            const submissionID = req.params.submissionID;

            const submissions = await Assignment.getSubmission(submissionID);
            const submissionStudent = await Assignment.getStudentbySubmission(submissions.studentID);
            const assignments = await Assignment.getAssignmentById(submissions.assignmentID);
            console.log("Kiểm tra: getSubmission")
            console.log(submissions);
            console.log(submissionStudent);
            console.log(assignments);
            res.render('teacher/assignment-info-student.ejs', { submissions, submissionStudent,  assignments});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getMark: async (req, res) => {
        try {
            const submissionID = req.query.submissionID;
            const diem_so = req.query.diem_so;
            console.log(diem_so);
            const result = await Assignment.updateMark(submissionID, diem_so);
            console.log("Kiểm tra: getMark")
            console.log(result);
            if (result) {
                res.redirect('/submission/student/' + encodeURIComponent(submissionID));
            } else {
                res.status(500).json({ error: 'Lỗi khi cập nhật điểm' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
}



module.exports = submissionController;