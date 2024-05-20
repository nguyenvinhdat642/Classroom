// models/answer.js
const db = require('./db');

class Answer {
    static create(studentId, questionId, optionId, callback) {
        console.log('Answer:', studentId, questionId, optionId);
        const query = 'INSERT INTO answers (student_id, question_id, option_id) VALUES (?, ?, ?)';
        db.query(query, [studentId, questionId, optionId], callback);
    }

    static createMultiple(optionValues, callback) {
        const query = 'INSERT INTO answers (student_id, question_id, option_id) VALUES ?';
        db.query(query, [optionValues], callback);
    }

    static findByStudentAndQuiz(studentId, quizId, callback) {
        const query = `
            SELECT a.question_id, a.option_id, o.is_correct
            FROM answers a
            JOIN options o ON a.option_id = o.id
            JOIN questions q ON a.question_id = q.id
            WHERE a.student_id = ? AND q.quiz_id = ?`;
        db.query(query, [studentId, quizId], callback);
    }
}

module.exports = Answer;
