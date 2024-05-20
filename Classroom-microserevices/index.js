const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const assignmentController = require('./API/assignmentController');
app.get('/assignments', assignmentController.getAssignment);
app.get('/assignments/:courseID', assignmentController.getCourseID);
app.post('/assignments/create-assignment', assignmentController.getCreateAssignment);
app.get('/assignment/detail/:assignmentID', assignmentController.getAssignmentID);

const submissionController = require("./API/submissionController")
app.post('/assignments/detail/submit/:assignmentID', submissionController.createSubmission);
app.get('/submission/student/:submissionID', submissionController.getSubmission);
app.get('/submission/math/', submissionController.getMark);

const quizController = require('./API/quizController');
app.post('/quizzes/', quizController.createQuiz);
app.post('/quizzes/:quizId/questions', quizController.addQuestion);
app.get('/quizzes/:quizId', quizController.getQuiz);
app.post('/quizzes/:quizId/submit', quizController.submitQuiz);


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
