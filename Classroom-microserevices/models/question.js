const db = require('./db');

class Question {
    static create(quizId, questionText) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)';
            db.query(query, [quizId, questionText], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static findByQuizId(quizId, callback) {
        const query = 'SELECT * FROM questions WHERE quiz_id = ?';
        db.query(query, [quizId], callback);
    }
}

module.exports = Question;
