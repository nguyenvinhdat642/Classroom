const Quiz = require('../models/quiz');
const Question = require('../models/question');
const Option = require('../models/option');
const Answer = require('../models/answer');
const async = require('async');

const quizController = {
    createQuiz: async (req, res) => {
        const title = 'Quiz BOOTSTRAP 2';
        const teacherId = "3";
        const courseID = "8";

        console.log(title, teacherId);
    
        const addQuiz = Quiz.create(title, teacherId, courseID);

        res.status(201).json({ "message": "Quiz created successfully!"});
    },

    getQuiz: async (req, res) => {
        const { quizId } = req.params;
    
        Question.findByQuizId(quizId, (err, questions) => {
            if (err) return res.status(500).json(err);
    
            const questionIds = questions.map(q => q.id);
            Option.findByQuestionIds(questionIds, (err, options) => {
                if (err) return res.status(500).json(err);
    
                const quiz = questions.map(q => ({
                    id: q.id,
                    questionText: q.question_text,
                    options: options.filter(o => o.question_id === q.id)
                }));
    
                res.json(quiz);
            });
        });
    },

    submitQuiz: async (req, res) => {
        const { quizId } = req.params;
        const studentId = req.body.studentID;
        const { answers } = req.body;
    
        const answerValues = answers.map(answer => [studentId, answer.questionId, answer.optionId]);
        console.log('Answer Values:', answerValues);
        Answer.createMultiple(answerValues, (err) => {
            if (err) return res.status(500).json(err);
    
            // Calculate the score
            Answer.findByStudentAndQuiz(studentId, quizId, (err, results) => {
                if (err) return res.status(500).json(err);
    
                const correctAnswers = results.filter(result => result.is_correct).length;
                const totalQuestions = results.length;
                console.log('Correct Answers:', correctAnswers);
                console.log('Total Questions:', totalQuestions);
                const score = (correctAnswers / totalQuestions) * 100;

                const grade = Quiz.gradequiz(quizId, studentId, score);
    
                res.json({ score });
            });
        });
    },

    addQuestion: async (req, res) => {
        const { quizId } = req.params;
        let questionsData = req.body;
    
        console.log('Quiz ID:', quizId);
        console.log('Questions:', questionsData);
    
        // Ensure questions is an array
        const questions = Array.isArray(questionsData.questions) ? questionsData.questions : [questionsData];
    
        const createdQuestions = [];
    
        try {
            for (const questionData of questions) {
                const { questionText, options } = questionData;
    
                console.log('Current Question Data:', questionData);
                console.log('Question Text:', questionText);
                console.log('Options:', options);
    
                if (!questionText || !Array.isArray(options)) {
                    throw new Error('Invalid question format.');
                }
    
                // Tạo câu hỏi
                const result = await Question.create(quizId, questionText);
    
                const questionId = result.insertId;
                createdQuestions.push(questionId); // Lưu ID của câu hỏi được tạo
    
                // Tạo các phương án cho câu hỏi
                const optionValues = options.map(option => [questionId, option.text, option.isCorrect]);
                await Option.createMultiple(optionValues);
            }
    
            res.status(201).json({ questions: createdQuestions }); // Trả về ID của các câu hỏi được tạo
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
};    


// exports.addQuestion = (req, res) => {
//     const { quizId } = req.params;
//     const { questionText, options } = req.body;

//     Question.create(quizId, questionText, (err, result) => {
//         if (err) return res.status(500).json(err);
//         const questionId = result.insertId;

//         const optionValues = options.map(option => [questionId, option.text, option.isCorrect]);
//         Option.createMultiple(optionValues, (err) => {
//             if (err) return res.status(500).json(err);
//             res.status(201).json({ id: questionId });
//         });
//     });
// };

module.exports = quizController;
