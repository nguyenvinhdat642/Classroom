const db = require('./db');

class Quiz {

    static async create(title, teacherId, courseID) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO quizzes (title, teacher_id, course_id) VALUES (?, ?, ?)', [title, teacherId, courseID], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static findById(quizId, callback) {
        const query = 'SELECT * FROM quizzes WHERE id = ?';
        db.query(query, [quizId], callback);
    }

    static gradequiz(quizId, studentId, grade) {
        const query = 'INSERT INTO gradequiz (quizID, studentID, diem_so) VALUES (?, ?, ?)';
        db.query(query, [quizId, studentId, grade]);
    }
}

module.exports = Quiz;
