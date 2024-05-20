const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const multer = require('multer');
const Assignment = require('../models/assignment');
const RabitMQ_csm = require('../models/RabitMQ_csm');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            console.log(req.body);
            const { courseID, submissionID} = req.body || { courseID: file.fieldname, submissionID: file.fieldname };
            const studentEmail = req.body.userEmail;

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
                    const { courseID, submissionID, ngay_nop, noi_dung} = req.body;        
        
        
                    const submissionData = {
                        submissionID, 
                        noi_dung, 
                        ngay_nop       
                    };
        
                    const result = Assignment.submissionsByStudent(submissionData);
        
                    if (result) {
                        return res.status(200).json({ success: 'Nộp bài tập thành công' });
                    } else {
                        return res.status(500).json({ error: 'Lỗi khi nộp bài tập' });
                    }

                }
    
    
                const { courseID, submissionID, ngay_nop} = req.body;
    
    
                const studentEmail = req.body.userEmail;
                const filePath = path.join(`D:/Classroom/public/files/${courseID}/submission/${submissionID}/${studentEmail}`);
    
                const noi_dung = filePath + '/' + req.file.originalname;
    
    
                const submissionData = {
                    submissionID, 
                    noi_dung, 
                    ngay_nop       
                };
    
                const result = Assignment.submissionsByStudent(submissionData);
    
                if (result) {
                    return res.status(200).json({ success: 'Nộp bài tập thành công' });
                } else {
                    return res.status(500).json({ error: 'Lỗi khi nộp bài tập' });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    },

    createSubmissionMQ: async (req, res) => {
        try {
            const { courseID, submissionID, ngay_nop, noi_dung} = await RabitMQ_csm.consumeFromQueue();        
        
        
            const submissionData = {
                submissionID, 
                noi_dung, 
                ngay_nop       
            };

            const result = Assignment.submissionsByStudent(submissionData);

            if (result) {
                return res.status(200).json({ success: 'Nộp bài tập thành công' });
            } else {
                return res.status(500).json({ error: 'Lỗi khi nộp bài tập' });
            }
        }
        catch (error) {
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