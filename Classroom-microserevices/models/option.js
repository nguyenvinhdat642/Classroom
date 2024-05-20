// models/option.js
const db = require('./db');

class Option {
    static create(questionId, optionText, isCorrect, callback) {
        const query = 'INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)';
        db.query(query, [questionId, optionText, isCorrect], callback);
    }

    static createMultiple(optionValues, callback) {
        const query = 'INSERT INTO options (question_id, option_text, is_correct) VALUES ?';
        db.query(query, [optionValues], callback);
    }

    static findByQuestionId(questionId, callback) {
        const query = 'SELECT * FROM options WHERE question_id = ?';
        db.query(query, [questionId], callback);
    }

    static findByQuestionIds(questionIds, callback) {
        const query = 'SELECT * FROM options WHERE question_id IN (?)';
        db.query(query, [questionIds], callback);
    }
}

module.exports = Option;
