const mysql = require('mysql2');
const connection = require('./db');

class Lesson {
    static async getAllLessons() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Courses', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async getLessonById(courseID) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Courses WHERE courseID = ?', [courseID], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    static async createLesson({ courseName, teacherID, description, bai_tap, image, content }) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Courses (courseName, teacherID, description, bai_tap, image, content) VALUES (?, ?, ?, ?, ?, ?)',
                [courseName, teacherID, description, bai_tap, image, content],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    static async create(lessonData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO Courses SET ?', lessonData, (err, results) => {
                if (err) reject(err);
                const lessonID = results.insertId;
                resolve({ courseID: lessonID, ...lessonData });
            });
        });
    }

    static async getTeacherLessons(teacherID) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Courses WHERE teacherID = ?', [teacherID], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async getStudentLessons(studentID) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT Courses.* FROM Courses JOIN enrollments ON Courses.courseID = enrollments.courseID WHERE enrollments.studentID = ?', [studentID], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static async enrollStudent(courseID, studentID) {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO enrollments (courseID, studentID) VALUES (?, ?)',
                [courseID, studentID],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    static async isStudentEnrolled(courseID, studentID) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM enrollments WHERE courseID = ? AND studentID = ?', [courseID, studentID], (err, results) => {
                if (err) reject(err);
                resolve(results.length > 0);
            });
        });
    }

    static async getEnrollmentsByStudentID(studentID) {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT Courses.* FROM Courses JOIN enrollments ON Courses.courseID = enrollments.courseID WHERE enrollments.studentID = ?',
                [studentID],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    
}

module.exports = Lesson;
